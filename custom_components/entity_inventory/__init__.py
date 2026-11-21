"""Entity Inventory: sidebar panel with all entities sorted by type, plus photos, notes and documents per entity.

The table itself is computed live in the browser from the frontend's `hass` object (states, entity / device / area registry).
The server only stores what the user adds: notes (`.storage/entity_inventory`), photos and documents (files in `config/entity_inventory/<entity_id>/`).
"""

from __future__ import annotations

from datetime import timedelta
import logging
from pathlib import Path
import re
import secrets
import time
from typing import Any
from urllib.parse import quote

from aiohttp import web
from sqlalchemy import func, select
import voluptuous as vol

from homeassistant.components import frontend, panel_custom, websocket_api
from homeassistant.components.recorder import get_instance
from homeassistant.components.recorder.db_schema import States, StatesMeta
from homeassistant.components.recorder.util import session_scope
from homeassistant.components.http import HomeAssistantView
from homeassistant.components.http.auth import async_sign_path
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration
from homeassistant.util import dt as dt_util

from .const import (
    DOMAIN,
    MAX_DOC_BYTES,
    MAX_FILES_PER_ENTITY,
    MAX_PHOTO_BYTES,
    MAX_RETENTION_DAYS,
    RETENTION_HOUR,
    RETENTION_MINUTE,
    PANEL_PATH,
    PANEL_URL,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)
FRONTEND_DIR = Path(__file__).parent / "frontend"
FRONTEND_FILES = ("entity-inventory-panel.js",)
ENTITY_RE = re.compile(r"^[a-z0-9_]+\.[a-z0-9_]+$")
ID_RE = re.compile(r"^[A-Za-z0-9_-]+$")
INLINE_EXT = {"pdf": "application/pdf", "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "webp": "image/webp", "gif": "image/gif"}


class Manager:
    """Persistent notes, photos and documents, keyed by entity_id."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store = Store(hass, STORAGE_VERSION, DOMAIN)
        self.data: dict[str, Any] = {"notes": {}, "photos": {}, "docs": {}, "retention": {}, "settings": {}}
        self.root = Path(hass.config.path(DOMAIN))
        self.age_cache: dict[str, Any] | None = None

    async def async_load(self) -> None:
        loaded = await self.store.async_load()
        if loaded:
            for key in self.data:
                self.data[key] = loaded.get(key, {})

    def save(self) -> None:
        self.store.async_delay_save(lambda: self.data, 1)

    def payload(self, refresh_token_id: str | None) -> dict[str, Any]:
        """Everything for the panel; files carry signed, expiring URLs (the views need authentication)."""

        def sign(path: str) -> str:
            return async_sign_path(self.hass, path, timedelta(hours=1), refresh_token_id=refresh_token_id)

        settings = self.data["settings"]
        return {
            "retention": self.data["retention"],
            "retention_info": {
                "enabled": bool(settings.get("retention_enabled", False)),
                "last_run": settings.get("retention_last_run"),
                "last_result": settings.get("retention_last_result"),
                "hour": RETENTION_HOUR,
                "minute": RETENTION_MINUTE,
                "default_days": settings.get("default_days"),
                "recorder": _recorder_info(self.hass),
            },
            "notes": self.data["notes"],
            "photos": {
                eid: [{"id": p["id"], "ts": p.get("ts"), "url": sign(f"/api/{DOMAIN}/photo/{p['id']}")} for p in items]
                for eid, items in self.data["photos"].items()
            },
            "docs": {
                eid: [
                    {"id": d["id"], "name": d.get("name"), "ext": d.get("ext", ""), "ts": d.get("ts"), "url": sign(f"/api/{DOMAIN}/doc/{d['id']}")}
                    for d in items
                ]
                for eid, items in self.data["docs"].items()
            },
        }

    def find(self, kind: str, item_id: str) -> dict[str, Any] | None:
        return next((i for items in self.data[kind].values() for i in items if i["id"] == item_id), None)

    def location(self, item: dict[str, Any]) -> Path:
        """Absolute path of a stored file (always inside the data folder)."""
        path = (self.root / item["path"]).resolve()
        if self.root.resolve() not in path.parents:
            raise ValueError("path outside the data folder")
        return path

    def remove_file(self, item: dict[str, Any]) -> None:
        try:
            path = self.location(item)
            path.unlink(missing_ok=True)
            parent = path.parent
            while parent != self.root and self.root in parent.parents:
                parent.rmdir()  # empty entity folders go away
                parent = parent.parent
        except (OSError, ValueError):
            pass

    @callback
    def entity_renamed(self, old: str, new: str) -> None:
        """The entity got a new entity_id: its notes, photos and documents follow (the files keep their folder)."""
        moved = False
        for kind in self.data:
            if old in self.data[kind]:
                self.data[kind][new] = self.data[kind].pop(old)
                moved = True
        if moved:
            self.save()


def _oldest_states(hass: HomeAssistant) -> dict[str, float]:
    """entity_id -> time (unix seconds) of the oldest state the recorder still has (one aggregate query)."""
    with session_scope(hass=hass, read_only=True) as session:
        rows = session.execute(
            select(StatesMeta.entity_id, func.min(States.last_updated_ts))
            .join(States, States.metadata_id == StatesMeta.metadata_id)
            .group_by(StatesMeta.entity_id)
        ).all()
    return {entity_id: float(ts) for entity_id, ts in rows if entity_id and ts}


def _recorder_info(hass: HomeAssistant) -> dict[str, Any] | None:
    """The global settings of the recorder that matter here (purge_keep_days, automatic purge)."""
    try:
        instance = get_instance(hass)
    except Exception:  # noqa: BLE001 - recorder not set up
        return None
    keep = getattr(instance, "keep_days", None)
    return {"keep_days": int(keep) if keep else None, "auto_purge": bool(getattr(instance, "auto_purge", True))}


def _plan_sync(hass: HomeAssistant, rules: dict[str, int], default_days: int | None, keep_days: int | None, count_rows: bool) -> dict[str, Any]:
    """What the retention job would delete (runs in the recorder's executor).

    Every entity the recorder has states for gets its own rule, or else the default retention. Entities whose number
    of days is not shorter than the global purge_keep_days are skipped (the recorder deletes them at that age anyway).
    """
    by_days: dict[int, list[str]] = {}
    skipped = 0
    with session_scope(hass=hass, read_only=True) as session:
        for (entity_id,) in session.execute(select(StatesMeta.entity_id)).all():
            if not entity_id or not ENTITY_RE.match(entity_id):
                continue
            days = rules.get(entity_id, default_days)
            if not isinstance(days, int) or days < 1:
                continue
            if keep_days and days >= keep_days:
                skipped += 1
                continue
            by_days.setdefault(days, []).append(entity_id)
        groups = []
        now = time.time()
        for days, ids in sorted(by_days.items()):
            rows = None
            if count_rows:
                rows = 0
                cutoff = now - days * 86400
                for k in range(0, len(ids), 200):
                    rows += (
                        session.execute(
                            select(func.count())
                            .select_from(States)
                            .join(StatesMeta, States.metadata_id == StatesMeta.metadata_id)
                            .where(StatesMeta.entity_id.in_(ids[k : k + 200]), States.last_updated_ts < cutoff)
                        ).scalar()
                        or 0
                    )
            groups.append({"days": days, "entities": len(ids), "rows": rows, "ids": ids})
    return {"groups": groups, "skipped": skipped}


async def async_plan_retention(hass: HomeAssistant, manager: Manager, count_rows: bool, default_days: Any = "saved") -> dict[str, Any]:
    info = _recorder_info(hass)
    keep = info["keep_days"] if info else None
    if default_days == "saved":
        default_days = manager.data["settings"].get("default_days")
    plan = await get_instance(hass).async_add_executor_job(_plan_sync, hass, dict(manager.data["retention"]), default_days, keep, count_rows)
    plan["recorder"] = info
    return plan


async def async_run_retention(hass: HomeAssistant, manager: Manager) -> dict[str, Any]:
    """Deletes the recorder history that is older than the retention of its entity (own rule, else the default).

    Uses the recorder service recorder.purge_entities once per number of days; keep_days is always passed
    explicitly (the service default of 0 would delete everything). Retention can only be shortened here, it
    cannot exceed the global purge_keep_days of the recorder.
    """
    result: dict[str, Any] = {"entities": 0, "groups": 0, "error": None}
    if not hass.services.has_service("recorder", "purge_entities"):
        result["error"] = "recorder_not_available"
    else:
        try:
            plan = await async_plan_retention(hass, manager, False)
        except Exception as err:  # noqa: BLE001 - tell the panel instead of failing
            _LOGGER.warning("Retention plan failed: %s", err)
            plan = {"groups": []}
            result["error"] = str(err)
        for group in plan["groups"]:
            days, entity_ids = group["days"], group["ids"]
            for i in range(0, len(entity_ids), 200):
                chunk = entity_ids[i : i + 200]
                try:
                    await hass.services.async_call("recorder", "purge_entities", {"entity_id": chunk, "keep_days": days}, blocking=True)
                except Exception as err:  # noqa: BLE001 - one failing group must not stop the others
                    _LOGGER.warning("Retention purge (%s days, %s entities) failed: %s", days, len(chunk), err)
                    result["error"] = str(err)
                    continue
                result["entities"] += len(chunk)
            result["groups"] += 1
    manager.data["settings"]["retention_last_run"] = dt_util.utcnow().isoformat()
    manager.data["settings"]["retention_last_result"] = result
    manager.save()
    return result


def _safe_name(name: str | None, fallback: str) -> str:
    base = "".join(ch for ch in (name or "") if ch.isalnum() or ch in "._- ").strip(" .")[:80]
    return base or fallback


def _unique(folder: Path, name: str) -> str:
    stem, dot, ext = name.rpartition(".")
    if not dot:
        stem, ext = name, ""
    candidate, n = name, 2
    while (folder / candidate).exists():
        candidate = f"{stem} ({n})" + (f".{ext}" if ext else "")
        n += 1
    return candidate


def _write(manager: Manager, entity_id: str, name: str, data: bytes) -> str:
    folder = manager.root / entity_id
    folder.mkdir(parents=True, exist_ok=True)
    name = _unique(folder, name)
    (folder / name).write_bytes(data)
    return f"{entity_id}/{name}"


def _image_ext(data: bytes) -> str | None:
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if data[:3] == b"\xff\xd8\xff":
        return "jpg"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp"
    return None


# ---------------------------------------------------------------- setup


class FrontendFileView(HomeAssistantView):
    """Serves the panel JavaScript with Cache-Control: no-cache."""

    url = f"/{DOMAIN}_static/{{filename}}"
    name = f"{DOMAIN}:static"
    requires_auth = False

    async def get(self, request: web.Request, filename: str) -> web.StreamResponse:
        if filename not in FRONTEND_FILES:
            return web.Response(status=404)
        return web.FileResponse(FRONTEND_DIR / filename, headers={"Cache-Control": "no-cache"})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    manager = Manager(hass)
    await manager.async_load()
    hass.data[DOMAIN] = manager

    hass.http.register_view(FrontendFileView)
    hass.http.register_view(PhotoUploadView)
    hass.http.register_view(DocUploadView)
    hass.http.register_view(PhotoServeView)
    hass.http.register_view(DocServeView)
    for command in (ws_list, ws_set_note, ws_delete_photo, ws_delete_doc, ws_rename_doc, ws_set_retention, ws_retention_enabled, ws_run_retention, ws_recorder_age, ws_set_default_retention, ws_retention_preview):
        websocket_api.async_register_command(hass, command)

    @callback
    def _registry_updated(event: Event) -> None:
        data = event.data
        if data.get("action") == "update" and data.get("old_entity_id"):
            manager.entity_renamed(data["old_entity_id"], data["entity_id"])

    entry.async_on_unload(hass.bus.async_listen(er.EVENT_ENTITY_REGISTRY_UPDATED, _registry_updated))

    async def _nightly(_now) -> None:
        if manager.data["settings"].get("retention_enabled") and (manager.data["retention"] or manager.data["settings"].get("default_days")):
            await async_run_retention(hass, manager)

    entry.async_on_unload(async_track_time_change(hass, _nightly, hour=RETENTION_HOUR, minute=RETENTION_MINUTE, second=0))

    stamp = await hass.async_add_executor_job(lambda: int(sum((FRONTEND_DIR / f).stat().st_mtime for f in FRONTEND_FILES)))
    version = f"{(await async_get_integration(hass, DOMAIN)).version}.{stamp}"
    try:
        await panel_custom.async_register_panel(
            hass,
            webcomponent_name="entity-inventory-panel",
            frontend_url_path=PANEL_PATH,
            sidebar_title="Entity Inventory",
            sidebar_icon="mdi:format-list-bulleted-type",
            module_url=f"{PANEL_URL}?v={version}",
            embed_iframe=False,
            require_admin=False,
        )
    except ValueError:
        _LOGGER.debug("Panel %s already registered", PANEL_PATH)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, PANEL_PATH)
    manager: Manager | None = hass.data.pop(DOMAIN, None)
    if manager is not None:
        await manager.store.async_save(manager.data)
    return True


# ---------------------------------------------------------------- websocket


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/list"})
@callback
def ws_list(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    manager: Manager = hass.data[DOMAIN]
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/set_note", vol.Required("entity_id"): str, vol.Required("text"): str}
)
@websocket_api.require_admin
@callback
def ws_set_note(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    manager: Manager = hass.data[DOMAIN]
    if not ENTITY_RE.match(msg["entity_id"]):
        connection.send_error(msg["id"], "invalid_entity", "Invalid entity_id")
        return
    text = msg["text"].strip()
    if text:
        manager.data["notes"][msg["entity_id"]] = {"t": text[:5000], "ts": dt_util.utcnow().isoformat()}
    else:
        manager.data["notes"].pop(msg["entity_id"], None)
    manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


async def _delete_item(hass: HomeAssistant, connection, msg: dict[str, Any], kind: str, id_key: str) -> None:
    manager: Manager = hass.data[DOMAIN]
    items = manager.data[kind].get(msg["entity_id"], [])
    gone = next((i for i in items if i["id"] == msg[id_key]), None)
    if gone is not None:
        await hass.async_add_executor_job(manager.remove_file, gone)
        keep = [i for i in items if i is not gone]
        if keep:
            manager.data[kind][msg["entity_id"]] = keep
        else:
            manager.data[kind].pop(msg["entity_id"], None)
        manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/delete_photo", vol.Required("entity_id"): str, vol.Required("photo_id"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_delete_photo(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    await _delete_item(hass, connection, msg, "photos", "photo_id")


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/delete_doc", vol.Required("entity_id"): str, vol.Required("doc_id"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_delete_doc(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    await _delete_item(hass, connection, msg, "docs", "doc_id")


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/rename_doc", vol.Required("entity_id"): str, vol.Required("doc_id"): str, vol.Required("name"): str}
)
@websocket_api.require_admin
@callback
def ws_rename_doc(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Changes the displayed name only (the file keeps its name on disk)."""
    manager: Manager = hass.data[DOMAIN]
    doc = next((d for d in manager.data["docs"].get(msg["entity_id"], []) if d["id"] == msg["doc_id"]), None)
    name = msg["name"].strip()[:120]
    if doc is not None and name:
        doc["name"] = name
        manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/set_retention", vol.Required("entity_id"): str, vol.Required("days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=MAX_RETENTION_DAYS)))}
)
@websocket_api.require_admin
@callback
def ws_set_retention(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Sets (or, with days = null, removes) the retention rule of an entity."""
    manager: Manager = hass.data[DOMAIN]
    if not ENTITY_RE.match(msg["entity_id"]):
        connection.send_error(msg["id"], "invalid_entity", "Invalid entity_id")
        return
    if msg["days"] is None:
        manager.data["retention"].pop(msg["entity_id"], None)
    else:
        manager.data["retention"][msg["entity_id"]] = msg["days"]
    manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/retention_enabled", vol.Required("enabled"): bool})
@websocket_api.require_admin
@callback
def ws_retention_enabled(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Master switch of the nightly retention job (off by default)."""
    manager: Manager = hass.data[DOMAIN]
    manager.data["settings"]["retention_enabled"] = msg["enabled"]
    manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/set_default_retention", vol.Required("days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=MAX_RETENTION_DAYS)))}
)
@websocket_api.require_admin
@callback
def ws_set_default_retention(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Default retention for every entity without an own rule (null = none)."""
    manager: Manager = hass.data[DOMAIN]
    if msg["days"] is None:
        manager.data["settings"].pop("default_days", None)
    else:
        manager.data["settings"]["default_days"] = msg["days"]
    manager.save()
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/retention_preview", vol.Optional("default_days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=MAX_RETENTION_DAYS)))}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_retention_preview(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """What the job would delete right now (entities and rows per number of days); deletes nothing."""
    manager: Manager = hass.data[DOMAIN]
    try:
        plan = await async_plan_retention(hass, manager, True, msg["default_days"] if "default_days" in msg else "saved")
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("Retention preview failed: %s", err)
        connection.send_error(msg["id"], "recorder_error", str(err))
        return
    for group in plan["groups"]:
        group.pop("ids", None)
    plan["enabled"] = bool(manager.data["settings"].get("retention_enabled", False))
    plan["default_days"] = msg["default_days"] if "default_days" in msg else manager.data["settings"].get("default_days")
    plan["rules"] = len(manager.data["retention"])
    connection.send_result(msg["id"], plan)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/recorder_age"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_recorder_age(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """How far back the recorder holds the history of every entity (cached for five minutes)."""
    manager: Manager = hass.data[DOMAIN]
    now = dt_util.utcnow().timestamp()
    cache = manager.age_cache
    if cache is None or now - cache["at"] > 300:
        try:
            oldest = await get_instance(hass).async_add_executor_job(_oldest_states, hass)
        except Exception as err:  # noqa: BLE001 - recorder missing or schema differs: tell the panel instead of failing
            _LOGGER.warning("Recorder age query failed: %s", err)
            connection.send_error(msg["id"], "recorder_error", str(err))
            return
        cache = manager.age_cache = {"at": now, "oldest": oldest}
    connection.send_result(msg["id"], {"now": now, "oldest": cache["oldest"]})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/run_retention"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_run_retention(hass: HomeAssistant, connection, msg: dict[str, Any]) -> None:
    """Runs the retention job now (also when the nightly job is switched off)."""
    manager: Manager = hass.data[DOMAIN]
    await async_run_retention(hass, manager)
    connection.send_result(msg["id"], manager.payload(connection.refresh_token_id))


# ---------------------------------------------------------------- upload / download


async def _read_upload(request: web.Request, limit: int) -> tuple[str | None, bytes | None, web.Response | None]:
    reader = await request.multipart()
    field = await reader.next()
    if field is None:
        return None, None, web.json_response({"message": "No file"}, status=400)
    data = bytearray()
    while True:
        chunk = await field.read_chunk(1024 * 1024)
        if not chunk:
            break
        data.extend(chunk)
        if len(data) > limit:
            return None, None, web.json_response({"message": "File too large"}, status=413)
    if not data:
        return None, None, web.json_response({"message": "Empty file"}, status=400)
    return field.filename, bytes(data), None


def _admin_manager(request: web.Request, entity_id: str) -> tuple[Manager | None, web.Response | None]:
    user = request.get("hass_user")
    if user is None or not user.is_admin:
        return None, web.json_response({"message": "Admin required"}, status=403)
    if not ENTITY_RE.match(entity_id):
        return None, web.json_response({"message": "Invalid entity_id"}, status=400)
    return request.app["hass"].data[DOMAIN], None


class PhotoUploadView(HomeAssistantView):
    """POST /api/entity_inventory/upload/<entity_id> (admin only; JPEG / PNG / WebP)."""

    url = f"/api/{DOMAIN}/upload/{{entity_id}}"
    name = f"api:{DOMAIN}:upload"
    requires_auth = True

    async def post(self, request: web.Request, entity_id: str) -> web.Response:
        manager, err = _admin_manager(request, entity_id)
        if err:
            return err
        filename, data, err = await _read_upload(request, MAX_PHOTO_BYTES)
        if err:
            return err
        ext = _image_ext(data)
        if ext is None:
            return web.json_response({"message": "Only JPEG, PNG or WebP"}, status=415)
        photos = manager.data["photos"].setdefault(entity_id, [])
        if len(photos) >= MAX_FILES_PER_ENTITY:
            return web.json_response({"message": "Too many photos"}, status=409)
        stamp = dt_util.now().isoformat()[:19].replace("T", " ").replace(":", ".")
        base = _safe_name(filename.rsplit(".", 1)[0] if filename and "." in filename else filename, f"Foto {stamp}")
        rel = await request.app["hass"].async_add_executor_job(_write, manager, entity_id, f"{base}.{ext}", data)
        photo_id = secrets.token_urlsafe(16)
        photos.append({"id": photo_id, "ts": dt_util.utcnow().isoformat(), "path": rel, "ext": ext})
        manager.save()
        return web.json_response({"id": photo_id})


class DocUploadView(HomeAssistantView):
    """POST /api/entity_inventory/doc_upload/<entity_id> (admin only; any file up to the size limit)."""

    url = f"/api/{DOMAIN}/doc_upload/{{entity_id}}"
    name = f"api:{DOMAIN}:doc_upload"
    requires_auth = True

    async def post(self, request: web.Request, entity_id: str) -> web.Response:
        manager, err = _admin_manager(request, entity_id)
        if err:
            return err
        filename, data, err = await _read_upload(request, MAX_DOC_BYTES)
        if err:
            return err
        docs = manager.data["docs"].setdefault(entity_id, [])
        if len(docs) >= MAX_FILES_PER_ENTITY:
            return web.json_response({"message": "Too many documents"}, status=409)
        name = _safe_name(filename, "document")
        ext = re.sub(r"[^a-z0-9]", "", name.rsplit(".", 1)[-1].lower())[:8] if "." in name else ""
        rel = await request.app["hass"].async_add_executor_job(_write, manager, entity_id, name, data)
        doc_id = secrets.token_urlsafe(16)
        docs.append({"id": doc_id, "name": name, "ts": dt_util.utcnow().isoformat(), "ext": ext, "path": rel})
        manager.save()
        return web.json_response({"id": doc_id})


class PhotoServeView(HomeAssistantView):
    """GET /api/entity_inventory/photo/<id> (the panel uses signed URLs, which also work in <img> tags)."""

    url = f"/api/{DOMAIN}/photo/{{photo_id}}"
    name = f"api:{DOMAIN}:photo"
    requires_auth = True

    async def get(self, request: web.Request, photo_id: str) -> web.StreamResponse:
        hass: HomeAssistant = request.app["hass"]
        manager: Manager | None = hass.data.get(DOMAIN)
        item = manager.find("photos", photo_id) if manager and ID_RE.match(photo_id) else None
        if item is None:
            return web.Response(status=404)
        path = manager.location(item)
        if not await hass.async_add_executor_job(path.is_file):
            return web.Response(status=404)
        media = {"png": "image/png", "webp": "image/webp"}.get(item.get("ext", "jpg"), "image/jpeg")
        return web.FileResponse(path, headers={"Content-Type": media, "X-Content-Type-Options": "nosniff", "Cache-Control": "private, max-age=86400"})


class DocServeView(HomeAssistantView):
    """GET /api/entity_inventory/doc/<id>: PDFs and pictures open in the browser, everything else is downloaded."""

    url = f"/api/{DOMAIN}/doc/{{doc_id}}"
    name = f"api:{DOMAIN}:doc"
    requires_auth = True

    async def get(self, request: web.Request, doc_id: str) -> web.StreamResponse:
        hass: HomeAssistant = request.app["hass"]
        manager: Manager | None = hass.data.get(DOMAIN)
        doc = manager.find("docs", doc_id) if manager and ID_RE.match(doc_id) else None
        if doc is None:
            return web.Response(status=404)
        path = manager.location(doc)
        if not await hass.async_add_executor_job(path.is_file):
            return web.Response(status=404)
        ext = doc.get("ext", "")
        if ext in INLINE_EXT:
            headers = {"Content-Type": INLINE_EXT[ext], "Content-Disposition": "inline"}
        else:  # never rendered by the browser: no HTML / script / SVG can run from a stored file
            headers = {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename*=UTF-8''" + quote(doc.get("name") or f"document.{ext}"),
                "Content-Security-Policy": "sandbox",
            }
        headers.update({"X-Content-Type-Options": "nosniff", "Cache-Control": "private, max-age=86400"})
        return web.FileResponse(path, headers=headers)
