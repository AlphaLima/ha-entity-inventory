/* Entity Inventory sidebar panel: one tab per entity type (temperature, power, energy, covers, lights …).
   Everything is computed live in the browser from hass.states + the entity / device / area registry. */

const L10N = {
  en: {
    title: "Entity Inventory", tabsBtn: "Show or hide tabs", tabsShowAll: "Show all", tabsClose: "Close",
    gMeasure: "Measurements", gActors: "Actuators", gMore: "More",
    search: "Search (name, entity ID, area, device, integration …)", count: "Entities shown / in this tab",
    csv: "Export CSV", print: "Print / PDF", pause: "Pause live update", resume: "Resume live update",
    allAreas: "All areas", allInts: "All integrations", hidden: "Show hidden / disabled entities",
    copied: "Copied", hiddenShort: "hidden", none: "No entities in this tab.",
    c_led: "Status", c_name: "Name", c_id: "Entity ID", c_value: "Value", c_area: "Area", c_device: "Device",
    c_platform: "Integration", c_class: "Class", c_changed: "Changed", c_pos: "Position", c_tilt: "Slat angle",
    c_bright: "Brightness", c_cur: "Current", c_target: "Target", c_mode: "Mode", c_action: "Action", c_unit: "Unit",
    c_state: "State", c_sc: "State class", c_maker: "Manufacturer", c_model: "Model",
    on: "on", off: "off",
    ago: { s: "just now", m: "{n} min ago", h: "{n} h ago", d: "{n} d ago" },
    t: {
      all: "All entities", temperature: "Temperature", humidity: "Humidity", power: "Power", energy: "Energy",
      consumption: "Consumption", electric: "Voltage / current", battery: "Batteries",
      cover: "Covers", tilt: "Slats", light: "Lights", dimmer: "Dimmers", switch: "Switches", climate: "Thermostats",
      media: "Media", binary: "Binary sensors", presence: "Presence", auto: "Automations / scripts", helper: "Helpers",
      sensor: "Other sensors", unavailable: "Unavailable",
    },
    d: {
      all: "Every entity Home Assistant knows", temperature: "Sensors that measure a temperature", humidity: "Humidity sensors",
      power: "Momentary power (W, kW)", energy: "Energy counters (Wh, kWh)", consumption: "Gas, water, volume and everything named consumption",
      electric: "Voltage, current, frequency, power factor", battery: "Battery levels, the weakest first",
      cover: "Blinds, shutters, garage doors: position", tilt: "Covers with adjustable slats: slat angle",
      light: "All lights", dimmer: "Lights that can be dimmed", switch: "Switches, sockets and on/off helpers",
      climate: "Thermostats and heat pumps: current, target, mode", media: "TVs, speakers and other players",
      binary: "Motion, contact, window, smoke … sensors", presence: "Persons and device trackers",
      auto: "Automations, scripts and scenes", helper: "input_*, counters, timers, schedules", sensor: "Sensors that fit no measurement tab",
      unavailable: "Entities that are unavailable or unknown right now",
    },
  },
  de: {
    title: "Entitäten-Inventar", tabsBtn: "Tabs ein- oder ausblenden", tabsShowAll: "Alle anzeigen", tabsClose: "Schließen",
    gMeasure: "Messwerte", gActors: "Aktoren", gMore: "Weiteres",
    search: "Suche (Name, Entity-ID, Bereich, Gerät, Integration …)", count: "Angezeigte Entitäten / in diesem Tab",
    csv: "CSV exportieren", print: "Drucken / PDF", pause: "Live-Aktualisierung anhalten", resume: "Live-Aktualisierung fortsetzen",
    allAreas: "Alle Bereiche", allInts: "Alle Integrationen", hidden: "Versteckte / deaktivierte Entitäten zeigen",
    copied: "Kopiert", hiddenShort: "Versteckte", none: "Keine Entitäten in diesem Tab.",
    c_led: "Status", c_name: "Name", c_id: "Entity-ID", c_value: "Wert", c_area: "Bereich", c_device: "Gerät",
    c_platform: "Integration", c_class: "Klasse", c_changed: "Geändert", c_pos: "Position", c_tilt: "Lamellenwinkel",
    c_bright: "Helligkeit", c_cur: "Ist", c_target: "Soll", c_mode: "Modus", c_action: "Aktion", c_unit: "Einheit",
    c_state: "Zustand", c_sc: "State-Class", c_maker: "Hersteller", c_model: "Modell",
    on: "an", off: "aus",
    ago: { s: "gerade eben", m: "vor {n} Min", h: "vor {n} Std", d: "vor {n} T" },
    t: {
      all: "Alle Entitäten", temperature: "Temperatur", humidity: "Feuchte", power: "Leistung", energy: "Energie",
      consumption: "Verbrauch", electric: "Spannung / Strom", battery: "Batterien",
      cover: "Cover", tilt: "Lamellen", light: "Lichter", dimmer: "Dimmer", switch: "Schalter", climate: "Thermostate",
      media: "Medien", binary: "Binärsensoren", presence: "Anwesenheit", auto: "Automationen / Skripte", helper: "Helfer",
      sensor: "Sonstige Sensoren", unavailable: "Nicht verfügbar",
    },
    d: {
      all: "Jede Entität, die Home Assistant kennt", temperature: "Sensoren, die eine Temperatur messen", humidity: "Feuchtesensoren",
      power: "Momentanleistung (W, kW)", energy: "Energiezähler (Wh, kWh)", consumption: "Gas, Wasser, Volumen und alles, was Verbrauch heißt",
      electric: "Spannung, Strom, Frequenz, Leistungsfaktor", battery: "Batteriestände, die schwächsten zuerst",
      cover: "Raffstores, Rollläden, Garagentore: Position", tilt: "Cover mit verstellbaren Lamellen: Lamellenwinkel",
      light: "Alle Lichter", dimmer: "Lichter, die sich dimmen lassen", switch: "Schalter, Steckdosen und Ein/Aus-Helfer",
      climate: "Thermostate und Wärmepumpen: Ist, Soll, Modus", media: "Fernseher, Lautsprecher und andere Player",
      binary: "Bewegung, Kontakt, Fenster, Rauch … Sensoren", presence: "Personen und Geräte-Tracker",
      auto: "Automationen, Skripte und Szenen", helper: "input_*, Zähler, Timer, Zeitpläne", sensor: "Sensoren, die in keinen Mess-Tab passen",
      unavailable: "Entitäten, die gerade nicht verfügbar oder unbekannt sind",
    },
  },
};

// tab symbols (Material Design Icons, shown with ha-icon)
const MDI = {
  all: "mdi:format-list-bulleted-type", temperature: "mdi:thermometer", humidity: "mdi:water-percent", power: "mdi:flash",
  energy: "mdi:lightning-bolt-circle", consumption: "mdi:meter-electric-outline", electric: "mdi:sine-wave", battery: "mdi:battery-60",
  cover: "mdi:window-shutter", tilt: "mdi:blinds-horizontal", light: "mdi:lightbulb", dimmer: "mdi:lightbulb-on-50",
  switch: "mdi:toggle-switch", climate: "mdi:thermostat", media: "mdi:play-box-multiple", binary: "mdi:radiobox-marked",
  presence: "mdi:account-multiple", auto: "mdi:robot", helper: "mdi:tune-variant", sensor: "mdi:eye", unavailable: "mdi:alert-circle-outline",
};

// order and groups of the tabs
const GROUPS = [
  ["gMeasure", ["all", "temperature", "humidity", "power", "energy", "consumption", "electric", "battery"]],
  ["gActors", ["cover", "tilt", "light", "dimmer", "switch", "climate", "media"]],
  ["gMore", ["binary", "presence", "auto", "helper", "sensor", "unavailable"]],
];

// columns shown per tab (the first one is the sort default unless "sort" is given)
const BASE = ["led", "name", "id", "area", "device", "platform", "changed"];
const TABCOLS = {
  all: ["led", "name", "id", "value", "area", "device", "platform", "class", "changed"],
  temperature: ["led", "name", "id", "value", "area", "device", "platform", "changed"],
  humidity: ["led", "name", "id", "value", "area", "device", "platform", "changed"],
  power: ["led", "name", "id", "value", "area", "device", "platform", "changed"],
  energy: ["led", "name", "id", "value", "sc", "area", "device", "platform", "changed"],
  consumption: ["led", "name", "id", "value", "class", "sc", "area", "device", "platform", "changed"],
  electric: ["led", "name", "id", "value", "class", "area", "device", "platform", "changed"],
  battery: ["led", "name", "id", "value", "area", "device", "platform", "changed"],
  cover: ["led", "name", "id", "state", "pos", "tilt", "area", "device", "platform", "changed"],
  tilt: ["led", "name", "id", "state", "pos", "tilt", "area", "device", "platform", "changed"],
  light: ["led", "name", "id", "state", "bright", "area", "device", "platform", "changed"],
  dimmer: ["led", "name", "id", "state", "bright", "area", "device", "platform", "changed"],
  switch: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  climate: ["led", "name", "id", "mode", "cur", "target", "action", "area", "device", "platform", "changed"],
  media: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  binary: ["led", "name", "id", "state", "class", "area", "device", "platform", "changed"],
  presence: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  auto: ["led", "name", "id", "state", "platform", "changed"],
  helper: ["led", "name", "id", "value", "platform", "changed"],
  sensor: ["led", "name", "id", "value", "class", "area", "device", "platform", "changed"],
  unavailable: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
};
const SORT_DEFAULT = { battery: ["value", 1], unavailable: ["changed", 1], cover: ["area", 1], tilt: ["area", 1], light: ["area", 1], dimmer: ["area", 1] };

const OFFLINE = new Set(["unavailable", "unknown"]);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };

class EntityInventoryPanel extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (!this._built) {
      this._built = true;
      try { this._build(); } catch (e) { this._fail(e && e.message ? e.message : String(e)); return; }
      this._timer = setInterval(() => (this.isConnected ? this._tick() : clearInterval(this._timer)), 3000);
    }
    if (this._menu) this._menu.hass = hass;
    if (!this._dirty) { this._dirty = true; setTimeout(() => { this._dirty = false; this._refresh(); }, 400); } // many state changes arrive in bursts
  }
  set narrow(n) { this._narrow = n; if (this._menu) this._menu.narrow = n; }
  set panel(_p) {}
  set route(_r) {}

  get _L() { return L10N[(this._hass.language || "en").slice(0, 2)] || L10N.en; }

  _fail(msg) {
    const box = document.createElement("div");
    box.style.cssText = "padding:24px;max-width:640px;font:14px/1.5 sans-serif;color:var(--primary-text-color)";
    box.textContent = "Entity Inventory: " + msg;
    this.appendChild(box);
  }

  // ------------------------------------------------------------ data
  _collect() {
    const h = this._hass, st = h.states || {}, ent = h.entities || {}, dev = h.devices || {}, ar = h.areas || {};
    const rows = [];
    for (const id in st) {
      const s = st[id], a = s.attributes || {}, reg = ent[id] || {}, d = dev[reg.device_id] || null;
      const domain = id.slice(0, id.indexOf("."));
      const areaId = reg.area_id || (d && d.area_id) || null;
      rows.push({
        id, domain, s, a, state: s.state, dc: a.device_class || "", unit: a.unit_of_measurement || "", sc: a.state_class || "",
        name: a.friendly_name || id,
        device: d ? (d.name_by_user || d.name || "") : "",
        maker: d ? d.manufacturer || "" : "", model: d ? d.model || "" : "",
        area: areaId && ar[areaId] ? ar[areaId].name : "",
        platform: reg.platform || (domain === "sun" || domain === "zone" ? "core" : ""),
        hidden: !!reg.hidden || !!reg.disabled_by || reg.entity_category === "config",
        ts: Date.parse(s.last_changed) || 0,
        tabs: [],
      });
    }
    return rows;
  }

  // which tabs does an entity belong to
  _classify(e) {
    const t = e.tabs, dc = e.dc, d = e.domain, u = e.unit, nm = (e.name + " " + e.id).toLowerCase();
    if (OFFLINE.has(e.state)) t.push("unavailable");
    if (d === "sensor") {
      let hit = false;
      if (dc === "temperature" || (!dc && /^(°C|°F|K)$/.test(u))) { t.push("temperature"); hit = true; }
      if (dc === "humidity") { t.push("humidity"); hit = true; }
      if (["power", "apparent_power", "reactive_power"].includes(dc) || (!dc && /^(W|kW|mW|MW)$/.test(u))) { t.push("power"); hit = true; }
      if (dc === "energy" || (!dc && /^(Wh|kWh|MWh)$/.test(u))) { t.push("energy"); hit = true; }
      if (["gas", "water", "volume", "volume_flow_rate", "volume_storage"].includes(dc) || /verbrauch|consumption|durchfluss/.test(nm)) { t.push("consumption"); hit = true; }
      if (["voltage", "current", "frequency", "power_factor"].includes(dc)) { t.push("electric"); hit = true; }
      if (dc === "battery") { t.push("battery"); hit = true; }
      if (!hit) t.push("sensor");
    } else if (d === "binary_sensor") {
      t.push("binary");
      if (dc === "battery") t.push("battery");
    } else if (d === "cover") {
      t.push("cover");
      const sf = e.a.supported_features || 0;
      if (e.a.current_tilt_position !== undefined || (sf & 128) || (sf & 16)) t.push("tilt");
    } else if (d === "light") {
      t.push("light");
      const m = e.a.supported_color_modes;
      if (Array.isArray(m) ? m.some((x) => x !== "onoff") : e.a.brightness != null) t.push("dimmer");
    } else if (d === "switch" || d === "input_boolean") t.push("switch");
    else if (d === "climate" || d === "water_heater") t.push("climate");
    else if (d === "media_player") t.push("media");
    else if (d === "person" || d === "device_tracker") t.push("presence");
    else if (["automation", "script", "scene"].includes(d)) t.push("auto");
    else if (/^(input_|counter$|timer$|schedule$)/.test(d)) t.push("helper");
  }

  _valueText(e) {
    const h = this._hass;
    try { if (typeof h.formatEntityState === "function") return h.formatEntityState(e.s); } catch (x) { /* fallback */ }
    const n = num(e.state);
    return n !== null && e.unit ? `${Math.round(n * 100) / 100} ${e.unit}` : e.state;
  }

  _ago(ts) {
    const a = this._L.ago, sec = Math.max(0, (Date.now() - ts) / 1000);
    if (sec < 60) return a.s;
    if (sec < 3600) return a.m.replace("{n}", Math.floor(sec / 60));
    if (sec < 86400) return a.h.replace("{n}", Math.floor(sec / 3600));
    return a.d.replace("{n}", Math.floor(sec / 86400));
  }

  // value of a column: [display text, sort key]
  _cell(e, col) {
    const L = this._L;
    switch (col) {
      case "led": { const ok = !OFFLINE.has(e.state); return [`<span style="color:${ok ? "#2e7d32" : "#c62828"}">●</span>`, ok ? 1 : 0]; }
      case "name": return [esc(e.name), e.name.toLowerCase()];
      case "id": return [esc(e.id), e.id];
      case "value": { const t = this._valueText(e); return [esc(t), num(e.state) ?? t]; }
      case "state": { const t = this._valueText(e); return [esc(t), t]; }
      case "area": return [esc(e.area), e.area.toLowerCase()];
      case "device": return [esc(e.device), e.device.toLowerCase()];
      case "platform": return [esc(e.platform), e.platform];
      case "class": return [esc(e.dc), e.dc];
      case "sc": return [esc(e.sc), e.sc];
      case "maker": return [esc(e.maker), e.maker];
      case "model": return [esc(e.model), e.model];
      case "changed": return [`<span title="${esc(new Date(e.ts).toLocaleString())}">${esc(this._ago(e.ts))}</span>`, e.ts];
      case "pos": { const v = e.a.current_position; return [v == null ? "" : v + " %", v ?? -1]; }
      case "tilt": { const v = e.a.current_tilt_position; return [v == null ? "" : v + " %", v ?? -1]; }
      case "bright": { const v = e.a.brightness; if (v == null) return [e.state === "on" ? "" : "", -1]; const p = Math.round(v / 2.55); return [p + " %", p]; }
      case "cur": { const v = e.a.current_temperature; return [v == null ? "" : v + " °", v ?? -999]; }
      case "target": { const v = e.a.temperature; return [v == null ? "" : v + " °", v ?? -999]; }
      case "mode": { const t = this._valueText(e); return [esc(t), t]; }
      case "action": { const v = e.a.hvac_action || ""; return [esc(v), v]; }
    }
    return ["", ""];
  }

  // ------------------------------------------------------------ build
  _build() {
    const root = this.attachShadow({ mode: "open" });
    const st = document.createElement("style");
    st.textContent = `:host{display:block;height:100%;background:var(--primary-background-color);color:var(--primary-text-color)}
      .top{position:sticky;top:0;z-index:5;display:flex;align-items:flex-start;gap:4px;min-height:56px;padding:0 8px;box-sizing:border-box;
        background:var(--app-header-background-color,var(--secondary-background-color));color:var(--app-header-text-color,var(--primary-text-color));
        border-bottom:1px solid var(--divider-color)}
      .tabs{display:flex;flex-wrap:wrap;flex:1;min-width:0}
      .top>ha-menu-button{margin-top:4px}
      .tab{position:relative;display:flex;align-items:center;justify-content:center;min-width:56px;height:56px;padding:0 10px;box-sizing:border-box;
        cursor:pointer;border:none;background:transparent;color:inherit;opacity:.75;border-bottom:2px solid transparent;font:inherit}
      .sep{flex:none;width:1px;height:30px;margin:13px 6px;background:var(--divider-color,#888);opacity:.8}
      .tab:hover{opacity:1}.tab.on{opacity:1;color:var(--primary-color);border-bottom-color:var(--primary-color)}
      .tab ha-icon{--mdc-icon-size:24px}
      .tgl{flex:none;display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin-top:8px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:inherit}
      .tgl:hover{background:rgba(127,127,127,.15)}
      .badge{position:absolute;top:8px;right:2px;min-width:16px;height:16px;border-radius:8px;background:var(--error-color,#db4437);color:#fff;font-size:10px;line-height:16px;text-align:center;padding:0 3px}
      .body{padding:12px}
      ha-card{padding:4px 8px 6px;display:block}
      .wrap{overflow:auto;max-height:calc(100vh - 190px)}
      table{width:auto;border-collapse:collapse;font-size:12px}
      th{position:sticky;top:0;z-index:1;background:var(--card-background-color,#fff);text-align:left;padding:3px 4px;border-bottom:2px solid var(--divider-color,#888);cursor:pointer;user-select:none;white-space:nowrap}
      th:hover{color:var(--primary-color)}
      td{padding:2px 4px;line-height:1.3;border-bottom:1px solid var(--divider-color,#444);white-space:nowrap;max-width:420px;overflow:hidden;text-overflow:ellipsis}
      tr:hover td{background:rgba(127,127,127,.08)}
      td[data-col=name]{cursor:pointer}td[data-col=name]:hover{color:var(--primary-color)}
      td[data-col=id]{cursor:copy;opacity:.8}
      td[data-col=value],th[data-col=value],td[data-col=pos],td[data-col=tilt],td[data-col=bright],td[data-col=cur],td[data-col=target]{text-align:right}
      button,select{cursor:pointer;padding:4px 10px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font-size:13px}
      select{max-width:200px;padding:4px 6px}
      .bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 4px}.dim{opacity:.65;font-size:12px}
      .ib{display:inline-flex;align-items:center;padding:4px 9px}
      .none{padding:20px;opacity:.6}`;
    const top = document.createElement("div"); top.className = "top";
    this._menu = document.createElement("ha-menu-button");
    this._menu.hass = this._hass; this._menu.narrow = this._narrow;
    this._tabs = document.createElement("div"); this._tabs.className = "tabs";
    try { this._off = new Set(JSON.parse(localStorage.getItem("eiTabsOff") || "[]")); } catch (e) { this._off = new Set(); }
    const tcfg = document.createElement("button"); tcfg.className = "tgl"; tcfg.title = this._L.tabsBtn;
    tcfg.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".7"><path d="M3 6l1.6 1.6L7.5 4.5M3 13l1.6 1.6L7.5 11.5M3 20l1.6 1.6L7.5 18.5M11 6h10M11 13h10M11 20h10"/></svg>';
    tcfg.onclick = () => this._tabsDialog();
    top.append(this._menu, this._tabs, tcfg);
    this._body = document.createElement("div"); this._body.className = "body";
    root.append(st, top, this._body);
    this._active = "all";
    try { this._active = localStorage.getItem("eiTab") || "all"; } catch (e) { /* ignore */ }
    this._sort = {}; this._q = ""; this._area = ""; this._int = ""; this._showHidden = false; this._paused = false;
    this._buildCard();
  }

  _buildCard() {
    const L = this._L;
    this._body.innerHTML = "";
    const card = document.createElement("ha-card");
    const head = document.createElement("div");
    head.style.cssText = "font-size:16px;font-weight:600;margin:2px 2px 4px;display:flex;align-items:center;gap:8px";
    this._hico = document.createElement("ha-icon"); this._hico.style.cssText = "--mdc-icon-size:22px";
    this._htxt = document.createElement("span");
    head.append(this._hico, this._htxt);
    const bar = document.createElement("div"); bar.className = "bar";
    const mkBtn = (svg, title, fn) => { const b = document.createElement("button"); b.className = "ib"; b.title = title; b.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${svg}"/></svg>`; b.onclick = fn; return b; };
    const pb = mkBtn("M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z", L.print, () => this._print());
    const cb = mkBtn("M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z", L.csv, () => this._csv());
    this._pauseB = mkBtn("M6 19h4V5H6v14zm8-14v14h4V5h-4z", L.pause, () => {
      this._paused = !this._paused;
      this._pauseB.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${this._paused ? "M8 5v14l11-7z" : "M6 19h4V5H6v14zm8-14v14h4V5h-4z"}"/></svg>`;
      this._pauseB.title = this._paused ? L.resume : L.pause;
      this._pauseB.style.background = this._paused ? "var(--warning-color,#ffa000)" : ""; this._pauseB.style.color = this._paused ? "#fff" : "";
      if (!this._paused) this._refresh(true);
    });
    this._cnt = document.createElement("span"); this._cnt.className = "dim"; this._cnt.title = L.count;
    const qi = document.createElement("input");
    qi.type = "search"; qi.placeholder = L.search; qi.title = L.search; qi.value = this._q;
    qi.style.cssText = "padding:4px 8px;width:220px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font-size:13px";
    qi.oninput = () => { this._q = qi.value; clearTimeout(this._qt); this._qt = setTimeout(() => this._render(), 160); };
    qi.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === "Escape" && qi.value) { qi.value = ""; qi.oninput(); } };
    this._selArea = document.createElement("select"); this._selArea.onchange = () => { this._area = this._selArea.value; this._render(); };
    this._selInt = document.createElement("select"); this._selInt.onchange = () => { this._int = this._selInt.value; this._render(); };
    const hl = document.createElement("label"); hl.className = "dim"; hl.style.cssText = "display:inline-flex;align-items:center;gap:4px;cursor:pointer"; hl.title = L.hidden;
    const hc = document.createElement("input"); hc.type = "checkbox"; hc.checked = this._showHidden;
    hc.onchange = () => { this._showHidden = hc.checked; this._render(); };
    hl.append(hc, document.createTextNode(L.hiddenShort));
    bar.append(pb, cb, this._pauseB, this._cnt, qi, this._selArea, this._selInt, hl);
    this._wrap = document.createElement("div"); this._wrap.className = "wrap";
    this._wrap.onclick = (ev) => this._click(ev);
    card.append(head, bar, this._wrap);
    this._body.appendChild(card);
  }

  _tick() { if (!this._paused) this._refresh(); }

  // recompute everything; re-render only if something changed (or every 30 s for the "changed" column)
  _refresh(force) {
    if (!this._hass || !this._tabs) return;
    const rows = this._collect();
    rows.forEach((e) => this._classify(e));
    this._rows = rows;
    const sig = rows.length + ":" + rows.reduce((a, e) => a + Date.parse(e.s.last_updated), 0) + ":" + rows.filter((e) => OFFLINE.has(e.state)).length + ":" + this._showHidden;
    const now = Date.now();
    this._counts = { all: { n: 0, off: 0 } };
    rows.forEach((e) => {
      if (e.hidden && !this._showHidden) return;
      const off = OFFLINE.has(e.state);
      this._counts.all.n++; if (off) this._counts.all.off++;
      e.tabs.forEach((k) => { const c = (this._counts[k] = this._counts[k] || { n: 0, off: 0 }); c.n++; if (off) c.off++; });
    });
    this._drawTabs();
    if (force || sig !== this._sig || now - (this._lastRender || 0) > 30000) { this._sig = sig; this._render(); }
  }

  _label(k) { return this._L.t[k] || k; }

  _drawTabs() {
    const L = this._L, c = this._counts;
    const keys = GROUPS.flatMap(([, ks]) => ks).filter((k) => k === "all" || (c[k] && c[k].n > 0));
    this._keys = keys;
    const shown = keys.filter((k) => k === "all" || !this._off.has(k));
    if (!shown.includes(this._active)) this._active = "all";
    const sigT = shown.join() + "|" + shown.map((k) => (c[k] ? c[k].off : 0)).join() + "|" + this._active;
    if (sigT === this._sigT) return;
    this._sigT = sigT;
    this._tabs.innerHTML = "";
    let prevG = null;
    shown.forEach((k) => {
      const g = GROUPS.findIndex(([, ks]) => ks.includes(k));
      if (prevG !== null && g !== prevG) { const sp = document.createElement("span"); sp.className = "sep"; this._tabs.appendChild(sp); }
      prevG = g;
      const b = document.createElement("button"); b.className = "tab" + (k === this._active ? " on" : "");
      b.title = `${this._label(k)} (${c[k] ? c[k].n : 0})\n${L.d[k] || ""}`;
      const i = document.createElement("ha-icon"); i.setAttribute("icon", MDI[k] || "mdi:eye"); b.appendChild(i);
      if (c[k] && c[k].off && k !== "unavailable") { const bd = document.createElement("span"); bd.className = "badge"; bd.textContent = c[k].off; b.appendChild(bd); }
      b.onclick = () => this._select(k);
      this._tabs.appendChild(b);
    });
  }

  _select(k) {
    this._active = k; this._area = ""; this._int = "";
    try { localStorage.setItem("eiTab", k); } catch (e) { /* ignore */ }
    this._sigT = null; this._drawTabs(); this._render();
    this._wrap.scrollTop = 0;
  }

  // entities of the active tab after search / filters
  _filtered() {
    const k = this._active, q = this._q.trim().toLowerCase();
    return (this._rows || []).filter((e) => {
      if (e.hidden && !this._showHidden) return false;
      if (k !== "all" && !e.tabs.includes(k)) return false;
      if (this._area && e.area !== this._area) return false;
      if (this._int && e.platform !== this._int) return false;
      if (q && !(`${e.name} ${e.id} ${e.area} ${e.device} ${e.platform} ${e.dc} ${e.state} ${e.maker} ${e.model}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }

  _cols() { return TABCOLS[this._active] || BASE; }

  _sorted(list) {
    const k = this._active, cols = this._cols();
    let [col, dir] = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
    if (!cols.includes(col)) { col = "name"; dir = 1; }
    const keyOf = (e) => this._cell(e, col)[1];
    const withKey = list.map((e) => [e, keyOf(e)]);
    withKey.sort((x, y) => {
      const a = x[1], b = y[1];
      const ea = a === "" || a === null, eb = b === "" || b === null;
      if (ea !== eb) return ea ? 1 : -1; // empty values always last
      if (typeof a === "number" && typeof b === "number") return (a - b) * dir || x[0].id.localeCompare(y[0].id);
      return String(a).localeCompare(String(b), undefined, { numeric: true }) * dir || x[0].id.localeCompare(y[0].id);
    });
    return withKey.map((x) => x[0]);
  }

  _render() {
    if (!this._wrap) return;
    this._lastRender = Date.now();
    const L = this._L, k = this._active;
    this._hico.setAttribute("icon", MDI[k] || "mdi:eye");
    this._htxt.textContent = this._label(k);
    // area / integration selectors follow the tab (all values that exist in it)
    const inTab = (this._rows || []).filter((e) => (!e.hidden || this._showHidden) && (k === "all" || e.tabs.includes(k)));
    const fill = (sel, vals, all, cur) => {
      const key = vals.join("\u0001") + "|" + cur;
      if (sel._key === key) return; sel._key = key;
      sel.innerHTML = ""; const o0 = document.createElement("option"); o0.value = ""; o0.textContent = all; sel.appendChild(o0);
      vals.forEach((v) => { const o = document.createElement("option"); o.value = v; o.textContent = v; sel.appendChild(o); });
      sel.value = cur;
    };
    fill(this._selArea, [...new Set(inTab.map((e) => e.area).filter(Boolean))].sort((a, b) => a.localeCompare(b)), L.allAreas, this._area);
    fill(this._selInt, [...new Set(inTab.map((e) => e.platform).filter(Boolean))].sort(), L.allInts, this._int);

    const list = this._sorted(this._filtered());
    this._list = list;
    this._cnt.textContent = `Σ ${list.length}${list.length !== inTab.length ? "/" + inTab.length : ""}`;
    const cols = this._cols();
    const [sc, sd] = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
    const prevTop = this._wrap.scrollTop, prevLeft = this._wrap.scrollLeft;
    if (!list.length) { this._wrap.innerHTML = `<div class="none">${esc(L.none)}</div>`; return; }
    const th = cols.map((c) => `<th data-col="${c}" title="${esc(L["c_" + c] || c)}">${c === "led" ? "●" : esc(L["c_" + c] || c)}${c === sc ? (sd > 0 ? " ▲" : " ▼") : ""}</th>`).join("");
    const parts = [`<table><thead><tr><th>#</th>${th}</tr></thead><tbody>`];
    list.forEach((e, i) => {
      parts.push(`<tr data-id="${esc(e.id)}"><td class="dim">${i + 1}</td>${cols.map((c) => `<td data-col="${c}">${this._cell(e, c)[0]}</td>`).join("")}</tr>`);
    });
    parts.push("</tbody></table>");
    this._wrap.innerHTML = parts.join("");
    this._wrap.scrollTop = prevTop; this._wrap.scrollLeft = prevLeft;
  }

  _click(ev) {
    const th = ev.target.closest("th[data-col]");
    if (th) {
      const k = this._active, c = th.dataset.col, cur = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
      this._sort[k] = [c, cur[0] === c ? -cur[1] : 1];
      this._render(); return;
    }
    const td = ev.target.closest("td[data-col]"), tr = ev.target.closest("tr[data-id]");
    if (!td || !tr) return;
    const id = tr.dataset.id;
    if (td.dataset.col === "id") {
      try { navigator.clipboard.writeText(id); } catch (e) { /* ignore */ }
      const old = td.textContent; td.textContent = this._L.copied; setTimeout(() => { td.textContent = old; }, 700);
    } else if (td.dataset.col === "name") {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: id } }));
    }
  }

  // ------------------------------------------------------------ export / print
  _tableData() {
    const L = this._L, cols = this._cols().filter((c) => c !== "led");
    const strip = (h) => String(h).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    return {
      head: cols.map((c) => L["c_" + c] || c),
      rows: (this._list || []).map((e) => cols.map((c) => c === "changed" ? new Date(e.ts).toLocaleString() : strip(this._cell(e, c)[0]))),
    };
  }

  _csv() {
    const { head, rows } = this._tableData();
    const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = "﻿" + [head, ...rows].map((r) => r.map(q).join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `entity-inventory-${this._active}.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  _print() {
    const { head, rows } = this._tableData();
    const w = window.open("", "_blank");
    if (!w) return;
    const tr = (cells, tag) => `<tr>${cells.map((c) => `<${tag}>${esc(c)}</${tag}>`).join("")}</tr>`;
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${esc(this._label(this._active))}</title><style>
      @page{size:A4 landscape;margin:8mm 8mm 12mm;@bottom-right{content:counter(page) "/" counter(pages);font:8pt Arial,sans-serif;color:#444}}
      body{font:8pt Arial,sans-serif;color:#000}h1{font-size:12pt;margin:0 0 4px}
      table{border-collapse:collapse;width:100%}th{text-align:left;border-bottom:1.5px solid #000;padding:2px 3px}td{border-bottom:.5px solid #999;padding:1.5px 3px;white-space:nowrap}
      thead{display:table-header-group}tr{break-inside:avoid}</style></head><body>
      <h1>${esc(this._label(this._active))} – ${rows.length}</h1><table><thead>${tr(head, "th")}</thead><tbody>${rows.map((r) => tr(r, "td")).join("")}</tbody></table>
      <script>setTimeout(()=>print(),300)<\/script></body></html>`);
    w.document.close();
  }

  // ------------------------------------------------------------ tabs dialog
  _tabsDialog() {
    const L = this._L, ov = document.createElement("div");
    ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center";
    const bx = document.createElement("div");
    bx.style.cssText = "background:var(--card-background-color,#fff);color:var(--primary-text-color,#000);border-radius:12px;padding:16px;width:min(680px,94vw);max-height:85vh;overflow:auto;box-shadow:0 8px 32px rgba(0,0,0,.4);font-family:var(--ha-font-family-body,Roboto,sans-serif)";
    const close = () => { ov.remove(); document.removeEventListener("keydown", kd, true); };
    const kd = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", kd, true);
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
    const h = document.createElement("div"); h.style.cssText = "font-weight:600;font-size:16px;margin-bottom:10px"; h.textContent = L.tabsBtn; bx.appendChild(h);
    const save = () => { try { localStorage.setItem("eiTabsOff", JSON.stringify([...this._off])); } catch (e) { /* ignore */ } this._sigT = null; this._drawTabs(); };
    const rows = [];
    GROUPS.forEach(([gk, ks]) => {
      const present = ks.filter((k) => this._keys && this._keys.includes(k));
      if (!present.length) return;
      const g = document.createElement("div"); g.style.cssText = "font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;opacity:.65;margin:12px 0 4px"; g.textContent = L[gk]; bx.appendChild(g);
      const list = document.createElement("div"); list.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2px 8px"; bx.appendChild(list);
      present.forEach((k) => {
        const lab = document.createElement("label"); lab.style.cssText = "display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:8px;cursor:pointer";
        const cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = k === "all" || !this._off.has(k); cb.disabled = k === "all";
        cb.onchange = () => { if (cb.checked) this._off.delete(k); else this._off.add(k); save(); };
        const ic = document.createElement("span"); ic.style.cssText = "display:inline-flex;justify-content:center;width:44px;flex:none";
        const i = document.createElement("ha-icon"); i.setAttribute("icon", MDI[k]); i.style.setProperty("--mdc-icon-size", "24px"); ic.appendChild(i);
        const nm = document.createElement("span"); nm.style.cssText = "flex:1;min-width:0";
        const nt = document.createElement("div"); nt.textContent = this._label(k);
        const nd = document.createElement("div"); nd.style.cssText = "font-size:11px;opacity:.6;line-height:1.25;margin-top:1px"; nd.textContent = L.d[k] || "";
        nm.append(nt, nd);
        const n = document.createElement("span"); n.style.cssText = "opacity:.6;font-size:12px"; n.textContent = this._counts[k] ? this._counts[k].n : "";
        lab.append(cb, ic, nm, n); list.appendChild(lab); rows.push(cb);
      });
    });
    const ft = document.createElement("div"); ft.style.cssText = "display:flex;gap:8px;justify-content:flex-end;margin-top:14px";
    const btn = (txt, primary) => { const b = document.createElement("button"); b.textContent = txt; b.style.cssText = `padding:8px 16px;border-radius:8px;font-size:14px;cursor:pointer;border:1px solid var(--divider-color,#888);${primary ? "background:var(--primary-color,#03a9f4);color:#fff;border-color:transparent" : "background:transparent;color:inherit"}`; return b; };
    const all = btn(L.tabsShowAll), ok = btn(L.tabsClose, true);
    all.onclick = () => { this._off.clear(); rows.forEach((cb) => { cb.checked = true; }); save(); };
    ok.onclick = close;
    ft.append(all, ok); bx.appendChild(ft); ov.appendChild(bx);
    (this.shadowRoot || document.body).appendChild(ov);
  }
}

if (!customElements.get("entity-inventory-panel")) {
  customElements.define("entity-inventory-panel", EntityInventoryPanel);
}
