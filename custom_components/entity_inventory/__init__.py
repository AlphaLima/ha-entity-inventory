"""Entity Inventory: sidebar panel with all entities sorted by type.

Everything is computed live in the browser from the frontend's `hass` object
(states, entity / device / area registry), so the server does no work at all.
"""

from __future__ import annotations

import logging
from pathlib import Path

from aiohttp import web

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import HomeAssistantView
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN, PANEL_PATH, PANEL_URL

_LOGGER = logging.getLogger(__name__)
FRONTEND_DIR = Path(__file__).parent / "frontend"
FRONTEND_FILES = ("entity-inventory-panel.js",)


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
    hass.http.register_view(FrontendFileView)
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
    return True
