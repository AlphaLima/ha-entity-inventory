/* Entity Inventory sidebar panel: one tab per entity type (temperature, power, energy, covers, lights …).
   Everything is computed live in the browser from hass.states + the entity / device / area registry. */

const L10N = {
  en: {
    scTitle: "State class",
    scNone: "none (no state class)",
    scMeasurement: "measurement: a momentary value that goes up and down, e.g. temperature, power, humidity.",
    scTotal: "total: a counter that can also go down, e.g. a meter with a reset or a balance.",
    scTotalInc: "total_increasing: a counter that only goes up (and starts again at 0), e.g. energy in kWh, gas, water.",
    scStatsBusy: "Checking the long-term statistics …",
    scStatsYes: "Long-term statistics exist for this entity ({what}, unit {unit}, source {src}). Home Assistant keeps them in hourly values for the Energy dashboard and history charts.",
    scStatsNo: "No long-term statistics: only entities with a state class (and a unit) get them. Without them only the single value history is kept, and it is deleted after the recorder retention.",
    scStatsFail: "The long-term statistics could not be read.",
    scChange: "Can it be changed? Not here and not in the entity settings of Home Assistant: the integration that delivers the sensor decides. Exceptions: in configuration.yaml with customize (state_class:), and for template helpers you create yourself.",
    scRecNote: "The retention of Entity Inventory shortens only the single value history of an entity. The long-term statistics stay untouched.",
    scDevTools: "Developer tools → Statistics",
    scTip: "State class of the entity (click for an explanation)",
    c_recupd: "Last report",
    recUpdTip: "The time of the last report of the entity (last_updated, what the recorder stores) – also when only an attribute changed or the same value was reported again",
    recColsTip: "Show the recorder columns (stored for, entries, average interval) (highlighted = shown)",
    c_recrows: "Entries",
    c_recint: "Avg. interval",
    retStats: "Entries in the recorder: {rows} · about {perday} per day · average interval {int}",
    retStatsTip: "Entries in the recorder: {rows} (about {perday} per day), average interval between two entries: {int}",
    blurTip: "Blur sensitive data (user IDs, user names, trackers, persons, comments) e.g. for screenshots (highlighted = on)",
    title: "Entity Inventory", tabsBtn: "Show or hide tabs", tabsShowAll: "Show all", tabsClose: "Close",
    gLight: "All and light", gElectro: "Electrical", gClimate: "Climate", gCover: "Blinds", gUsage: "Consumption", gAuto: "Automation", gMore: "More",
    search: "Search (name, entity ID, area, device, integration …)", count: "Entities shown / in this tab",
    csv: "Export CSV", print: "Print / PDF", pause: "Pause live update", resume: "Resume live update",
    allAreas: "All areas", allInts: "All integrations", hidden: "Show hidden / disabled entities (highlighted = shown)",
    retSince: "Stored in the recorder since: {t} ({n} days)", retSinceNone: "No history stored in the recorder.", retSinceFail: "Age of the history could not be read.", retSinceBusy: "Reading the age of the history …",
    retShort: "{n} d", retRule: "rule: {n} d", retErr: "The recorder query failed: {e}",
    retGlobal: "The recorder keeps the history of all entities for {n} days (purge_keep_days).", retGlobalUnknown: "The global retention of the recorder could not be read (is the recorder running?).",
    retMax: "Maximum (never shorten)", retRuleNone: "No own rule: this entity is not trimmed by Entity Inventory{d}.", retRuleDefault: " – the default retention of {n} days applies to it",
    retRuleMax: "Never shortened by Entity Inventory: the history stays as long as the recorder keeps it ({g} days).", retRuleShort: "History of this entity that is older than {n} days is deleted every night (only while the nightly job is on).",
    retRuleSame: "This equals the recorder's own retention of {g} days, so the rule changes nothing.",
    retRuleLong: "The recorder deletes history after {g} days. This rule cannot keep more than that until the recorder setting is raised (see below).",
    retLongerTitle: "To keep data longer than {g} days:",
    retLonger1: "1. Open configuration.yaml and set purge_keep_days in the recorder: block to the longest time you need (here {n}). If a recorder: block already exists, change only that line – do not add a second block.",
    retLonger2: "2. Restart Home Assistant (Settings → System → Restart). The recorder reads this setting only at start; Entity Inventory cannot change it.",
    retLonger3: "3. Afterwards every entity is kept that long by default. To keep the rest shorter, set a default retention below: then only entities with a longer rule keep their history that long.",
    retLonger4: "Note: a longer retention makes the database bigger, roughly in proportion to the days.", retYamlCopy: "Copy the YAML lines", retYamlCopied: "Copied.",
    retAllTitle: "For all entities", retDefaultLabel: "Default retention for all entities without an own rule (days, empty = none)", retDefaultSave: "Save default",
    retDefaultHelp: "Example: the recorder keeps 365 days and the default is 30: every entity without a rule is trimmed to 30 days at night, entities with a rule of 365 keep everything. Without a default only entities with a rule are trimmed. Warning: the default applies to EVERY entity in the database, not only to the ones shown here.",
    retPreviewBtn: "Preview", retPvTitle: "What the nightly job would delete", retPvGroup: "• {days} days: {entities} entities, about {rows} history rows older than that", retPvNone: "Nothing would be deleted right now.",
    retPvTotal: "Total: about {rows} history rows of {entities} entities.", retPvSkipped: "{n} entities are skipped because their retention is not shorter than the recorder's own {g} days.",
    retPvHow: "What the job does: it calls the Home Assistant service recorder.purge_entities once per group of days. It deletes only the single value history (states) of these entities that is older than the number of days. It does NOT delete the long-term statistics (energy dashboard, hourly values), it does not stop recording, and new values are stored as usual. Deleted history cannot be restored, except from a backup.",
    retPvFail: "The preview failed: {e}", retPvBusy: "Counting – on a large database this can take a few seconds …",
    retEnableTitle: "Switch on the nightly retention job?", retEnableText: "From now on the job runs every night at 03:20 and deletes history that is older than the retention of its entity (own rule, else the default). It also does this for entities you do not see in this table.",
    retDefaultConfirmTitle: "Set the default retention?", retDefaultConfirmText: "From now on every entity without an own rule counts as: keep {n} days. That is every entity the recorder has history for, not only one tab. It only takes effect while the nightly job is on (or when you run it by hand).",
    retDefaultOff: "The default retention is removed. Entities without an own rule are no longer trimmed by Entity Inventory.", retConfirmOn: "Switch on", retDeleteNow: "Delete now", retSave: "Save", retRunTitle: "Delete history now?",
    c_retention: "Stored for (days, recorder)", retTitle: "Recorder – retention", retBtn: "Recorder", retTip: "Recorder retention of this entity: click opens the dialog, Shift+click types the number of days right here",
    retIntro: "History of this entity (the recorder database) older than the chosen number of days is deleted every night. A rule can only shorten the global retention of the recorder (purge_keep_days), it cannot keep data longer.",
    retNone: "No rule (recorder default)", retDays: "{n} days", retCustom: "Other number of days", retJob: "Run the nightly retention job (03:20) for all entities with a rule or the default", retRules: "{n} entities with a rule",
    retRunNow: "Run now", retRunAsk: "This deletes history in the recorder database now. It cannot be undone.", retLast: "Last run: {t}", retDone: "Done: {n} entities processed.", retFail: "The recorder reported an error: {e}", retNoRec: "The recorder is not available.", retAdmin: "Only administrators can change the recorder retention.", retNever: "never",
    copied: "Copied", wideTip: "Wider row spacing (highlighted = on)", hideOff: "Hide unavailable / unknown entities (highlighted = hidden)", none: "No entities in this tab.",
    c_led: "Status", c_name: "Name", c_id: "Entity ID", c_value: "Value", c_area: "Area", c_device: "Device",
    labelTitle: "Label", labelName: "Name", labelIcon: "Icon (e.g. mdi:tag)", labelColor: "Colour", labelDesc: "Description", labelEntities: "Entities with this label", labelManage: "Label settings", labelCount: "{n} entities in this tab / {m} in total", labelFail: "Saving failed", labelNone: "none", c_labels: "Labels", allLabels: "All labels", noLabel: "Without label", c_platform: "Integration", c_class: "Class", c_changed: "Changed", c_pos: "Position", c_tilt: "Slat angle",
    c_bright: "Brightness", c_cur: "Current", c_target: "Target", c_mode: "Mode", c_action: "Action", c_unit: "Unit",
    c_state: "State", onlyNotes: "Only entries with a comment and/or photo (highlighted = active)", cfgBtn: "Edit columns (display and printer)", tgtView: "Display", tgtPrint: "Printer", autoTip: "Fit the column widths to the widest content", resetTip: "Reset the layout", resetAsk: "Reset the column layout to the default?", doneTip: "Done", renameTip: "Column name (empty = default)", stand: "As of", entities: "entities", printFail: "Printing failed", portrait: "Print: portrait (click: landscape)", landscape: "Print: landscape (click: portrait)", showBadges: "Show the red numbers on the tabs (unavailable entities)", hideBadges: "Hide the red numbers on the tabs", copyTip: "Copy the entity ID", copyNameTip: "Copy the name", copyValueTip: "Copy the value", editConfirmName: "Change the name?\n\n{old}\n→ {new}", editConfirmId: "Change the entity ID?\n\n{old}\n→ {new}\n\nAutomations, scripts and dashboards that use the old ID must be adjusted.", idLabel: "Entity ID", idWarn: "Automations, scripts, dashboards and templates that use the old ID are NOT changed by Home Assistant here – check them afterwards.", idInvalid: "Invalid entity ID. It must keep the domain and use only a-z, 0-9 and _ (e.g. {d}.name).", alignDec: "Values aligned by the decimal separator (click: left)", alignLeft: "Values left-aligned (click: right)", alignRight: "Values right-aligned (click: by decimal separator)", nameTitle: "Rename entity", nameLabel: "Name", nameHintDev: "Home Assistant puts the device name in front: \"{dev}\"", nameDefault: "Default name: {n}", nameReset: "Reset to default", nameDetails: "History / details", nameFail: "Saving failed", nameNoReg: "This entity has no unique ID, so it is not in the entity registry and cannot be renamed here.", nameAdmin: "Only administrators can rename entities.", c_icon: "Icon", iconTip: "Change the icon (opens the settings of the entity)", iconNoReg: "The icon of this entity cannot be changed: it has no unique ID, so it is not in the entity registry.", iconAdmin: "Only administrators can change the icon.", c_access: "r/w", accessTip: { r: "r = read only (measured or reported value)", w: "w = write only (trigger without a state of its own)", rw: "rw = readable and controllable" }, c_photos: "Photos", c_docs: "Documents", c_note: "Comment",
    photosTitle: "Photos", addPhotos: "Add photos", docsTitle: "Documents", addDocs: "Add documents", noteTitle: "Comment", save: "Save", cancel: "Cancel", del: "Delete", rename: "Rename", renamePrompt: "New name", confirmDel: "Really delete {name}?",
    uploadFail: "Upload failed", noPhotos: "No photos yet.", noDocs: "No documents yet (e.g. electricity contract, gas contract, photo of the meter).", notePh: "Comment (location, fuse, contract number …)", c_trackers: "Trackers", c_source: "Source", c_username: "Username", c_person: "Person", c_role: "Role", c_provider: "Login method", c_local: "Local only", c_system: "System account", c_userid: "User ID", c_active: "Active", yes: "✓", no: "–", c_sc: "State class", c_maker: "Manufacturer", c_model: "Model",
    on: "on", off: "off", roleOwner: "Owner", roleRead: "Read-only",
    ago: { s: "just now", m: "{n} min ago", h: "{n} h ago", d: "{n} d ago" },
    t: {
      all: "All entities", illuminance: "Brightness", temperature: "Temperature", humidity: "Humidity", power: "Power", energy: "Energy",
      consumption: "Consumption", voltage: "Voltage", frequency: "Frequency", current: "Current", battery: "Batteries",
      cover: "Covers", tilt: "Slats", light: "Lights", dimmer: "Dimmers", switch: "Switches", climate: "Thermostats",
      media: "Media", person: "Persons", users: "User accounts", binary: "Binary sensors", presence: "Trackers", scene: "Scenes", labels: "Labels", auto: "Automations / scripts", helper: "Helpers",
      sensor: "Other sensors", unavailable: "Unavailable",
    },
    d: {
      all: "Every entity Home Assistant knows", illuminance: "Brightness sensors (lux)", temperature: "Sensors that measure a temperature", humidity: "Humidity sensors",
      power: "Momentary power (W, kW)", energy: "Energy counters (Wh, kWh)", consumption: "Gas, water, volume and everything named consumption",
      voltage: "Voltage sensors (V, mV, kV)", frequency: "Frequency sensors (Hz)", current: "Current and power factor (A, mA)", battery: "Battery levels, the weakest first",
      cover: "Blinds, shutters, garage doors: position", tilt: "Covers with adjustable slats: slat angle",
      light: "All lights", dimmer: "Lights that can be dimmed", switch: "Switches, sockets and on/off helpers",
      climate: "Thermostats and heat pumps: current, target, mode", media: "TVs, speakers and other players",
      binary: "Motion, contact, window, smoke … sensors", person: "Persons with their trackers and linked login", users: "Login accounts of Home Assistant (needs admin rights)", presence: "Device trackers",
      scene: "Scenes with their last activation", labels: "Every entity that has at least one label", auto: "Automations and scripts", helper: "input_*, counters, timers, schedules and the helper integrations (group, threshold, utility meter, statistics …)", sensor: "Sensors that fit no measurement tab",
      unavailable: "Entities that are unavailable or unknown right now",
    },
  },
  de: {
    scTitle: "Statusklasse",
    scNone: "keine (keine Statusklasse)",
    scMeasurement: "measurement: ein Momentwert, der steigt und fällt, z. B. Temperatur, Leistung, Luftfeuchte.",
    scTotal: "total: ein Zähler, der auch sinken kann, z. B. ein Zähler mit Rücksetzung oder ein Saldo.",
    scTotalInc: "total_increasing: ein Zähler, der nur steigt (und wieder bei 0 beginnt), z. B. Energie in kWh, Gas, Wasser.",
    scStatsBusy: "Prüfe die Langzeitstatistik …",
    scStatsYes: "Für diese Entität gibt es Langzeitstatistiken ({what}, Einheit {unit}, Quelle {src}). Home Assistant bewahrt sie als Stundenwerte für das Energie-Dashboard und die Verlaufsgrafiken auf.",
    scStatsNo: "Keine Langzeitstatistik: Nur Entitäten mit einer Statusklasse (und einer Einheit) bekommen sie. Ohne sie bleibt nur der Verlauf der Einzelwerte, und der wird nach der Aufbewahrung des Recorders gelöscht.",
    scStatsFail: "Die Langzeitstatistik konnte nicht gelesen werden.",
    scChange: "Lässt sich das ändern? Nicht hier und auch nicht in den Entitäts-Einstellungen von Home Assistant: Das bestimmt die Integration, die den Sensor liefert. Ausnahmen: in der configuration.yaml mit customize (state_class:) und bei Template-Helfern, die du selbst anlegst.",
    scRecNote: "Die Aufbewahrung im Entity Inventory kürzt nur den Verlauf der Einzelwerte einer Entität. Die Langzeitstatistik bleibt unberührt.",
    scDevTools: "Entwicklerwerkzeuge → Statistiken",
    scTip: "Statusklasse der Entität (Klick: Erklärung)",
    c_recupd: "Letzte Meldung",
    recUpdTip: "Zeitpunkt der letzten Meldung der Entität (last_updated, das speichert der Recorder) – auch wenn sich nur ein Attribut änderte oder derselbe Wert erneut gemeldet wurde",
    recColsTip: "Recorder-Spalten anzeigen (gespeichert seit, Einträge, Ø Intervall) (farbig = angezeigt)",
    c_recrows: "Einträge",
    c_recint: "Ø Intervall",
    retStats: "Einträge im Recorder: {rows} · etwa {perday} pro Tag · mittleres Intervall {int}",
    retStatsTip: "Einträge im Recorder: {rows} (etwa {perday} pro Tag), mittleres Intervall zwischen zwei Einträgen: {int}",
    blurTip: "Sensible Daten verwischen (Benutzer-IDs, Benutzernamen, Tracker, Personen, Kommentare), z. B. für Screenshots (farbig = aktiv)",
    title: "Entitäten-Inventar", tabsBtn: "Tabs ein- oder ausblenden", tabsShowAll: "Alle anzeigen", tabsClose: "Schließen",
    gLight: "Alle und Licht", gElectro: "Elektro", gClimate: "Klima", gCover: "Rollo", gUsage: "Verbrauch", gAuto: "Automatisierung", gMore: "Weiteres",
    search: "Suche (Name, Entity-ID, Bereich, Gerät, Integration …)", count: "Angezeigte Entitäten / in diesem Tab",
    csv: "CSV exportieren", print: "Drucken / PDF", pause: "Live-Aktualisierung anhalten", resume: "Live-Aktualisierung fortsetzen",
    allAreas: "Alle Bereiche", allInts: "Alle Integrationen", hidden: "Versteckte / deaktivierte Entitäten zeigen (farbig = angezeigt)",
    retSince: "Im Recorder gespeichert seit: {t} ({n} Tage)", retSinceNone: "Im Recorder ist kein Verlauf gespeichert.", retSinceFail: "Das Alter des Verlaufs konnte nicht gelesen werden.", retSinceBusy: "Alter des Verlaufs wird gelesen …",
    retShort: "{n} T", retRule: "Regel: {n} T", retErr: "Recorder-Abfrage fehlgeschlagen: {e}",
    retGlobal: "Der Recorder behält den Verlauf aller Entitäten global {n} Tage (purge_keep_days).", retGlobalUnknown: "Die globale Aufbewahrung des Recorders konnte nicht gelesen werden (läuft der Recorder?).",
    retMax: "Maximum (nie kürzen)", retRuleNone: "Keine eigene Regel: Diese Entität wird vom Entity Inventory nicht gekürzt{d}.", retRuleDefault: " – für sie gilt die Standard-Aufbewahrung von {n} Tagen",
    retRuleMax: "Wird vom Entity Inventory nie gekürzt: Der Verlauf bleibt so lange, wie der Recorder ihn behält ({g} Tage).", retRuleShort: "Verlauf dieser Entität, der älter als {n} Tage ist, wird jede Nacht gelöscht (nur solange der nächtliche Job an ist).",
    retRuleSame: "Das entspricht der Aufbewahrung des Recorders von {g} Tagen, die Regel ändert also nichts.",
    retRuleLong: "Der Recorder löscht den Verlauf nach {g} Tagen. Diese Regel kann nicht mehr als das behalten, solange die Recorder-Einstellung nicht erhöht ist (siehe unten).",
    retLongerTitle: "So bewahrst du länger als {g} Tage auf:",
    retLonger1: "1. Öffne die configuration.yaml und setze im Block recorder: den Wert purge_keep_days auf die längste Zeit, die du brauchst (hier {n}). Gibt es schon einen recorder:-Block, ändere nur diese Zeile – lege keinen zweiten Block an.",
    retLonger2: "2. Starte Home Assistant neu (Einstellungen → System → Neustart). Der Recorder liest diese Einstellung nur beim Start; das Entity Inventory kann sie nicht ändern.",
    retLonger3: "3. Danach wird jede Entität standardmäßig so lange aufbewahrt. Damit der Rest kürzer bleibt, stelle unten eine Standard-Aufbewahrung ein: Dann behalten nur Entitäten mit einer längeren Regel ihren Verlauf so lange.",
    retLonger4: "Hinweis: Eine längere Aufbewahrung macht die Datenbank größer, ungefähr im Verhältnis zu den Tagen.", retYamlCopy: "YAML-Zeilen kopieren", retYamlCopied: "Kopiert.",
    retAllTitle: "Für alle Entitäten", retDefaultLabel: "Standard-Aufbewahrung für alle Entitäten ohne eigene Regel (Tage, leer = keine)", retDefaultSave: "Standard speichern",
    retDefaultHelp: "Beispiel: Der Recorder behält 365 Tage und der Standard ist 30: Jede Entität ohne Regel wird nachts auf 30 Tage gekürzt, Entitäten mit einer Regel von 365 behalten alles. Ohne Standard werden nur Entitäten mit Regel gekürzt. Achtung: Der Standard gilt für JEDE Entität in der Datenbank, nicht nur für die hier angezeigten.",
    retPreviewBtn: "Vorschau", retPvTitle: "Das würde der nächtliche Job löschen", retPvGroup: "• {days} Tage: {entities} Entitäten, etwa {rows} Verlaufszeilen, die älter sind", retPvNone: "Im Moment würde nichts gelöscht.",
    retPvTotal: "Insgesamt: etwa {rows} Verlaufszeilen von {entities} Entitäten.", retPvSkipped: "{n} Entitäten werden übersprungen, weil ihre Aufbewahrung nicht kürzer ist als die {g} Tage des Recorders.",
    retPvHow: "Was der Job tut: Er ruft pro Gruppe von Tagen den Home-Assistant-Dienst recorder.purge_entities auf. Gelöscht wird nur der einzelne Werteverlauf (states) dieser Entitäten, der älter als die Tage ist. Die Langzeitstatistiken (Energie-Dashboard, Stundenwerte) werden NICHT gelöscht, die Aufzeichnung wird nicht gestoppt, und neue Werte werden wie gewohnt gespeichert. Gelöschter Verlauf lässt sich nicht wiederherstellen, außer aus einem Backup.",
    retPvFail: "Die Vorschau ist fehlgeschlagen: {e}", retPvBusy: "Zähle – bei einer großen Datenbank kann das einige Sekunden dauern …",
    retEnableTitle: "Nächtlichen Aufbewahrungs-Job einschalten?", retEnableText: "Ab jetzt läuft der Job jede Nacht um 03:20 und löscht Verlauf, der älter ist als die Aufbewahrung seiner Entität (eigene Regel, sonst Standard). Das gilt auch für Entitäten, die du in dieser Tabelle nicht siehst.",
    retDefaultConfirmTitle: "Standard-Aufbewahrung festlegen?", retDefaultConfirmText: "Ab jetzt gilt für jede Entität ohne eigene Regel: {n} Tage behalten. Das sind alle Entitäten, für die der Recorder Verlauf hat, nicht nur ein Tab. Wirksam wird das nur, solange der nächtliche Job an ist (oder wenn du ihn von Hand ausführst).",
    retDefaultOff: "Die Standard-Aufbewahrung wird entfernt. Entitäten ohne eigene Regel werden vom Entity Inventory dann nicht mehr gekürzt.", retConfirmOn: "Einschalten", retDeleteNow: "Jetzt löschen", retSave: "Speichern", retRunTitle: "Verlauf jetzt löschen?",
    c_retention: "Gespeichert seit (Tage, Recorder)", retTitle: "Recorder – Aufbewahrung", retBtn: "Recorder", retTip: "Recorder-Aufbewahrung dieser Entität: Klick öffnet den Dialog, Umschalt+Klick trägt die Tage direkt hier ein",
    retIntro: "Der Verlauf dieser Entität (Recorder-Datenbank), der älter ist als die gewählte Anzahl Tage, wird jede Nacht gelöscht. Eine Regel kann die globale Aufbewahrung des Recorders (purge_keep_days) nur verkürzen, nicht verlängern.",
    retNone: "Keine Regel (Recorder-Standard)", retDays: "{n} Tage", retCustom: "Andere Anzahl Tage", retJob: "Nächtlichen Aufbewahrungs-Job (03:20) für alle Entitäten mit Regel oder Standard ausführen", retRules: "{n} Entitäten mit Regel",
    retRunNow: "Jetzt ausführen", retRunAsk: "Das löscht jetzt Verlauf in der Recorder-Datenbank. Es lässt sich nicht rückgängig machen.", retLast: "Letzter Lauf: {t}", retDone: "Fertig: {n} Entitäten bearbeitet.", retFail: "Der Recorder meldet einen Fehler: {e}", retNoRec: "Der Recorder ist nicht verfügbar.", retAdmin: "Nur Administratoren können die Recorder-Aufbewahrung ändern.", retNever: "nie",
    copied: "Kopiert", wideTip: "Weiterer Zeilenabstand (farbig = aktiv)", hideOff: "Nicht verfügbare / unbekannte Entitäten ausblenden (farbig = ausgeblendet)", none: "Keine Entitäten in diesem Tab.",
    c_led: "Status", c_name: "Name", c_id: "Entity-ID", c_value: "Wert", c_area: "Bereich", c_device: "Gerät",
    labelTitle: "Label", labelName: "Name", labelIcon: "Symbol (z. B. mdi:tag)", labelColor: "Farbe", labelDesc: "Beschreibung", labelEntities: "Entitäten mit diesem Label", labelManage: "Label-Einstellungen", labelCount: "{n} Entitäten in diesem Tab / {m} insgesamt", labelFail: "Speichern fehlgeschlagen", labelNone: "keine", c_labels: "Labels", allLabels: "Alle Labels", noLabel: "Ohne Label", c_platform: "Integration", c_class: "Klasse", c_changed: "Geändert", c_pos: "Position", c_tilt: "Lamellenwinkel",
    c_bright: "Helligkeit", c_cur: "Ist", c_target: "Soll", c_mode: "Modus", c_action: "Aktion", c_unit: "Einheit",
    c_state: "Zustand", onlyNotes: "Nur Einträge mit Kommentar und/oder Bild (farbig = aktiv)", cfgBtn: "Spalten bearbeiten (Anzeige und Drucker)", tgtView: "Anzeige", tgtPrint: "Drucker", autoTip: "Spaltenbreiten an den längsten Inhalt anpassen", resetTip: "Layout zurücksetzen", resetAsk: "Spaltenlayout auf Standard zurücksetzen?", doneTip: "Fertig", renameTip: "Spaltenname (leer = Standard)", stand: "Stand", entities: "Entitäten", printFail: "Drucken fehlgeschlagen", portrait: "Drucken: Hochformat (Klick: Querformat)", landscape: "Drucken: Querformat (Klick: Hochformat)", showBadges: "Rote Zahlen an den Tabs anzeigen (nicht verfügbare Entitäten)", hideBadges: "Rote Zahlen an den Tabs ausblenden", copyTip: "Entity-ID kopieren", copyNameTip: "Namen kopieren", copyValueTip: "Wert kopieren", editConfirmName: "Namen ändern?\n\n{old}\n→ {new}", editConfirmId: "Entity-ID ändern?\n\n{old}\n→ {new}\n\nAutomationen, Skripte und Dashboards, die die alte ID nutzen, müssen angepasst werden.", idLabel: "Entity-ID", idWarn: "Automationen, Skripte, Dashboards und Templates, die die alte ID benutzen, werden hier NICHT mit geändert – danach prüfen.", idInvalid: "Ungültige Entity-ID. Sie muss die Domain behalten und nur a-z, 0-9 und _ enthalten (z. B. {d}.name).", alignDec: "Werte kommabündig (Klick: linksbündig)", alignLeft: "Werte linksbündig (Klick: rechtsbündig)", alignRight: "Werte rechtsbündig (Klick: kommabündig)", nameTitle: "Entität umbenennen", nameLabel: "Name", nameHintDev: "Home Assistant stellt den Gerätenamen voran: \"{dev}\"", nameDefault: "Standardname: {n}", nameReset: "Auf Standard zurücksetzen", nameDetails: "Verlauf / Details", nameFail: "Speichern fehlgeschlagen", nameNoReg: "Diese Entität hat keine eindeutige ID, steht deshalb nicht in der Entitätsregistrierung und lässt sich hier nicht umbenennen.", nameAdmin: "Nur Administratoren können Entitäten umbenennen.", c_icon: "Symbol", iconTip: "Symbol ändern (öffnet die Einstellungen der Entität)", iconNoReg: "Das Symbol dieser Entität lässt sich nicht ändern: sie hat keine eindeutige ID und steht deshalb nicht in der Entitätsregistrierung.", iconAdmin: "Nur Administratoren können das Symbol ändern.", c_access: "r/w", accessTip: { r: "r = nur lesend (gemessener oder gemeldeter Wert)", w: "w = nur schreibend (Auslöser ohne eigenen Zustand)", rw: "rw = lesbar und steuerbar" }, c_photos: "Fotos", c_docs: "Dokumente", c_note: "Kommentar",
    photosTitle: "Fotos", addPhotos: "Fotos hinzufügen", docsTitle: "Dokumente", addDocs: "Dokumente hinzufügen", noteTitle: "Kommentar", save: "Speichern", cancel: "Abbrechen", del: "Löschen", rename: "Umbenennen", renamePrompt: "Neuer Name", confirmDel: "{name} wirklich löschen?",
    uploadFail: "Upload fehlgeschlagen", noPhotos: "Noch keine Fotos.", noDocs: "Noch keine Dokumente (z. B. Stromvertrag, Gasvertrag, Foto des Zählers).", notePh: "Kommentar (Standort, Sicherung, Vertragsnummer …)", c_trackers: "Tracker", c_source: "Quelle", c_username: "Benutzername", c_person: "Person", c_role: "Rolle", c_provider: "Anmeldung", c_local: "Nur lokal", c_system: "Systemkonto", c_userid: "Benutzer-ID", c_active: "Aktiv", yes: "✓", no: "–", c_sc: "State-Class", c_maker: "Hersteller", c_model: "Modell",
    on: "an", off: "aus", roleOwner: "Besitzer", roleRead: "Nur lesen",
    ago: { s: "gerade eben", m: "vor {n} Min", h: "vor {n} Std", d: "vor {n} T" },
    t: {
      all: "Alle Entitäten", illuminance: "Helligkeit", temperature: "Temperatur", humidity: "Feuchte", power: "Leistung", energy: "Energie",
      consumption: "Verbrauch", voltage: "Spannung", frequency: "Frequenz", current: "Strom", battery: "Batterien",
      cover: "Cover", tilt: "Lamellen", light: "Lichter", dimmer: "Dimmer", switch: "Schalter", climate: "Thermostate",
      media: "Medien", person: "Personen", users: "Benutzerkonten", binary: "Binärsensoren", presence: "Tracker", scene: "Szenen", labels: "Labels", auto: "Automationen / Skripte", helper: "Helfer",
      sensor: "Sonstige Sensoren", unavailable: "Nicht verfügbar",
    },
    d: {
      all: "Jede Entität, die Home Assistant kennt", illuminance: "Helligkeitssensoren (Lux)", temperature: "Sensoren, die eine Temperatur messen", humidity: "Feuchtesensoren",
      power: "Momentanleistung (W, kW)", energy: "Energiezähler (Wh, kWh)", consumption: "Gas, Wasser, Volumen und alles, was Verbrauch heißt",
      voltage: "Spannungssensoren (V, mV, kV)", frequency: "Frequenzsensoren (Hz)", current: "Strom und Leistungsfaktor (A, mA)", battery: "Batteriestände, die schwächsten zuerst",
      cover: "Raffstores, Rollläden, Garagentore: Position", tilt: "Cover mit verstellbaren Lamellen: Lamellenwinkel",
      light: "Alle Lichter", dimmer: "Lichter, die sich dimmen lassen", switch: "Schalter, Steckdosen und Ein/Aus-Helfer",
      climate: "Thermostate und Wärmepumpen: Ist, Soll, Modus", media: "Fernseher, Lautsprecher und andere Player",
      binary: "Bewegung, Kontakt, Fenster, Rauch … Sensoren", person: "Personen mit Trackern und verknüpftem Login", users: "Anmeldekonten von Home Assistant (braucht Admin-Rechte)", presence: "Geräte-Tracker",
      scene: "Szenen mit ihrer letzten Aktivierung", labels: "Jede Entität, die mindestens ein Label hat", auto: "Automationen und Skripte", helper: "input_*, Zähler, Timer, Zeitpläne und die Helfer-Integrationen (Gruppe, Schwellwert, Verbrauchszähler, Statistik …)", sensor: "Sensoren, die in keinen Mess-Tab passen",
      unavailable: "Entitäten, die gerade nicht verfügbar oder unbekannt sind",
    },
  },
  fr: {
    scTitle: "Classe d’état",
    scNone: "aucune (pas de classe d’état)",
    scMeasurement: "measurement : une valeur instantanée qui monte et descend, p. ex. température, puissance, humidité.",
    scTotal: "total : un compteur qui peut aussi diminuer, p. ex. un compteur avec remise à zéro ou un solde.",
    scTotalInc: "total_increasing : un compteur qui ne fait qu’augmenter (et repart de 0), p. ex. énergie en kWh, gaz, eau.",
    scStatsBusy: "Vérification des statistiques à long terme …",
    scStatsYes: "Des statistiques à long terme existent pour cette entité ({what}, unité {unit}, source {src}). Home Assistant les conserve en valeurs horaires pour le tableau de bord Énergie et les graphiques d’historique.",
    scStatsNo: "Pas de statistiques à long terme : seules les entités avec une classe d’état (et une unité) en ont. Sans elles, seul l’historique des valeurs individuelles est conservé, et il est supprimé après la conservation de l’enregistreur.",
    scStatsFail: "Les statistiques à long terme n’ont pas pu être lues.",
    scChange: "Peut-on la modifier ? Pas ici ni dans les paramètres d’entité de Home Assistant : c’est l’intégration qui fournit le capteur qui décide. Exceptions : dans configuration.yaml avec customize (state_class:) et pour les assistants modèles que vous créez vous-même.",
    scRecNote: "La conservation d’Entity Inventory ne raccourcit que l’historique des valeurs individuelles d’une entité. Les statistiques à long terme restent intactes.",
    scDevTools: "Outils de développement → Statistiques",
    scTip: "Classe d’état de l’entité (clic pour une explication)",
    c_recupd: "Dernier rapport",
    recColsTip: "Afficher les colonnes de l’enregistreur (conservé depuis, entrées, intervalle moyen) (en couleur = affichées)",
    c_recrows: "Entrées",
    c_recint: "Intervalle moy.",
    retStats: "Entrées dans l’enregistreur : {rows} · environ {perday} par jour · intervalle moyen {int}",
    retStatsTip: "Entrées dans l’enregistreur : {rows} (environ {perday} par jour), intervalle moyen entre deux entrées : {int}",
    c_retention: "Conservé depuis (jours, enregistreur)",
    retTitle: "Enregistreur – conservation",
    retBtn: "Enregistreur",
    retTip: "Conservation de cette entité dans l’enregistreur : un clic ouvre la fenêtre, Maj+clic permet de saisir les jours ici",
    retIntro: "L’historique de cette entité (base de données de l’enregistreur) plus ancien que le nombre de jours choisi est supprimé chaque nuit. Une règle ne peut que raccourcir la conservation globale de l’enregistreur (purge_keep_days), pas la prolonger.",
    retNone: "Aucune règle (valeur par défaut de l’enregistreur)",
    retDays: "{n} jours",
    retCustom: "Autre nombre de jours",
    retJob: "Exécuter la tâche nocturne (03:20) pour toutes les entités avec une règle ou la valeur par défaut",
    retRules: "{n} entités avec une règle",
    retRunNow: "Exécuter maintenant",
    retRunAsk: "Cela supprime maintenant de l’historique dans la base de données de l’enregistreur. C’est irréversible.",
    retLast: "Dernière exécution : {t}",
    retDone: "Terminé : {n} entités traitées.",
    retFail: "L’enregistreur signale une erreur : {e}",
    retNoRec: "L’enregistreur n’est pas disponible.",
    retAdmin: "Seuls les administrateurs peuvent modifier la conservation.",
    retNever: "jamais",
    retSince: "Dans l’enregistreur depuis : {t} ({n} jours)",
    retSinceNone: "Aucun historique dans l’enregistreur.",
    retSinceFail: "L’âge de l’historique n’a pas pu être lu.",
    retSinceBusy: "Lecture de l’âge de l’historique …",
    retShort: "{n} j",
    retRule: "règle : {n} j",
    retErr: "La requête à l’enregistreur a échoué : {e}",
    retGlobal: "L’enregistreur conserve l’historique de toutes les entités pendant {n} jours (purge_keep_days).",
    retGlobalUnknown: "La conservation globale de l’enregistreur n’a pas pu être lue (l’enregistreur fonctionne-t-il ?).",
    retMax: "Maximum (ne jamais raccourcir)",
    retRuleNone: "Pas de règle propre : cette entité n’est pas raccourcie par Entity Inventory{d}.",
    retRuleDefault: " – la conservation par défaut de {n} jours s’applique",
    retRuleMax: "Jamais raccourci par Entity Inventory : l’historique reste aussi longtemps que l’enregistreur le garde ({g} jours).",
    retRuleShort: "L’historique de cette entité plus ancien que {n} jours est supprimé chaque nuit (seulement tant que la tâche nocturne est active).",
    retRuleSame: "Cela correspond à la conservation de l’enregistreur de {g} jours : la règle ne change rien.",
    retRuleLong: "L’enregistreur supprime l’historique après {g} jours. Cette règle ne peut pas conserver davantage tant que le réglage de l’enregistreur n’est pas augmenté (voir ci-dessous).",
    retLongerTitle: "Pour conserver les données plus de {g} jours :",
    retLonger1: "1. Ouvrez configuration.yaml et réglez purge_keep_days dans le bloc recorder: sur la durée maximale voulue (ici {n}). Si un bloc recorder: existe déjà, ne modifiez que cette ligne – n’ajoutez pas de second bloc.",
    retLonger2: "2. Redémarrez Home Assistant (Paramètres → Système → Redémarrer). L’enregistreur ne lit ce réglage qu’au démarrage ; Entity Inventory ne peut pas le modifier.",
    retLonger3: "3. Ensuite, chaque entité est conservée aussi longtemps par défaut. Pour garder le reste plus court, définissez ci-dessous une conservation par défaut : seules les entités avec une règle plus longue gardent leur historique aussi longtemps.",
    retLonger4: "Remarque : une conservation plus longue agrandit la base de données, à peu près proportionnellement au nombre de jours.",
    retYamlCopy: "Copier les lignes YAML",
    retYamlCopied: "Copié.",
    retAllTitle: "Pour toutes les entités",
    retDefaultLabel: "Conservation par défaut pour toutes les entités sans règle propre (jours, vide = aucune)",
    retDefaultSave: "Enregistrer la valeur par défaut",
    retDefaultHelp: "Exemple : l’enregistreur garde 365 jours et la valeur par défaut est 30 : chaque entité sans règle est ramenée à 30 jours la nuit, les entités avec une règle de 365 gardent tout. Sans valeur par défaut, seules les entités avec une règle sont raccourcies. Attention : la valeur par défaut s’applique à CHAQUE entité de la base de données, pas seulement à celles affichées ici.",
    retPreviewBtn: "Aperçu",
    retPvTitle: "Ce que la tâche nocturne supprimerait",
    retPvGroup: "• {days} jours : {entities} entités, environ {rows} lignes d’historique plus anciennes",
    retPvNone: "Rien ne serait supprimé pour le moment.",
    retPvTotal: "Total : environ {rows} lignes d’historique de {entities} entités.",
    retPvSkipped: "{n} entités sont ignorées car leur conservation n’est pas plus courte que les {g} jours de l’enregistreur.",
    retPvHow: "Ce que fait la tâche : elle appelle le service Home Assistant recorder.purge_entities une fois par groupe de jours. Elle supprime uniquement l’historique des valeurs (states) de ces entités plus ancien que le nombre de jours. Elle NE supprime PAS les statistiques à long terme (tableau de bord Énergie, valeurs horaires), n’arrête pas l’enregistrement, et les nouvelles valeurs sont enregistrées comme d’habitude. L’historique supprimé ne peut être restauré que depuis une sauvegarde.",
    retPvFail: "L’aperçu a échoué : {e}",
    retPvBusy: "Comptage – sur une grande base de données, cela peut prendre quelques secondes …",
    retEnableTitle: "Activer la tâche de conservation nocturne ?",
    retEnableText: "Désormais, la tâche s’exécute chaque nuit à 03:20 et supprime l’historique plus ancien que la conservation de son entité (règle propre, sinon valeur par défaut). Cela vaut aussi pour des entités que vous ne voyez pas dans ce tableau.",
    retDefaultConfirmTitle: "Définir la conservation par défaut ?",
    retDefaultConfirmText: "Désormais, chaque entité sans règle propre compte comme : conserver {n} jours. Il s’agit de toutes les entités ayant un historique dans l’enregistreur, pas d’un seul onglet. Cela n’agit que tant que la tâche nocturne est active (ou si vous l’exécutez à la main).",
    retDefaultOff: "La conservation par défaut est supprimée. Les entités sans règle propre ne sont plus raccourcies par Entity Inventory.",
    retConfirmOn: "Activer",
    retDeleteNow: "Supprimer maintenant",
    retSave: "Enregistrer",
    retRunTitle: "Supprimer l’historique maintenant ?",
    blurTip: "Flouter les données sensibles (ID et noms d’utilisateurs, traceurs, personnes, commentaires), p. ex. pour les captures d’écran (en couleur = actif)",
    title: "Entity Inventory",
    tabsBtn: "Afficher ou masquer les onglets",
    tabsShowAll: "Tout afficher",
    tabsClose: "Fermer",
    gLight: "Tout et lumière",
    gElectro: "Électricité",
    gClimate: "Climat",
    gCover: "Volets",
    gUsage: "Consommation",
    gAuto: "Automatisation",
    gMore: "Autres",
    search: "Rechercher (nom, ID d'entité, pièce, appareil, intégration …)",
    count: "Entités affichées / dans cet onglet",
    csv: "Exporter en CSV",
    print: "Imprimer / PDF",
    pause: "Mettre en pause la mise à jour en direct",
    resume: "Reprendre la mise à jour en direct",
    allAreas: "Toutes les pièces",
    allInts: "Toutes les intégrations",
    hidden: "Afficher les entités masquées / désactivées (en couleur = affichées)",
    copied: "Copié",
    wideTip: "Interligne plus large (en couleur = actif)",
    hideOff: "Masquer les entités indisponibles / inconnues (en couleur = masquées)",
    none: "Aucune entité dans cet onglet.",
    c_led: "Statut",
    c_name: "Nom",
    c_id: "ID d'entité",
    c_value: "Valeur",
    c_area: "Pièce",
    c_device: "Appareil",
    labelTitle: "Étiquette",
    labelName: "Nom",
    labelIcon: "Icône (p. ex. mdi:tag)",
    labelColor: "Couleur",
    labelDesc: "Description",
    labelEntities: "Entités avec cette étiquette",
    labelManage: "Paramètres des étiquettes",
    labelCount: "{n} entités dans cet onglet / {m} au total",
    labelFail: "Échec de l'enregistrement",
    labelNone: "aucune",
    c_labels: "Étiquettes",
    allLabels: "Toutes les étiquettes",
    noLabel: "Sans étiquette",
    c_platform: "Intégration",
    c_class: "Classe",
    c_changed: "Modifié",
    c_pos: "Position",
    c_tilt: "Angle des lames",
    c_bright: "Luminosité",
    c_cur: "Actuel",
    c_target: "Consigne",
    c_mode: "Mode",
    c_action: "Action",
    c_unit: "Unité",
    c_state: "État",
    onlyNotes: "Seulement les entrées avec commentaire et/ou photo (en couleur = actif)",
    cfgBtn: "Modifier les colonnes (écran et imprimante)",
    tgtView: "Écran",
    tgtPrint: "Imprimante",
    autoTip: "Ajuster les largeurs au contenu le plus large",
    resetTip: "Réinitialiser la mise en page",
    resetAsk: "Rétablir la mise en page par défaut des colonnes ?",
    doneTip: "Terminé",
    renameTip: "Nom de la colonne (vide = par défaut)",
    stand: "État au",
    entities: "entités",
    printFail: "Échec de l'impression",
    portrait: "Impression : portrait (clic : paysage)",
    landscape: "Impression : paysage (clic : portrait)",
    showBadges: "Afficher les pastilles rouges sur les onglets (entités indisponibles)",
    hideBadges: "Masquer les pastilles rouges sur les onglets",
    copyTip: "Copier l'ID d'entité",
    copyNameTip: "Copier le nom",
    copyValueTip: "Copier la valeur",
    editConfirmName: "Modifier le nom ?\n\n{old}\n→ {new}",
    editConfirmId: "Modifier l'ID d'entité ?\n\n{old}\n→ {new}\n\nLes automatisations, scripts et tableaux de bord qui utilisent l'ancien ID doivent être adaptés.",
    idLabel: "ID d'entité",
    idWarn: "Les automatisations, scripts, tableaux de bord et modèles qui utilisent l'ancien ID ne sont PAS modifiés par Home Assistant ici – vérifiez-les ensuite.",
    idInvalid: "ID d'entité non valide. Il doit garder le domaine et n'utiliser que a-z, 0-9 et _ (p. ex. {d}.nom).",
    alignDec: "Valeurs alignées sur la virgule (clic : à gauche)",
    alignLeft: "Valeurs alignées à gauche (clic : à droite)",
    alignRight: "Valeurs alignées à droite (clic : sur la virgule)",
    nameTitle: "Renommer l'entité",
    nameLabel: "Nom",
    nameHintDev: "Home Assistant place le nom de l'appareil devant : « {dev} »",
    nameDefault: "Nom par défaut : {n}",
    nameReset: "Rétablir le nom par défaut",
    nameDetails: "Historique / détails",
    nameFail: "Échec de l'enregistrement",
    nameNoReg: "Cette entité n'a pas d'ID unique ; elle n'est donc pas dans le registre des entités et ne peut pas être renommée ici.",
    nameAdmin: "Seuls les administrateurs peuvent renommer les entités.",
    c_icon: "Icône",
    iconTip: "Changer l'icône (ouvre les paramètres de l'entité)",
    iconNoReg: "L'icône de cette entité ne peut pas être modifiée : sans ID unique, elle n'est pas dans le registre des entités.",
    iconAdmin: "Seuls les administrateurs peuvent changer l'icône.",
    c_access: "r/w",
    accessTip: {"r": "r = lecture seule (valeur mesurée ou rapportée)", "w": "w = écriture seule (déclencheur sans état propre)", "rw": "rw = lisible et commandable"},
    c_photos: "Photos",
    c_docs: "Documents",
    c_note: "Commentaire",
    photosTitle: "Photos",
    addPhotos: "Ajouter des photos",
    docsTitle: "Documents",
    addDocs: "Ajouter des documents",
    noteTitle: "Commentaire",
    save: "Enregistrer",
    cancel: "Annuler",
    del: "Supprimer",
    rename: "Renommer",
    renamePrompt: "Nouveau nom",
    confirmDel: "Supprimer vraiment {name} ?",
    uploadFail: "Échec du téléversement",
    noPhotos: "Pas encore de photos.",
    noDocs: "Pas encore de documents (p. ex. contrat d'électricité, contrat de gaz, photo du compteur).",
    notePh: "Commentaire (emplacement, fusible, numéro de contrat …)",
    c_trackers: "Traceurs",
    c_source: "Source",
    c_username: "Nom d'utilisateur",
    c_person: "Personne",
    c_role: "Rôle",
    c_provider: "Méthode de connexion",
    c_local: "Local uniquement",
    c_system: "Compte système",
    c_userid: "ID utilisateur",
    c_active: "Actif",
    yes: "✓",
    no: "–",
    c_sc: "Classe d'état",
    c_maker: "Fabricant",
    c_model: "Modèle",
    on: "allumé",
    off: "éteint",
    roleOwner: "Propriétaire",
    roleRead: "Lecture seule",
    ago: {"s": "à l'instant", "m": "il y a {n} min", "h": "il y a {n} h", "d": "il y a {n} j"},
    t: {"all": "Toutes les entités", "illuminance": "Luminosité", "temperature": "Température", "humidity": "Humidité", "power": "Puissance", "energy": "Énergie", "consumption": "Consommation", "voltage": "Tension", "frequency": "Fréquence", "current": "Courant", "battery": "Batteries", "cover": "Volets", "tilt": "Lames", "light": "Lumières", "dimmer": "Variateurs", "switch": "Interrupteurs", "climate": "Thermostats", "media": "Médias", "person": "Personnes", "users": "Comptes utilisateurs", "binary": "Capteurs binaires", "presence": "Traceurs", "scene": "Scènes", "labels": "Étiquettes", "auto": "Automatisations / scripts", "helper": "Entrées", "sensor": "Autres capteurs", "unavailable": "Indisponibles"},
    d: {"all": "Toutes les entités connues de Home Assistant", "illuminance": "Capteurs de luminosité (lux)", "temperature": "Capteurs qui mesurent une température", "humidity": "Capteurs d'humidité", "power": "Puissance instantanée (W, kW)", "energy": "Compteurs d'énergie (Wh, kWh)", "consumption": "Gaz, eau, volume et tout ce qui s'appelle consommation", "voltage": "Capteurs de tension (V, mV, kV)", "frequency": "Capteurs de fréquence (Hz)", "current": "Courant et facteur de puissance (A, mA)", "battery": "Niveaux de batterie, les plus faibles d'abord", "cover": "Stores, volets, portes de garage : position", "tilt": "Volets à lames orientables : angle des lames", "light": "Toutes les lumières", "dimmer": "Lumières variables", "switch": "Interrupteurs, prises et entrées marche/arrêt", "climate": "Thermostats et pompes à chaleur : actuel, consigne, mode", "media": "Téléviseurs, enceintes et autres lecteurs", "binary": "Capteurs de mouvement, contact, fenêtre, fumée …", "person": "Personnes avec leurs traceurs et leur compte lié", "users": "Comptes de connexion de Home Assistant (droits d'administrateur requis)", "presence": "Traceurs d'appareils", "scene": "Scènes avec leur dernière activation", "labels": "Toute entité ayant au moins une étiquette", "auto": "Automatisations et scripts", "helper": "input_*, compteurs, minuteurs, planifications", "sensor": "Capteurs qui ne rentrent dans aucun onglet de mesure", "unavailable": "Entités actuellement indisponibles ou inconnues"},
  },
  es: {
    scTitle: "Clase de estado",
    scNone: "ninguna (sin clase de estado)",
    scMeasurement: "measurement: un valor instantáneo que sube y baja, p. ej. temperatura, potencia, humedad.",
    scTotal: "total: un contador que también puede bajar, p. ej. un contador con reinicio o un saldo.",
    scTotalInc: "total_increasing: un contador que solo sube (y vuelve a empezar en 0), p. ej. energía en kWh, gas, agua.",
    scStatsBusy: "Comprobando las estadísticas a largo plazo …",
    scStatsYes: "Existen estadísticas a largo plazo para esta entidad ({what}, unidad {unit}, origen {src}). Home Assistant las guarda como valores por hora para el panel de energía y los gráficos del historial.",
    scStatsNo: "Sin estadísticas a largo plazo: solo las entidades con clase de estado (y unidad) las tienen. Sin ellas solo se conserva el historial de valores individuales, que se elimina tras la conservación del grabador.",
    scStatsFail: "No se pudieron leer las estadísticas a largo plazo.",
    scChange: "¿Se puede cambiar? No aquí ni en los ajustes de entidad de Home Assistant: lo decide la integración que aporta el sensor. Excepciones: en configuration.yaml con customize (state_class:) y en los ayudantes de plantilla que creas tú.",
    scRecNote: "La conservación de Entity Inventory solo acorta el historial de valores individuales de una entidad. Las estadísticas a largo plazo no se tocan.",
    scDevTools: "Herramientas de desarrollo → Estadísticas",
    scTip: "Clase de estado de la entidad (clic para una explicación)",
    c_recupd: "Último informe",
    recColsTip: "Mostrar las columnas del grabador (guardado desde, entradas, intervalo medio) (resaltado = visibles)",
    c_recrows: "Entradas",
    c_recint: "Intervalo medio",
    retStats: "Entradas en el grabador: {rows} · unas {perday} al día · intervalo medio {int}",
    retStatsTip: "Entradas en el grabador: {rows} (unas {perday} al día), intervalo medio entre dos entradas: {int}",
    c_retention: "Guardado desde (días, grabador)",
    retTitle: "Grabador – conservación",
    retBtn: "Grabador",
    retTip: "Conservación de esta entidad en el grabador: clic abre el diálogo, Mayús+clic escribe los días aquí mismo",
    retIntro: "El historial de esta entidad (base de datos del grabador) más antiguo que el número de días elegido se elimina cada noche. Una regla solo puede acortar la conservación global del grabador (purge_keep_days), no alargarla.",
    retNone: "Sin regla (valor predeterminado del grabador)",
    retDays: "{n} días",
    retCustom: "Otro número de días",
    retJob: "Ejecutar la tarea nocturna (03:20) para todas las entidades con regla o valor predeterminado",
    retRules: "{n} entidades con regla",
    retRunNow: "Ejecutar ahora",
    retRunAsk: "Esto elimina ahora historial de la base de datos del grabador. No se puede deshacer.",
    retLast: "Última ejecución: {t}",
    retDone: "Hecho: {n} entidades procesadas.",
    retFail: "El grabador informa de un error: {e}",
    retNoRec: "El grabador no está disponible.",
    retAdmin: "Solo los administradores pueden cambiar la conservación.",
    retNever: "nunca",
    retSince: "En el grabador desde: {t} ({n} días)",
    retSinceNone: "No hay historial en el grabador.",
    retSinceFail: "No se pudo leer la antigüedad del historial.",
    retSinceBusy: "Leyendo la antigüedad del historial …",
    retShort: "{n} d",
    retRule: "regla: {n} d",
    retErr: "Falló la consulta al grabador: {e}",
    retGlobal: "El grabador conserva el historial de todas las entidades durante {n} días (purge_keep_days).",
    retGlobalUnknown: "No se pudo leer la conservación global del grabador (¿está en marcha el grabador?).",
    retMax: "Máximo (nunca acortar)",
    retRuleNone: "Sin regla propia: Entity Inventory no acorta esta entidad{d}.",
    retRuleDefault: " – se aplica la conservación predeterminada de {n} días",
    retRuleMax: "Entity Inventory nunca la acorta: el historial dura tanto como lo conserve el grabador ({g} días).",
    retRuleShort: "El historial de esta entidad más antiguo de {n} días se elimina cada noche (solo mientras la tarea nocturna esté activa).",
    retRuleSame: "Esto coincide con la conservación del grabador de {g} días, así que la regla no cambia nada.",
    retRuleLong: "El grabador elimina el historial tras {g} días. Esta regla no puede conservar más hasta que se aumente el ajuste del grabador (véase abajo).",
    retLongerTitle: "Para conservar datos más de {g} días:",
    retLonger1: "1. Abre configuration.yaml y ajusta purge_keep_days en el bloque recorder: al tiempo máximo que necesites (aquí {n}). Si ya existe un bloque recorder:, cambia solo esa línea – no añadas un segundo bloque.",
    retLonger2: "2. Reinicia Home Assistant (Ajustes → Sistema → Reiniciar). El grabador lee este ajuste solo al arrancar; Entity Inventory no puede cambiarlo.",
    retLonger3: "3. Después, cada entidad se conserva por defecto tanto tiempo. Para mantener el resto más corto, define abajo una conservación predeterminada: así solo las entidades con una regla más larga conservan su historial tanto.",
    retLonger4: "Nota: una conservación más larga agranda la base de datos, aproximadamente en proporción a los días.",
    retYamlCopy: "Copiar las líneas YAML",
    retYamlCopied: "Copiado.",
    retAllTitle: "Para todas las entidades",
    retDefaultLabel: "Conservación predeterminada para todas las entidades sin regla propia (días, vacío = ninguna)",
    retDefaultSave: "Guardar valor predeterminado",
    retDefaultHelp: "Ejemplo: el grabador conserva 365 días y el valor predeterminado es 30: cada entidad sin regla se recorta a 30 días por la noche; las entidades con una regla de 365 lo conservan todo. Sin valor predeterminado solo se recortan las entidades con regla. Atención: el valor predeterminado se aplica a CADA entidad de la base de datos, no solo a las mostradas aquí.",
    retPreviewBtn: "Vista previa",
    retPvTitle: "Lo que eliminaría la tarea nocturna",
    retPvGroup: "• {days} días: {entities} entidades, unas {rows} filas de historial más antiguas",
    retPvNone: "Ahora mismo no se eliminaría nada.",
    retPvTotal: "Total: unas {rows} filas de historial de {entities} entidades.",
    retPvSkipped: "Se omiten {n} entidades porque su conservación no es más corta que los {g} días del grabador.",
    retPvHow: "Qué hace la tarea: llama al servicio de Home Assistant recorder.purge_entities una vez por grupo de días. Elimina solo el historial de valores (states) de estas entidades más antiguo que el número de días. NO elimina las estadísticas a largo plazo (panel de energía, valores por hora), no detiene la grabación y los valores nuevos se guardan como siempre. El historial eliminado solo se puede recuperar desde una copia de seguridad.",
    retPvFail: "La vista previa falló: {e}",
    retPvBusy: "Contando – en una base de datos grande puede tardar unos segundos …",
    retEnableTitle: "¿Activar la tarea de conservación nocturna?",
    retEnableText: "A partir de ahora la tarea se ejecuta cada noche a las 03:20 y elimina el historial más antiguo que la conservación de su entidad (regla propia, si no la predeterminada). Esto también vale para entidades que no ves en esta tabla.",
    retDefaultConfirmTitle: "¿Definir la conservación predeterminada?",
    retDefaultConfirmText: "A partir de ahora cada entidad sin regla propia cuenta como: conservar {n} días. Son todas las entidades con historial en el grabador, no solo una pestaña. Solo surte efecto mientras la tarea nocturna esté activa (o si la ejecutas a mano).",
    retDefaultOff: "Se quita la conservación predeterminada. Entity Inventory ya no acorta las entidades sin regla propia.",
    retConfirmOn: "Activar",
    retDeleteNow: "Eliminar ahora",
    retSave: "Guardar",
    retRunTitle: "¿Eliminar el historial ahora?",
    blurTip: "Difuminar datos sensibles (ID y nombres de usuario, rastreadores, personas, comentarios), p. ej. para capturas de pantalla (resaltado = activo)",
    title: "Entity Inventory",
    tabsBtn: "Mostrar u ocultar pestañas",
    tabsShowAll: "Mostrar todas",
    tabsClose: "Cerrar",
    gLight: "Todo y luz",
    gElectro: "Electricidad",
    gClimate: "Clima",
    gCover: "Persianas",
    gUsage: "Consumo",
    gAuto: "Automatización",
    gMore: "Más",
    search: "Buscar (nombre, ID de entidad, zona, dispositivo, integración …)",
    count: "Entidades mostradas / en esta pestaña",
    csv: "Exportar CSV",
    print: "Imprimir / PDF",
    pause: "Pausar la actualización en vivo",
    resume: "Reanudar la actualización en vivo",
    allAreas: "Todas las zonas",
    allInts: "Todas las integraciones",
    hidden: "Mostrar entidades ocultas / desactivadas (resaltado = visibles)",
    copied: "Copiado",
    wideTip: "Mayor espacio entre filas (resaltado = activo)",
    hideOff: "Ocultar entidades no disponibles / desconocidas (resaltado = ocultas)",
    none: "No hay entidades en esta pestaña.",
    c_led: "Estado",
    c_name: "Nombre",
    c_id: "ID de entidad",
    c_value: "Valor",
    c_area: "Zona",
    c_device: "Dispositivo",
    labelTitle: "Etiqueta",
    labelName: "Nombre",
    labelIcon: "Icono (p. ej. mdi:tag)",
    labelColor: "Color",
    labelDesc: "Descripción",
    labelEntities: "Entidades con esta etiqueta",
    labelManage: "Ajustes de etiquetas",
    labelCount: "{n} entidades en esta pestaña / {m} en total",
    labelFail: "Error al guardar",
    labelNone: "ninguno",
    c_labels: "Etiquetas",
    allLabels: "Todas las etiquetas",
    noLabel: "Sin etiqueta",
    c_platform: "Integración",
    c_class: "Clase",
    c_changed: "Cambiado",
    c_pos: "Posición",
    c_tilt: "Ángulo de lamas",
    c_bright: "Brillo",
    c_cur: "Actual",
    c_target: "Objetivo",
    c_mode: "Modo",
    c_action: "Acción",
    c_unit: "Unidad",
    c_state: "Estado",
    onlyNotes: "Solo entradas con comentario y/o foto (resaltado = activo)",
    cfgBtn: "Editar columnas (pantalla e impresora)",
    tgtView: "Pantalla",
    tgtPrint: "Impresora",
    autoTip: "Ajustar el ancho de las columnas al contenido más ancho",
    resetTip: "Restablecer el diseño",
    resetAsk: "¿Restablecer el diseño de columnas al predeterminado?",
    doneTip: "Hecho",
    renameTip: "Nombre de la columna (vacío = predeterminado)",
    stand: "Estado a",
    entities: "entidades",
    printFail: "Error al imprimir",
    portrait: "Impresión: vertical (clic: horizontal)",
    landscape: "Impresión: horizontal (clic: vertical)",
    showBadges: "Mostrar los números rojos en las pestañas (entidades no disponibles)",
    hideBadges: "Ocultar los números rojos en las pestañas",
    copyTip: "Copiar el ID de entidad",
    copyNameTip: "Copiar el nombre",
    copyValueTip: "Copiar el valor",
    editConfirmName: "¿Cambiar el nombre?\n\n{old}\n→ {new}",
    editConfirmId: "¿Cambiar el ID de entidad?\n\n{old}\n→ {new}\n\nLas automatizaciones, scripts y paneles que usen el ID antiguo deben adaptarse.",
    idLabel: "ID de entidad",
    idWarn: "Home Assistant NO cambia aquí las automatizaciones, scripts, paneles ni plantillas que usen el ID antiguo – revíselos después.",
    idInvalid: "ID de entidad no válido. Debe mantener el dominio y usar solo a-z, 0-9 y _ (p. ej. {d}.nombre).",
    alignDec: "Valores alineados por el separador decimal (clic: izquierda)",
    alignLeft: "Valores alineados a la izquierda (clic: derecha)",
    alignRight: "Valores alineados a la derecha (clic: por separador decimal)",
    nameTitle: "Renombrar entidad",
    nameLabel: "Nombre",
    nameHintDev: "Home Assistant antepone el nombre del dispositivo: «{dev}»",
    nameDefault: "Nombre predeterminado: {n}",
    nameReset: "Restablecer al predeterminado",
    nameDetails: "Historial / detalles",
    nameFail: "Error al guardar",
    nameNoReg: "Esta entidad no tiene ID único, por lo que no está en el registro de entidades y no se puede renombrar aquí.",
    nameAdmin: "Solo los administradores pueden renombrar entidades.",
    c_icon: "Icono",
    iconTip: "Cambiar el icono (abre los ajustes de la entidad)",
    iconNoReg: "No se puede cambiar el icono de esta entidad: sin ID único no está en el registro de entidades.",
    iconAdmin: "Solo los administradores pueden cambiar el icono.",
    c_access: "r/w",
    accessTip: {"r": "r = solo lectura (valor medido o informado)", "w": "w = solo escritura (disparador sin estado propio)", "rw": "rw = legible y controlable"},
    c_photos: "Fotos",
    c_docs: "Documentos",
    c_note: "Comentario",
    photosTitle: "Fotos",
    addPhotos: "Añadir fotos",
    docsTitle: "Documentos",
    addDocs: "Añadir documentos",
    noteTitle: "Comentario",
    save: "Guardar",
    cancel: "Cancelar",
    del: "Eliminar",
    rename: "Renombrar",
    renamePrompt: "Nuevo nombre",
    confirmDel: "¿Eliminar {name} de verdad?",
    uploadFail: "Error al subir",
    noPhotos: "Aún no hay fotos.",
    noDocs: "Aún no hay documentos (p. ej. contrato de electricidad, contrato de gas, foto del contador).",
    notePh: "Comentario (ubicación, fusible, número de contrato …)",
    c_trackers: "Rastreadores",
    c_source: "Origen",
    c_username: "Nombre de usuario",
    c_person: "Persona",
    c_role: "Rol",
    c_provider: "Método de acceso",
    c_local: "Solo local",
    c_system: "Cuenta del sistema",
    c_userid: "ID de usuario",
    c_active: "Activo",
    yes: "✓",
    no: "–",
    c_sc: "Clase de estado",
    c_maker: "Fabricante",
    c_model: "Modelo",
    on: "encendido",
    off: "apagado",
    roleOwner: "Propietario",
    roleRead: "Solo lectura",
    ago: {"s": "ahora mismo", "m": "hace {n} min", "h": "hace {n} h", "d": "hace {n} d"},
    t: {"all": "Todas las entidades", "illuminance": "Luminosidad", "temperature": "Temperatura", "humidity": "Humedad", "power": "Potencia", "energy": "Energía", "consumption": "Consumo", "voltage": "Tensión", "frequency": "Frecuencia", "current": "Corriente", "battery": "Baterías", "cover": "Persianas", "tilt": "Lamas", "light": "Luces", "dimmer": "Reguladores", "switch": "Interruptores", "climate": "Termostatos", "media": "Multimedia", "person": "Personas", "users": "Cuentas de usuario", "binary": "Sensores binarios", "presence": "Rastreadores", "scene": "Escenas", "labels": "Etiquetas", "auto": "Automatizaciones / scripts", "helper": "Ayudantes", "sensor": "Otros sensores", "unavailable": "No disponibles"},
    d: {"all": "Todas las entidades que conoce Home Assistant", "illuminance": "Sensores de luminosidad (lux)", "temperature": "Sensores que miden una temperatura", "humidity": "Sensores de humedad", "power": "Potencia instantánea (W, kW)", "energy": "Contadores de energía (Wh, kWh)", "consumption": "Gas, agua, volumen y todo lo que se llama consumo", "voltage": "Sensores de tensión (V, mV, kV)", "frequency": "Sensores de frecuencia (Hz)", "current": "Corriente y factor de potencia (A, mA)", "battery": "Niveles de batería, los más débiles primero", "cover": "Persianas, contraventanas, puertas de garaje: posición", "tilt": "Persianas con lamas orientables: ángulo de las lamas", "light": "Todas las luces", "dimmer": "Luces regulables", "switch": "Interruptores, enchufes y ayudantes de encendido/apagado", "climate": "Termostatos y bombas de calor: actual, objetivo, modo", "media": "Televisores, altavoces y otros reproductores", "binary": "Sensores de movimiento, contacto, ventana, humo …", "person": "Personas con sus rastreadores y su cuenta vinculada", "users": "Cuentas de acceso de Home Assistant (requiere derechos de administrador)", "presence": "Rastreadores de dispositivos", "scene": "Escenas con su última activación", "labels": "Cada entidad que tiene al menos una etiqueta", "auto": "Automatizaciones y scripts", "helper": "input_*, contadores, temporizadores, programaciones", "sensor": "Sensores que no encajan en ninguna pestaña de medición", "unavailable": "Entidades que ahora no están disponibles o son desconocidas"},
  },
  nl: {
    scTitle: "Statusklasse",
    scNone: "geen (geen statusklasse)",
    scMeasurement: "measurement: een momentane waarde die stijgt en daalt, bijv. temperatuur, vermogen, vochtigheid.",
    scTotal: "total: een teller die ook kan dalen, bijv. een teller met reset of een saldo.",
    scTotalInc: "total_increasing: een teller die alleen stijgt (en opnieuw bij 0 begint), bijv. energie in kWh, gas, water.",
    scStatsBusy: "Langetermijnstatistieken worden gecontroleerd …",
    scStatsYes: "Voor deze entiteit bestaan langetermijnstatistieken ({what}, eenheid {unit}, bron {src}). Home Assistant bewaart ze als uurwaarden voor het energiedashboard en de geschiedenisgrafieken.",
    scStatsNo: "Geen langetermijnstatistieken: alleen entiteiten met een statusklasse (en eenheid) krijgen ze. Zonder blijft alleen de geschiedenis van losse waarden over, en die wordt na de bewaartijd van de recorder verwijderd.",
    scStatsFail: "De langetermijnstatistieken konden niet worden gelezen.",
    scChange: "Kan dit worden gewijzigd? Niet hier en ook niet in de entiteitsinstellingen van Home Assistant: de integratie die de sensor levert bepaalt het. Uitzonderingen: in configuration.yaml met customize (state_class:) en bij sjabloonhelpers die je zelf maakt.",
    scRecNote: "De bewaartijd van Entity Inventory verkort alleen de geschiedenis van losse waarden van een entiteit. De langetermijnstatistieken blijven ongemoeid.",
    scDevTools: "Ontwikkelaarstools → Statistieken",
    scTip: "Statusklasse van de entiteit (klik voor uitleg)",
    c_recupd: "Laatste melding",
    recColsTip: "Recorderkolommen tonen (bewaard sinds, items, gem. interval) (gemarkeerd = getoond)",
    c_recrows: "Items",
    c_recint: "Gem. interval",
    retStats: "Items in de recorder: {rows} · ongeveer {perday} per dag · gemiddeld interval {int}",
    retStatsTip: "Items in de recorder: {rows} (ongeveer {perday} per dag), gemiddeld interval tussen twee items: {int}",
    c_retention: "Bewaard sinds (dagen, recorder)",
    retTitle: "Recorder – bewaartijd",
    retBtn: "Recorder",
    retTip: "Recorder-bewaartijd van deze entiteit: klik opent het venster, Shift+klik typt de dagen hier",
    retIntro: "De geschiedenis van deze entiteit (recorderdatabase) die ouder is dan het gekozen aantal dagen wordt elke nacht verwijderd. Een regel kan de globale bewaartijd van de recorder (purge_keep_days) alleen verkorten, niet verlengen.",
    retNone: "Geen regel (recorderstandaard)",
    retDays: "{n} dagen",
    retCustom: "Ander aantal dagen",
    retJob: "Nachtelijke taak (03:20) uitvoeren voor alle entiteiten met een regel of de standaard",
    retRules: "{n} entiteiten met een regel",
    retRunNow: "Nu uitvoeren",
    retRunAsk: "Dit verwijdert nu geschiedenis uit de recorderdatabase. Het kan niet ongedaan worden gemaakt.",
    retLast: "Laatste keer: {t}",
    retDone: "Klaar: {n} entiteiten verwerkt.",
    retFail: "De recorder meldt een fout: {e}",
    retNoRec: "De recorder is niet beschikbaar.",
    retAdmin: "Alleen beheerders kunnen de bewaartijd wijzigen.",
    retNever: "nooit",
    retSince: "In de recorder sinds: {t} ({n} dagen)",
    retSinceNone: "Geen geschiedenis in de recorder.",
    retSinceFail: "De leeftijd van de geschiedenis kon niet worden gelezen.",
    retSinceBusy: "Leeftijd van de geschiedenis wordt gelezen …",
    retShort: "{n} d",
    retRule: "regel: {n} d",
    retErr: "De recorderquery is mislukt: {e}",
    retGlobal: "De recorder bewaart de geschiedenis van alle entiteiten {n} dagen (purge_keep_days).",
    retGlobalUnknown: "De globale bewaartijd van de recorder kon niet worden gelezen (draait de recorder?).",
    retMax: "Maximum (nooit verkorten)",
    retRuleNone: "Geen eigen regel: deze entiteit wordt door Entity Inventory niet verkort{d}.",
    retRuleDefault: " – de standaardbewaartijd van {n} dagen is van toepassing",
    retRuleMax: "Nooit verkort door Entity Inventory: de geschiedenis blijft zo lang als de recorder hem bewaart ({g} dagen).",
    retRuleShort: "Geschiedenis van deze entiteit ouder dan {n} dagen wordt elke nacht verwijderd (alleen zolang de nachtelijke taak aan staat).",
    retRuleSame: "Dit komt overeen met de bewaartijd van de recorder van {g} dagen, dus de regel verandert niets.",
    retRuleLong: "De recorder verwijdert geschiedenis na {g} dagen. Deze regel kan niet meer bewaren totdat de recorderinstelling is verhoogd (zie onder).",
    retLongerTitle: "Zo bewaar je gegevens langer dan {g} dagen:",
    retLonger1: "1. Open configuration.yaml en zet purge_keep_days in het blok recorder: op de langste tijd die je nodig hebt (hier {n}). Bestaat er al een recorder:-blok, wijzig dan alleen die regel – voeg geen tweede blok toe.",
    retLonger2: "2. Herstart Home Assistant (Instellingen → Systeem → Herstarten). De recorder leest deze instelling alleen bij het opstarten; Entity Inventory kan haar niet wijzigen.",
    retLonger3: "3. Daarna wordt elke entiteit standaard zo lang bewaard. Om de rest korter te houden stel je hieronder een standaardbewaartijd in: dan houden alleen entiteiten met een langere regel hun geschiedenis zo lang.",
    retLonger4: "Let op: een langere bewaartijd maakt de database groter, grofweg in verhouding tot de dagen.",
    retYamlCopy: "YAML-regels kopiëren",
    retYamlCopied: "Gekopieerd.",
    retAllTitle: "Voor alle entiteiten",
    retDefaultLabel: "Standaardbewaartijd voor alle entiteiten zonder eigen regel (dagen, leeg = geen)",
    retDefaultSave: "Standaard opslaan",
    retDefaultHelp: "Voorbeeld: de recorder bewaart 365 dagen en de standaard is 30: elke entiteit zonder regel wordt 's nachts tot 30 dagen ingekort, entiteiten met een regel van 365 behouden alles. Zonder standaard worden alleen entiteiten met een regel ingekort. Let op: de standaard geldt voor ELKE entiteit in de database, niet alleen voor de hier getoonde.",
    retPreviewBtn: "Voorbeeld",
    retPvTitle: "Wat de nachtelijke taak zou verwijderen",
    retPvGroup: "• {days} dagen: {entities} entiteiten, ongeveer {rows} geschiedenisregels die ouder zijn",
    retPvNone: "Op dit moment zou er niets worden verwijderd.",
    retPvTotal: "Totaal: ongeveer {rows} geschiedenisregels van {entities} entiteiten.",
    retPvSkipped: "{n} entiteiten worden overgeslagen omdat hun bewaartijd niet korter is dan de {g} dagen van de recorder.",
    retPvHow: "Wat de taak doet: ze roept de Home Assistant-service recorder.purge_entities aan, één keer per groep dagen. Ze verwijdert alleen de waardegeschiedenis (states) van deze entiteiten die ouder is dan het aantal dagen. Ze verwijdert NIET de langetermijnstatistieken (energiedashboard, uurwaarden), stopt de opname niet en nieuwe waarden worden gewoon opgeslagen. Verwijderde geschiedenis kan alleen uit een back-up worden hersteld.",
    retPvFail: "Het voorbeeld is mislukt: {e}",
    retPvBusy: "Tellen – bij een grote database kan dit enkele seconden duren …",
    retEnableTitle: "Nachtelijke bewaartaak inschakelen?",
    retEnableText: "Vanaf nu draait de taak elke nacht om 03:20 en verwijdert geschiedenis die ouder is dan de bewaartijd van de entiteit (eigen regel, anders de standaard). Dit geldt ook voor entiteiten die je niet in deze tabel ziet.",
    retDefaultConfirmTitle: "Standaardbewaartijd instellen?",
    retDefaultConfirmText: "Vanaf nu telt elke entiteit zonder eigen regel als: {n} dagen bewaren. Dat zijn alle entiteiten waarvoor de recorder geschiedenis heeft, niet maar één tabblad. Het werkt alleen zolang de nachtelijke taak aan staat (of als je hem handmatig uitvoert).",
    retDefaultOff: "De standaardbewaartijd wordt verwijderd. Entiteiten zonder eigen regel worden niet meer door Entity Inventory verkort.",
    retConfirmOn: "Inschakelen",
    retDeleteNow: "Nu verwijderen",
    retSave: "Opslaan",
    retRunTitle: "Geschiedenis nu verwijderen?",
    blurTip: "Gevoelige gegevens vervagen (gebruikers-ID’s, gebruikersnamen, trackers, personen, opmerkingen), bijv. voor schermafdrukken (gemarkeerd = aan)",
    title: "Entity Inventory",
    tabsBtn: "Tabbladen tonen of verbergen",
    tabsShowAll: "Alles tonen",
    tabsClose: "Sluiten",
    gLight: "Alles en licht",
    gElectro: "Elektrisch",
    gClimate: "Klimaat",
    gCover: "Zonwering",
    gUsage: "Verbruik",
    gAuto: "Automatisering",
    gMore: "Meer",
    search: "Zoeken (naam, entiteits-ID, ruimte, apparaat, integratie …)",
    count: "Getoonde entiteiten / in dit tabblad",
    csv: "CSV exporteren",
    print: "Afdrukken / PDF",
    pause: "Live-update pauzeren",
    resume: "Live-update hervatten",
    allAreas: "Alle ruimtes",
    allInts: "Alle integraties",
    hidden: "Verborgen / uitgeschakelde entiteiten tonen (gemarkeerd = getoond)",
    copied: "Gekopieerd",
    wideTip: "Ruimere regelafstand (gemarkeerd = aan)",
    hideOff: "Niet-beschikbare / onbekende entiteiten verbergen (gemarkeerd = verborgen)",
    none: "Geen entiteiten in dit tabblad.",
    c_led: "Status",
    c_name: "Naam",
    c_id: "Entiteits-ID",
    c_value: "Waarde",
    c_area: "Ruimte",
    c_device: "Apparaat",
    labelTitle: "Label",
    labelName: "Naam",
    labelIcon: "Pictogram (bijv. mdi:tag)",
    labelColor: "Kleur",
    labelDesc: "Beschrijving",
    labelEntities: "Entiteiten met dit label",
    labelManage: "Labelinstellingen",
    labelCount: "{n} entiteiten in dit tabblad / {m} in totaal",
    labelFail: "Opslaan mislukt",
    labelNone: "geen",
    c_labels: "Labels",
    allLabels: "Alle labels",
    noLabel: "Zonder label",
    c_platform: "Integratie",
    c_class: "Klasse",
    c_changed: "Gewijzigd",
    c_pos: "Positie",
    c_tilt: "Lamelhoek",
    c_bright: "Helderheid",
    c_cur: "Huidig",
    c_target: "Doel",
    c_mode: "Modus",
    c_action: "Actie",
    c_unit: "Eenheid",
    c_state: "Status",
    onlyNotes: "Alleen items met opmerking en/of foto (gemarkeerd = actief)",
    cfgBtn: "Kolommen bewerken (scherm en printer)",
    tgtView: "Scherm",
    tgtPrint: "Printer",
    autoTip: "Kolombreedtes aanpassen aan de breedste inhoud",
    resetTip: "Indeling herstellen",
    resetAsk: "Kolomindeling terugzetten naar de standaard?",
    doneTip: "Klaar",
    renameTip: "Kolomnaam (leeg = standaard)",
    stand: "Stand van",
    entities: "entiteiten",
    printFail: "Afdrukken mislukt",
    portrait: "Afdrukken: staand (klik: liggend)",
    landscape: "Afdrukken: liggend (klik: staand)",
    showBadges: "Rode cijfers op de tabbladen tonen (niet-beschikbare entiteiten)",
    hideBadges: "Rode cijfers op de tabbladen verbergen",
    copyTip: "Entiteits-ID kopiëren",
    copyNameTip: "Naam kopiëren",
    copyValueTip: "Waarde kopiëren",
    editConfirmName: "Naam wijzigen?\n\n{old}\n→ {new}",
    editConfirmId: "Entiteits-ID wijzigen?\n\n{old}\n→ {new}\n\nAutomatiseringen, scripts en dashboards die het oude ID gebruiken moeten worden aangepast.",
    idLabel: "Entiteits-ID",
    idWarn: "Automatiseringen, scripts, dashboards en sjablonen die het oude ID gebruiken worden hier NIET door Home Assistant aangepast – controleer ze daarna.",
    idInvalid: "Ongeldig entiteits-ID. Het moet het domein behouden en alleen a-z, 0-9 en _ gebruiken (bijv. {d}.naam).",
    alignDec: "Waarden uitgelijnd op de decimaalscheiding (klik: links)",
    alignLeft: "Waarden links uitgelijnd (klik: rechts)",
    alignRight: "Waarden rechts uitgelijnd (klik: op decimaalscheiding)",
    nameTitle: "Entiteit hernoemen",
    nameLabel: "Naam",
    nameHintDev: "Home Assistant zet de apparaatnaam ervoor: \"{dev}\"",
    nameDefault: "Standaardnaam: {n}",
    nameReset: "Terug naar standaard",
    nameDetails: "Geschiedenis / details",
    nameFail: "Opslaan mislukt",
    nameNoReg: "Deze entiteit heeft geen uniek ID, staat dus niet in het entiteitenregister en kan hier niet worden hernoemd.",
    nameAdmin: "Alleen beheerders kunnen entiteiten hernoemen.",
    c_icon: "Pictogram",
    iconTip: "Pictogram wijzigen (opent de instellingen van de entiteit)",
    iconNoReg: "Het pictogram van deze entiteit kan niet worden gewijzigd: zonder uniek ID staat ze niet in het entiteitenregister.",
    iconAdmin: "Alleen beheerders kunnen het pictogram wijzigen.",
    c_access: "r/w",
    accessTip: {"r": "r = alleen lezen (gemeten of gemelde waarde)", "w": "w = alleen schrijven (trigger zonder eigen status)", "rw": "rw = leesbaar en bestuurbaar"},
    c_photos: "Foto's",
    c_docs: "Documenten",
    c_note: "Opmerking",
    photosTitle: "Foto's",
    addPhotos: "Foto's toevoegen",
    docsTitle: "Documenten",
    addDocs: "Documenten toevoegen",
    noteTitle: "Opmerking",
    save: "Opslaan",
    cancel: "Annuleren",
    del: "Verwijderen",
    rename: "Hernoemen",
    renamePrompt: "Nieuwe naam",
    confirmDel: "{name} echt verwijderen?",
    uploadFail: "Uploaden mislukt",
    noPhotos: "Nog geen foto's.",
    noDocs: "Nog geen documenten (bijv. stroomcontract, gascontract, foto van de meter).",
    notePh: "Opmerking (locatie, zekering, contractnummer …)",
    c_trackers: "Trackers",
    c_source: "Bron",
    c_username: "Gebruikersnaam",
    c_person: "Persoon",
    c_role: "Rol",
    c_provider: "Aanmeldmethode",
    c_local: "Alleen lokaal",
    c_system: "Systeemaccount",
    c_userid: "Gebruikers-ID",
    c_active: "Actief",
    yes: "✓",
    no: "–",
    c_sc: "Statusklasse",
    c_maker: "Fabrikant",
    c_model: "Model",
    on: "aan",
    off: "uit",
    roleOwner: "Eigenaar",
    roleRead: "Alleen lezen",
    ago: {"s": "zojuist", "m": "{n} min geleden", "h": "{n} u geleden", "d": "{n} d geleden"},
    t: {"all": "Alle entiteiten", "illuminance": "Helderheid", "temperature": "Temperatuur", "humidity": "Vochtigheid", "power": "Vermogen", "energy": "Energie", "consumption": "Verbruik", "voltage": "Spanning", "frequency": "Frequentie", "current": "Stroom", "battery": "Batterijen", "cover": "Zonwering", "tilt": "Lamellen", "light": "Lampen", "dimmer": "Dimmers", "switch": "Schakelaars", "climate": "Thermostaten", "media": "Media", "person": "Personen", "users": "Gebruikersaccounts", "binary": "Binaire sensoren", "presence": "Trackers", "scene": "Scènes", "labels": "Labels", "auto": "Automatiseringen / scripts", "helper": "Hulpmiddelen", "sensor": "Overige sensoren", "unavailable": "Niet beschikbaar"},
    d: {"all": "Elke entiteit die Home Assistant kent", "illuminance": "Helderheidssensoren (lux)", "temperature": "Sensoren die een temperatuur meten", "humidity": "Vochtigheidssensoren", "power": "Momentaan vermogen (W, kW)", "energy": "Energietellers (Wh, kWh)", "consumption": "Gas, water, volume en alles wat verbruik heet", "voltage": "Spanningssensoren (V, mV, kV)", "frequency": "Frequentiesensoren (Hz)", "current": "Stroom en arbeidsfactor (A, mA)", "battery": "Batterijniveaus, de zwakste eerst", "cover": "Zonwering, rolluiken, garagedeuren: positie", "tilt": "Zonwering met verstelbare lamellen: lamelhoek", "light": "Alle lampen", "dimmer": "Dimbare lampen", "switch": "Schakelaars, stopcontacten en aan/uit-hulpmiddelen", "climate": "Thermostaten en warmtepompen: huidig, doel, modus", "media": "Tv's, luidsprekers en andere spelers", "binary": "Beweging-, contact-, raam-, rooksensoren …", "person": "Personen met hun trackers en gekoppelde account", "users": "Inlogaccounts van Home Assistant (beheerdersrechten nodig)", "presence": "Apparaattrackers", "scene": "Scènes met hun laatste activering", "labels": "Elke entiteit met minstens één label", "auto": "Automatiseringen en scripts", "helper": "input_*, tellers, timers, schema's", "sensor": "Sensoren die in geen meettabblad passen", "unavailable": "Entiteiten die nu niet beschikbaar of onbekend zijn"},
  },
  it: {
    scTitle: "Classe di stato",
    scNone: "nessuna (nessuna classe di stato)",
    scMeasurement: "measurement: un valore istantaneo che sale e scende, ad es. temperatura, potenza, umidità.",
    scTotal: "total: un contatore che può anche diminuire, ad es. un contatore con azzeramento o un saldo.",
    scTotalInc: "total_increasing: un contatore che solo sale (e riparte da 0), ad es. energia in kWh, gas, acqua.",
    scStatsBusy: "Controllo delle statistiche a lungo termine …",
    scStatsYes: "Esistono statistiche a lungo termine per questa entità ({what}, unità {unit}, origine {src}). Home Assistant le conserva come valori orari per la dashboard energia e i grafici della cronologia.",
    scStatsNo: "Nessuna statistica a lungo termine: le hanno solo le entità con una classe di stato (e un’unità). Senza, resta solo la cronologia dei singoli valori, che viene eliminata dopo la conservazione del recorder.",
    scStatsFail: "Impossibile leggere le statistiche a lungo termine.",
    scChange: "Si può cambiare? Non qui e nemmeno nelle impostazioni dell’entità di Home Assistant: decide l’integrazione che fornisce il sensore. Eccezioni: in configuration.yaml con customize (state_class:) e per gli helper template che crei tu.",
    scRecNote: "La conservazione di Entity Inventory accorcia solo la cronologia dei singoli valori di un’entità. Le statistiche a lungo termine restano intatte.",
    scDevTools: "Strumenti per sviluppatori → Statistiche",
    scTip: "Classe di stato dell’entità (clic per una spiegazione)",
    c_recupd: "Ultimo aggiornamento",
    recColsTip: "Mostra le colonne del recorder (conservato da, voci, intervallo medio) (evidenziato = mostrate)",
    c_recrows: "Voci",
    c_recint: "Intervallo medio",
    retStats: "Voci nel recorder: {rows} · circa {perday} al giorno · intervallo medio {int}",
    retStatsTip: "Voci nel recorder: {rows} (circa {perday} al giorno), intervallo medio tra due voci: {int}",
    c_retention: "Conservato da (giorni, recorder)",
    retTitle: "Recorder – conservazione",
    retBtn: "Recorder",
    retTip: "Conservazione di questa entità nel recorder: il clic apre la finestra, Maiusc+clic scrive i giorni qui",
    retIntro: "La cronologia di questa entità (database del recorder) più vecchia del numero di giorni scelto viene eliminata ogni notte. Una regola può solo accorciare la conservazione globale del recorder (purge_keep_days), non allungarla.",
    retNone: "Nessuna regola (predefinito del recorder)",
    retDays: "{n} giorni",
    retCustom: "Altro numero di giorni",
    retJob: "Esegui l’attività notturna (03:20) per tutte le entità con una regola o il valore predefinito",
    retRules: "{n} entità con una regola",
    retRunNow: "Esegui ora",
    retRunAsk: "Questo elimina ora cronologia dal database del recorder. Non si può annullare.",
    retLast: "Ultima esecuzione: {t}",
    retDone: "Fatto: {n} entità elaborate.",
    retFail: "Il recorder segnala un errore: {e}",
    retNoRec: "Il recorder non è disponibile.",
    retAdmin: "Solo gli amministratori possono modificare la conservazione.",
    retNever: "mai",
    retSince: "Nel recorder dal: {t} ({n} giorni)",
    retSinceNone: "Nessuna cronologia nel recorder.",
    retSinceFail: "Impossibile leggere l’età della cronologia.",
    retSinceBusy: "Lettura dell’età della cronologia …",
    retShort: "{n} g",
    retRule: "regola: {n} g",
    retErr: "La richiesta al recorder non è riuscita: {e}",
    retGlobal: "Il recorder conserva la cronologia di tutte le entità per {n} giorni (purge_keep_days).",
    retGlobalUnknown: "Impossibile leggere la conservazione globale del recorder (il recorder è in esecuzione?).",
    retMax: "Massimo (mai accorciare)",
    retRuleNone: "Nessuna regola propria: questa entità non viene accorciata da Entity Inventory{d}.",
    retRuleDefault: " – vale la conservazione predefinita di {n} giorni",
    retRuleMax: "Mai accorciata da Entity Inventory: la cronologia resta finché il recorder la conserva ({g} giorni).",
    retRuleShort: "La cronologia di questa entità più vecchia di {n} giorni viene eliminata ogni notte (solo finché l’attività notturna è attiva).",
    retRuleSame: "Corrisponde alla conservazione del recorder di {g} giorni, quindi la regola non cambia nulla.",
    retRuleLong: "Il recorder elimina la cronologia dopo {g} giorni. Questa regola non può conservare di più finché l’impostazione del recorder non viene aumentata (vedi sotto).",
    retLongerTitle: "Per conservare i dati più di {g} giorni:",
    retLonger1: "1. Apri configuration.yaml e imposta purge_keep_days nel blocco recorder: al tempo massimo che ti serve (qui {n}). Se esiste già un blocco recorder:, modifica solo quella riga – non aggiungere un secondo blocco.",
    retLonger2: "2. Riavvia Home Assistant (Impostazioni → Sistema → Riavvia). Il recorder legge questa impostazione solo all’avvio; Entity Inventory non può modificarla.",
    retLonger3: "3. Poi ogni entità viene conservata per impostazione predefinita così a lungo. Per tenere il resto più corto, imposta sotto una conservazione predefinita: solo le entità con una regola più lunga mantengono la cronologia così a lungo.",
    retLonger4: "Nota: una conservazione più lunga ingrandisce il database, all’incirca in proporzione ai giorni.",
    retYamlCopy: "Copia le righe YAML",
    retYamlCopied: "Copiato.",
    retAllTitle: "Per tutte le entità",
    retDefaultLabel: "Conservazione predefinita per tutte le entità senza regola propria (giorni, vuoto = nessuna)",
    retDefaultSave: "Salva predefinito",
    retDefaultHelp: "Esempio: il recorder conserva 365 giorni e il predefinito è 30: ogni entità senza regola viene ridotta a 30 giorni di notte, le entità con una regola di 365 mantengono tutto. Senza predefinito vengono ridotte solo le entità con una regola. Attenzione: il predefinito vale per OGNI entità del database, non solo per quelle mostrate qui.",
    retPreviewBtn: "Anteprima",
    retPvTitle: "Cosa eliminerebbe l’attività notturna",
    retPvGroup: "• {days} giorni: {entities} entità, circa {rows} righe di cronologia più vecchie",
    retPvNone: "Al momento non verrebbe eliminato nulla.",
    retPvTotal: "Totale: circa {rows} righe di cronologia di {entities} entità.",
    retPvSkipped: "{n} entità vengono saltate perché la loro conservazione non è più breve dei {g} giorni del recorder.",
    retPvHow: "Cosa fa l’attività: chiama il servizio di Home Assistant recorder.purge_entities una volta per gruppo di giorni. Elimina solo la cronologia dei valori (states) di queste entità più vecchia del numero di giorni. NON elimina le statistiche a lungo termine (dashboard energia, valori orari), non interrompe la registrazione e i nuovi valori vengono salvati come al solito. La cronologia eliminata si può ripristinare solo da un backup.",
    retPvFail: "Anteprima non riuscita: {e}",
    retPvBusy: "Conteggio – su un database grande può richiedere alcuni secondi …",
    retEnableTitle: "Attivare l’attività di conservazione notturna?",
    retEnableText: "Da ora l’attività viene eseguita ogni notte alle 03:20 ed elimina la cronologia più vecchia della conservazione della sua entità (regola propria, altrimenti predefinita). Vale anche per entità che non vedi in questa tabella.",
    retDefaultConfirmTitle: "Impostare la conservazione predefinita?",
    retDefaultConfirmText: "Da ora ogni entità senza regola propria conta come: conserva {n} giorni. Sono tutte le entità con cronologia nel recorder, non solo una scheda. Ha effetto solo finché l’attività notturna è attiva (o se la esegui a mano).",
    retDefaultOff: "La conservazione predefinita viene rimossa. Le entità senza regola propria non vengono più accorciate da Entity Inventory.",
    retConfirmOn: "Attiva",
    retDeleteNow: "Elimina ora",
    retSave: "Salva",
    retRunTitle: "Eliminare la cronologia ora?",
    blurTip: "Sfocare i dati sensibili (ID e nomi utente, tracker, persone, commenti), ad es. per gli screenshot (evidenziato = attivo)",
    title: "Entity Inventory",
    tabsBtn: "Mostra o nascondi le schede",
    tabsShowAll: "Mostra tutte",
    tabsClose: "Chiudi",
    gLight: "Tutto e luce",
    gElectro: "Elettricità",
    gClimate: "Clima",
    gCover: "Tapparelle",
    gUsage: "Consumo",
    gAuto: "Automazione",
    gMore: "Altro",
    search: "Cerca (nome, ID entità, area, dispositivo, integrazione …)",
    count: "Entità mostrate / in questa scheda",
    csv: "Esporta CSV",
    print: "Stampa / PDF",
    pause: "Sospendi l'aggiornamento in tempo reale",
    resume: "Riprendi l'aggiornamento in tempo reale",
    allAreas: "Tutte le aree",
    allInts: "Tutte le integrazioni",
    hidden: "Mostra entità nascoste / disattivate (evidenziato = mostrate)",
    copied: "Copiato",
    wideTip: "Interlinea più ampia (evidenziato = attivo)",
    hideOff: "Nascondi entità non disponibili / sconosciute (evidenziato = nascoste)",
    none: "Nessuna entità in questa scheda.",
    c_led: "Stato",
    c_name: "Nome",
    c_id: "ID entità",
    c_value: "Valore",
    c_area: "Area",
    c_device: "Dispositivo",
    labelTitle: "Etichetta",
    labelName: "Nome",
    labelIcon: "Icona (es. mdi:tag)",
    labelColor: "Colore",
    labelDesc: "Descrizione",
    labelEntities: "Entità con questa etichetta",
    labelManage: "Impostazioni etichette",
    labelCount: "{n} entità in questa scheda / {m} in totale",
    labelFail: "Salvataggio non riuscito",
    labelNone: "nessuno",
    c_labels: "Etichette",
    allLabels: "Tutte le etichette",
    noLabel: "Senza etichetta",
    c_platform: "Integrazione",
    c_class: "Classe",
    c_changed: "Modificato",
    c_pos: "Posizione",
    c_tilt: "Angolo delle lamelle",
    c_bright: "Luminosità",
    c_cur: "Attuale",
    c_target: "Obiettivo",
    c_mode: "Modalità",
    c_action: "Azione",
    c_unit: "Unità",
    c_state: "Stato",
    onlyNotes: "Solo voci con commento e/o foto (evidenziato = attivo)",
    cfgBtn: "Modifica colonne (schermo e stampante)",
    tgtView: "Schermo",
    tgtPrint: "Stampante",
    autoTip: "Adatta la larghezza delle colonne al contenuto più largo",
    resetTip: "Ripristina il layout",
    resetAsk: "Ripristinare il layout predefinito delle colonne?",
    doneTip: "Fatto",
    renameTip: "Nome della colonna (vuoto = predefinito)",
    stand: "Aggiornato al",
    entities: "entità",
    printFail: "Stampa non riuscita",
    portrait: "Stampa: verticale (clic: orizzontale)",
    landscape: "Stampa: orizzontale (clic: verticale)",
    showBadges: "Mostra i numeri rossi sulle schede (entità non disponibili)",
    hideBadges: "Nascondi i numeri rossi sulle schede",
    copyTip: "Copia l'ID entità",
    copyNameTip: "Copia il nome",
    copyValueTip: "Copia il valore",
    editConfirmName: "Cambiare il nome?\n\n{old}\n→ {new}",
    editConfirmId: "Cambiare l'ID entità?\n\n{old}\n→ {new}\n\nAutomazioni, script e dashboard che usano il vecchio ID devono essere adattati.",
    idLabel: "ID entità",
    idWarn: "Automazioni, script, dashboard e template che usano il vecchio ID NON vengono modificati qui da Home Assistant – controllali dopo.",
    idInvalid: "ID entità non valido. Deve mantenere il dominio e usare solo a-z, 0-9 e _ (es. {d}.nome).",
    alignDec: "Valori allineati al separatore decimale (clic: a sinistra)",
    alignLeft: "Valori allineati a sinistra (clic: a destra)",
    alignRight: "Valori allineati a destra (clic: al separatore decimale)",
    nameTitle: "Rinomina entità",
    nameLabel: "Nome",
    nameHintDev: "Home Assistant antepone il nome del dispositivo: «{dev}»",
    nameDefault: "Nome predefinito: {n}",
    nameReset: "Ripristina il predefinito",
    nameDetails: "Cronologia / dettagli",
    nameFail: "Salvataggio non riuscito",
    nameNoReg: "Questa entità non ha un ID univoco, quindi non è nel registro delle entità e non può essere rinominata qui.",
    nameAdmin: "Solo gli amministratori possono rinominare le entità.",
    c_icon: "Icona",
    iconTip: "Cambia l'icona (apre le impostazioni dell'entità)",
    iconNoReg: "L'icona di questa entità non può essere cambiata: senza ID univoco non è nel registro delle entità.",
    iconAdmin: "Solo gli amministratori possono cambiare l'icona.",
    c_access: "r/w",
    accessTip: {"r": "r = sola lettura (valore misurato o riportato)", "w": "w = sola scrittura (trigger senza stato proprio)", "rw": "rw = leggibile e controllabile"},
    c_photos: "Foto",
    c_docs: "Documenti",
    c_note: "Commento",
    photosTitle: "Foto",
    addPhotos: "Aggiungi foto",
    docsTitle: "Documenti",
    addDocs: "Aggiungi documenti",
    noteTitle: "Commento",
    save: "Salva",
    cancel: "Annulla",
    del: "Elimina",
    rename: "Rinomina",
    renamePrompt: "Nuovo nome",
    confirmDel: "Eliminare davvero {name}?",
    uploadFail: "Caricamento non riuscito",
    noPhotos: "Ancora nessuna foto.",
    noDocs: "Ancora nessun documento (es. contratto luce, contratto gas, foto del contatore).",
    notePh: "Commento (posizione, fusibile, numero di contratto …)",
    c_trackers: "Tracker",
    c_source: "Origine",
    c_username: "Nome utente",
    c_person: "Persona",
    c_role: "Ruolo",
    c_provider: "Metodo di accesso",
    c_local: "Solo locale",
    c_system: "Account di sistema",
    c_userid: "ID utente",
    c_active: "Attivo",
    yes: "✓",
    no: "–",
    c_sc: "Classe di stato",
    c_maker: "Produttore",
    c_model: "Modello",
    on: "acceso",
    off: "spento",
    roleOwner: "Proprietario",
    roleRead: "Sola lettura",
    ago: {"s": "adesso", "m": "{n} min fa", "h": "{n} h fa", "d": "{n} g fa"},
    t: {"all": "Tutte le entità", "illuminance": "Luminosità", "temperature": "Temperatura", "humidity": "Umidità", "power": "Potenza", "energy": "Energia", "consumption": "Consumo", "voltage": "Tensione", "frequency": "Frequenza", "current": "Corrente", "battery": "Batterie", "cover": "Tapparelle", "tilt": "Lamelle", "light": "Luci", "dimmer": "Dimmer", "switch": "Interruttori", "climate": "Termostati", "media": "Multimedia", "person": "Persone", "users": "Account utente", "binary": "Sensori binari", "presence": "Tracker", "scene": "Scene", "labels": "Etichette", "auto": "Automazioni / script", "helper": "Aiutanti", "sensor": "Altri sensori", "unavailable": "Non disponibili"},
    d: {"all": "Ogni entità che Home Assistant conosce", "illuminance": "Sensori di luminosità (lux)", "temperature": "Sensori che misurano una temperatura", "humidity": "Sensori di umidità", "power": "Potenza istantanea (W, kW)", "energy": "Contatori di energia (Wh, kWh)", "consumption": "Gas, acqua, volume e tutto ciò che si chiama consumo", "voltage": "Sensori di tensione (V, mV, kV)", "frequency": "Sensori di frequenza (Hz)", "current": "Corrente e fattore di potenza (A, mA)", "battery": "Livelli delle batterie, le più deboli per prime", "cover": "Tapparelle, persiane, porte del garage: posizione", "tilt": "Tapparelle con lamelle orientabili: angolo delle lamelle", "light": "Tutte le luci", "dimmer": "Luci dimmerabili", "switch": "Interruttori, prese e aiutanti on/off", "climate": "Termostati e pompe di calore: attuale, obiettivo, modalità", "media": "TV, altoparlanti e altri lettori", "binary": "Sensori di movimento, contatto, finestra, fumo …", "person": "Persone con i loro tracker e l'account collegato", "users": "Account di accesso di Home Assistant (servono diritti di amministratore)", "presence": "Tracker di dispositivi", "scene": "Scene con la loro ultima attivazione", "labels": "Ogni entità con almeno un'etichetta", "auto": "Automazioni e script", "helper": "input_*, contatori, timer, pianificazioni", "sensor": "Sensori che non rientrano in nessuna scheda di misura", "unavailable": "Entità al momento non disponibili o sconosciute"},
  },
  pl: {
    scTitle: "Klasa stanu",
    scNone: "brak (bez klasy stanu)",
    scMeasurement: "measurement: wartość chwilowa, która rośnie i maleje, np. temperatura, moc, wilgotność.",
    scTotal: "total: licznik, który może też maleć, np. licznik z resetem lub saldo.",
    scTotalInc: "total_increasing: licznik, który tylko rośnie (i zaczyna od 0), np. energia w kWh, gaz, woda.",
    scStatsBusy: "Sprawdzanie statystyk długoterminowych …",
    scStatsYes: "Dla tej encji istnieją statystyki długoterminowe ({what}, jednostka {unit}, źródło {src}). Home Assistant przechowuje je jako wartości godzinowe dla panelu energii i wykresów historii.",
    scStatsNo: "Brak statystyk długoterminowych: mają je tylko encje z klasą stanu (i jednostką). Bez nich zostaje tylko historia pojedynczych wartości, usuwana po okresie przechowywania rejestratora.",
    scStatsFail: "Nie można odczytać statystyk długoterminowych.",
    scChange: "Czy można to zmienić? Nie tutaj ani w ustawieniach encji Home Assistanta: decyduje integracja dostarczająca czujnik. Wyjątki: w configuration.yaml z customize (state_class:) oraz w pomocnikach szablonowych tworzonych przez ciebie.",
    scRecNote: "Przechowywanie w Entity Inventory skraca tylko historię pojedynczych wartości encji. Statystyki długoterminowe pozostają nietknięte.",
    scDevTools: "Narzędzia deweloperskie → Statystyki",
    scTip: "Klasa stanu encji (kliknij po wyjaśnienie)",
    c_recupd: "Ostatni raport",
    recColsTip: "Pokaż kolumny rejestratora (przechowywane od, wpisy, średni odstęp) (podświetlone = pokazane)",
    c_recrows: "Wpisy",
    c_recint: "Śr. odstęp",
    retStats: "Wpisy w rejestratorze: {rows} · około {perday} dziennie · średni odstęp {int}",
    retStatsTip: "Wpisy w rejestratorze: {rows} (około {perday} dziennie), średni odstęp między dwoma wpisami: {int}",
    c_retention: "Przechowywane od (dni, rejestrator)",
    retTitle: "Rejestrator – przechowywanie",
    retBtn: "Rejestrator",
    retTip: "Przechowywanie tej encji w rejestratorze: kliknięcie otwiera okno, Shift+kliknięcie pozwala wpisać dni tutaj",
    retIntro: "Historia tej encji (baza danych rejestratora) starsza niż wybrana liczba dni jest usuwana co noc. Reguła może tylko skrócić globalne przechowywanie rejestratora (purge_keep_days), nie wydłużyć go.",
    retNone: "Brak reguły (domyślnie rejestrator)",
    retDays: "{n} dni",
    retCustom: "Inna liczba dni",
    retJob: "Uruchamiaj nocne zadanie (03:20) dla wszystkich encji z regułą lub wartością domyślną",
    retRules: "{n} encji z regułą",
    retRunNow: "Uruchom teraz",
    retRunAsk: "To usuwa teraz historię z bazy danych rejestratora. Nie można tego cofnąć.",
    retLast: "Ostatnie uruchomienie: {t}",
    retDone: "Gotowe: przetworzono {n} encji.",
    retFail: "Rejestrator zgłosił błąd: {e}",
    retNoRec: "Rejestrator jest niedostępny.",
    retAdmin: "Tylko administratorzy mogą zmienić przechowywanie.",
    retNever: "nigdy",
    retSince: "W rejestratorze od: {t} ({n} dni)",
    retSinceNone: "Brak historii w rejestratorze.",
    retSinceFail: "Nie można odczytać wieku historii.",
    retSinceBusy: "Odczyt wieku historii …",
    retShort: "{n} d",
    retRule: "reguła: {n} d",
    retErr: "Zapytanie do rejestratora nie powiodło się: {e}",
    retGlobal: "Rejestrator przechowuje historię wszystkich encji przez {n} dni (purge_keep_days).",
    retGlobalUnknown: "Nie można odczytać globalnego przechowywania rejestratora (czy rejestrator działa?).",
    retMax: "Maksimum (nigdy nie skracaj)",
    retRuleNone: "Brak własnej reguły: Entity Inventory nie skraca tej encji{d}.",
    retRuleDefault: " – obowiązuje domyślne przechowywanie {n} dni",
    retRuleMax: "Entity Inventory nigdy tego nie skraca: historia zostaje tak długo, jak trzyma ją rejestrator ({g} dni).",
    retRuleShort: "Historia tej encji starsza niż {n} dni jest usuwana co noc (tylko gdy nocne zadanie jest włączone).",
    retRuleSame: "To odpowiada przechowywaniu rejestratora wynoszącemu {g} dni, więc reguła niczego nie zmienia.",
    retRuleLong: "Rejestrator usuwa historię po {g} dniach. Ta reguła nie może zachować więcej, dopóki ustawienie rejestratora nie zostanie zwiększone (patrz niżej).",
    retLongerTitle: "Aby przechowywać dane dłużej niż {g} dni:",
    retLonger1: "1. Otwórz configuration.yaml i ustaw purge_keep_days w bloku recorder: na najdłuższy potrzebny czas (tutaj {n}). Jeśli blok recorder: już istnieje, zmień tylko tę linię – nie dodawaj drugiego bloku.",
    retLonger2: "2. Uruchom ponownie Home Assistanta (Ustawienia → System → Uruchom ponownie). Rejestrator odczytuje to ustawienie tylko przy starcie; Entity Inventory nie może go zmienić.",
    retLonger3: "3. Potem każda encja jest domyślnie przechowywana tak długo. Aby resztę zachować krócej, ustaw poniżej domyślne przechowywanie: wtedy tylko encje z dłuższą regułą zachowają historię tak długo.",
    retLonger4: "Uwaga: dłuższe przechowywanie powiększa bazę danych, mniej więcej proporcjonalnie do liczby dni.",
    retYamlCopy: "Kopiuj linie YAML",
    retYamlCopied: "Skopiowano.",
    retAllTitle: "Dla wszystkich encji",
    retDefaultLabel: "Domyślne przechowywanie dla wszystkich encji bez własnej reguły (dni, puste = brak)",
    retDefaultSave: "Zapisz wartość domyślną",
    retDefaultHelp: "Przykład: rejestrator trzyma 365 dni, a wartość domyślna to 30: każda encja bez reguły jest w nocy skracana do 30 dni, encje z regułą 365 zachowują wszystko. Bez wartości domyślnej skracane są tylko encje z regułą. Uwaga: wartość domyślna dotyczy KAŻDEJ encji w bazie danych, nie tylko tych pokazanych tutaj.",
    retPreviewBtn: "Podgląd",
    retPvTitle: "Co usunęłoby nocne zadanie",
    retPvGroup: "• {days} dni: {entities} encji, około {rows} starszych wierszy historii",
    retPvNone: "Na razie nic by nie zostało usunięte.",
    retPvTotal: "Razem: około {rows} wierszy historii z {entities} encji.",
    retPvSkipped: "{n} encji jest pomijanych, bo ich przechowywanie nie jest krótsze niż {g} dni rejestratora.",
    retPvHow: "Co robi zadanie: wywołuje usługę Home Assistanta recorder.purge_entities raz na grupę dni. Usuwa tylko historię pojedynczych wartości (states) tych encji, starszą niż liczba dni. NIE usuwa statystyk długoterminowych (panel energii, wartości godzinowe), nie zatrzymuje zapisu, a nowe wartości są zapisywane jak zwykle. Usuniętą historię można odzyskać tylko z kopii zapasowej.",
    retPvFail: "Podgląd się nie powiódł: {e}",
    retPvBusy: "Liczenie – w dużej bazie danych może to potrwać kilka sekund …",
    retEnableTitle: "Włączyć nocne zadanie przechowywania?",
    retEnableText: "Od teraz zadanie działa co noc o 03:20 i usuwa historię starszą niż przechowywanie jej encji (własna reguła, w przeciwnym razie domyślna). Dotyczy to także encji, których nie widzisz w tej tabeli.",
    retDefaultConfirmTitle: "Ustawić domyślne przechowywanie?",
    retDefaultConfirmText: "Od teraz każda encja bez własnej reguły liczy się jako: zachowaj {n} dni. To wszystkie encje, dla których rejestrator ma historię, nie tylko jedna karta. Działa tylko, gdy nocne zadanie jest włączone (lub gdy uruchomisz je ręcznie).",
    retDefaultOff: "Domyślne przechowywanie zostaje usunięte. Encje bez własnej reguły nie są już skracane przez Entity Inventory.",
    retConfirmOn: "Włącz",
    retDeleteNow: "Usuń teraz",
    retSave: "Zapisz",
    retRunTitle: "Usunąć historię teraz?",
    blurTip: "Rozmyj dane wrażliwe (ID i nazwy użytkowników, trackery, osoby, komentarze), np. do zrzutów ekranu (podświetlone = włączone)",
    title: "Entity Inventory",
    tabsBtn: "Pokaż lub ukryj karty",
    tabsShowAll: "Pokaż wszystkie",
    tabsClose: "Zamknij",
    gLight: "Wszystko i światło",
    gElectro: "Elektryka",
    gClimate: "Klimat",
    gCover: "Rolety",
    gUsage: "Zużycie",
    gAuto: "Automatyzacja",
    gMore: "Więcej",
    search: "Szukaj (nazwa, ID encji, obszar, urządzenie, integracja …)",
    count: "Wyświetlone encje / w tej karcie",
    csv: "Eksportuj CSV",
    print: "Drukuj / PDF",
    pause: "Wstrzymaj aktualizację na żywo",
    resume: "Wznów aktualizację na żywo",
    allAreas: "Wszystkie obszary",
    allInts: "Wszystkie integracje",
    hidden: "Pokaż ukryte / wyłączone encje (podświetlone = pokazane)",
    copied: "Skopiowano",
    wideTip: "Większy odstęp między wierszami (podświetlone = włączone)",
    hideOff: "Ukryj niedostępne / nieznane encje (podświetlone = ukryte)",
    none: "Brak encji w tej karcie.",
    c_led: "Status",
    c_name: "Nazwa",
    c_id: "ID encji",
    c_value: "Wartość",
    c_area: "Obszar",
    c_device: "Urządzenie",
    labelTitle: "Etykieta",
    labelName: "Nazwa",
    labelIcon: "Ikona (np. mdi:tag)",
    labelColor: "Kolor",
    labelDesc: "Opis",
    labelEntities: "Encje z tą etykietą",
    labelManage: "Ustawienia etykiet",
    labelCount: "{n} encji w tej karcie / {m} łącznie",
    labelFail: "Zapis nie powiódł się",
    labelNone: "brak",
    c_labels: "Etykiety",
    allLabels: "Wszystkie etykiety",
    noLabel: "Bez etykiety",
    c_platform: "Integracja",
    c_class: "Klasa",
    c_changed: "Zmieniono",
    c_pos: "Pozycja",
    c_tilt: "Kąt lameli",
    c_bright: "Jasność",
    c_cur: "Aktualna",
    c_target: "Zadana",
    c_mode: "Tryb",
    c_action: "Akcja",
    c_unit: "Jednostka",
    c_state: "Stan",
    onlyNotes: "Tylko wpisy z komentarzem i/lub zdjęciem (podświetlone = aktywne)",
    cfgBtn: "Edytuj kolumny (ekran i drukarka)",
    tgtView: "Ekran",
    tgtPrint: "Drukarka",
    autoTip: "Dopasuj szerokość kolumn do najszerszej zawartości",
    resetTip: "Przywróć układ",
    resetAsk: "Przywrócić domyślny układ kolumn?",
    doneTip: "Gotowe",
    renameTip: "Nazwa kolumny (puste = domyślna)",
    stand: "Stan na",
    entities: "encji",
    printFail: "Drukowanie nie powiodło się",
    portrait: "Wydruk: pionowo (kliknij: poziomo)",
    landscape: "Wydruk: poziomo (kliknij: pionowo)",
    showBadges: "Pokaż czerwone liczby na kartach (niedostępne encje)",
    hideBadges: "Ukryj czerwone liczby na kartach",
    copyTip: "Kopiuj ID encji",
    copyNameTip: "Kopiuj nazwę",
    copyValueTip: "Kopiuj wartość",
    editConfirmName: "Zmienić nazwę?\n\n{old}\n→ {new}",
    editConfirmId: "Zmienić ID encji?\n\n{old}\n→ {new}\n\nAutomatyzacje, skrypty i pulpity używające starego ID trzeba dostosować.",
    idLabel: "ID encji",
    idWarn: "Automatyzacje, skrypty, pulpity i szablony używające starego ID NIE są tu zmieniane przez Home Assistanta – sprawdź je potem.",
    idInvalid: "Nieprawidłowe ID encji. Musi zachować domenę i używać tylko a-z, 0-9 i _ (np. {d}.nazwa).",
    alignDec: "Wartości wyrównane do separatora dziesiętnego (kliknij: do lewej)",
    alignLeft: "Wartości wyrównane do lewej (kliknij: do prawej)",
    alignRight: "Wartości wyrównane do prawej (kliknij: do separatora)",
    nameTitle: "Zmień nazwę encji",
    nameLabel: "Nazwa",
    nameHintDev: "Home Assistant dodaje na początku nazwę urządzenia: „{dev}”",
    nameDefault: "Nazwa domyślna: {n}",
    nameReset: "Przywróć domyślną",
    nameDetails: "Historia / szczegóły",
    nameFail: "Zapis nie powiódł się",
    nameNoReg: "Ta encja nie ma unikalnego ID, więc nie ma jej w rejestrze encji i nie można tu zmienić jej nazwy.",
    nameAdmin: "Tylko administratorzy mogą zmieniać nazwy encji.",
    c_icon: "Ikona",
    iconTip: "Zmień ikonę (otwiera ustawienia encji)",
    iconNoReg: "Nie można zmienić ikony tej encji: bez unikalnego ID nie ma jej w rejestrze encji.",
    iconAdmin: "Tylko administratorzy mogą zmieniać ikonę.",
    c_access: "r/w",
    accessTip: {"r": "r = tylko odczyt (wartość zmierzona lub zgłoszona)", "w": "w = tylko zapis (wyzwalacz bez własnego stanu)", "rw": "rw = odczyt i sterowanie"},
    c_photos: "Zdjęcia",
    c_docs: "Dokumenty",
    c_note: "Komentarz",
    photosTitle: "Zdjęcia",
    addPhotos: "Dodaj zdjęcia",
    docsTitle: "Dokumenty",
    addDocs: "Dodaj dokumenty",
    noteTitle: "Komentarz",
    save: "Zapisz",
    cancel: "Anuluj",
    del: "Usuń",
    rename: "Zmień nazwę",
    renamePrompt: "Nowa nazwa",
    confirmDel: "Na pewno usunąć {name}?",
    uploadFail: "Przesyłanie nie powiodło się",
    noPhotos: "Brak zdjęć.",
    noDocs: "Brak dokumentów (np. umowa na prąd, umowa na gaz, zdjęcie licznika).",
    notePh: "Komentarz (lokalizacja, bezpiecznik, numer umowy …)",
    c_trackers: "Trackery",
    c_source: "Źródło",
    c_username: "Nazwa użytkownika",
    c_person: "Osoba",
    c_role: "Rola",
    c_provider: "Metoda logowania",
    c_local: "Tylko lokalnie",
    c_system: "Konto systemowe",
    c_userid: "ID użytkownika",
    c_active: "Aktywne",
    yes: "✓",
    no: "–",
    c_sc: "Klasa stanu",
    c_maker: "Producent",
    c_model: "Model",
    on: "wł.",
    off: "wył.",
    roleOwner: "Właściciel",
    roleRead: "Tylko odczyt",
    ago: {"s": "przed chwilą", "m": "{n} min temu", "h": "{n} godz. temu", "d": "{n} dn. temu"},
    t: {"all": "Wszystkie encje", "illuminance": "Jasność", "temperature": "Temperatura", "humidity": "Wilgotność", "power": "Moc", "energy": "Energia", "consumption": "Zużycie", "voltage": "Napięcie", "frequency": "Częstotliwość", "current": "Prąd", "battery": "Baterie", "cover": "Rolety", "tilt": "Lamele", "light": "Światła", "dimmer": "Ściemniacze", "switch": "Przełączniki", "climate": "Termostaty", "media": "Multimedia", "person": "Osoby", "users": "Konta użytkowników", "binary": "Czujniki binarne", "presence": "Trackery", "scene": "Sceny", "labels": "Etykiety", "auto": "Automatyzacje / skrypty", "helper": "Pomocnicy", "sensor": "Inne czujniki", "unavailable": "Niedostępne"},
    d: {"all": "Każda encja, którą zna Home Assistant", "illuminance": "Czujniki jasności (lx)", "temperature": "Czujniki mierzące temperaturę", "humidity": "Czujniki wilgotności", "power": "Moc chwilowa (W, kW)", "energy": "Liczniki energii (Wh, kWh)", "consumption": "Gaz, woda, objętość i wszystko, co nazywa się zużyciem", "voltage": "Czujniki napięcia (V, mV, kV)", "frequency": "Czujniki częstotliwości (Hz)", "current": "Prąd i współczynnik mocy (A, mA)", "battery": "Poziomy baterii, najsłabsze najpierw", "cover": "Rolety, żaluzje, bramy garażowe: pozycja", "tilt": "Rolety z regulowanymi lamelami: kąt lameli", "light": "Wszystkie światła", "dimmer": "Światła ze ściemnianiem", "switch": "Przełączniki, gniazdka i pomocnicy wł./wył.", "climate": "Termostaty i pompy ciepła: aktualna, zadana, tryb", "media": "Telewizory, głośniki i inne odtwarzacze", "binary": "Czujniki ruchu, kontaktu, okien, dymu …", "person": "Osoby z ich trackerami i powiązanym kontem", "users": "Konta logowania Home Assistanta (wymaga praw administratora)", "presence": "Trackery urządzeń", "scene": "Sceny z ostatnią aktywacją", "labels": "Każda encja z co najmniej jedną etykietą", "auto": "Automatyzacje i skrypty", "helper": "input_*, liczniki, timery, harmonogramy", "sensor": "Czujniki, które nie pasują do żadnej karty pomiarowej", "unavailable": "Encje, które są teraz niedostępne lub nieznane"},
  },
  pt: {
    scTitle: "Classe de estado",
    scNone: "nenhuma (sem classe de estado)",
    scMeasurement: "measurement: um valor instantâneo que sobe e desce, p. ex. temperatura, potência, humidade.",
    scTotal: "total: um contador que também pode descer, p. ex. um contador com reposição ou um saldo.",
    scTotalInc: "total_increasing: um contador que só sobe (e recomeça em 0), p. ex. energia em kWh, gás, água.",
    scStatsBusy: "A verificar as estatísticas de longo prazo …",
    scStatsYes: "Existem estatísticas de longo prazo para esta entidade ({what}, unidade {unit}, origem {src}). O Home Assistant guarda-as como valores horários para o painel de energia e os gráficos do histórico.",
    scStatsNo: "Sem estatísticas de longo prazo: só as entidades com classe de estado (e unidade) as têm. Sem elas só fica o histórico de valores individuais, que é eliminado após a retenção do gravador.",
    scStatsFail: "Não foi possível ler as estatísticas de longo prazo.",
    scChange: "Pode ser alterada? Não aqui nem nas definições da entidade do Home Assistant: quem decide é a integração que fornece o sensor. Exceções: no configuration.yaml com customize (state_class:) e nos auxiliares de modelo que criar.",
    scRecNote: "A retenção do Entity Inventory só encurta o histórico de valores individuais de uma entidade. As estatísticas de longo prazo ficam intactas.",
    scDevTools: "Ferramentas de programador → Estatísticas",
    scTip: "Classe de estado da entidade (clique para uma explicação)",
    c_recupd: "Última atualização",
    recColsTip: "Mostrar as colunas do gravador (guardado desde, entradas, intervalo médio) (realçado = visíveis)",
    c_recrows: "Entradas",
    c_recint: "Intervalo médio",
    retStats: "Entradas no gravador: {rows} · cerca de {perday} por dia · intervalo médio {int}",
    retStatsTip: "Entradas no gravador: {rows} (cerca de {perday} por dia), intervalo médio entre duas entradas: {int}",
    c_retention: "Guardado desde (dias, gravador)",
    retTitle: "Gravador – retenção",
    retBtn: "Gravador",
    retTip: "Retenção desta entidade no gravador: clique abre a janela, Shift+clique escreve os dias aqui",
    retIntro: "O histórico desta entidade (base de dados do gravador) mais antigo do que o número de dias escolhido é eliminado todas as noites. Uma regra só pode encurtar a retenção global do gravador (purge_keep_days), não a prolongar.",
    retNone: "Sem regra (predefinição do gravador)",
    retDays: "{n} dias",
    retCustom: "Outro número de dias",
    retJob: "Executar a tarefa noturna (03:20) para todas as entidades com regra ou com a predefinição",
    retRules: "{n} entidades com regra",
    retRunNow: "Executar agora",
    retRunAsk: "Isto elimina agora histórico da base de dados do gravador. Não pode ser desfeito.",
    retLast: "Última execução: {t}",
    retDone: "Concluído: {n} entidades processadas.",
    retFail: "O gravador reportou um erro: {e}",
    retNoRec: "O gravador não está disponível.",
    retAdmin: "Só os administradores podem alterar a retenção.",
    retNever: "nunca",
    retSince: "No gravador desde: {t} ({n} dias)",
    retSinceNone: "Sem histórico no gravador.",
    retSinceFail: "Não foi possível ler a idade do histórico.",
    retSinceBusy: "A ler a idade do histórico …",
    retShort: "{n} d",
    retRule: "regra: {n} d",
    retErr: "A consulta ao gravador falhou: {e}",
    retGlobal: "O gravador mantém o histórico de todas as entidades durante {n} dias (purge_keep_days).",
    retGlobalUnknown: "Não foi possível ler a retenção global do gravador (o gravador está em execução?).",
    retMax: "Máximo (nunca encurtar)",
    retRuleNone: "Sem regra própria: esta entidade não é encurtada pelo Entity Inventory{d}.",
    retRuleDefault: " – aplica-se a retenção predefinida de {n} dias",
    retRuleMax: "Nunca encurtada pelo Entity Inventory: o histórico fica tanto tempo quanto o gravador o mantiver ({g} dias).",
    retRuleShort: "O histórico desta entidade com mais de {n} dias é eliminado todas as noites (só enquanto a tarefa noturna estiver ativa).",
    retRuleSame: "Isto corresponde à retenção do gravador de {g} dias, por isso a regra não altera nada.",
    retRuleLong: "O gravador elimina o histórico após {g} dias. Esta regra não pode manter mais até a definição do gravador ser aumentada (ver abaixo).",
    retLongerTitle: "Para manter dados mais de {g} dias:",
    retLonger1: "1. Abra o configuration.yaml e defina purge_keep_days no bloco recorder: para o tempo máximo de que precisa (aqui {n}). Se já existir um bloco recorder:, altere só essa linha – não adicione um segundo bloco.",
    retLonger2: "2. Reinicie o Home Assistant (Definições → Sistema → Reiniciar). O gravador só lê esta definição no arranque; o Entity Inventory não a pode alterar.",
    retLonger3: "3. Depois, cada entidade é mantida por predefinição durante esse tempo. Para manter o resto mais curto, defina abaixo uma retenção predefinida: assim só as entidades com uma regra mais longa mantêm o histórico tanto tempo.",
    retLonger4: "Nota: uma retenção mais longa aumenta a base de dados, aproximadamente em proporção aos dias.",
    retYamlCopy: "Copiar as linhas YAML",
    retYamlCopied: "Copiado.",
    retAllTitle: "Para todas as entidades",
    retDefaultLabel: "Retenção predefinida para todas as entidades sem regra própria (dias, vazio = nenhuma)",
    retDefaultSave: "Guardar predefinição",
    retDefaultHelp: "Exemplo: o gravador mantém 365 dias e a predefinição é 30: cada entidade sem regra é reduzida a 30 dias durante a noite; as entidades com uma regra de 365 mantêm tudo. Sem predefinição só são reduzidas as entidades com regra. Atenção: a predefinição aplica-se a CADA entidade da base de dados, não só às mostradas aqui.",
    retPreviewBtn: "Pré-visualização",
    retPvTitle: "O que a tarefa noturna eliminaria",
    retPvGroup: "• {days} dias: {entities} entidades, cerca de {rows} linhas de histórico mais antigas",
    retPvNone: "Neste momento nada seria eliminado.",
    retPvTotal: "Total: cerca de {rows} linhas de histórico de {entities} entidades.",
    retPvSkipped: "{n} entidades são ignoradas porque a sua retenção não é mais curta do que os {g} dias do gravador.",
    retPvHow: "O que a tarefa faz: chama o serviço do Home Assistant recorder.purge_entities uma vez por grupo de dias. Elimina apenas o histórico de valores (states) destas entidades mais antigo do que o número de dias. NÃO elimina as estatísticas de longo prazo (painel de energia, valores horários), não pára a gravação e os novos valores são guardados como habitual. O histórico eliminado só pode ser recuperado a partir de uma cópia de segurança.",
    retPvFail: "A pré-visualização falhou: {e}",
    retPvBusy: "A contar – numa base de dados grande pode demorar alguns segundos …",
    retEnableTitle: "Ativar a tarefa de retenção noturna?",
    retEnableText: "A partir de agora a tarefa corre todas as noites às 03:20 e elimina o histórico mais antigo do que a retenção da sua entidade (regra própria, senão a predefinição). Isto também vale para entidades que não vê nesta tabela.",
    retDefaultConfirmTitle: "Definir a retenção predefinida?",
    retDefaultConfirmText: "A partir de agora cada entidade sem regra própria conta como: manter {n} dias. São todas as entidades com histórico no gravador, não só um separador. Só tem efeito enquanto a tarefa noturna estiver ativa (ou se a executar manualmente).",
    retDefaultOff: "A retenção predefinida é removida. As entidades sem regra própria deixam de ser encurtadas pelo Entity Inventory.",
    retConfirmOn: "Ativar",
    retDeleteNow: "Eliminar agora",
    retSave: "Guardar",
    retRunTitle: "Eliminar o histórico agora?",
    blurTip: "Desfocar dados sensíveis (ID e nomes de utilizador, rastreadores, pessoas, comentários), p. ex. para capturas de ecrã (realçado = ativo)",
    title: "Entity Inventory",
    tabsBtn: "Mostrar ou ocultar separadores",
    tabsShowAll: "Mostrar todos",
    tabsClose: "Fechar",
    gLight: "Tudo e luz",
    gElectro: "Eletricidade",
    gClimate: "Clima",
    gCover: "Persianas",
    gUsage: "Consumo",
    gAuto: "Automação",
    gMore: "Mais",
    search: "Pesquisar (nome, ID da entidade, área, dispositivo, integração …)",
    count: "Entidades mostradas / neste separador",
    csv: "Exportar CSV",
    print: "Imprimir / PDF",
    pause: "Pausar a atualização em direto",
    resume: "Retomar a atualização em direto",
    allAreas: "Todas as áreas",
    allInts: "Todas as integrações",
    hidden: "Mostrar entidades ocultas / desativadas (realçado = visíveis)",
    copied: "Copiado",
    wideTip: "Maior espaçamento entre linhas (realçado = ativo)",
    hideOff: "Ocultar entidades indisponíveis / desconhecidas (realçado = ocultas)",
    none: "Sem entidades neste separador.",
    c_led: "Estado",
    c_name: "Nome",
    c_id: "ID da entidade",
    c_value: "Valor",
    c_area: "Área",
    c_device: "Dispositivo",
    labelTitle: "Etiqueta",
    labelName: "Nome",
    labelIcon: "Ícone (p. ex. mdi:tag)",
    labelColor: "Cor",
    labelDesc: "Descrição",
    labelEntities: "Entidades com esta etiqueta",
    labelManage: "Definições de etiquetas",
    labelCount: "{n} entidades neste separador / {m} no total",
    labelFail: "Falha ao guardar",
    labelNone: "nenhuma",
    c_labels: "Etiquetas",
    allLabels: "Todas as etiquetas",
    noLabel: "Sem etiqueta",
    c_platform: "Integração",
    c_class: "Classe",
    c_changed: "Alterado",
    c_pos: "Posição",
    c_tilt: "Ângulo das lâminas",
    c_bright: "Brilho",
    c_cur: "Atual",
    c_target: "Alvo",
    c_mode: "Modo",
    c_action: "Ação",
    c_unit: "Unidade",
    c_state: "Estado",
    onlyNotes: "Só entradas com comentário e/ou foto (realçado = ativo)",
    cfgBtn: "Editar colunas (ecrã e impressora)",
    tgtView: "Ecrã",
    tgtPrint: "Impressora",
    autoTip: "Ajustar a largura das colunas ao conteúdo mais largo",
    resetTip: "Repor o esquema",
    resetAsk: "Repor o esquema de colunas predefinido?",
    doneTip: "Concluído",
    renameTip: "Nome da coluna (vazio = predefinido)",
    stand: "Estado a",
    entities: "entidades",
    printFail: "Falha ao imprimir",
    portrait: "Impressão: vertical (clique: horizontal)",
    landscape: "Impressão: horizontal (clique: vertical)",
    showBadges: "Mostrar os números vermelhos nos separadores (entidades indisponíveis)",
    hideBadges: "Ocultar os números vermelhos nos separadores",
    copyTip: "Copiar o ID da entidade",
    copyNameTip: "Copiar o nome",
    copyValueTip: "Copiar o valor",
    editConfirmName: "Alterar o nome?\n\n{old}\n→ {new}",
    editConfirmId: "Alterar o ID da entidade?\n\n{old}\n→ {new}\n\nAs automações, scripts e painéis que usam o ID antigo têm de ser ajustados.",
    idLabel: "ID da entidade",
    idWarn: "As automações, scripts, painéis e modelos que usam o ID antigo NÃO são alterados aqui pelo Home Assistant – verifique-os depois.",
    idInvalid: "ID de entidade inválido. Tem de manter o domínio e usar apenas a-z, 0-9 e _ (p. ex. {d}.nome).",
    alignDec: "Valores alinhados pelo separador decimal (clique: esquerda)",
    alignLeft: "Valores alinhados à esquerda (clique: direita)",
    alignRight: "Valores alinhados à direita (clique: pelo separador decimal)",
    nameTitle: "Mudar o nome da entidade",
    nameLabel: "Nome",
    nameHintDev: "O Home Assistant coloca o nome do dispositivo à frente: «{dev}»",
    nameDefault: "Nome predefinido: {n}",
    nameReset: "Repor o predefinido",
    nameDetails: "Histórico / detalhes",
    nameFail: "Falha ao guardar",
    nameNoReg: "Esta entidade não tem ID único, por isso não está no registo de entidades e não pode ser renomeada aqui.",
    nameAdmin: "Só os administradores podem renomear entidades.",
    c_icon: "Ícone",
    iconTip: "Alterar o ícone (abre as definições da entidade)",
    iconNoReg: "Não é possível alterar o ícone desta entidade: sem ID único, não está no registo de entidades.",
    iconAdmin: "Só os administradores podem alterar o ícone.",
    c_access: "r/w",
    accessTip: {"r": "r = só leitura (valor medido ou comunicado)", "w": "w = só escrita (disparador sem estado próprio)", "rw": "rw = legível e controlável"},
    c_photos: "Fotos",
    c_docs: "Documentos",
    c_note: "Comentário",
    photosTitle: "Fotos",
    addPhotos: "Adicionar fotos",
    docsTitle: "Documentos",
    addDocs: "Adicionar documentos",
    noteTitle: "Comentário",
    save: "Guardar",
    cancel: "Cancelar",
    del: "Eliminar",
    rename: "Mudar o nome",
    renamePrompt: "Novo nome",
    confirmDel: "Eliminar mesmo {name}?",
    uploadFail: "Falha no carregamento",
    noPhotos: "Ainda sem fotos.",
    noDocs: "Ainda sem documentos (p. ex. contrato de eletricidade, contrato de gás, foto do contador).",
    notePh: "Comentário (localização, fusível, número de contrato …)",
    c_trackers: "Rastreadores",
    c_source: "Origem",
    c_username: "Nome de utilizador",
    c_person: "Pessoa",
    c_role: "Função",
    c_provider: "Método de início de sessão",
    c_local: "Só local",
    c_system: "Conta do sistema",
    c_userid: "ID de utilizador",
    c_active: "Ativo",
    yes: "✓",
    no: "–",
    c_sc: "Classe de estado",
    c_maker: "Fabricante",
    c_model: "Modelo",
    on: "ligado",
    off: "desligado",
    roleOwner: "Proprietário",
    roleRead: "Só leitura",
    ago: {"s": "agora mesmo", "m": "há {n} min", "h": "há {n} h", "d": "há {n} d"},
    t: {"all": "Todas as entidades", "illuminance": "Luminosidade", "temperature": "Temperatura", "humidity": "Humidade", "power": "Potência", "energy": "Energia", "consumption": "Consumo", "voltage": "Tensão", "frequency": "Frequência", "current": "Corrente", "battery": "Baterias", "cover": "Persianas", "tilt": "Lâminas", "light": "Luzes", "dimmer": "Reguladores", "switch": "Interruptores", "climate": "Termóstatos", "media": "Multimédia", "person": "Pessoas", "users": "Contas de utilizador", "binary": "Sensores binários", "presence": "Rastreadores", "scene": "Cenas", "labels": "Etiquetas", "auto": "Automações / scripts", "helper": "Auxiliares", "sensor": "Outros sensores", "unavailable": "Indisponíveis"},
    d: {"all": "Todas as entidades que o Home Assistant conhece", "illuminance": "Sensores de luminosidade (lux)", "temperature": "Sensores que medem uma temperatura", "humidity": "Sensores de humidade", "power": "Potência instantânea (W, kW)", "energy": "Contadores de energia (Wh, kWh)", "consumption": "Gás, água, volume e tudo o que se chama consumo", "voltage": "Sensores de tensão (V, mV, kV)", "frequency": "Sensores de frequência (Hz)", "current": "Corrente e fator de potência (A, mA)", "battery": "Níveis de bateria, os mais fracos primeiro", "cover": "Persianas, estores, portões de garagem: posição", "tilt": "Persianas com lâminas ajustáveis: ângulo das lâminas", "light": "Todas as luzes", "dimmer": "Luzes reguláveis", "switch": "Interruptores, tomadas e auxiliares ligar/desligar", "climate": "Termóstatos e bombas de calor: atual, alvo, modo", "media": "TVs, colunas e outros leitores", "binary": "Sensores de movimento, contacto, janela, fumo …", "person": "Pessoas com os seus rastreadores e conta associada", "users": "Contas de início de sessão do Home Assistant (requer direitos de administrador)", "presence": "Rastreadores de dispositivos", "scene": "Cenas com a sua última ativação", "labels": "Todas as entidades com pelo menos uma etiqueta", "auto": "Automações e scripts", "helper": "input_*, contadores, temporizadores, agendas", "sensor": "Sensores que não cabem em nenhum separador de medição", "unavailable": "Entidades que neste momento estão indisponíveis ou desconhecidas"},
  },
  cs: {
    scTitle: "Třída stavu",
    scNone: "žádná (bez třídy stavu)",
    scMeasurement: "measurement: okamžitá hodnota, která stoupá a klesá, např. teplota, výkon, vlhkost.",
    scTotal: "total: počítadlo, které může i klesat, např. počítadlo s vynulováním nebo zůstatek.",
    scTotalInc: "total_increasing: počítadlo, které jen roste (a začíná znovu od 0), např. energie v kWh, plyn, voda.",
    scStatsBusy: "Kontroluji dlouhodobé statistiky …",
    scStatsYes: "Pro tuto entitu existují dlouhodobé statistiky ({what}, jednotka {unit}, zdroj {src}). Home Assistant je uchovává jako hodinové hodnoty pro energetický přehled a grafy historie.",
    scStatsNo: "Žádné dlouhodobé statistiky: mají je jen entity s třídou stavu (a jednotkou). Bez nich zůstává jen historie jednotlivých hodnot, která se maže po uchování rekordéru.",
    scStatsFail: "Dlouhodobé statistiky se nepodařilo přečíst.",
    scChange: "Dá se to změnit? Ne zde ani v nastavení entity Home Assistantu: rozhoduje integrace, která senzor dodává. Výjimky: v configuration.yaml s customize (state_class:) a u šablonových pomocníků, které si vytvoříte sami.",
    scRecNote: "Uchovávání v Entity Inventory zkracuje jen historii jednotlivých hodnot entity. Dlouhodobé statistiky zůstávají nedotčené.",
    scDevTools: "Vývojářské nástroje → Statistiky",
    scTip: "Třída stavu entity (kliknutím vysvětlení)",
    c_recupd: "Poslední hlášení",
    recColsTip: "Zobrazit sloupce rekordéru (uloženo od, záznamy, průměrný interval) (zvýrazněno = zobrazeny)",
    c_recrows: "Záznamy",
    c_recint: "Prům. interval",
    retStats: "Záznamy v rekordéru: {rows} · asi {perday} denně · průměrný interval {int}",
    retStatsTip: "Záznamy v rekordéru: {rows} (asi {perday} denně), průměrný interval mezi dvěma záznamy: {int}",
    c_retention: "Uloženo od (dny, rekordér)",
    retTitle: "Rekordér – uchovávání",
    retBtn: "Rekordér",
    retTip: "Uchovávání této entity v rekordéru: kliknutí otevře okno, Shift+kliknutí umožní zadat dny přímo zde",
    retIntro: "Historie této entity (databáze rekordéru) starší než zvolený počet dnů se každou noc maže. Pravidlo může globální uchovávání rekordéru (purge_keep_days) jen zkrátit, nikoli prodloužit.",
    retNone: "Žádné pravidlo (výchozí hodnota rekordéru)",
    retDays: "{n} dnů",
    retCustom: "Jiný počet dnů",
    retJob: "Spouštět noční úlohu (03:20) pro všechny entity s pravidlem nebo výchozí hodnotou",
    retRules: "{n} entit s pravidlem",
    retRunNow: "Spustit nyní",
    retRunAsk: "Tím se nyní smaže historie z databáze rekordéru. Nelze to vrátit zpět.",
    retLast: "Poslední spuštění: {t}",
    retDone: "Hotovo: zpracováno {n} entit.",
    retFail: "Rekordér hlásí chybu: {e}",
    retNoRec: "Rekordér není k dispozici.",
    retAdmin: "Uchovávání mohou měnit jen správci.",
    retNever: "nikdy",
    retSince: "V rekordéru od: {t} ({n} dnů)",
    retSinceNone: "V rekordéru není žádná historie.",
    retSinceFail: "Stáří historie se nepodařilo přečíst.",
    retSinceBusy: "Čtu stáří historie …",
    retShort: "{n} d",
    retRule: "pravidlo: {n} d",
    retErr: "Dotaz na rekordér selhal: {e}",
    retGlobal: "Rekordér uchovává historii všech entit {n} dnů (purge_keep_days).",
    retGlobalUnknown: "Globální uchovávání rekordéru se nepodařilo přečíst (běží rekordér?).",
    retMax: "Maximum (nikdy nezkracovat)",
    retRuleNone: "Žádné vlastní pravidlo: Entity Inventory tuto entitu nezkracuje{d}.",
    retRuleDefault: " – platí výchozí uchovávání {n} dnů",
    retRuleMax: "Entity Inventory ji nikdy nezkracuje: historie zůstane tak dlouho, jak ji rekordér drží ({g} dnů).",
    retRuleShort: "Historie této entity starší než {n} dnů se každou noc maže (jen když je noční úloha zapnutá).",
    retRuleSame: "To odpovídá uchovávání rekordéru {g} dnů, takže pravidlo nic nemění.",
    retRuleLong: "Rekordér maže historii po {g} dnech. Toto pravidlo nemůže uchovat víc, dokud se nastavení rekordéru nezvýší (viz níže).",
    retLongerTitle: "Jak uchovat data déle než {g} dnů:",
    retLonger1: "1. Otevřete configuration.yaml a v bloku recorder: nastavte purge_keep_days na nejdelší potřebnou dobu (zde {n}). Pokud blok recorder: už existuje, změňte jen tento řádek – nepřidávejte druhý blok.",
    retLonger2: "2. Restartujte Home Assistant (Nastavení → Systém → Restartovat). Rekordér čte toto nastavení jen při startu; Entity Inventory je změnit nemůže.",
    retLonger3: "3. Poté se každá entita ve výchozím stavu uchovává tak dlouho. Aby zbytek zůstal kratší, nastavte níže výchozí uchovávání: pak jen entity s delším pravidlem drží historii tak dlouho.",
    retLonger4: "Poznámka: delší uchovávání zvětšuje databázi, zhruba úměrně počtu dnů.",
    retYamlCopy: "Kopírovat řádky YAML",
    retYamlCopied: "Zkopírováno.",
    retAllTitle: "Pro všechny entity",
    retDefaultLabel: "Výchozí uchovávání pro všechny entity bez vlastního pravidla (dny, prázdné = žádné)",
    retDefaultSave: "Uložit výchozí hodnotu",
    retDefaultHelp: "Příklad: rekordér drží 365 dnů a výchozí hodnota je 30: každá entita bez pravidla se v noci zkrátí na 30 dnů, entity s pravidlem 365 si ponechají vše. Bez výchozí hodnoty se zkracují jen entity s pravidlem. Pozor: výchozí hodnota platí pro KAŽDOU entitu v databázi, nejen pro zde zobrazené.",
    retPreviewBtn: "Náhled",
    retPvTitle: "Co by noční úloha smazala",
    retPvGroup: "• {days} dnů: {entities} entit, asi {rows} starších řádků historie",
    retPvNone: "Právě teď by se nesmazalo nic.",
    retPvTotal: "Celkem: asi {rows} řádků historie z {entities} entit.",
    retPvSkipped: "{n} entit se přeskočí, protože jejich uchovávání není kratší než {g} dnů rekordéru.",
    retPvHow: "Co úloha dělá: zavolá službu Home Assistantu recorder.purge_entities jednou pro každou skupinu dnů. Maže jen historii jednotlivých hodnot (states) těchto entit starší než počet dnů. NEMAŽE dlouhodobé statistiky (energetický přehled, hodinové hodnoty), nezastavuje záznam a nové hodnoty se ukládají jako obvykle. Smazanou historii lze obnovit jen ze zálohy.",
    retPvFail: "Náhled selhal: {e}",
    retPvBusy: "Počítám – u velké databáze to může trvat několik sekund …",
    retEnableTitle: "Zapnout noční úlohu uchovávání?",
    retEnableText: "Od nynějška úloha běží každou noc ve 03:20 a maže historii starší než uchovávání její entity (vlastní pravidlo, jinak výchozí). Platí to i pro entity, které v této tabulce nevidíte.",
    retDefaultConfirmTitle: "Nastavit výchozí uchovávání?",
    retDefaultConfirmText: "Od nynějška platí pro každou entitu bez vlastního pravidla: uchovat {n} dnů. Jsou to všechny entity, které mají v rekordéru historii, nejen jedna záložka. Působí to jen, dokud je noční úloha zapnutá (nebo když ji spustíte ručně).",
    retDefaultOff: "Výchozí uchovávání se odstraní. Entity bez vlastního pravidla už Entity Inventory nezkracuje.",
    retConfirmOn: "Zapnout",
    retDeleteNow: "Smazat nyní",
    retSave: "Uložit",
    retRunTitle: "Smazat historii nyní?",
    blurTip: "Rozmazat citlivé údaje (ID a jména uživatelů, trackery, osoby, komentáře), např. pro snímky obrazovky (zvýrazněno = zapnuto)",
    title: "Entity Inventory",
    tabsBtn: "Zobrazit nebo skrýt záložky",
    tabsShowAll: "Zobrazit vše",
    tabsClose: "Zavřít",
    gLight: "Vše a světlo",
    gElectro: "Elektro",
    gClimate: "Klima",
    gCover: "Rolety",
    gUsage: "Spotřeba",
    gAuto: "Automatizace",
    gMore: "Další",
    search: "Hledat (název, ID entity, oblast, zařízení, integrace …)",
    count: "Zobrazené entity / na této záložce",
    csv: "Exportovat CSV",
    print: "Tisk / PDF",
    pause: "Pozastavit živou aktualizaci",
    resume: "Obnovit živou aktualizaci",
    allAreas: "Všechny oblasti",
    allInts: "Všechny integrace",
    hidden: "Zobrazit skryté / vypnuté entity (zvýrazněno = zobrazeny)",
    copied: "Zkopírováno",
    wideTip: "Větší řádkování (zvýrazněno = zapnuto)",
    hideOff: "Skrýt nedostupné / neznámé entity (zvýrazněno = skryty)",
    none: "Na této záložce nejsou žádné entity.",
    c_led: "Stav",
    c_name: "Název",
    c_id: "ID entity",
    c_value: "Hodnota",
    c_area: "Oblast",
    c_device: "Zařízení",
    labelTitle: "Štítek",
    labelName: "Název",
    labelIcon: "Ikona (např. mdi:tag)",
    labelColor: "Barva",
    labelDesc: "Popis",
    labelEntities: "Entity s tímto štítkem",
    labelManage: "Nastavení štítků",
    labelCount: "{n} entit na této záložce / {m} celkem",
    labelFail: "Uložení se nezdařilo",
    labelNone: "žádná",
    c_labels: "Štítky",
    allLabels: "Všechny štítky",
    noLabel: "Bez štítku",
    c_platform: "Integrace",
    c_class: "Třída",
    c_changed: "Změněno",
    c_pos: "Poloha",
    c_tilt: "Úhel lamel",
    c_bright: "Jas",
    c_cur: "Aktuální",
    c_target: "Cílová",
    c_mode: "Režim",
    c_action: "Akce",
    c_unit: "Jednotka",
    c_state: "Stav",
    onlyNotes: "Jen položky s komentářem a/nebo fotografií (zvýrazněno = aktivní)",
    cfgBtn: "Upravit sloupce (obrazovka a tiskárna)",
    tgtView: "Obrazovka",
    tgtPrint: "Tiskárna",
    autoTip: "Přizpůsobit šířky sloupců nejširšímu obsahu",
    resetTip: "Obnovit rozvržení",
    resetAsk: "Obnovit výchozí rozvržení sloupců?",
    doneTip: "Hotovo",
    renameTip: "Název sloupce (prázdné = výchozí)",
    stand: "Stav k",
    entities: "entit",
    printFail: "Tisk se nezdařil",
    portrait: "Tisk: na výšku (klikněte: na šířku)",
    landscape: "Tisk: na šířku (klikněte: na výšku)",
    showBadges: "Zobrazit červená čísla na záložkách (nedostupné entity)",
    hideBadges: "Skrýt červená čísla na záložkách",
    copyTip: "Kopírovat ID entity",
    copyNameTip: "Kopírovat název",
    copyValueTip: "Kopírovat hodnotu",
    editConfirmName: "Změnit název?\n\n{old}\n→ {new}",
    editConfirmId: "Změnit ID entity?\n\n{old}\n→ {new}\n\nAutomatizace, skripty a dashboardy, které používají staré ID, je třeba upravit.",
    idLabel: "ID entity",
    idWarn: "Automatizace, skripty, dashboardy a šablony používající staré ID Home Assistant zde NEZMĚNÍ – zkontrolujte je poté.",
    idInvalid: "Neplatné ID entity. Musí zachovat doménu a používat jen a-z, 0-9 a _ (např. {d}.nazev).",
    alignDec: "Hodnoty zarovnané podle desetinné čárky (klik: vlevo)",
    alignLeft: "Hodnoty zarovnané vlevo (klik: vpravo)",
    alignRight: "Hodnoty zarovnané vpravo (klik: podle desetinné čárky)",
    nameTitle: "Přejmenovat entitu",
    nameLabel: "Název",
    nameHintDev: "Home Assistant předřadí název zařízení: „{dev}“",
    nameDefault: "Výchozí název: {n}",
    nameReset: "Obnovit výchozí",
    nameDetails: "Historie / podrobnosti",
    nameFail: "Uložení se nezdařilo",
    nameNoReg: "Tato entita nemá jedinečné ID, takže není v registru entit a nelze ji zde přejmenovat.",
    nameAdmin: "Entity mohou přejmenovat jen správci.",
    c_icon: "Ikona",
    iconTip: "Změnit ikonu (otevře nastavení entity)",
    iconNoReg: "Ikonu této entity nelze změnit: bez jedinečného ID není v registru entit.",
    iconAdmin: "Ikonu mohou změnit jen správci.",
    c_access: "r/w",
    accessTip: {"r": "r = jen čtení (naměřená nebo hlášená hodnota)", "w": "w = jen zápis (spouštěč bez vlastního stavu)", "rw": "rw = čitelné a ovladatelné"},
    c_photos: "Fotografie",
    c_docs: "Dokumenty",
    c_note: "Komentář",
    photosTitle: "Fotografie",
    addPhotos: "Přidat fotografie",
    docsTitle: "Dokumenty",
    addDocs: "Přidat dokumenty",
    noteTitle: "Komentář",
    save: "Uložit",
    cancel: "Zrušit",
    del: "Smazat",
    rename: "Přejmenovat",
    renamePrompt: "Nový název",
    confirmDel: "Opravdu smazat {name}?",
    uploadFail: "Nahrání se nezdařilo",
    noPhotos: "Zatím žádné fotografie.",
    noDocs: "Zatím žádné dokumenty (např. smlouva o elektřině, smlouva o plynu, foto elektroměru).",
    notePh: "Komentář (umístění, pojistka, číslo smlouvy …)",
    c_trackers: "Trackery",
    c_source: "Zdroj",
    c_username: "Uživatelské jméno",
    c_person: "Osoba",
    c_role: "Role",
    c_provider: "Způsob přihlášení",
    c_local: "Pouze místně",
    c_system: "Systémový účet",
    c_userid: "ID uživatele",
    c_active: "Aktivní",
    yes: "✓",
    no: "–",
    c_sc: "Třída stavu",
    c_maker: "Výrobce",
    c_model: "Model",
    on: "zap.",
    off: "vyp.",
    roleOwner: "Vlastník",
    roleRead: "Jen čtení",
    ago: {"s": "právě teď", "m": "před {n} min", "h": "před {n} h", "d": "před {n} d"},
    t: {"all": "Všechny entity", "illuminance": "Jas", "temperature": "Teplota", "humidity": "Vlhkost", "power": "Výkon", "energy": "Energie", "consumption": "Spotřeba", "voltage": "Napětí", "frequency": "Frekvence", "current": "Proud", "battery": "Baterie", "cover": "Rolety", "tilt": "Lamely", "light": "Světla", "dimmer": "Stmívače", "switch": "Spínače", "climate": "Termostaty", "media": "Média", "person": "Osoby", "users": "Uživatelské účty", "binary": "Binární senzory", "presence": "Trackery", "scene": "Scény", "labels": "Štítky", "auto": "Automatizace / skripty", "helper": "Pomocníci", "sensor": "Ostatní senzory", "unavailable": "Nedostupné"},
    d: {"all": "Každá entita, kterou Home Assistant zná", "illuminance": "Senzory jasu (lx)", "temperature": "Senzory, které měří teplotu", "humidity": "Senzory vlhkosti", "power": "Okamžitý výkon (W, kW)", "energy": "Měřiče energie (Wh, kWh)", "consumption": "Plyn, voda, objem a vše, co se jmenuje spotřeba", "voltage": "Senzory napětí (V, mV, kV)", "frequency": "Senzory frekvence (Hz)", "current": "Proud a účiník (A, mA)", "battery": "Stavy baterií, nejslabší první", "cover": "Rolety, žaluzie, garážová vrata: poloha", "tilt": "Rolety s nastavitelnými lamelami: úhel lamel", "light": "Všechna světla", "dimmer": "Stmívatelná světla", "switch": "Spínače, zásuvky a pomocníci zap./vyp.", "climate": "Termostaty a tepelná čerpadla: aktuální, cílová, režim", "media": "Televize, reproduktory a další přehrávače", "binary": "Senzory pohybu, kontaktu, oken, kouře …", "person": "Osoby s jejich trackery a propojeným účtem", "users": "Přihlašovací účty Home Assistantu (vyžaduje práva správce)", "presence": "Trackery zařízení", "scene": "Scény s poslední aktivací", "labels": "Každá entita s alespoň jedním štítkem", "auto": "Automatizace a skripty", "helper": "input_*, čítače, časovače, plány", "sensor": "Senzory, které nepatří do žádné měřicí záložky", "unavailable": "Entity, které jsou nyní nedostupné nebo neznámé"},
  },
  ru: {
    scTitle: "Класс состояния",
    scNone: "нет (без класса состояния)",
    scMeasurement: "measurement: мгновенное значение, которое растёт и падает, например температура, мощность, влажность.",
    scTotal: "total: счётчик, который может и уменьшаться, например счётчик со сбросом или баланс.",
    scTotalInc: "total_increasing: счётчик, который только растёт (и снова начинается с 0), например энергия в кВт·ч, газ, вода.",
    scStatsBusy: "Проверка долгосрочной статистики …",
    scStatsYes: "Для этой сущности есть долгосрочная статистика ({what}, единица {unit}, источник {src}). Home Assistant хранит её как почасовые значения для панели энергии и графиков истории.",
    scStatsNo: "Долгосрочной статистики нет: она есть только у сущностей с классом состояния (и единицей). Без неё остаётся только история отдельных значений, и она удаляется по истечении срока хранения регистратора.",
    scStatsFail: "Не удалось прочитать долгосрочную статистику.",
    scChange: "Можно ли это изменить? Не здесь и не в настройках сущности Home Assistant: это определяет интеграция, поставляющая датчик. Исключения: в configuration.yaml через customize (state_class:) и для шаблонных помощников, которые вы создаёте сами.",
    scRecNote: "Хранение в Entity Inventory сокращает только историю отдельных значений сущности. Долгосрочная статистика остаётся нетронутой.",
    scDevTools: "Инструменты разработчика → Статистика",
    scTip: "Класс состояния сущности (щёлкните для пояснения)",
    c_recupd: "Последний отчёт",
    recColsTip: "Показать столбцы регистратора (хранится с, записи, средний интервал) (выделено = показаны)",
    c_recrows: "Записи",
    c_recint: "Ср. интервал",
    retStats: "Записей в регистраторе: {rows} · примерно {perday} в день · средний интервал {int}",
    retStatsTip: "Записей в регистраторе: {rows} (примерно {perday} в день), средний интервал между двумя записями: {int}",
    c_retention: "Хранится с (дни, регистратор)",
    retTitle: "Регистратор – хранение",
    retBtn: "Регистратор",
    retTip: "Хранение этой сущности в регистраторе: щелчок открывает окно, Shift+щелчок позволяет ввести дни здесь",
    retIntro: "История этой сущности (база данных регистратора) старше выбранного числа дней удаляется каждую ночь. Правило может только сократить глобальное хранение регистратора (purge_keep_days), но не продлить его.",
    retNone: "Нет правила (по умолчанию регистратора)",
    retDays: "{n} дн.",
    retCustom: "Другое число дней",
    retJob: "Запускать ночную задачу (03:20) для всех сущностей с правилом или значением по умолчанию",
    retRules: "{n} сущностей с правилом",
    retRunNow: "Запустить сейчас",
    retRunAsk: "Это сейчас удалит историю из базы данных регистратора. Отменить нельзя.",
    retLast: "Последний запуск: {t}",
    retDone: "Готово: обработано сущностей: {n}.",
    retFail: "Регистратор сообщил об ошибке: {e}",
    retNoRec: "Регистратор недоступен.",
    retAdmin: "Менять хранение могут только администраторы.",
    retNever: "никогда",
    retSince: "В регистраторе с: {t} ({n} дн.)",
    retSinceNone: "В регистраторе нет истории.",
    retSinceFail: "Не удалось прочитать возраст истории.",
    retSinceBusy: "Чтение возраста истории …",
    retShort: "{n} д",
    retRule: "правило: {n} д",
    retErr: "Запрос к регистратору не удался: {e}",
    retGlobal: "Регистратор хранит историю всех сущностей {n} дн. (purge_keep_days).",
    retGlobalUnknown: "Не удалось прочитать глобальное хранение регистратора (работает ли регистратор?).",
    retMax: "Максимум (никогда не сокращать)",
    retRuleNone: "Собственного правила нет: Entity Inventory не сокращает эту сущность{d}.",
    retRuleDefault: " – действует хранение по умолчанию {n} дн.",
    retRuleMax: "Entity Inventory никогда не сокращает: история остаётся столько, сколько её хранит регистратор ({g} дн.).",
    retRuleShort: "История этой сущности старше {n} дн. удаляется каждую ночь (только пока включена ночная задача).",
    retRuleSame: "Это соответствует хранению регистратора в {g} дн., поэтому правило ничего не меняет.",
    retRuleLong: "Регистратор удаляет историю через {g} дн. Это правило не может хранить дольше, пока настройка регистратора не увеличена (см. ниже).",
    retLongerTitle: "Чтобы хранить данные дольше {g} дн.:",
    retLonger1: "1. Откройте configuration.yaml и задайте в блоке recorder: purge_keep_days на самый долгий нужный срок (здесь {n}). Если блок recorder: уже есть, измените только эту строку – не добавляйте второй блок.",
    retLonger2: "2. Перезапустите Home Assistant (Настройки → Система → Перезапустить). Регистратор читает эту настройку только при запуске; Entity Inventory не может её изменить.",
    retLonger3: "3. После этого каждая сущность по умолчанию хранится так долго. Чтобы остальные хранились короче, задайте ниже хранение по умолчанию: тогда только сущности с более длинным правилом сохраняют историю так долго.",
    retLonger4: "Примечание: более долгое хранение увеличивает базу данных примерно пропорционально числу дней.",
    retYamlCopy: "Копировать строки YAML",
    retYamlCopied: "Скопировано.",
    retAllTitle: "Для всех сущностей",
    retDefaultLabel: "Хранение по умолчанию для всех сущностей без собственного правила (дни, пусто = нет)",
    retDefaultSave: "Сохранить значение по умолчанию",
    retDefaultHelp: "Пример: регистратор хранит 365 дн., а значение по умолчанию 30: каждая сущность без правила ночью сокращается до 30 дн., сущности с правилом 365 сохраняют всё. Без значения по умолчанию сокращаются только сущности с правилом. Внимание: значение по умолчанию действует на КАЖДУЮ сущность в базе данных, а не только на показанные здесь.",
    retPreviewBtn: "Просмотр",
    retPvTitle: "Что удалила бы ночная задача",
    retPvGroup: "• {days} дн.: сущностей {entities}, примерно {rows} более старых строк истории",
    retPvNone: "Сейчас ничего не было бы удалено.",
    retPvTotal: "Всего: примерно {rows} строк истории у {entities} сущностей.",
    retPvSkipped: "Пропущено сущностей: {n}, так как их хранение не короче {g} дн. регистратора.",
    retPvHow: "Что делает задача: вызывает службу Home Assistant recorder.purge_entities один раз для каждой группы дней. Она удаляет только историю отдельных значений (states) этих сущностей старше числа дней. Она НЕ удаляет долгосрочную статистику (панель энергии, почасовые значения), не останавливает запись, а новые значения сохраняются как обычно. Удалённую историю можно восстановить только из резервной копии.",
    retPvFail: "Просмотр не удался: {e}",
    retPvBusy: "Подсчёт – в большой базе данных это может занять несколько секунд …",
    retEnableTitle: "Включить ночную задачу хранения?",
    retEnableText: "Отныне задача выполняется каждую ночь в 03:20 и удаляет историю старше срока хранения её сущности (своё правило, иначе по умолчанию). Это относится и к сущностям, которых вы не видите в этой таблице.",
    retDefaultConfirmTitle: "Задать хранение по умолчанию?",
    retDefaultConfirmText: "Отныне каждая сущность без собственного правила считается так: хранить {n} дн. Это все сущности, для которых у регистратора есть история, а не одна вкладка. Действует только пока включена ночная задача (или если вы запустите её вручную).",
    retDefaultOff: "Хранение по умолчанию удаляется. Сущности без собственного правила больше не сокращаются Entity Inventory.",
    retConfirmOn: "Включить",
    retDeleteNow: "Удалить сейчас",
    retSave: "Сохранить",
    retRunTitle: "Удалить историю сейчас?",
    blurTip: "Размыть конфиденциальные данные (ID и имена пользователей, трекеры, персоны, комментарии), например для скриншотов (выделено = включено)",
    title: "Entity Inventory",
    tabsBtn: "Показать или скрыть вкладки",
    tabsShowAll: "Показать все",
    tabsClose: "Закрыть",
    gLight: "Все и свет",
    gElectro: "Электрика",
    gClimate: "Климат",
    gCover: "Жалюзи",
    gUsage: "Потребление",
    gAuto: "Автоматизация",
    gMore: "Ещё",
    search: "Поиск (имя, ID сущности, зона, устройство, интеграция …)",
    count: "Показано сущностей / на этой вкладке",
    csv: "Экспорт в CSV",
    print: "Печать / PDF",
    pause: "Приостановить обновление в реальном времени",
    resume: "Возобновить обновление в реальном времени",
    allAreas: "Все зоны",
    allInts: "Все интеграции",
    hidden: "Показать скрытые / отключённые сущности (выделено = показаны)",
    copied: "Скопировано",
    wideTip: "Увеличенный интервал строк (выделено = включено)",
    hideOff: "Скрыть недоступные / неизвестные сущности (выделено = скрыты)",
    none: "На этой вкладке нет сущностей.",
    c_led: "Статус",
    c_name: "Имя",
    c_id: "ID сущности",
    c_value: "Значение",
    c_area: "Зона",
    c_device: "Устройство",
    labelTitle: "Ярлык",
    labelName: "Имя",
    labelIcon: "Значок (напр. mdi:tag)",
    labelColor: "Цвет",
    labelDesc: "Описание",
    labelEntities: "Сущности с этим ярлыком",
    labelManage: "Настройки ярлыков",
    labelCount: "{n} сущностей на этой вкладке / {m} всего",
    labelFail: "Не удалось сохранить",
    labelNone: "нет",
    c_labels: "Ярлыки",
    allLabels: "Все ярлыки",
    noLabel: "Без ярлыка",
    c_platform: "Интеграция",
    c_class: "Класс",
    c_changed: "Изменено",
    c_pos: "Положение",
    c_tilt: "Угол ламелей",
    c_bright: "Яркость",
    c_cur: "Текущая",
    c_target: "Целевая",
    c_mode: "Режим",
    c_action: "Действие",
    c_unit: "Единица",
    c_state: "Состояние",
    onlyNotes: "Только записи с комментарием и/или фото (выделено = активно)",
    cfgBtn: "Изменить столбцы (экран и принтер)",
    tgtView: "Экран",
    tgtPrint: "Принтер",
    autoTip: "Подогнать ширину столбцов под самое широкое содержимое",
    resetTip: "Сбросить раскладку",
    resetAsk: "Вернуть раскладку столбцов по умолчанию?",
    doneTip: "Готово",
    renameTip: "Название столбца (пусто = по умолчанию)",
    stand: "По состоянию на",
    entities: "сущностей",
    printFail: "Не удалось напечатать",
    portrait: "Печать: книжная (щёлкните: альбомная)",
    landscape: "Печать: альбомная (щёлкните: книжная)",
    showBadges: "Показывать красные числа на вкладках (недоступные сущности)",
    hideBadges: "Скрыть красные числа на вкладках",
    copyTip: "Копировать ID сущности",
    copyNameTip: "Копировать имя",
    copyValueTip: "Копировать значение",
    editConfirmName: "Изменить имя?\n\n{old}\n→ {new}",
    editConfirmId: "Изменить ID сущности?\n\n{old}\n→ {new}\n\nАвтоматизации, скрипты и панели, использующие старый ID, нужно исправить.",
    idLabel: "ID сущности",
    idWarn: "Автоматизации, скрипты, панели и шаблоны, использующие старый ID, Home Assistant здесь НЕ изменяет – проверьте их потом.",
    idInvalid: "Недопустимый ID сущности. Он должен сохранить домен и содержать только a-z, 0-9 и _ (напр. {d}.name).",
    alignDec: "Значения выровнены по десятичному разделителю (щелчок: влево)",
    alignLeft: "Значения выровнены влево (щелчок: вправо)",
    alignRight: "Значения выровнены вправо (щелчок: по разделителю)",
    nameTitle: "Переименовать сущность",
    nameLabel: "Имя",
    nameHintDev: "Home Assistant добавляет впереди имя устройства: «{dev}»",
    nameDefault: "Имя по умолчанию: {n}",
    nameReset: "Сбросить на имя по умолчанию",
    nameDetails: "История / подробности",
    nameFail: "Не удалось сохранить",
    nameNoReg: "У этой сущности нет уникального ID, поэтому её нет в реестре сущностей и переименовать её здесь нельзя.",
    nameAdmin: "Переименовывать сущности могут только администраторы.",
    c_icon: "Значок",
    iconTip: "Изменить значок (откроются настройки сущности)",
    iconNoReg: "Значок этой сущности изменить нельзя: без уникального ID её нет в реестре сущностей.",
    iconAdmin: "Менять значок могут только администраторы.",
    c_access: "r/w",
    accessTip: {"r": "r = только чтение (измеренное или сообщённое значение)", "w": "w = только запись (триггер без собственного состояния)", "rw": "rw = читается и управляется"},
    c_photos: "Фото",
    c_docs: "Документы",
    c_note: "Комментарий",
    photosTitle: "Фото",
    addPhotos: "Добавить фото",
    docsTitle: "Документы",
    addDocs: "Добавить документы",
    noteTitle: "Комментарий",
    save: "Сохранить",
    cancel: "Отмена",
    del: "Удалить",
    rename: "Переименовать",
    renamePrompt: "Новое имя",
    confirmDel: "Действительно удалить {name}?",
    uploadFail: "Не удалось загрузить",
    noPhotos: "Пока нет фото.",
    noDocs: "Пока нет документов (напр. договор на электричество, на газ, фото счётчика).",
    notePh: "Комментарий (расположение, предохранитель, номер договора …)",
    c_trackers: "Трекеры",
    c_source: "Источник",
    c_username: "Имя пользователя",
    c_person: "Персона",
    c_role: "Роль",
    c_provider: "Способ входа",
    c_local: "Только локально",
    c_system: "Системная учётная запись",
    c_userid: "ID пользователя",
    c_active: "Активен",
    yes: "✓",
    no: "–",
    c_sc: "Класс состояния",
    c_maker: "Производитель",
    c_model: "Модель",
    on: "вкл.",
    off: "выкл.",
    roleOwner: "Владелец",
    roleRead: "Только чтение",
    ago: {"s": "только что", "m": "{n} мин назад", "h": "{n} ч назад", "d": "{n} дн. назад"},
    t: {"all": "Все сущности", "illuminance": "Яркость", "temperature": "Температура", "humidity": "Влажность", "power": "Мощность", "energy": "Энергия", "consumption": "Потребление", "voltage": "Напряжение", "frequency": "Частота", "current": "Ток", "battery": "Батареи", "cover": "Жалюзи", "tilt": "Ламели", "light": "Освещение", "dimmer": "Диммеры", "switch": "Выключатели", "climate": "Термостаты", "media": "Медиа", "person": "Персоны", "users": "Учётные записи", "binary": "Бинарные датчики", "presence": "Трекеры", "scene": "Сцены", "labels": "Ярлыки", "auto": "Автоматизации / скрипты", "helper": "Помощники", "sensor": "Прочие датчики", "unavailable": "Недоступные"},
    d: {"all": "Все сущности, которые знает Home Assistant", "illuminance": "Датчики яркости (лк)", "temperature": "Датчики, измеряющие температуру", "humidity": "Датчики влажности", "power": "Мгновенная мощность (Вт, кВт)", "energy": "Счётчики энергии (Вт·ч, кВт·ч)", "consumption": "Газ, вода, объём и всё, что называется потреблением", "voltage": "Датчики напряжения (В, мВ, кВ)", "frequency": "Датчики частоты (Гц)", "current": "Ток и коэффициент мощности (А, мА)", "battery": "Уровни батарей, самые слабые первыми", "cover": "Жалюзи, рольставни, гаражные ворота: положение", "tilt": "Жалюзи с регулируемыми ламелями: угол ламелей", "light": "Все лампы", "dimmer": "Лампы с регулировкой яркости", "switch": "Выключатели, розетки и помощники вкл./выкл.", "climate": "Термостаты и тепловые насосы: текущая, целевая, режим", "media": "Телевизоры, колонки и другие плееры", "binary": "Датчики движения, контакта, окон, дыма …", "person": "Персоны с их трекерами и связанной учётной записью", "users": "Учётные записи Home Assistant (нужны права администратора)", "presence": "Трекеры устройств", "scene": "Сцены с последней активацией", "labels": "Каждая сущность хотя бы с одним ярлыком", "auto": "Автоматизации и скрипты", "helper": "input_*, счётчики, таймеры, расписания", "sensor": "Датчики, не подходящие ни под одну вкладку измерений", "unavailable": "Сущности, которые сейчас недоступны или неизвестны"},
  },
  sv: {
    scTitle: "Tillståndsklass",
    scNone: "ingen (ingen tillståndsklass)",
    scMeasurement: "measurement: ett ögonblicksvärde som går upp och ner, t.ex. temperatur, effekt, luftfuktighet.",
    scTotal: "total: en räknare som också kan minska, t.ex. en räknare med nollställning eller ett saldo.",
    scTotalInc: "total_increasing: en räknare som bara ökar (och börjar om på 0), t.ex. energi i kWh, gas, vatten.",
    scStatsBusy: "Kontrollerar långtidsstatistiken …",
    scStatsYes: "Det finns långtidsstatistik för den här entiteten ({what}, enhet {unit}, källa {src}). Home Assistant sparar den som timvärden för energipanelen och historikgraferna.",
    scStatsNo: "Ingen långtidsstatistik: bara entiteter med en tillståndsklass (och en enhet) får den. Utan den finns bara historiken för enskilda värden kvar, och den raderas efter recorderns lagring.",
    scStatsFail: "Långtidsstatistiken kunde inte läsas.",
    scChange: "Går det att ändra? Inte här och inte i Home Assistants entitetsinställningar: integrationen som levererar sensorn bestämmer. Undantag: i configuration.yaml med customize (state_class:) och för mallhjälpare som du skapar själv.",
    scRecNote: "Lagringen i Entity Inventory förkortar bara historiken för enskilda värden hos en entitet. Långtidsstatistiken lämnas orörd.",
    scDevTools: "Utvecklarverktyg → Statistik",
    scTip: "Entitetens tillståndsklass (klicka för en förklaring)",
    c_recupd: "Senaste rapport",
    recColsTip: "Visa recorderkolumnerna (sparat sedan, poster, snittintervall) (markerad = visas)",
    c_recrows: "Poster",
    c_recint: "Snittintervall",
    retStats: "Poster i recordern: {rows} · ungefär {perday} per dag · genomsnittligt intervall {int}",
    retStatsTip: "Poster i recordern: {rows} (ungefär {perday} per dag), genomsnittligt intervall mellan två poster: {int}",
    c_retention: "Sparat sedan (dagar, recorder)",
    retTitle: "Recorder – lagring",
    retBtn: "Recorder",
    retTip: "Recorderlagring för denna entitet: klick öppnar dialogen, Skift+klick skriver in dagarna här",
    retIntro: "Historiken för denna entitet (recorderns databas) som är äldre än det valda antalet dagar raderas varje natt. En regel kan bara förkorta recorderns globala lagring (purge_keep_days), inte förlänga den.",
    retNone: "Ingen regel (recorderns standard)",
    retDays: "{n} dagar",
    retCustom: "Annat antal dagar",
    retJob: "Kör nattjobbet (03:20) för alla entiteter med regel eller standard",
    retRules: "{n} entiteter med regel",
    retRunNow: "Kör nu",
    retRunAsk: "Detta raderar nu historik i recorderns databas. Det går inte att ångra.",
    retLast: "Senaste körning: {t}",
    retDone: "Klart: {n} entiteter behandlade.",
    retFail: "Recordern rapporterar ett fel: {e}",
    retNoRec: "Recordern är inte tillgänglig.",
    retAdmin: "Bara administratörer kan ändra lagringen.",
    retNever: "aldrig",
    retSince: "I recordern sedan: {t} ({n} dagar)",
    retSinceNone: "Ingen historik i recordern.",
    retSinceFail: "Historikens ålder kunde inte läsas.",
    retSinceBusy: "Läser historikens ålder …",
    retShort: "{n} d",
    retRule: "regel: {n} d",
    retErr: "Recorderfrågan misslyckades: {e}",
    retGlobal: "Recordern sparar historiken för alla entiteter i {n} dagar (purge_keep_days).",
    retGlobalUnknown: "Recorderns globala lagring kunde inte läsas (körs recordern?).",
    retMax: "Maximum (förkorta aldrig)",
    retRuleNone: "Ingen egen regel: den här entiteten förkortas inte av Entity Inventory{d}.",
    retRuleDefault: " – standardlagringen på {n} dagar gäller",
    retRuleMax: "Förkortas aldrig av Entity Inventory: historiken finns kvar så länge recordern behåller den ({g} dagar).",
    retRuleShort: "Historik för denna entitet som är äldre än {n} dagar raderas varje natt (bara medan nattjobbet är på).",
    retRuleSame: "Detta motsvarar recorderns lagring på {g} dagar, så regeln ändrar ingenting.",
    retRuleLong: "Recordern raderar historik efter {g} dagar. Den här regeln kan inte spara mer förrän recorderns inställning höjs (se nedan).",
    retLongerTitle: "Så sparar du data längre än {g} dagar:",
    retLonger1: "1. Öppna configuration.yaml och sätt purge_keep_days i blocket recorder: till den längsta tid du behöver (här {n}). Finns redan ett recorder:-block, ändra bara den raden – lägg inte till ett andra block.",
    retLonger2: "2. Starta om Home Assistant (Inställningar → System → Starta om). Recordern läser den här inställningen bara vid start; Entity Inventory kan inte ändra den.",
    retLonger3: "3. Därefter sparas varje entitet som standard så länge. För att hålla resten kortare, ställ in en standardlagring nedan: då behåller bara entiteter med en längre regel sin historik så länge.",
    retLonger4: "Obs: längre lagring gör databasen större, ungefär i proportion till dagarna.",
    retYamlCopy: "Kopiera YAML-raderna",
    retYamlCopied: "Kopierat.",
    retAllTitle: "För alla entiteter",
    retDefaultLabel: "Standardlagring för alla entiteter utan egen regel (dagar, tomt = ingen)",
    retDefaultSave: "Spara standard",
    retDefaultHelp: "Exempel: recordern sparar 365 dagar och standarden är 30: varje entitet utan regel kortas på natten till 30 dagar, entiteter med regeln 365 behåller allt. Utan standard kortas bara entiteter med regel. Varning: standarden gäller för VARJE entitet i databasen, inte bara de som visas här.",
    retPreviewBtn: "Förhandsgranska",
    retPvTitle: "Det här skulle nattjobbet radera",
    retPvGroup: "• {days} dagar: {entities} entiteter, ungefär {rows} äldre historikrader",
    retPvNone: "Just nu skulle inget raderas.",
    retPvTotal: "Totalt: ungefär {rows} historikrader från {entities} entiteter.",
    retPvSkipped: "{n} entiteter hoppas över eftersom deras lagring inte är kortare än recorderns {g} dagar.",
    retPvHow: "Vad jobbet gör: det anropar Home Assistant-tjänsten recorder.purge_entities en gång per grupp av dagar. Det raderar bara enskild värdehistorik (states) för dessa entiteter som är äldre än antalet dagar. Det raderar INTE långtidsstatistiken (energipanelen, timvärden), stoppar inte inspelningen och nya värden sparas som vanligt. Raderad historik kan bara återställas från en säkerhetskopia.",
    retPvFail: "Förhandsgranskningen misslyckades: {e}",
    retPvBusy: "Räknar – i en stor databas kan det ta några sekunder …",
    retEnableTitle: "Slå på nattjobbet för lagring?",
    retEnableText: "Från och med nu körs jobbet varje natt kl. 03:20 och raderar historik som är äldre än lagringen för dess entitet (egen regel, annars standarden). Det gäller även entiteter du inte ser i den här tabellen.",
    retDefaultConfirmTitle: "Ställa in standardlagring?",
    retDefaultConfirmText: "Från och med nu räknas varje entitet utan egen regel som: spara {n} dagar. Det är alla entiteter som recordern har historik för, inte bara en flik. Det gäller bara medan nattjobbet är på (eller när du kör det för hand).",
    retDefaultOff: "Standardlagringen tas bort. Entiteter utan egen regel förkortas inte längre av Entity Inventory.",
    retConfirmOn: "Slå på",
    retDeleteNow: "Radera nu",
    retSave: "Spara",
    retRunTitle: "Radera historiken nu?",
    blurTip: "Gör känsliga uppgifter suddiga (användar-ID, användarnamn, spårare, personer, kommentarer), t.ex. för skärmdumpar (markerad = på)",
    title: "Entity Inventory",
    tabsBtn: "Visa eller dölj flikar",
    tabsShowAll: "Visa alla",
    tabsClose: "Stäng",
    gLight: "Alla och ljus",
    gElectro: "El",
    gClimate: "Klimat",
    gCover: "Rullgardiner",
    gUsage: "Förbrukning",
    gAuto: "Automation",
    gMore: "Mer",
    search: "Sök (namn, enhets-ID, område, enhet, integration …)",
    count: "Visade entiteter / på denna flik",
    csv: "Exportera CSV",
    print: "Skriv ut / PDF",
    pause: "Pausa liveuppdatering",
    resume: "Återuppta liveuppdatering",
    allAreas: "Alla områden",
    allInts: "Alla integrationer",
    hidden: "Visa dolda / inaktiverade entiteter (markerad = visas)",
    copied: "Kopierat",
    wideTip: "Större radavstånd (markerad = på)",
    hideOff: "Dölj otillgängliga / okända entiteter (markerad = dolda)",
    none: "Inga entiteter på denna flik.",
    c_led: "Status",
    c_name: "Namn",
    c_id: "Entitets-ID",
    c_value: "Värde",
    c_area: "Område",
    c_device: "Enhet",
    labelTitle: "Etikett",
    labelName: "Namn",
    labelIcon: "Ikon (t.ex. mdi:tag)",
    labelColor: "Färg",
    labelDesc: "Beskrivning",
    labelEntities: "Entiteter med denna etikett",
    labelManage: "Etikettinställningar",
    labelCount: "{n} entiteter på denna flik / {m} totalt",
    labelFail: "Det gick inte att spara",
    labelNone: "ingen",
    c_labels: "Etiketter",
    allLabels: "Alla etiketter",
    noLabel: "Utan etikett",
    c_platform: "Integration",
    c_class: "Klass",
    c_changed: "Ändrad",
    c_pos: "Position",
    c_tilt: "Lamellvinkel",
    c_bright: "Ljusstyrka",
    c_cur: "Aktuell",
    c_target: "Mål",
    c_mode: "Läge",
    c_action: "Åtgärd",
    c_unit: "Enhet",
    c_state: "Tillstånd",
    onlyNotes: "Endast poster med kommentar och/eller foto (markerad = aktiv)",
    cfgBtn: "Redigera kolumner (skärm och skrivare)",
    tgtView: "Skärm",
    tgtPrint: "Skrivare",
    autoTip: "Anpassa kolumnbredderna till det bredaste innehållet",
    resetTip: "Återställ layouten",
    resetAsk: "Återställa kolumnlayouten till standard?",
    doneTip: "Klart",
    renameTip: "Kolumnnamn (tomt = standard)",
    stand: "Läge per",
    entities: "entiteter",
    printFail: "Utskriften misslyckades",
    portrait: "Utskrift: stående (klicka: liggande)",
    landscape: "Utskrift: liggande (klicka: stående)",
    showBadges: "Visa de röda siffrorna på flikarna (otillgängliga entiteter)",
    hideBadges: "Dölj de röda siffrorna på flikarna",
    copyTip: "Kopiera entitets-ID",
    copyNameTip: "Kopiera namnet",
    copyValueTip: "Kopiera värdet",
    editConfirmName: "Ändra namnet?\n\n{old}\n→ {new}",
    editConfirmId: "Ändra entitets-ID?\n\n{old}\n→ {new}\n\nAutomationer, skript och instrumentpaneler som använder det gamla ID:t måste justeras.",
    idLabel: "Entitets-ID",
    idWarn: "Automationer, skript, instrumentpaneler och mallar som använder det gamla ID:t ändras INTE här av Home Assistant – kontrollera dem efteråt.",
    idInvalid: "Ogiltigt entitets-ID. Det måste behålla domänen och bara använda a-z, 0-9 och _ (t.ex. {d}.namn).",
    alignDec: "Värden justerade efter decimaltecknet (klicka: vänster)",
    alignLeft: "Värden vänsterjusterade (klicka: höger)",
    alignRight: "Värden högerjusterade (klicka: efter decimaltecknet)",
    nameTitle: "Byt namn på entitet",
    nameLabel: "Namn",
    nameHintDev: "Home Assistant sätter enhetsnamnet först: ”{dev}”",
    nameDefault: "Standardnamn: {n}",
    nameReset: "Återställ till standard",
    nameDetails: "Historik / detaljer",
    nameFail: "Det gick inte att spara",
    nameNoReg: "Entiteten saknar unikt ID, finns alltså inte i entitetsregistret och kan inte döpas om här.",
    nameAdmin: "Bara administratörer kan byta namn på entiteter.",
    c_icon: "Ikon",
    iconTip: "Ändra ikonen (öppnar entitetens inställningar)",
    iconNoReg: "Ikonen för denna entitet kan inte ändras: utan unikt ID finns den inte i entitetsregistret.",
    iconAdmin: "Bara administratörer kan ändra ikonen.",
    c_access: "r/w",
    accessTip: {"r": "r = endast läsning (uppmätt eller rapporterat värde)", "w": "w = endast skrivning (utlösare utan eget tillstånd)", "rw": "rw = läsbar och styrbar"},
    c_photos: "Foton",
    c_docs: "Dokument",
    c_note: "Kommentar",
    photosTitle: "Foton",
    addPhotos: "Lägg till foton",
    docsTitle: "Dokument",
    addDocs: "Lägg till dokument",
    noteTitle: "Kommentar",
    save: "Spara",
    cancel: "Avbryt",
    del: "Ta bort",
    rename: "Byt namn",
    renamePrompt: "Nytt namn",
    confirmDel: "Ta verkligen bort {name}?",
    uploadFail: "Uppladdningen misslyckades",
    noPhotos: "Inga foton ännu.",
    noDocs: "Inga dokument ännu (t.ex. elavtal, gasavtal, foto av mätaren).",
    notePh: "Kommentar (placering, säkring, avtalsnummer …)",
    c_trackers: "Spårare",
    c_source: "Källa",
    c_username: "Användarnamn",
    c_person: "Person",
    c_role: "Roll",
    c_provider: "Inloggningsmetod",
    c_local: "Endast lokalt",
    c_system: "Systemkonto",
    c_userid: "Användar-ID",
    c_active: "Aktiv",
    yes: "✓",
    no: "–",
    c_sc: "Tillståndsklass",
    c_maker: "Tillverkare",
    c_model: "Modell",
    on: "på",
    off: "av",
    roleOwner: "Ägare",
    roleRead: "Skrivskyddad",
    ago: {"s": "nyss", "m": "{n} min sedan", "h": "{n} h sedan", "d": "{n} d sedan"},
    t: {"all": "Alla entiteter", "illuminance": "Ljusstyrka", "temperature": "Temperatur", "humidity": "Luftfuktighet", "power": "Effekt", "energy": "Energi", "consumption": "Förbrukning", "voltage": "Spänning", "frequency": "Frekvens", "current": "Ström", "battery": "Batterier", "cover": "Rullgardiner", "tilt": "Lameller", "light": "Lampor", "dimmer": "Dimrar", "switch": "Strömbrytare", "climate": "Termostater", "media": "Media", "person": "Personer", "users": "Användarkonton", "binary": "Binära sensorer", "presence": "Spårare", "scene": "Scener", "labels": "Etiketter", "auto": "Automationer / skript", "helper": "Hjälpare", "sensor": "Övriga sensorer", "unavailable": "Otillgängliga"},
    d: {"all": "Varje entitet som Home Assistant känner till", "illuminance": "Ljussensorer (lux)", "temperature": "Sensorer som mäter en temperatur", "humidity": "Fuktsensorer", "power": "Momentan effekt (W, kW)", "energy": "Energimätare (Wh, kWh)", "consumption": "Gas, vatten, volym och allt som heter förbrukning", "voltage": "Spänningssensorer (V, mV, kV)", "frequency": "Frekvenssensorer (Hz)", "current": "Ström och effektfaktor (A, mA)", "battery": "Batterinivåer, de svagaste först", "cover": "Rullgardiner, jalusier, garageportar: position", "tilt": "Rullgardiner med justerbara lameller: lamellvinkel", "light": "Alla lampor", "dimmer": "Dimbara lampor", "switch": "Strömbrytare, uttag och på/av-hjälpare", "climate": "Termostater och värmepumpar: aktuell, mål, läge", "media": "TV-apparater, högtalare och andra spelare", "binary": "Sensorer för rörelse, kontakt, fönster, rök …", "person": "Personer med sina spårare och länkat konto", "users": "Inloggningskonton i Home Assistant (kräver administratörsrättigheter)", "presence": "Enhetsspårare", "scene": "Scener med senaste aktivering", "labels": "Varje entitet med minst en etikett", "auto": "Automationer och skript", "helper": "input_*, räknare, timers, scheman", "sensor": "Sensorer som inte passar någon mätflik", "unavailable": "Entiteter som just nu är otillgängliga eller okända"},
  },
  nb: {
    scTitle: "Tilstandsklasse",
    scNone: "ingen (ingen tilstandsklasse)",
    scMeasurement: "measurement: en øyeblikksverdi som går opp og ned, f.eks. temperatur, effekt, luftfuktighet.",
    scTotal: "total: en teller som også kan synke, f.eks. en teller med nullstilling eller en saldo.",
    scTotalInc: "total_increasing: en teller som bare øker (og begynner på 0 igjen), f.eks. energi i kWh, gass, vann.",
    scStatsBusy: "Sjekker langtidsstatistikken …",
    scStatsYes: "Det finnes langtidsstatistikk for denne entiteten ({what}, enhet {unit}, kilde {src}). Home Assistant lagrer den som timeverdier for energipanelet og historikkgrafene.",
    scStatsNo: "Ingen langtidsstatistikk: Bare entiteter med en tilstandsklasse (og en enhet) får den. Uten den er det bare historikken til enkeltverdier igjen, og den slettes etter recorderens lagring.",
    scStatsFail: "Langtidsstatistikken kunne ikke leses.",
    scChange: "Kan det endres? Ikke her og heller ikke i Home Assistants entitetsinnstillinger: Integrasjonen som leverer sensoren bestemmer. Unntak: i configuration.yaml med customize (state_class:) og for malhjelpere du lager selv.",
    scRecNote: "Lagringen i Entity Inventory forkorter bare historikken til enkeltverdier for en entitet. Langtidsstatistikken blir urørt.",
    scDevTools: "Utviklerverktøy → Statistikk",
    scTip: "Entitetens tilstandsklasse (klikk for forklaring)",
    c_recupd: "Siste melding",
    recColsTip: "Vis recorder-kolonnene (lagret siden, poster, snittintervall) (utheva = vist)",
    c_recrows: "Poster",
    c_recint: "Snittintervall",
    retStats: "Poster i recorderen: {rows} · omtrent {perday} per dag · gjennomsnittlig intervall {int}",
    retStatsTip: "Poster i recorderen: {rows} (omtrent {perday} per dag), gjennomsnittlig intervall mellom to poster: {int}",
    c_retention: "Lagret siden (dager, recorder)",
    retTitle: "Recorder – lagring",
    retBtn: "Recorder",
    retTip: "Recorder-lagring for denne entiteten: klikk åpner dialogen, Skift+klikk skriver inn dagene her",
    retIntro: "Historikken til denne entiteten (recorderens database) som er eldre enn valgt antall dager, slettes hver natt. En regel kan bare forkorte recorderens globale lagring (purge_keep_days), ikke forlenge den.",
    retNone: "Ingen regel (recorderens standard)",
    retDays: "{n} dager",
    retCustom: "Annet antall dager",
    retJob: "Kjør nattjobben (03:20) for alle entiteter med regel eller standard",
    retRules: "{n} entiteter med regel",
    retRunNow: "Kjør nå",
    retRunAsk: "Dette sletter nå historikk i recorderens database. Det kan ikke angres.",
    retLast: "Siste kjøring: {t}",
    retDone: "Ferdig: {n} entiteter behandlet.",
    retFail: "Recorderen melder en feil: {e}",
    retNoRec: "Recorderen er ikke tilgjengelig.",
    retAdmin: "Bare administratorer kan endre lagringen.",
    retNever: "aldri",
    retSince: "I recorderen siden: {t} ({n} dager)",
    retSinceNone: "Ingen historikk i recorderen.",
    retSinceFail: "Alderen på historikken kunne ikke leses.",
    retSinceBusy: "Leser alderen på historikken …",
    retShort: "{n} d",
    retRule: "regel: {n} d",
    retErr: "Recorder-spørringen mislyktes: {e}",
    retGlobal: "Recorderen beholder historikken til alle entiteter i {n} dager (purge_keep_days).",
    retGlobalUnknown: "Recorderens globale lagring kunne ikke leses (kjører recorderen?).",
    retMax: "Maksimum (aldri forkort)",
    retRuleNone: "Ingen egen regel: Denne entiteten forkortes ikke av Entity Inventory{d}.",
    retRuleDefault: " – standardlagringen på {n} dager gjelder",
    retRuleMax: "Forkortes aldri av Entity Inventory: Historikken blir så lenge recorderen beholder den ({g} dager).",
    retRuleShort: "Historikk for denne entiteten som er eldre enn {n} dager, slettes hver natt (bare mens nattjobben er på).",
    retRuleSame: "Dette tilsvarer recorderens lagring på {g} dager, så regelen endrer ingenting.",
    retRuleLong: "Recorderen sletter historikk etter {g} dager. Denne regelen kan ikke beholde mer før recorder-innstillingen er økt (se under).",
    retLongerTitle: "Slik beholder du data lenger enn {g} dager:",
    retLonger1: "1. Åpne configuration.yaml og sett purge_keep_days i blokken recorder: til den lengste tiden du trenger (her {n}). Finnes det allerede en recorder:-blokk, endre bare den linjen – ikke legg til en ny blokk.",
    retLonger2: "2. Start Home Assistant på nytt (Innstillinger → System → Start på nytt). Recorderen leser denne innstillingen bare ved oppstart; Entity Inventory kan ikke endre den.",
    retLonger3: "3. Etterpå beholdes hver entitet som standard så lenge. For å holde resten kortere, sett en standardlagring nedenfor: Da beholder bare entiteter med en lengre regel historikken så lenge.",
    retLonger4: "Merk: Lengre lagring gjør databasen større, omtrent i forhold til dagene.",
    retYamlCopy: "Kopier YAML-linjene",
    retYamlCopied: "Kopiert.",
    retAllTitle: "For alle entiteter",
    retDefaultLabel: "Standardlagring for alle entiteter uten egen regel (dager, tom = ingen)",
    retDefaultSave: "Lagre standard",
    retDefaultHelp: "Eksempel: Recorderen beholder 365 dager og standarden er 30: Hver entitet uten regel kortes om natten ned til 30 dager, entiteter med regelen 365 beholder alt. Uten standard forkortes bare entiteter med regel. Advarsel: Standarden gjelder for HVER entitet i databasen, ikke bare de som vises her.",
    retPreviewBtn: "Forhåndsvisning",
    retPvTitle: "Dette ville nattjobben slettet",
    retPvGroup: "• {days} dager: {entities} entiteter, omtrent {rows} eldre historikkrader",
    retPvNone: "Akkurat nå ville ingenting blitt slettet.",
    retPvTotal: "Totalt: omtrent {rows} historikkrader fra {entities} entiteter.",
    retPvSkipped: "{n} entiteter hoppes over fordi lagringen deres ikke er kortere enn recorderens {g} dager.",
    retPvHow: "Hva jobben gjør: Den kaller Home Assistant-tjenesten recorder.purge_entities én gang per gruppe dager. Den sletter bare den enkelte verdihistorikken (states) til disse entitetene som er eldre enn antall dager. Den sletter IKKE langtidsstatistikken (energipanelet, timeverdier), stopper ikke opptaket, og nye verdier lagres som vanlig. Slettet historikk kan bare gjenopprettes fra en sikkerhetskopi.",
    retPvFail: "Forhåndsvisningen mislyktes: {e}",
    retPvBusy: "Teller – i en stor database kan dette ta noen sekunder …",
    retEnableTitle: "Slå på nattjobben for lagring?",
    retEnableText: "Fra nå av kjører jobben hver natt kl. 03:20 og sletter historikk som er eldre enn lagringen til entiteten (egen regel, ellers standarden). Dette gjelder også entiteter du ikke ser i denne tabellen.",
    retDefaultConfirmTitle: "Sette standardlagring?",
    retDefaultConfirmText: "Fra nå av regnes hver entitet uten egen regel som: behold {n} dager. Det er alle entiteter recorderen har historikk for, ikke bare én fane. Det virker bare mens nattjobben er på (eller når du kjører den for hånd).",
    retDefaultOff: "Standardlagringen fjernes. Entiteter uten egen regel forkortes ikke lenger av Entity Inventory.",
    retConfirmOn: "Slå på",
    retDeleteNow: "Slett nå",
    retSave: "Lagre",
    retRunTitle: "Slette historikken nå?",
    blurTip: "Gjør sensitive data uskarpe (bruker-ID-er, brukernavn, sporere, personer, kommentarer), f.eks. for skjermbilder (utheva = på)",
    title: "Entity Inventory",
    tabsBtn: "Vis eller skjul faner",
    tabsShowAll: "Vis alle",
    tabsClose: "Lukk",
    gLight: "Alle og lys",
    gElectro: "Elektro",
    gClimate: "Klima",
    gCover: "Persienner",
    gUsage: "Forbruk",
    gAuto: "Automasjon",
    gMore: "Mer",
    search: "Søk (navn, enhets-ID, område, enhet, integrasjon …)",
    count: "Viste entiteter / i denne fanen",
    csv: "Eksporter CSV",
    print: "Skriv ut / PDF",
    pause: "Sett direkteoppdatering på pause",
    resume: "Gjenoppta direkteoppdatering",
    allAreas: "Alle områder",
    allInts: "Alle integrasjoner",
    hidden: "Vis skjulte / deaktiverte entiteter (utheva = vist)",
    copied: "Kopiert",
    wideTip: "Større linjeavstand (utheva = på)",
    hideOff: "Skjul utilgjengelige / ukjente entiteter (utheva = skjult)",
    none: "Ingen entiteter i denne fanen.",
    c_led: "Status",
    c_name: "Navn",
    c_id: "Entitets-ID",
    c_value: "Verdi",
    c_area: "Område",
    c_device: "Enhet",
    labelTitle: "Etikett",
    labelName: "Navn",
    labelIcon: "Ikon (f.eks. mdi:tag)",
    labelColor: "Farge",
    labelDesc: "Beskrivelse",
    labelEntities: "Entiteter med denne etiketten",
    labelManage: "Etikettinnstillinger",
    labelCount: "{n} entiteter i denne fanen / {m} totalt",
    labelFail: "Kunne ikke lagre",
    labelNone: "ingen",
    c_labels: "Etiketter",
    allLabels: "Alle etiketter",
    noLabel: "Uten etikett",
    c_platform: "Integrasjon",
    c_class: "Klasse",
    c_changed: "Endret",
    c_pos: "Posisjon",
    c_tilt: "Lamellvinkel",
    c_bright: "Lysstyrke",
    c_cur: "Nåværende",
    c_target: "Mål",
    c_mode: "Modus",
    c_action: "Handling",
    c_unit: "Enhet",
    c_state: "Tilstand",
    onlyNotes: "Bare oppføringer med kommentar og/eller bilde (utheva = aktiv)",
    cfgBtn: "Rediger kolonner (skjerm og skriver)",
    tgtView: "Skjerm",
    tgtPrint: "Skriver",
    autoTip: "Tilpass kolonnebreddene til det bredeste innholdet",
    resetTip: "Tilbakestill oppsettet",
    resetAsk: "Tilbakestille kolonneoppsettet til standard?",
    doneTip: "Ferdig",
    renameTip: "Kolonnenavn (tomt = standard)",
    stand: "Status per",
    entities: "entiteter",
    printFail: "Utskriften mislyktes",
    portrait: "Utskrift: stående (klikk: liggende)",
    landscape: "Utskrift: liggende (klikk: stående)",
    showBadges: "Vis de røde tallene på fanene (utilgjengelige entiteter)",
    hideBadges: "Skjul de røde tallene på fanene",
    copyTip: "Kopier entitets-ID",
    copyNameTip: "Kopier navnet",
    copyValueTip: "Kopier verdien",
    editConfirmName: "Endre navnet?\n\n{old}\n→ {new}",
    editConfirmId: "Endre entitets-ID?\n\n{old}\n→ {new}\n\nAutomasjoner, skript og dashbord som bruker den gamle ID-en må justeres.",
    idLabel: "Entitets-ID",
    idWarn: "Automasjoner, skript, dashbord og maler som bruker den gamle ID-en endres IKKE her av Home Assistant – sjekk dem etterpå.",
    idInvalid: "Ugyldig entitets-ID. Den må beholde domenet og bare bruke a-z, 0-9 og _ (f.eks. {d}.navn).",
    alignDec: "Verdier justert etter desimaltegnet (klikk: venstre)",
    alignLeft: "Verdier venstrejustert (klikk: høyre)",
    alignRight: "Verdier høyrejustert (klikk: etter desimaltegnet)",
    nameTitle: "Gi entiteten nytt navn",
    nameLabel: "Navn",
    nameHintDev: "Home Assistant setter enhetsnavnet foran: «{dev}»",
    nameDefault: "Standardnavn: {n}",
    nameReset: "Tilbakestill til standard",
    nameDetails: "Historikk / detaljer",
    nameFail: "Kunne ikke lagre",
    nameNoReg: "Denne entiteten har ingen unik ID, finnes derfor ikke i entitetsregisteret og kan ikke gis nytt navn her.",
    nameAdmin: "Bare administratorer kan gi entiteter nytt navn.",
    c_icon: "Ikon",
    iconTip: "Endre ikonet (åpner innstillingene til entiteten)",
    iconNoReg: "Ikonet til denne entiteten kan ikke endres: uten unik ID finnes den ikke i entitetsregisteret.",
    iconAdmin: "Bare administratorer kan endre ikonet.",
    c_access: "r/w",
    accessTip: {"r": "r = bare lesing (målt eller rapportert verdi)", "w": "w = bare skriving (utløser uten egen tilstand)", "rw": "rw = lesbar og styrbar"},
    c_photos: "Bilder",
    c_docs: "Dokumenter",
    c_note: "Kommentar",
    photosTitle: "Bilder",
    addPhotos: "Legg til bilder",
    docsTitle: "Dokumenter",
    addDocs: "Legg til dokumenter",
    noteTitle: "Kommentar",
    save: "Lagre",
    cancel: "Avbryt",
    del: "Slett",
    rename: "Gi nytt navn",
    renamePrompt: "Nytt navn",
    confirmDel: "Slette {name} for alvor?",
    uploadFail: "Opplastingen mislyktes",
    noPhotos: "Ingen bilder ennå.",
    noDocs: "Ingen dokumenter ennå (f.eks. strømavtale, gassavtale, bilde av måleren).",
    notePh: "Kommentar (plassering, sikring, avtalenummer …)",
    c_trackers: "Sporere",
    c_source: "Kilde",
    c_username: "Brukernavn",
    c_person: "Person",
    c_role: "Rolle",
    c_provider: "Innloggingsmetode",
    c_local: "Bare lokalt",
    c_system: "Systemkonto",
    c_userid: "Bruker-ID",
    c_active: "Aktiv",
    yes: "✓",
    no: "–",
    c_sc: "Tilstandsklasse",
    c_maker: "Produsent",
    c_model: "Modell",
    on: "på",
    off: "av",
    roleOwner: "Eier",
    roleRead: "Skrivebeskyttet",
    ago: {"s": "nå nettopp", "m": "{n} min siden", "h": "{n} t siden", "d": "{n} d siden"},
    t: {"all": "Alle entiteter", "illuminance": "Lysstyrke", "temperature": "Temperatur", "humidity": "Luftfuktighet", "power": "Effekt", "energy": "Energi", "consumption": "Forbruk", "voltage": "Spenning", "frequency": "Frekvens", "current": "Strøm", "battery": "Batterier", "cover": "Persienner", "tilt": "Lameller", "light": "Lys", "dimmer": "Dimmere", "switch": "Brytere", "climate": "Termostater", "media": "Media", "person": "Personer", "users": "Brukerkontoer", "binary": "Binære sensorer", "presence": "Sporere", "scene": "Scener", "labels": "Etiketter", "auto": "Automasjoner / skript", "helper": "Hjelpere", "sensor": "Andre sensorer", "unavailable": "Utilgjengelige"},
    d: {"all": "Alle entiteter Home Assistant kjenner", "illuminance": "Lyssensorer (lux)", "temperature": "Sensorer som måler en temperatur", "humidity": "Fuktsensorer", "power": "Momentan effekt (W, kW)", "energy": "Energitellere (Wh, kWh)", "consumption": "Gass, vann, volum og alt som heter forbruk", "voltage": "Spenningssensorer (V, mV, kV)", "frequency": "Frekvenssensorer (Hz)", "current": "Strøm og effektfaktor (A, mA)", "battery": "Batterinivåer, de svakeste først", "cover": "Persienner, rullegardiner, garasjeporter: posisjon", "tilt": "Persienner med justerbare lameller: lamellvinkel", "light": "Alle lys", "dimmer": "Lys som kan dimmes", "switch": "Brytere, stikkontakter og på/av-hjelpere", "climate": "Termostater og varmepumper: nåværende, mål, modus", "media": "TV-er, høyttalere og andre spillere", "binary": "Bevegelses-, kontakt-, vindus-, røyksensorer …", "person": "Personer med sine sporere og koblet konto", "users": "Innloggingskontoer i Home Assistant (krever administratorrettigheter)", "presence": "Enhetssporere", "scene": "Scener med siste aktivering", "labels": "Alle entiteter med minst én etikett", "auto": "Automasjoner og skript", "helper": "input_*, tellere, tidtakere, tidsplaner", "sensor": "Sensorer som ikke passer i noen målefane", "unavailable": "Entiteter som akkurat nå er utilgjengelige eller ukjente"},
  },
  da: {
    scTitle: "Tilstandsklasse",
    scNone: "ingen (ingen tilstandsklasse)",
    scMeasurement: "measurement: en øjebliksværdi, der stiger og falder, f.eks. temperatur, effekt, luftfugtighed.",
    scTotal: "total: en tæller, der også kan falde, f.eks. en tæller med nulstilling eller en saldo.",
    scTotalInc: "total_increasing: en tæller, der kun stiger (og starter forfra ved 0), f.eks. energi i kWh, gas, vand.",
    scStatsBusy: "Tjekker langtidsstatistikken …",
    scStatsYes: "Der findes langtidsstatistik for denne entitet ({what}, enhed {unit}, kilde {src}). Home Assistant gemmer den som timeværdier til energipanelet og historikgraferne.",
    scStatsNo: "Ingen langtidsstatistik: Kun entiteter med en tilstandsklasse (og en enhed) får den. Uden den er der kun historikken for enkeltværdier tilbage, og den slettes efter recorderens opbevaring.",
    scStatsFail: "Langtidsstatistikken kunne ikke læses.",
    scChange: "Kan det ændres? Ikke her og heller ikke i Home Assistants entitetsindstillinger: Integrationen, der leverer sensoren, bestemmer. Undtagelser: i configuration.yaml med customize (state_class:) og for skabelonhjælpere, du selv opretter.",
    scRecNote: "Opbevaringen i Entity Inventory forkorter kun historikken for enkeltværdier for en entitet. Langtidsstatistikken forbliver urørt.",
    scDevTools: "Udviklerværktøjer → Statistik",
    scTip: "Entitetens tilstandsklasse (klik for en forklaring)",
    c_recupd: "Seneste melding",
    recColsTip: "Vis recorder-kolonnerne (gemt siden, poster, gns. interval) (fremhævet = vist)",
    c_recrows: "Poster",
    c_recint: "Gns. interval",
    retStats: "Poster i recorderen: {rows} · cirka {perday} pr. dag · gennemsnitligt interval {int}",
    retStatsTip: "Poster i recorderen: {rows} (cirka {perday} pr. dag), gennemsnitligt interval mellem to poster: {int}",
    c_retention: "Gemt siden (dage, recorder)",
    retTitle: "Recorder – opbevaring",
    retBtn: "Recorder",
    retTip: "Recorder-opbevaring for denne entitet: klik åbner dialogen, Skift+klik skriver dagene her",
    retIntro: "Historikken for denne entitet (recorderens database), som er ældre end det valgte antal dage, slettes hver nat. En regel kan kun forkorte recorderens globale opbevaring (purge_keep_days), ikke forlænge den.",
    retNone: "Ingen regel (recorderens standard)",
    retDays: "{n} dage",
    retCustom: "Andet antal dage",
    retJob: "Kør natjobbet (03:20) for alle entiteter med regel eller standard",
    retRules: "{n} entiteter med regel",
    retRunNow: "Kør nu",
    retRunAsk: "Dette sletter nu historik i recorderens database. Det kan ikke fortrydes.",
    retLast: "Seneste kørsel: {t}",
    retDone: "Færdig: {n} entiteter behandlet.",
    retFail: "Recorderen melder en fejl: {e}",
    retNoRec: "Recorderen er ikke tilgængelig.",
    retAdmin: "Kun administratorer kan ændre opbevaringen.",
    retNever: "aldrig",
    retSince: "I recorderen siden: {t} ({n} dage)",
    retSinceNone: "Ingen historik i recorderen.",
    retSinceFail: "Historikkens alder kunne ikke læses.",
    retSinceBusy: "Læser historikkens alder …",
    retShort: "{n} d",
    retRule: "regel: {n} d",
    retErr: "Recorder-forespørgslen mislykkedes: {e}",
    retGlobal: "Recorderen beholder historikken for alle entiteter i {n} dage (purge_keep_days).",
    retGlobalUnknown: "Recorderens globale opbevaring kunne ikke læses (kører recorderen?).",
    retMax: "Maksimum (forkort aldrig)",
    retRuleNone: "Ingen egen regel: Denne entitet forkortes ikke af Entity Inventory{d}.",
    retRuleDefault: " – standardopbevaringen på {n} dage gælder",
    retRuleMax: "Forkortes aldrig af Entity Inventory: Historikken bliver, så længe recorderen beholder den ({g} dage).",
    retRuleShort: "Historik for denne entitet, der er ældre end {n} dage, slettes hver nat (kun mens natjobbet er til).",
    retRuleSame: "Det svarer til recorderens opbevaring på {g} dage, så reglen ændrer intet.",
    retRuleLong: "Recorderen sletter historik efter {g} dage. Denne regel kan ikke beholde mere, før recorder-indstillingen er hævet (se nedenfor).",
    retLongerTitle: "Sådan gemmer du data længere end {g} dage:",
    retLonger1: "1. Åbn configuration.yaml og sæt purge_keep_days i blokken recorder: til den længste tid, du har brug for (her {n}). Findes der allerede en recorder:-blok, så ret kun den linje – tilføj ikke en anden blok.",
    retLonger2: "2. Genstart Home Assistant (Indstillinger → System → Genstart). Recorderen læser kun denne indstilling ved start; Entity Inventory kan ikke ændre den.",
    retLonger3: "3. Derefter opbevares hver entitet som standard så længe. For at holde resten kortere, indstil en standardopbevaring nedenfor: Så beholder kun entiteter med en længere regel deres historik så længe.",
    retLonger4: "Bemærk: Længere opbevaring gør databasen større, omtrent i forhold til dagene.",
    retYamlCopy: "Kopiér YAML-linjerne",
    retYamlCopied: "Kopieret.",
    retAllTitle: "For alle entiteter",
    retDefaultLabel: "Standardopbevaring for alle entiteter uden egen regel (dage, tom = ingen)",
    retDefaultSave: "Gem standard",
    retDefaultHelp: "Eksempel: Recorderen beholder 365 dage, og standarden er 30: Hver entitet uden regel forkortes om natten til 30 dage, entiteter med reglen 365 beholder alt. Uden standard forkortes kun entiteter med regel. Advarsel: Standarden gælder for HVER entitet i databasen, ikke kun dem, der vises her.",
    retPreviewBtn: "Forhåndsvisning",
    retPvTitle: "Det ville natjobbet slette",
    retPvGroup: "• {days} dage: {entities} entiteter, cirka {rows} ældre historikrækker",
    retPvNone: "Lige nu ville der ikke blive slettet noget.",
    retPvTotal: "I alt: cirka {rows} historikrækker fra {entities} entiteter.",
    retPvSkipped: "{n} entiteter springes over, fordi deres opbevaring ikke er kortere end recorderens {g} dage.",
    retPvHow: "Hvad jobbet gør: Det kalder Home Assistant-tjenesten recorder.purge_entities én gang pr. gruppe af dage. Det sletter kun den enkelte værdihistorik (states) for disse entiteter, der er ældre end antallet af dage. Det sletter IKKE langtidsstatistikken (energipanelet, timeværdier), stopper ikke optagelsen, og nye værdier gemmes som sædvanligt. Slettet historik kan kun gendannes fra en sikkerhedskopi.",
    retPvFail: "Forhåndsvisningen mislykkedes: {e}",
    retPvBusy: "Tæller – i en stor database kan det tage nogle sekunder …",
    retEnableTitle: "Slå natjobbet for opbevaring til?",
    retEnableText: "Fra nu af kører jobbet hver nat kl. 03:20 og sletter historik, der er ældre end opbevaringen for dens entitet (egen regel, ellers standarden). Det gælder også entiteter, du ikke ser i denne tabel.",
    retDefaultConfirmTitle: "Indstille standardopbevaring?",
    retDefaultConfirmText: "Fra nu af regnes hver entitet uden egen regel som: behold {n} dage. Det er alle entiteter, recorderen har historik for, ikke kun én fane. Det virker kun, mens natjobbet er til (eller når du kører det manuelt).",
    retDefaultOff: "Standardopbevaringen fjernes. Entiteter uden egen regel forkortes ikke længere af Entity Inventory.",
    retConfirmOn: "Slå til",
    retDeleteNow: "Slet nu",
    retSave: "Gem",
    retRunTitle: "Slette historikken nu?",
    blurTip: "Sløre følsomme data (bruger-ID’er, brugernavne, trackere, personer, kommentarer), f.eks. til skærmbilleder (fremhævet = til)",
    title: "Entity Inventory",
    tabsBtn: "Vis eller skjul faner",
    tabsShowAll: "Vis alle",
    tabsClose: "Luk",
    gLight: "Alle og lys",
    gElectro: "El",
    gClimate: "Klima",
    gCover: "Persienner",
    gUsage: "Forbrug",
    gAuto: "Automatisering",
    gMore: "Mere",
    search: "Søg (navn, enheds-ID, område, enhed, integration …)",
    count: "Viste entiteter / i denne fane",
    csv: "Eksporter CSV",
    print: "Udskriv / PDF",
    pause: "Sæt liveopdatering på pause",
    resume: "Genoptag liveopdatering",
    allAreas: "Alle områder",
    allInts: "Alle integrationer",
    hidden: "Vis skjulte / deaktiverede entiteter (fremhævet = vist)",
    copied: "Kopieret",
    wideTip: "Større linjeafstand (fremhævet = til)",
    hideOff: "Skjul utilgængelige / ukendte entiteter (fremhævet = skjult)",
    none: "Ingen entiteter i denne fane.",
    c_led: "Status",
    c_name: "Navn",
    c_id: "Entitets-ID",
    c_value: "Værdi",
    c_area: "Område",
    c_device: "Enhed",
    labelTitle: "Etiket",
    labelName: "Navn",
    labelIcon: "Ikon (f.eks. mdi:tag)",
    labelColor: "Farve",
    labelDesc: "Beskrivelse",
    labelEntities: "Entiteter med denne etiket",
    labelManage: "Etiketindstillinger",
    labelCount: "{n} entiteter i denne fane / {m} i alt",
    labelFail: "Kunne ikke gemme",
    labelNone: "ingen",
    c_labels: "Etiketter",
    allLabels: "Alle etiketter",
    noLabel: "Uden etiket",
    c_platform: "Integration",
    c_class: "Klasse",
    c_changed: "Ændret",
    c_pos: "Position",
    c_tilt: "Lamelvinkel",
    c_bright: "Lysstyrke",
    c_cur: "Aktuel",
    c_target: "Mål",
    c_mode: "Tilstand",
    c_action: "Handling",
    c_unit: "Enhed",
    c_state: "Tilstand",
    onlyNotes: "Kun poster med kommentar og/eller foto (fremhævet = aktiv)",
    cfgBtn: "Rediger kolonner (skærm og printer)",
    tgtView: "Skærm",
    tgtPrint: "Printer",
    autoTip: "Tilpas kolonnebredderne til det bredeste indhold",
    resetTip: "Nulstil layoutet",
    resetAsk: "Nulstille kolonnelayoutet til standard?",
    doneTip: "Færdig",
    renameTip: "Kolonnenavn (tomt = standard)",
    stand: "Status pr.",
    entities: "entiteter",
    printFail: "Udskrivningen mislykkedes",
    portrait: "Udskrift: stående (klik: liggende)",
    landscape: "Udskrift: liggende (klik: stående)",
    showBadges: "Vis de røde tal på fanerne (utilgængelige entiteter)",
    hideBadges: "Skjul de røde tal på fanerne",
    copyTip: "Kopiér entitets-ID",
    copyNameTip: "Kopiér navnet",
    copyValueTip: "Kopiér værdien",
    editConfirmName: "Ændre navnet?\n\n{old}\n→ {new}",
    editConfirmId: "Ændre entitets-ID?\n\n{old}\n→ {new}\n\nAutomatiseringer, scripts og dashboards, der bruger det gamle ID, skal tilpasses.",
    idLabel: "Entitets-ID",
    idWarn: "Automatiseringer, scripts, dashboards og skabeloner, der bruger det gamle ID, ændres IKKE her af Home Assistant – tjek dem bagefter.",
    idInvalid: "Ugyldigt entitets-ID. Det skal beholde domænet og kun bruge a-z, 0-9 og _ (f.eks. {d}.navn).",
    alignDec: "Værdier justeret efter decimaltegnet (klik: venstre)",
    alignLeft: "Værdier venstrejusteret (klik: højre)",
    alignRight: "Værdier højrejusteret (klik: efter decimaltegnet)",
    nameTitle: "Omdøb entitet",
    nameLabel: "Navn",
    nameHintDev: "Home Assistant sætter enhedsnavnet foran: »{dev}«",
    nameDefault: "Standardnavn: {n}",
    nameReset: "Nulstil til standard",
    nameDetails: "Historik / detaljer",
    nameFail: "Kunne ikke gemme",
    nameNoReg: "Denne entitet har intet unikt ID, findes derfor ikke i entitetsregistret og kan ikke omdøbes her.",
    nameAdmin: "Kun administratorer kan omdøbe entiteter.",
    c_icon: "Ikon",
    iconTip: "Skift ikonet (åbner entitetens indstillinger)",
    iconNoReg: "Ikonet for denne entitet kan ikke ændres: uden unikt ID findes den ikke i entitetsregistret.",
    iconAdmin: "Kun administratorer kan ændre ikonet.",
    c_access: "r/w",
    accessTip: {"r": "r = kun læsning (målt eller rapporteret værdi)", "w": "w = kun skrivning (udløser uden egen tilstand)", "rw": "rw = læsbar og styrbar"},
    c_photos: "Fotos",
    c_docs: "Dokumenter",
    c_note: "Kommentar",
    photosTitle: "Fotos",
    addPhotos: "Tilføj fotos",
    docsTitle: "Dokumenter",
    addDocs: "Tilføj dokumenter",
    noteTitle: "Kommentar",
    save: "Gem",
    cancel: "Annuller",
    del: "Slet",
    rename: "Omdøb",
    renamePrompt: "Nyt navn",
    confirmDel: "Slet {name} for alvor?",
    uploadFail: "Upload mislykkedes",
    noPhotos: "Ingen fotos endnu.",
    noDocs: "Ingen dokumenter endnu (f.eks. elaftale, gasaftale, foto af måleren).",
    notePh: "Kommentar (placering, sikring, aftalenummer …)",
    c_trackers: "Trackere",
    c_source: "Kilde",
    c_username: "Brugernavn",
    c_person: "Person",
    c_role: "Rolle",
    c_provider: "Loginmetode",
    c_local: "Kun lokalt",
    c_system: "Systemkonto",
    c_userid: "Bruger-ID",
    c_active: "Aktiv",
    yes: "✓",
    no: "–",
    c_sc: "Tilstandsklasse",
    c_maker: "Producent",
    c_model: "Model",
    on: "til",
    off: "fra",
    roleOwner: "Ejer",
    roleRead: "Skrivebeskyttet",
    ago: {"s": "lige nu", "m": "{n} min. siden", "h": "{n} t. siden", "d": "{n} d. siden"},
    t: {"all": "Alle entiteter", "illuminance": "Lysstyrke", "temperature": "Temperatur", "humidity": "Luftfugtighed", "power": "Effekt", "energy": "Energi", "consumption": "Forbrug", "voltage": "Spænding", "frequency": "Frekvens", "current": "Strøm", "battery": "Batterier", "cover": "Persienner", "tilt": "Lameller", "light": "Lys", "dimmer": "Dimmere", "switch": "Kontakter", "climate": "Termostater", "media": "Medier", "person": "Personer", "users": "Brugerkonti", "binary": "Binære sensorer", "presence": "Trackere", "scene": "Scener", "labels": "Etiketter", "auto": "Automatiseringer / scripts", "helper": "Hjælpere", "sensor": "Andre sensorer", "unavailable": "Utilgængelige"},
    d: {"all": "Alle entiteter, som Home Assistant kender", "illuminance": "Lyssensorer (lux)", "temperature": "Sensorer, der måler en temperatur", "humidity": "Fugtsensorer", "power": "Øjeblikkelig effekt (W, kW)", "energy": "Energitællere (Wh, kWh)", "consumption": "Gas, vand, volumen og alt, der hedder forbrug", "voltage": "Spændingssensorer (V, mV, kV)", "frequency": "Frekvenssensorer (Hz)", "current": "Strøm og effektfaktor (A, mA)", "battery": "Batteriniveauer, de svageste først", "cover": "Persienner, rullegardiner, garageporte: position", "tilt": "Persienner med justerbare lameller: lamelvinkel", "light": "Alle lys", "dimmer": "Lys, der kan dæmpes", "switch": "Kontakter, stikkontakter og til/fra-hjælpere", "climate": "Termostater og varmepumper: aktuel, mål, tilstand", "media": "Tv, højttalere og andre afspillere", "binary": "Bevægelses-, kontakt-, vindues-, røgsensorer …", "person": "Personer med deres trackere og tilknyttede konto", "users": "Login-konti i Home Assistant (kræver administratorrettigheder)", "presence": "Enhedstrackere", "scene": "Scener med deres seneste aktivering", "labels": "Alle entiteter med mindst én etiket", "auto": "Automatiseringer og scripts", "helper": "input_*, tællere, timere, tidsplaner", "sensor": "Sensorer, der ikke passer i nogen målefane", "unavailable": "Entiteter, der lige nu er utilgængelige eller ukendte"},
  },
  af: {
    scTitle: "Toestandsklas",
    scNone: "geen (geen toestandsklas)",
    scMeasurement: "measurement: 'n oombliklike waarde wat styg en daal, bv. temperatuur, drywing, humiditeit.",
    scTotal: "total: 'n teller wat ook kan daal, bv. 'n teller met terugstelling of 'n saldo.",
    scTotalInc: "total_increasing: 'n teller wat net styg (en weer by 0 begin), bv. energie in kWh, gas, water.",
    scStatsBusy: "Kontroleer die langtermynstatistiek …",
    scStatsYes: "Daar is langtermynstatistiek vir hierdie entiteit ({what}, eenheid {unit}, bron {src}). Home Assistant hou dit as uurwaardes vir die energiepaneel en geskiedenisgrafieke.",
    scStatsNo: "Geen langtermynstatistiek nie: net entiteite met 'n toestandsklas (en 'n eenheid) kry dit. Daarsonder bly net die geskiedenis van enkelwaardes oor, en dit word na die opnemer se bewaring uitgevee.",
    scStatsFail: "Die langtermynstatistiek kon nie gelees word nie.",
    scChange: "Kan dit verander word? Nie hier nie en ook nie in Home Assistant se entiteitinstellings nie: die integrasie wat die sensor lewer, besluit. Uitsonderings: in configuration.yaml met customize (state_class:) en vir sjabloonhelpers wat jy self skep.",
    scRecNote: "Die bewaring in Entity Inventory verkort net die geskiedenis van enkelwaardes van 'n entiteit. Die langtermynstatistiek bly onaangeraak.",
    scDevTools: "Ontwikkelaarsgereedskap → Statistiek",
    scTip: "Toestandsklas van die entiteit (klik vir 'n verduideliking)",
    c_recupd: "Laaste verslag",
    recColsTip: "Wys die opnemerkolomme (gestoor sedert, inskrywings, gem. interval) (uitgelig = gewys)",
    c_recrows: "Inskrywings",
    c_recint: "Gem. interval",
    retStats: "Inskrywings in die opnemer: {rows} · ongeveer {perday} per dag · gemiddelde interval {int}",
    retStatsTip: "Inskrywings in die opnemer: {rows} (ongeveer {perday} per dag), gemiddelde interval tussen twee inskrywings: {int}",
    c_retention: "Gestoor sedert (dae, opnemer)",
    retTitle: "Opnemer – bewaring",
    retBtn: "Opnemer",
    retTip: "Opnemerbewaring van hierdie entiteit: klik maak die dialoog oop, Shift+klik tik die dae hier in",
    retIntro: "Die geskiedenis van hierdie entiteit (die opnemer se databasis) wat ouer is as die gekose aantal dae, word elke nag uitgevee. 'n Reël kan net die opnemer se globale bewaring (purge_keep_days) verkort, nie verleng nie.",
    retNone: "Geen reël (opnemer-verstek)",
    retDays: "{n} dae",
    retCustom: "Ander aantal dae",
    retJob: "Voer die naggeleentheid (03:20) uit vir alle entiteite met 'n reël of die verstek",
    retRules: "{n} entiteite met 'n reël",
    retRunNow: "Voer nou uit",
    retRunAsk: "Dit vee nou geskiedenis in die opnemer se databasis uit. Dit kan nie ongedaan gemaak word nie.",
    retLast: "Laaste uitvoering: {t}",
    retDone: "Klaar: {n} entiteite verwerk.",
    retFail: "Die opnemer rapporteer 'n fout: {e}",
    retNoRec: "Die opnemer is nie beskikbaar nie.",
    retAdmin: "Net administrateurs kan die bewaring verander.",
    retNever: "nooit",
    retSince: "In die opnemer sedert: {t} ({n} dae)",
    retSinceNone: "Geen geskiedenis in die opnemer nie.",
    retSinceFail: "Die ouderdom van die geskiedenis kon nie gelees word nie.",
    retSinceBusy: "Lees die ouderdom van die geskiedenis …",
    retShort: "{n} d",
    retRule: "reël: {n} d",
    retErr: "Die opnemerversoek het misluk: {e}",
    retGlobal: "Die opnemer hou die geskiedenis van alle entiteite {n} dae lank (purge_keep_days).",
    retGlobalUnknown: "Die opnemer se globale bewaring kon nie gelees word nie (loop die opnemer?).",
    retMax: "Maksimum (nooit verkort)",
    retRuleNone: "Geen eie reël: hierdie entiteit word nie deur Entity Inventory verkort nie{d}.",
    retRuleDefault: " – die verstekbewaring van {n} dae geld",
    retRuleMax: "Word nooit deur Entity Inventory verkort nie: die geskiedenis bly so lank as wat die opnemer dit hou ({g} dae).",
    retRuleShort: "Geskiedenis van hierdie entiteit wat ouer is as {n} dae, word elke nag uitgevee (net terwyl die naggeleentheid aan is).",
    retRuleSame: "Dit stem ooreen met die opnemer se bewaring van {g} dae, dus verander die reël niks nie.",
    retRuleLong: "Die opnemer vee geskiedenis na {g} dae uit. Hierdie reël kan nie meer hou nie totdat die opnemerinstelling verhoog is (sien hieronder).",
    retLongerTitle: "Om data langer as {g} dae te hou:",
    retLonger1: "1. Maak configuration.yaml oop en stel purge_keep_days in die blok recorder: op die langste tyd wat jy nodig het (hier {n}). As daar reeds 'n recorder:-blok is, verander net daardie reël – moenie 'n tweede blok byvoeg nie.",
    retLonger2: "2. Herbegin Home Assistant (Instellings → Stelsel → Herbegin). Die opnemer lees hierdie instelling net by die begin; Entity Inventory kan dit nie verander nie.",
    retLonger3: "3. Daarna word elke entiteit by verstek so lank gehou. Om die res korter te hou, stel hieronder 'n verstekbewaring: dan hou net entiteite met 'n langer reël hul geskiedenis so lank.",
    retLonger4: "Let wel: langer bewaring maak die databasis groter, ongeveer in verhouding tot die dae.",
    retYamlCopy: "Kopieer die YAML-reëls",
    retYamlCopied: "Gekopieer.",
    retAllTitle: "Vir alle entiteite",
    retDefaultLabel: "Verstekbewaring vir alle entiteite sonder eie reël (dae, leeg = geen)",
    retDefaultSave: "Stoor verstek",
    retDefaultHelp: "Voorbeeld: die opnemer hou 365 dae en die verstek is 30: elke entiteit sonder 'n reël word snags tot 30 dae verkort, entiteite met 'n reël van 365 hou alles. Sonder 'n verstek word net entiteite met 'n reël verkort. Waarskuwing: die verstek geld vir ELKE entiteit in die databasis, nie net vir dié wat hier gewys word nie.",
    retPreviewBtn: "Voorskou",
    retPvTitle: "Dit sal die naggeleentheid uitvee",
    retPvGroup: "• {days} dae: {entities} entiteite, ongeveer {rows} ouer geskiedenisrye",
    retPvNone: "Op die oomblik sal niks uitgevee word nie.",
    retPvTotal: "Totaal: ongeveer {rows} geskiedenisrye van {entities} entiteite.",
    retPvSkipped: "{n} entiteite word oorgeslaan omdat hul bewaring nie korter is as die opnemer se {g} dae nie.",
    retPvHow: "Wat die taak doen: dit roep die Home Assistant-diens recorder.purge_entities een keer per groep dae aan. Dit vee net die enkelwaarde-geskiedenis (states) van hierdie entiteite uit wat ouer is as die aantal dae. Dit vee NIE die langtermynstatistiek (energiepaneel, uurwaardes) uit nie, stop nie die opname nie, en nuwe waardes word soos gewoonlik gestoor. Uitgeveegde geskiedenis kan net uit 'n rugsteun herstel word.",
    retPvFail: "Die voorskou het misluk: {e}",
    retPvBusy: "Tel – in 'n groot databasis kan dit 'n paar sekondes neem …",
    retEnableTitle: "Die naggeleentheid vir bewaring aanskakel?",
    retEnableText: "Van nou af loop die taak elke nag om 03:20 en vee geskiedenis uit wat ouer is as die bewaring van sy entiteit (eie reël, anders die verstek). Dit geld ook vir entiteite wat jy nie in hierdie tabel sien nie.",
    retDefaultConfirmTitle: "Die verstekbewaring stel?",
    retDefaultConfirmText: "Van nou af tel elke entiteit sonder eie reël as: hou {n} dae. Dit is alle entiteite waarvoor die opnemer geskiedenis het, nie net een oortjie nie. Dit werk net terwyl die naggeleentheid aan is (of wanneer jy dit met die hand uitvoer).",
    retDefaultOff: "Die verstekbewaring word verwyder. Entiteite sonder eie reël word nie meer deur Entity Inventory verkort nie.",
    retConfirmOn: "Skakel aan",
    retDeleteNow: "Vee nou uit",
    retSave: "Stoor",
    retRunTitle: "Die geskiedenis nou uitvee?",
    blurTip: "Vervaag sensitiewe data (gebruiker-ID’s, gebruikersname, spoorders, persone, kommentaar), bv. vir skermskote (uitgelig = aan)",
    title: "Entity Inventory",
    tabsBtn: "Wys of versteek oortjies",
    tabsShowAll: "Wys almal",
    tabsClose: "Maak toe",
    gLight: "Alles en lig",
    gElectro: "Elektries",
    gClimate: "Klimaat",
    gCover: "Blindings",
    gUsage: "Verbruik",
    gAuto: "Outomatisering",
    gMore: "Meer",
    search: "Soek (naam, entiteit-ID, area, toestel, integrasie …)",
    count: "Entiteite gewys / in hierdie oortjie",
    csv: "Voer CSV uit",
    print: "Druk / PDF",
    pause: "Onderbreek lewendige opdatering",
    resume: "Hervat lewendige opdatering",
    allAreas: "Alle areas",
    allInts: "Alle integrasies",
    hidden: "Wys versteekte / gedeaktiveerde entiteite (uitgelig = gewys)",
    copied: "Gekopieer",
    wideTip: "Wyer reëlspasiëring (uitgelig = aan)",
    hideOff: "Versteek onbeskikbare / onbekende entiteite (uitgelig = versteek)",
    none: "Geen entiteite in hierdie oortjie nie.",
    c_led: "Status",
    c_name: "Naam",
    c_id: "Entiteit-ID",
    c_value: "Waarde",
    c_area: "Area",
    c_device: "Toestel",
    labelTitle: "Etiket",
    labelName: "Naam",
    labelIcon: "Ikoon (bv. mdi:tag)",
    labelColor: "Kleur",
    labelDesc: "Beskrywing",
    labelEntities: "Entiteite met hierdie etiket",
    labelManage: "Etiketinstellings",
    labelCount: "{n} entiteite in hierdie oortjie / {m} in totaal",
    labelFail: "Kon nie stoor nie",
    labelNone: "geen",
    c_labels: "Etikette",
    allLabels: "Alle etikette",
    noLabel: "Sonder etiket",
    c_platform: "Integrasie",
    c_class: "Klas",
    c_changed: "Verander",
    c_pos: "Posisie",
    c_tilt: "Lamelhoek",
    c_bright: "Helderheid",
    c_cur: "Huidig",
    c_target: "Teiken",
    c_mode: "Modus",
    c_action: "Aksie",
    c_unit: "Eenheid",
    c_state: "Toestand",
    onlyNotes: "Slegs inskrywings met kommentaar en/of foto (uitgelig = aktief)",
    cfgBtn: "Wysig kolomme (skerm en drukker)",
    tgtView: "Skerm",
    tgtPrint: "Drukker",
    autoTip: "Pas die kolomwydtes by die wyeste inhoud aan",
    resetTip: "Herstel die uitleg",
    resetAsk: "Die kolomuitleg na verstek terugstel?",
    doneTip: "Klaar",
    renameTip: "Kolomnaam (leeg = verstek)",
    stand: "Stand op",
    entities: "entiteite",
    printFail: "Druk het misluk",
    portrait: "Druk: portret (klik: landskap)",
    landscape: "Druk: landskap (klik: portret)",
    showBadges: "Wys die rooi syfers op die oortjies (onbeskikbare entiteite)",
    hideBadges: "Versteek die rooi syfers op die oortjies",
    copyTip: "Kopieer die entiteit-ID",
    copyNameTip: "Kopieer die naam",
    copyValueTip: "Kopieer die waarde",
    editConfirmName: "Die naam verander?\n\n{old}\n→ {new}",
    editConfirmId: "Die entiteit-ID verander?\n\n{old}\n→ {new}\n\nOutomatiserings, skrifte en kontrolepanele wat die ou ID gebruik, moet aangepas word.",
    idLabel: "Entiteit-ID",
    idWarn: "Outomatiserings, skrifte, kontrolepanele en sjablone wat die ou ID gebruik, word hier NIE deur Home Assistant verander nie – gaan hulle daarna na.",
    idInvalid: "Ongeldige entiteit-ID. Dit moet die domein behou en slegs a-z, 0-9 en _ gebruik (bv. {d}.naam).",
    alignDec: "Waardes belyn op die desimale skeier (klik: links)",
    alignLeft: "Waardes links belyn (klik: regs)",
    alignRight: "Waardes regs belyn (klik: op die desimale skeier)",
    nameTitle: "Hernoem entiteit",
    nameLabel: "Naam",
    nameHintDev: "Home Assistant plaas die toestelnaam vooraan: \"{dev}\"",
    nameDefault: "Verstek-naam: {n}",
    nameReset: "Terug na verstek",
    nameDetails: "Geskiedenis / besonderhede",
    nameFail: "Kon nie stoor nie",
    nameNoReg: "Hierdie entiteit het geen unieke ID nie, is dus nie in die entiteitregister nie en kan nie hier hernoem word nie.",
    nameAdmin: "Net administrateurs kan entiteite hernoem.",
    c_icon: "Ikoon",
    iconTip: "Verander die ikoon (maak die instellings van die entiteit oop)",
    iconNoReg: "Die ikoon van hierdie entiteit kan nie verander word nie: sonder unieke ID is dit nie in die entiteitregister nie.",
    iconAdmin: "Net administrateurs kan die ikoon verander.",
    c_access: "r/w",
    accessTip: {"r": "r = slegs lees (gemete of gerapporteerde waarde)", "w": "w = slegs skryf (snellers sonder eie toestand)", "rw": "rw = leesbaar en beheerbaar"},
    c_photos: "Foto's",
    c_docs: "Dokumente",
    c_note: "Kommentaar",
    photosTitle: "Foto's",
    addPhotos: "Voeg foto's by",
    docsTitle: "Dokumente",
    addDocs: "Voeg dokumente by",
    noteTitle: "Kommentaar",
    save: "Stoor",
    cancel: "Kanselleer",
    del: "Skrap",
    rename: "Hernoem",
    renamePrompt: "Nuwe naam",
    confirmDel: "{name} regtig skrap?",
    uploadFail: "Oplaai het misluk",
    noPhotos: "Nog geen foto's nie.",
    noDocs: "Nog geen dokumente nie (bv. kragkontrak, gaskontrak, foto van die meter).",
    notePh: "Kommentaar (ligging, sekering, kontraknommer …)",
    c_trackers: "Spoorders",
    c_source: "Bron",
    c_username: "Gebruikersnaam",
    c_person: "Persoon",
    c_role: "Rol",
    c_provider: "Aanmeldmetode",
    c_local: "Slegs plaaslik",
    c_system: "Stelselrekening",
    c_userid: "Gebruiker-ID",
    c_active: "Aktief",
    yes: "✓",
    no: "–",
    c_sc: "Toestandsklas",
    c_maker: "Vervaardiger",
    c_model: "Model",
    on: "aan",
    off: "af",
    roleOwner: "Eienaar",
    roleRead: "Slegs lees",
    ago: {"s": "sopas", "m": "{n} min gelede", "h": "{n} u gelede", "d": "{n} d gelede"},
    t: {"all": "Alle entiteite", "illuminance": "Helderheid", "temperature": "Temperatuur", "humidity": "Humiditeit", "power": "Drywing", "energy": "Energie", "consumption": "Verbruik", "voltage": "Spanning", "frequency": "Frekwensie", "current": "Stroom", "battery": "Batterye", "cover": "Blindings", "tilt": "Lamelle", "light": "Ligte", "dimmer": "Dowwers", "switch": "Skakelaars", "climate": "Termostate", "media": "Media", "person": "Persone", "users": "Gebruikersrekeninge", "binary": "Binêre sensors", "presence": "Spoorders", "scene": "Tonele", "labels": "Etikette", "auto": "Outomatiserings / skrifte", "helper": "Helpers", "sensor": "Ander sensors", "unavailable": "Onbeskikbaar"},
    d: {"all": "Elke entiteit wat Home Assistant ken", "illuminance": "Helderheidsensors (lux)", "temperature": "Sensors wat 'n temperatuur meet", "humidity": "Humiditeitsensors", "power": "Oombliklike drywing (W, kW)", "energy": "Energietellers (Wh, kWh)", "consumption": "Gas, water, volume en alles wat verbruik heet", "voltage": "Spanningsensors (V, mV, kV)", "frequency": "Frekwensiesensors (Hz)", "current": "Stroom en kragfaktor (A, mA)", "battery": "Batteryvlakke, die swakste eerste", "cover": "Blindings, luike, garagedeure: posisie", "tilt": "Blindings met verstelbare lamelle: lamelhoek", "light": "Alle ligte", "dimmer": "Ligte wat gedoof kan word", "switch": "Skakelaars, kragpunte en aan/af-helpers", "climate": "Termostate en warmtepompe: huidig, teiken, modus", "media": "TV's, luidsprekers en ander spelers", "binary": "Beweging-, kontak-, venster-, rooksensors …", "person": "Persone met hul spoorders en gekoppelde rekening", "users": "Aanmeldrekeninge van Home Assistant (administrateurregte nodig)", "presence": "Toestelspoorders", "scene": "Tonele met hul laaste aktivering", "labels": "Elke entiteit met minstens een etiket", "auto": "Outomatiserings en skrifte", "helper": "input_*, tellers, tydhouers, skedules", "sensor": "Sensors wat in geen meetoortjie pas nie", "unavailable": "Entiteite wat nou onbeskikbaar of onbekend is"},
  },
};

// texts of a language; keys a translation lacks fall back to English (nb also covers no / nn)
const LCACHE = {};
const getL = (lang) => {
  let c = String(lang || "en").slice(0, 2).toLowerCase();
  if (c === "no" || c === "nn") c = "nb";
  return LCACHE[c] || (LCACHE[c] = L10N[c] ? { ...L10N.en, ...L10N[c] } : L10N.en);
};

// tab symbols (Material Design Icons, shown with ha-icon)
const MDI = {
  all: "mdi:format-list-bulleted-type", illuminance: "mdi:brightness-5", temperature: "mdi:thermometer", humidity: "mdi:water-percent", power: "mdi:flash",
  energy: "mdi:lightning-bolt-circle", consumption: "mdi:meter-electric-outline", voltage: "mdi:flash-triangle-outline", frequency: "mdi:sine-wave", current: "mdi:current-ac", battery: "mdi:battery-60",
  cover: "mdi:window-shutter", tilt: "mdi:blinds-horizontal", light: "mdi:lightbulb", dimmer: "mdi:lightbulb-on-50",
  switch: "mdi:toggle-switch", climate: "mdi:thermostat", media: "mdi:play-box-multiple", person: "mdi:account", users: "mdi:account-key", binary: "mdi:radiobox-marked",
  presence: "mdi:account-multiple", scene: "mdi:palette", labels: "mdi:label-multiple", auto: "mdi:robot", helper: "mdi:tune-variant", sensor: "mdi:eye", unavailable: "mdi:alert-circle-outline",
};

// order and groups of the tabs
const GROUPS = [
  ["gLight", ["all", "light", "dimmer", "illuminance"]], // fixed order: everything, lamps, dimmers, brightness sensors
  ["gElectro", ["power", "energy", "voltage", "current", "frequency"]],
  ["gClimate", ["temperature", "humidity", "climate"]],
  ["gCover", ["cover", "tilt"]],
  ["gUsage", ["consumption"]],
  ["gAuto", ["auto", "scene", "helper"]],
  ["gMore", ["switch", "battery", "media", "person", "users", "binary", "presence", "labels", "sensor", "unavailable"]],
];
const TABS_BY_COUNT = true; // from the second group on, the tabs of a group are ordered by the number of entities (most first)

// columns shown per tab (the first one is the sort default unless "sort" is given)
const BASE = ["led", "name", "id", "area", "device", "platform", "changed"];
const TABCOLS = {
  all: ["led", "name", "id", "value", "unit", "area", "device", "platform", "class", "changed"],
  temperature: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  illuminance: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  humidity: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  power: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  energy: ["led", "name", "id", "value", "unit", "sc", "area", "device", "platform", "changed"],
  consumption: ["led", "name", "id", "value", "unit", "class", "sc", "area", "device", "platform", "changed"],
  voltage: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  frequency: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  current: ["led", "name", "id", "value", "unit", "class", "area", "device", "platform", "changed"],
  battery: ["led", "name", "id", "value", "unit", "area", "device", "platform", "changed"],
  cover: ["led", "name", "id", "state", "pos", "tilt", "area", "device", "platform", "changed"],
  tilt: ["led", "name", "id", "state", "pos", "tilt", "area", "device", "platform", "changed"],
  light: ["led", "name", "id", "state", "bright", "area", "device", "platform", "changed"],
  dimmer: ["led", "name", "id", "state", "bright", "area", "device", "platform", "changed"],
  switch: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  climate: ["led", "name", "id", "mode", "cur", "target", "action", "area", "device", "platform", "changed"],
  media: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  binary: ["led", "name", "id", "state", "class", "area", "device", "platform", "changed"],
  person: ["led", "name", "id", "state", "trackers", "source", "area", "changed"],
  users: ["led", "name", "username", "person", "role", "provider", "local", "system", "userid"],
  presence: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
  auto: ["led", "name", "id", "state", "platform", "changed"],
  scene: ["led", "name", "id", "state", "labels", "area", "platform", "changed"],
  labels: ["led", "name", "id", "state", "labels", "area", "device", "platform", "changed"],
  helper: ["led", "name", "id", "value", "unit", "platform", "changed"],
  sensor: ["led", "name", "id", "value", "unit", "class", "area", "device", "platform", "changed"],
  unavailable: ["led", "name", "id", "state", "area", "device", "platform", "changed"],
};
Object.keys(TABCOLS).forEach((k) => {
  if (k === "users") return;
  const cols = [...TABCOLS[k], "photos", "docs", "note"];
  if (!cols.includes("labels")) cols.push("labels");
  if (!cols.includes("retention")) cols.push("retention");
  if (!cols.includes("recrows")) cols.push("recrows");
  if (!cols.includes("recint")) cols.push("recint");
  if (!cols.includes("recupd")) cols.push("recupd");
  const i = cols.indexOf("id"); if (i >= 0) cols.splice(i + 1, 0, "access"); // r / w / rw right behind the entity ID
  const l = cols.indexOf("led"); if (l >= 0) cols.splice(l + 1, 0, "icon"); // the entity symbol right behind the status LED
  TABCOLS[k] = cols;
});

// access of an entity by its domain: r = read only (measured / reported), w = write only (triggers, no state of its own), rw = readable and controllable
const W_ONLY = new Set(["button", "scene", "script", "notify", "input_button"]);
const RW = new Set(["switch", "light", "cover", "climate", "fan", "lock", "media_player", "input_boolean", "input_number", "input_select", "input_text", "input_datetime", "number", "select", "text", "date", "time", "datetime", "vacuum", "humidifier", "water_heater", "valve", "siren", "alarm_control_panel", "remote", "counter", "timer", "automation", "update", "lawn_mower", "schedule", "todo", "camera"]);
const accessOf = (domain) => (W_ONLY.has(domain) ? "w" : RW.has(domain) ? "rw" : "r");
const SORT_DEFAULT = { battery: ["value", 1], unavailable: ["changed", 1], cover: ["area", 1], tilt: ["area", 1], light: ["area", 1], dimmer: ["area", 1] };

// unit -> [base unit, size]: Wh < kWh < MWh, mV < V < kV … (empty units last)
const PREFIX = { µ: -2, m: -1, "": 0, k: 1, M: 2, G: 3 };
const unitKey = (u) => {
  const m = /^([µmkMG]?)(Wh|W|VA|var|A|V|Hz|m³|m3|l|L|B|b)$/.exec(u);
  return m ? [m[2], PREFIX[m[1]]] : [u || "￿", 0];
};
const ICON = {
  image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
  shape: "M11 13.5v8H3v-8h8zM12 2l5.5 9h-11L12 2zm5.5 11a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z",
  doc: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  note: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  copy: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  noteFull: "M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z",
};
const DI_ICONS = {
  printer: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7"/>',
  csv: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M12 12v5M9.5 15l2.5 2.5 2.5-2.5"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/>',
  check: '<path d="M5 12l5 5 9-11"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>',
  hiddenEntity: '<rect x="4" y="4" width="16" height="16" rx="3" stroke-dasharray="3.2 3.2"/>', // dashed frame: hidden / disabled entities (the eye is the blur symbol)
};
const RET_SYMBOL = '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>';
// symbols as column headings (narrow columns): stored for = database, entries = list, interval = stopwatch
const HEAD_SYM = {
  retention: RET_SYMBOL,
  recrows: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1" fill="currentColor"/><circle cx="3.5" cy="12" r="1" fill="currentColor"/><circle cx="3.5" cy="18" r="1" fill="currentColor"/>',
  recupd: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v5h-5"/><path d="M12 8v4l2.5 1.5"/>',
  recint: '<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 2M9.5 2.5h5"/>',
};
const headSym = (c) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle">${HEAD_SYM[c]}</svg>`;
const diIcon = (n, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle">${DI_ICONS[n]}</svg>`;
const svgIcon = (k, size = 18) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" style="vertical-align:middle"><path d="${ICON[k]}"/></svg>`;
// every column key in its default order; the layout (order, visibility, width, name) is kept separately for the display and for the printer
const ALLCOLS = ["led", "icon", "name", "id", "access", "value", "unit", "retention", "recrows", "recint", "recupd", "state", "pos", "tilt", "bright", "mode", "cur", "target", "action", "trackers", "source", "username", "person", "role", "provider", "local", "system", "userid", "class", "sc", "area", "device", "platform", "labels", "changed", "photos", "docs", "note"];
// columns blurred by the "blur sensitive data" button (and the names of user accounts)
const HELPER_PLATFORMS = new Set(["group", "derivative", "integration", "threshold", "utility_meter", "min_max", "statistics", "trend", "filter", "history_stats", "random", "tod", "switch_as_x", "generic_hygrostat", "generic_thermostat", "compensation", "bayesian"]); // helper integrations (template is left out: YAML templates share the platform)
const BLURCOLS = ["userid", "username", "trackers", "person", "note"];
const DEFAULT_OFF = { view: ["retention", "recrows", "recint", "recupd"], print: ["led", "icon", "retention", "recrows", "recint", "recupd"] }; // the recorder column is off until you want it (the dialog is also reachable from the rename dialog)
const MM = 96 / 25.4; // pixels per millimetre (widths of the printout are stored in mm)
const NOCLIP = ["value", "cur", "target", "unit", "access", "pos", "tilt", "bright", "state", "mode", "action", "led", "icon", "photos", "changed"]; // short columns: a width from the column editor is only a minimum, the content is never cut off (no "…")
const REFRESH_MS = 6000; // the table follows state changes at most this often (the values are live, but a calm table is easier to read and cheaper)
const CHUNK = 300; // rows drawn at once
const OFFLINE = new Set(["unavailable", "unknown"]);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };

class EntityInventoryPanel extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    if (!this._built) {
      this._built = true;
      try { this._build(); } catch (e) { this._fail(e && e.message ? e.message : String(e)); return; }
      this._timer = setInterval(() => (this.isConnected ? this._tick() : clearInterval(this._timer)), 10000);
    }
    if (this._menu) this._menu.hass = hass;
    if (!this._dirty && !this._paused) { this._dirty = true; setTimeout(() => { this._dirty = false; this._refresh(); }, REFRESH_MS); } // many state changes arrive in bursts
  }
  set narrow(n) { this._narrow = n; if (this._menu) this._menu.narrow = n; }
  set panel(_p) {}
  set route(_r) {}

  get _L() { return getL(this._hass.language); }

  _fail(msg) {
    const box = document.createElement("div");
    box.style.cssText = "padding:24px;max-width:640px;font:14px/1.5 sans-serif;color:var(--primary-text-color)";
    box.textContent = "Entity Inventory: " + msg;
    this.appendChild(box);
  }

  // ------------------------------------------------------------ data
  _collect() {
    const h = this._hass, st = h.states || {}, ent = h.entities || {}, dev = h.devices || {}, ar = h.areas || {};
    const rows = [], old = this._rc || new Map(), rc = new Map();
    this._nChanged = 0;
    if (this._arRef !== ar) { this._arRef = ar; old.clear(); } // areas changed: rebuild everything (rare)
    for (const id in st) {
      const s = st[id], rr = ent[id], reg = rr || {}, d = dev[reg.device_id] || null;
      const prev = old.get(id);
      if (prev && prev.s === s && prev.rr === rr && prev.dObj === d) { rows.push(prev); rc.set(id, prev); continue; } // unchanged: reuse the finished record (value text, cells, tabs)
      this._nChanged++;
      const a = s.attributes || {};
      const domain = id.slice(0, id.indexOf("."));
      const areaId = reg.area_id || (d && d.area_id) || null;
      const rec = {
        rr, dObj: d, id, domain, s, a, state: s.state, dc: a.device_class || "", unit: a.unit_of_measurement || "", sc: a.state_class || "",
        name: a.friendly_name || id,
        deviceId: d ? reg.device_id : "",
        device: d ? (d.name_by_user || d.name || "") : "",
        maker: d ? d.manufacturer || "" : "", model: d ? d.model || "" : "",
        areaId: areaId && ar[areaId] ? areaId : "",
        area: areaId && ar[areaId] ? ar[areaId].name : "",
        platform: reg.platform || (domain === "sun" || domain === "zone" ? "core" : ""),
        labels: Array.isArray(reg.labels) ? reg.labels : [],
        hidden: !!reg.hidden || !!reg.disabled_by || reg.entity_category === "config",
        ts: Date.parse(s.last_changed) || 0,
        tsu: Date.parse(s.last_updated) || 0,
        tabs: [],
      };
      this._classify(rec);
      rows.push(rec); rc.set(id, rec);
    }
    this._rc = rc;
    const persons = rows.filter((e) => e.domain === "person");
    (this._users || []).forEach((u) => {
      const pe = persons.find((e) => e.a.user_id === u.id);
      const role = u.is_owner ? getL(h.language).roleOwner : (u.group_ids || []).includes("system-admin") ? "Admin" : (u.group_ids || []).includes("system-read-only") ? (L10N[(h.language || "en").slice(0, 2)] || L10N.en).roleRead : "User";
      rows.push({
        id: "user:" + u.id, user: true, domain: "user", s: { last_updated: "1970-01-01T00:00:00Z", last_changed: "1970-01-01T00:00:00Z" }, a: {}, state: u.is_active ? "active" : "inactive",
        dc: "", unit: "", sc: "", name: u.name || u.username || u.id, username: u.username || "", person: pe ? pe.name : "", role,
        provider: [...new Set((u.credentials || []).map((c) => c.auth_provider_type))].join(", "), localOnly: !!u.local_only, systemAcc: !!u.system_generated,
        userId: u.id, device: "", deviceId: "", area: "", areaId: "", platform: "", maker: "", model: "", hidden: false, ts: 0, tabs: ["users"], active: !!u.is_active,
      });
    });
    return rows;
  }

  async _loadMeta() {
    try {
      const r = await this._hass.callWS({ type: "entity_inventory/list" });
      if (r && r.notes && r.photos && r.docs) { this._meta = r; if (this._rows) this._render(); }
    } catch (e) { /* server part not installed: the columns stay empty */ }
  }

  // 90 s -> "90 s", 5400 s -> "90 min", ...
  _fmtInterval(sec) {
    const f = (v) => (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10).toLocaleString();
    return sec < 90 ? `${f(sec)} s` : sec < 5400 ? `${f(sec / 60)} min` : sec < 172800 ? `${f(sec / 3600)} h` : `${f(sec / 86400)} d`;
  }

  // "{rows} entries (about {perday} per day), average interval {int}" for one entity
  _statsText(tpl, n, ts0, ts1) {
    const span = Math.max(ts1 - ts0, 1), perday = Math.round((n / span) * 86400);
    return tpl.replace("{rows}", n.toLocaleString()).replace("{perday}", perday.toLocaleString()).replace("{int}", n > 1 ? this._fmtInterval((ts1 - ts0) / (n - 1)) : "–");
  }

  // how far back the recorder holds each entity (one query for all entities, cached on the server for five minutes)
  async _loadRecAge(force) {
    if (this._recBusy || (!force && this._recAge && Date.now() - this._recAge.t < 300000)) return;
    this._recBusy = true;
    try {
      const r = await this._hass.callWS({ type: "entity_inventory/recorder_age" });
      this._recAge = { t: Date.now(), now: r.now, oldest: r.oldest || {}, last: r.last || {}, count: r.count || {} };
    } catch (e) { this._recAge = { t: Date.now(), err: (e && (e.message || e.code)) || "?", oldest: {} }; }
    this._recBusy = false;
    if (this._rows) this._render();
  }

  get _admin() { return !!(this._hass.user && this._hass.user.is_admin); }

  // names and colours of the labels (the entities only carry the label ids)
  async _loadLabels() {
    try {
      const list = await this._hass.callWS({ type: "config/label_registry/list" });
      this._labels = Object.fromEntries((list || []).map((l) => [l.label_id, { name: l.name, color: l.color, icon: l.icon, description: l.description }]));
      if (this._rows) this._render();
    } catch (e) { /* not an administrator: the label ids are shown */ }
  }

  _labelName(id) { return ((this._labels || {})[id] || {}).name || id; }

  _labelChips(ids) {
    return ids.map((id) => {
      const c = ((this._labels || {})[id] || {}).color, bg = !c ? "#888" : c.startsWith("#") ? c : `var(--${c}-color,#888)`;
      return `<span class="chip" data-label="${esc(id)}" title="${esc(this._labelName(id))}" style="background:${bg}">${esc(this._labelName(id))}</span>`;
    }).join("");
  }

  // label dialog: name, symbol, colour and description (saved in the label registry), plus jumps to the entities / settings of Home Assistant
  _labelDialog(id) {
    const L = this._L, lab = (this._labels || {})[id] || { name: id }, admin = this._admin, { body, close } = this._modal(`${L.labelTitle} – ${lab.name}`, id);
    const field = (txt, node) => { const d = document.createElement("div"); d.style.cssText = "font-size:12px;opacity:.7;margin:10px 0 4px"; d.textContent = txt; body.append(d, node); return node; };
    const css = "width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit";
    const name = field(L.labelName, Object.assign(document.createElement("input"), { type: "text", value: lab.name || "", disabled: !admin }));
    const icon = field(L.labelIcon, Object.assign(document.createElement("input"), { type: "text", value: lab.icon || "", placeholder: "mdi:tag", disabled: !admin }));
    name.style.cssText = icon.style.cssText = css;
    // colour: the named colours of Home Assistant as round swatches
    let color = lab.color || "";
    const sw = document.createElement("div"); sw.style.cssText = "display:flex;flex-wrap:wrap;gap:6px";
    const COLORS = ["primary", "accent", "disabled", "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "light-grey", "grey", "dark-grey", "blue-grey", "black", "white"];
    const paint = () => sw.querySelectorAll("button").forEach((b) => { b.style.outline = b.dataset.c === color ? "3px solid var(--primary-text-color,#000)" : "none"; });
    ["", ...COLORS].forEach((c) => {
      const b = document.createElement("button"); b.dataset.c = c; b.title = c || L.labelNone; b.disabled = !admin;
      b.style.cssText = `width:26px;height:26px;border-radius:50%;border:1px solid var(--divider-color,#888);cursor:pointer;padding:0;outline-offset:1px;background:${c ? `var(--${c}-color,#888)` : "repeating-linear-gradient(45deg,#ccc 0 4px,#fff 4px 8px)"}`;
      b.onclick = () => { color = c; paint(); };
      sw.appendChild(b);
    });
    field(L.labelColor, sw); paint();
    const desc = field(L.labelDesc, Object.assign(document.createElement("textarea"), { rows: 3, value: lab.description || "", disabled: !admin }));
    desc.style.cssText = css + ";resize:vertical";
    [name, icon, desc].forEach((x) => { x.onkeydown = (ev) => ev.stopPropagation(); });
    const total = (this._rows || []).filter((e) => (e.labels || []).includes(id)).length, here = (this._list || []).filter((e) => (e.labels || []).includes(id)).length;
    const info = document.createElement("div"); info.style.cssText = "font-size:12px;opacity:.65;margin-top:10px"; info.textContent = L.labelCount.replace("{n}", here).replace("{m}", total); body.appendChild(info);
    const go = (path) => { close(); history.pushState({ from: location.pathname + location.search }, "", path); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); };
    const save = this._btn(L.save, true, async () => {
      save.textContent = "…";
      try {
        await this._hass.callWS({ type: "config/label_registry/update", label_id: id, name: name.value.trim() || lab.name, icon: icon.value.trim() || null, color: color || null, description: desc.value.trim() || null });
        await this._loadLabels(); close();
      } catch (x) { alert(`${L.labelFail}: ${(x && x.message) || x}`); save.textContent = L.save; }
    });
    body.appendChild(this._footer(
      this._btn(L.labelEntities, false, () => go(`/config/entities?historyBack=1&label=${encodeURIComponent(id)}`)),
      this._btn(L.labelManage, false, () => go("/config/labels")),
      this._btn(admin ? L.cancel : L.tabsClose, !admin, close),
      ...(admin ? [save] : []),
    ));
  }

  async _loadUsers() {
    try { this._users = (await this._hass.callWS({ type: "config/auth/list" })); } catch (e) { this._users = []; } // not an admin: no tab
    this._refresh(true);
  }

  // which tabs does an entity belong to
  _classify(e) {
    const t = e.tabs, dc = e.dc, d = e.domain, u = e.unit, nm = (e.name + " " + e.id).toLowerCase();
    if (OFFLINE.has(e.state)) t.push("unavailable");
    if (e.labels && e.labels.length) t.push("labels");
    if (d === "sensor") {
      let hit = false;
      if (dc === "temperature" || (!dc && /^(°C|°F|K)$/.test(u))) { t.push("temperature"); hit = true; }
      if (dc === "humidity") { t.push("humidity"); hit = true; }
      if (dc === "illuminance" || (!dc && /^(lx|lux)$/i.test(u))) { t.push("illuminance"); hit = true; }
      if (["power", "apparent_power", "reactive_power"].includes(dc) || (!dc && /^(W|kW|mW|MW)$/.test(u))) { t.push("power"); hit = true; }
      if (dc === "energy" || (!dc && /^(Wh|kWh|MWh)$/.test(u))) { t.push("energy"); hit = true; }
      if (["gas", "water", "volume", "volume_flow_rate", "volume_storage"].includes(dc) || /verbrauch|consumption|durchfluss/.test(nm)) { t.push("consumption"); hit = true; }
      if (dc === "voltage" || (!dc && /^(V|mV|kV)$/.test(u))) { t.push("voltage"); hit = true; }
      if (dc === "frequency" || (!dc && /^(Hz|kHz)$/.test(u))) { t.push("frequency"); hit = true; }
      if (["current", "power_factor"].includes(dc) || (!dc && /^(A|mA)$/.test(u))) { t.push("current"); hit = true; }
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
    else if (d === "person") t.push("person");
    else if (d === "device_tracker") t.push("presence");
    else if (d === "scene") t.push("scene");
    else if (["automation", "script"].includes(d)) t.push("auto");
    // helpers: input_*, counters, timers, schedules and the entities of the helper integrations of Home Assistant (an input_boolean is also a switch)
    if ((/^(input_|counter$|timer$|schedule$)/.test(d) || HELPER_PLATFORMS.has(e.platform)) && !t.includes("helper")) t.push("helper");
  }

  _valueText(e) {
    if (e._v !== undefined) return e._v;
    return (e._v = this._valueText0(e));
  }

  _valueText0(e) {
    const h = this._hass;
    try { if (typeof h.formatEntityState === "function") return h.formatEntityState(e.s); } catch (x) { /* fallback */ }
    const n = num(e.state);
    return n !== null ? `${this._fmtNum(n)}${e.unit ? " " + e.unit : ""}` : e.state;
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
    if (col === "changed" || col === "photos" || col === "docs" || col === "note" || col === "labels" || col === "retention" || col === "recrows" || col === "recint" || col === "recupd") return this._cell0(e, col); // the relative time changes, everything else only with the state
    const c = e._c || (e._c = {});
    return c[col] || (c[col] = this._cell0(e, col));
  }

  // decimal separator of the user's number format (Home Assistant profile setting, else the language)
  get _dec() {
    const h = this._hass, nf = h.locale && h.locale.number_format;
    if (nf === "comma_decimal" || nf === "none") return ".";
    if (nf === "decimal_comma" || nf === "space_comma") return ",";
    try { return new Intl.NumberFormat(nf === "system" ? undefined : (h.locale && h.locale.language) || h.language).formatToParts(1.1).find((x) => x.type === "decimal").value; } catch (x) { return "."; }
  }

  _fmtNum(v) {
    try { return new Intl.NumberFormat((this._hass.locale && this._hass.locale.language) || this._hass.language, { maximumFractionDigits: 2 }).format(v); } catch (x) { return String(v); }
  }

  // splits "10.994,696 kWh" into integer part and "decimals + unit" so that the decimal separators of a column stand under each other
  _split(text, key) {
    const m = /^(\D*?)(-?\d[\d.,\s  ']*)(.*)$/s.exec(text);
    if (!m) return [esc(text), key, 0];
    const d = this._dec, num = m[2].replace(/[\s  ]+$/, ""), rest = m[2].slice(num.length) + m[3];
    const i = num.lastIndexOf(d), hasDec = i >= 0 && /^\d+$/.test(num.slice(i + 1));
    const ip = m[1] + (hasDec ? num.slice(0, i) : num), dec = hasDec ? num.slice(i) : "";
    return [`<span>${esc(ip)}</span><span class="vf">${esc(dec)}</span><span class="vu">${esc(rest)}</span>`, key, dec.length, rest.length];
  }

  // temperature unit of the Home Assistant unit system (°C / °F) – thermostats report current and target temperature in it
  _tempUnit() { const u = this._hass && this._hass.config && this._hass.config.unit_system; return (u && u.temperature) || "°C"; }

  _cell0(e, col) {
    const L = this._L;
    switch (col) {
      case "icon": return [e.user ? "" : `<span class="eicon" data-act="icon" title="${esc(L.iconTip)}"></span>`, e.a.icon || ""];
      case "led": { const ok = e.user ? e.active : !OFFLINE.has(e.state); return [ok ? "🟢" : "🔴", ok ? 1 : 0]; }
      case "name": return [e.user ? esc(e.name) : `<span class="cp" data-act="copy" data-copy="name" title="${esc(L.copyNameTip)}">${svgIcon("copy", 14)}</span><span class="idt">${esc(e.name)}</span>`, e.name.toLowerCase()];
      case "id": return [`<span class="cp" data-act="copy" title="${esc(L.copyTip)}">${svgIcon("copy", 14)}</span><span class="idt">${esc(e.id)}</span>`, e.id];
      case "value": { // the number only; the unit has its own column
        let t = this._valueText(e); const n = num(e.state);
        if (e.unit && t.endsWith(e.unit)) t = t.slice(0, t.length - e.unit.length).trim();
        const cp = e.user ? "" : `<span class="cp" data-act="copy" data-copy="value" title="${esc(L.copyValueTip)}">${svgIcon("copy", 14)}</span>`; // absolutely positioned: does not move the number
        if (n === null) return [cp + esc(t), t];
        const sp = this._split(t, n); return [cp + sp[0], sp[1], sp[2], sp[3]]; // keep the widths of decimals and unit for the alignment
      }
      case "state": { const t = this._valueText(e); return [esc(t), t]; }
      case "photos": { const n = e.user ? 0 : ((this._meta.photos[e.id] || []).length); return [e.user ? "" : `<span class="ic${n ? "" : " ic0"}" data-act="photos">${svgIcon("image")}${n > 1 ? `<small>${n}</small>` : ""}</span>`, n]; }
      case "docs": { const n = e.user ? 0 : ((this._meta.docs[e.id] || []).length); return [e.user ? "" : `<span class="ic${n ? "" : " ic0"}" data-act="docs">${svgIcon("doc")}${n > 1 ? `<small>${n}</small>` : ""}</span>`, n]; }
      case "note": { const t = e.user ? "" : ((this._meta.notes[e.id] || {}).t || ""); return [e.user ? "" : `<span class="ic${t ? "" : " ic0"}" data-act="note">${svgIcon(t ? "noteFull" : "note")}</span>${t ? ` <span data-act="note" title="${esc(t)}">${esc(t.replace(/\s+/g, " "))}</span>` : ""}`, t.toLowerCase()]; }
      case "recupd": return [e.user ? "" : `<span title="${esc(new Date(e.tsu).toLocaleString() + "\n" + (L.recUpdTip || ""))}">${esc(this._ago(e.tsu))}</span>`, e.user ? -1 : e.tsu];
      case "recrows": case "recint": {
        if (e.user) return ["", -1];
        const ra = this._recAge;
        if (!ra) return ["…", -1];
        if (ra.err) return [`<span title="${esc(L.retErr.replace("{e}", String(ra.err)))}">?</span>`, -1];
        const n = (ra.count || {})[e.id], ts0 = (ra.oldest || {})[e.id], ts1 = (ra.last || {})[e.id];
        if (!n) return ["–", -1];
        const avg = n > 1 ? (ts1 - ts0) / (n - 1) : null, tip = esc(this._statsText(L.retStatsTip, n, ts0, ts1));
        if (col === "recrows") return [`<span title="${tip}">${n.toLocaleString()}</span>`, n];
        return [avg === null ? "–" : `<span title="${tip}">${this._fmtInterval(avg)}</span>`, avg === null ? -1 : avg];
      }
      case "retention": {
        if (e.user) return ["", -1];
        const rule = (this._meta.retention || {})[e.id], ra = this._recAge;
        let age = -1, txt = "…", tip = "";
        if (ra && ra.err) { txt = "?"; tip = L.retErr.replace("{e}", String(ra.err)); }
        else if (ra && ra.oldest) {
          const ts = ra.oldest[e.id];
          if (ts) { age = Math.max(0, Math.floor((ra.now - ts) / 86400)); txt = L.retShort.replace("{n}", age); tip = L.retSince.replace("{t}", new Date(ts * 1000).toLocaleString()).replace("{n}", age); }
          else txt = "–";
        }
        const r = rule ? ` <small style="opacity:.7" title="${esc(L.retRule.replace("{n}", rule))}">(${rule})</small>` : "";
        return [`<span data-act="retention" style="cursor:pointer" title="${esc((tip ? tip + "\n" : "") + L.retTip)}">${esc(txt)}${r}</span>`, age];
      }
      case "labels": { const n = (e.labels || []).map((id) => this._labelName(id)).join(", "); return [e.user ? "" : this._labelChips(e.labels || []), n.toLowerCase()]; }
      case "access": { const a = e.user ? "" : accessOf(e.domain); return [a ? `<span title="${esc(L.accessTip[a])}">${a}</span>` : "", a]; }
      case "unit": return [esc(e.unit), e.unit];
      case "area": return [esc(e.area), e.area.toLowerCase()];
      case "device": return [esc(e.device), e.device.toLowerCase()];
      case "platform": return [esc(e.platform), e.platform];
      case "class": return [esc(e.dc), e.dc];
      case "sc": return [e.sc ? `<span title="${esc(L.scTip)}" style="cursor:pointer">${esc(e.sc)}</span>` : "", e.sc];
      case "maker": return [esc(e.maker), e.maker];
      case "model": return [esc(e.model), e.model];
      case "changed": return [`<span title="${esc(new Date(e.ts).toLocaleString())}">${esc(this._ago(e.ts))}</span>`, e.ts];
      case "trackers": { const v = (e.a.device_trackers || []).join(", "); return [esc(v), v]; }
      case "source": { const v = e.a.source || ""; return [esc(v), v]; }
      case "username": return [esc(e.username), e.username.toLowerCase()];
      case "person": return [esc(e.person), e.person.toLowerCase()];
      case "role": return [esc(e.role), e.role];
      case "provider": return [esc(e.provider), e.provider];
      case "local": return [e.localOnly ? L.yes : L.no, e.localOnly ? 1 : 0];
      case "system": return [e.systemAcc ? L.yes : L.no, e.systemAcc ? 1 : 0];
      case "userid": return [esc(e.userId), e.userId];
      case "pos": { const v = e.a.current_position; return [v == null ? "" : v + " %", v ?? -1]; }
      case "tilt": { const v = e.a.current_tilt_position; return [v == null ? "" : v + " %", v ?? -1]; }
      case "bright": { const v = e.a.brightness; if (v == null) return [e.state === "on" ? "" : "", -1]; const p = Math.round(v / 2.55); return [p + " %", p]; }
      case "cur": { const v = e.a.current_temperature; return v == null ? ["", -999] : this._split(this._fmtNum(v) + " " + this._tempUnit(), v); }
      case "target": { const v = e.a.temperature; return v == null ? ["", -999] : this._split(this._fmtNum(v) + " " + this._tempUnit(), v); }
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
        cursor:pointer;border:none;border-radius:8px;background:transparent;color:inherit;opacity:.75;border-bottom:2px solid transparent;font:inherit} /* rounded ends of the underline of the active tab (same in Device Inventory and Entity Inventory) */
      .sep{flex:none;width:1px;height:30px;margin:13px 6px;background:var(--divider-color,#888);opacity:.8}
      .tab:hover{opacity:1}.tab.on{opacity:1;color:var(--primary-color);border-bottom-color:var(--primary-color)}
      .tab ha-icon{--mdc-icon-size:24px}
      .tgl{flex:none;display:flex;align-items:center;justify-content:center;width:40px;height:40px;margin-top:8px;border:none;background:transparent;cursor:pointer;border-radius:50%;color:inherit}
      .tgl:hover{background:rgba(127,127,127,.15)}
      .tabs.nobadge .badge{display:none}
      .badge{position:absolute;top:8px;right:2px;min-width:16px;height:16px;border-radius:8px;background:var(--error-color,#db4437);color:#fff;font-size:10px;line-height:16px;text-align:center;padding:0 3px}
      .body{padding:12px}
      ha-card{padding:4px 8px 6px;display:block}
      .wrap{overflow:auto;max-height:var(--ei-wrap-max,calc(100vh - 190px))}
      .top.hide{display:none}
      table{width:auto;border-collapse:collapse;font-size:12px}
      th{position:sticky;top:0;z-index:1;background:var(--card-background-color,#fff);text-align:left;padding:3px 4px;border-bottom:2px solid var(--divider-color,#888);cursor:pointer;user-select:none;white-space:nowrap}
      th:hover{color:var(--primary-color)}
      .wrap.wide td{padding-top:7px;padding-bottom:7px}
      .wrap.blur td[data-col=userid],.wrap.blur td[data-col=username],.wrap.blur td[data-col=trackers],.wrap.blur td[data-col=person],.wrap.blur td[data-col=note],.wrap.blur tr[data-id^="user:"] td[data-col=name]{filter:blur(5px);user-select:none;pointer-events:none}
      td{padding:2px 4px;line-height:1.3;border-bottom:1px solid var(--divider-color,#444);white-space:nowrap;max-width:420px;overflow:hidden;text-overflow:ellipsis}
      tr:hover td{background:rgba(127,127,127,.08)}
      td[data-col=device],td[data-col=platform],td[data-col=area],td[data-col=name],td[data-col=value],td[data-col=state],td[data-col=pos],td[data-col=tilt],td[data-col=bright],td[data-col=cur],td[data-col=target],td[data-col=mode],td[data-col=action]{cursor:pointer}
      td[data-col=device]:hover,td[data-col=platform]:hover,td[data-col=area]:hover,td[data-col=name]:hover,td[data-col=value]:hover,td[data-col=state]:hover,td[data-col=pos]:hover,td[data-col=tilt]:hover,td[data-col=bright]:hover,td[data-col=cur]:hover,td[data-col=target]:hover,td[data-col=mode]:hover,td[data-col=action]:hover{color:var(--primary-color)}
      td[data-col=id]{cursor:pointer;opacity:.8}td[data-col=id],td[data-col=name]{position:relative;overflow:visible}td[data-col=access],th[data-col=access]{width:1%;padding-left:2px;padding-right:2px;text-align:center}.idt{display:block;overflow:hidden;text-overflow:ellipsis}tr:hover .idt{position:relative;left:19px;width:calc(100% - 19px)}@media (hover:none){.idt{position:relative;left:19px;width:calc(100% - 19px)}} /* the text moves aside for the copy symbol without changing the column width (it is cut off earlier instead) */td[data-col=id]:hover{color:var(--primary-color)}
      td{font-variant-numeric:tabular-nums}
      td[data-col=value]{position:relative}td[data-col=value],td[data-col=cur],td[data-col=target]{overflow:visible;text-overflow:clip;max-width:none}.vf,.vu{display:inline-block;text-align:left;white-space:pre}
      td[data-col=value] .vf{min-width:var(--wf-value,0)}td[data-col=value] .vu{min-width:var(--wu-value,0)}
      td[data-col=cur] .vf{min-width:var(--wf-cur,0)}td[data-col=cur] .vu{min-width:var(--wu-cur,0)}
      td[data-col=target] .vf{min-width:var(--wf-target,0)}td[data-col=target] .vu{min-width:var(--wu-target,0)}
      .wrap.al-left .vf,.wrap.al-left .vu,.wrap.al-right .vf,.wrap.al-right .vu{min-width:0!important}
      .wrap.al-left td[data-col=value],.wrap.al-left th[data-col=value],.wrap.al-left td[data-col=cur],.wrap.al-left th[data-col=cur],.wrap.al-left td[data-col=target],.wrap.al-left th[data-col=target]{text-align:left}
      td[data-col=value],th[data-col=value],td[data-col=pos],td[data-col=tilt],td[data-col=bright],td[data-col=cur],td[data-col=target]{text-align:right}
      button,select{cursor:pointer;padding:4px 10px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font-size:13px}
      select{max-width:200px;padding:4px 6px}
      .bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:0 0 4px}.dim{opacity:.65;font-size:12px}
      .ib{display:inline-flex;align-items:center;padding:4px 9px}
      .none{padding:20px;opacity:.6}
      th:has(.cfgbox){overflow:visible}th .cfgl{display:block;overflow:hidden;white-space:nowrap;text-overflow:clip}th .cfgbox{display:none;position:absolute;left:0;top:100%;z-index:30;min-width:116px;box-sizing:border-box;padding:3px;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#888);border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.35)}th:hover .cfgbox,th:focus-within .cfgbox{display:block}th .cfgl{cursor:grab}th.dropt{box-shadow:inset 3px 0 0 var(--primary-color,#03a9f4)}
      th .cfgc{display:flex;gap:2px;align-items:center;margin-bottom:2px}th .cfgc button{padding:0 4px;font-size:11px;line-height:16px;border-radius:4px}th .cfgc input{margin:0}
      th input[type=text]{width:100%;min-width:48px;box-sizing:border-box;font:inherit;font-weight:700;padding:1px 3px;border:1px dashed var(--divider-color,#888);border-radius:4px;background:transparent;color:inherit}
      th .grip{z-index:40;position:absolute;right:0;top:0;bottom:0;width:7px;cursor:col-resize;background:rgba(127,127,127,.25)}
      td[data-off]{opacity:.35}
      .ic{display:inline-flex;align-items:center;gap:2px;cursor:pointer;margin-right:3px}.ic0{opacity:.25}tr:hover .ic0{opacity:.75}
      .eicon{display:inline-flex;align-items:center;min-width:20px;height:20px;cursor:pointer;opacity:.85}.eicon:hover{opacity:1;color:var(--primary-color)}
      .cp{display:inline-flex;position:absolute;left:4px;top:50%;margin-top:-7px;z-index:2;cursor:pointer;visibility:hidden;opacity:.7}.cp:hover{opacity:1;color:var(--primary-color)}tr:hover .cp{visibility:visible}@media (hover:none){.cp{visibility:visible;opacity:.35}}
      .chip{cursor:pointer;display:inline-block;padding:0 7px;border-radius:10px;font-size:11px;line-height:18px;color:#fff;margin-right:3px}
      td[data-col=note]{max-width:420px}td[data-col=note] span[data-act]{cursor:pointer}`;
    const top = document.createElement("div"); top.className = "top";
    this._menu = document.createElement("ha-menu-button");
    this._menu.hass = this._hass; this._menu.narrow = this._narrow;
    this._tabs = document.createElement("div"); this._tabs.className = "tabs";
    try { this._off = new Set(JSON.parse(localStorage.getItem("eiTabsOff") || "[]")); } catch (e) { this._off = new Set(); }
    const tcfg = document.createElement("button"); tcfg.className = "tgl"; tcfg.title = this._L.tabsBtn;
    tcfg.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".7"><path d="M3 6l1.6 1.6L7.5 4.5M3 13l1.6 1.6L7.5 11.5M3 20l1.6 1.6L7.5 18.5M11 6h10M11 13h10M11 20h10"/></svg>';
    tcfg.onclick = () => this._tabsDialog();
    let showBadges = false; // default: off, like in Device Inventory
    try { showBadges = localStorage.getItem("eiBadges") === "1"; } catch (e) { /* ignore */ }
    this._tabs.classList.toggle("nobadge", !showBadges);
    const tgl = document.createElement("button"); tgl.className = "tgl";
    const paintTgl = () => {
      tgl.title = showBadges ? this._L.hideBadges : this._L.showBadges;
      tgl.innerHTML = showBadges
        ? '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="9" fill="currentColor"/><text x="12" y="16.2" text-anchor="middle" font-size="12" font-weight="700" fill="var(--app-header-background-color,#fff)" font-family="Arial,sans-serif">1</text></svg>'
        : '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".7"><circle cx="12" cy="12" r="8.5" stroke-dasharray="3 2.6"/><path d="M6.5 17.5L17.5 6.5"/></svg>';
    };
    paintTgl();
    tgl.onclick = () => {
      showBadges = !showBadges;
      this._tabs.classList.toggle("nobadge", !showBadges);
      try { localStorage.setItem("eiBadges", showBadges ? "1" : "0"); } catch (e) { /* ignore */ }
      paintTgl();
    };
    this._top = top;
    top.append(this._menu, this._tabs, tcfg, tgl);
    this._body = document.createElement("div"); this._body.className = "body";
    root.append(st, top, this._body);
    this._active = "all";
    try { this._active = localStorage.getItem("eiTab") || "all"; } catch (e) { /* ignore */ }
    this._sort = {}; this._q = ""; this._area = ""; this._int = ""; this._paused = false;
    try { this._showHidden = localStorage.getItem("ei__showHidden") === "1"; this._hideOff = localStorage.getItem("ei__hideOff") === "1"; this._onlyNotes = localStorage.getItem("ei__onlyNotes") === "1"; this._wide = localStorage.getItem("ei__wide") === "1"; this._blur = localStorage.getItem("ei__blur") === "1"; this._recCols = localStorage.getItem("ei__recCols") === "1"; } catch (e) { /* ignore */ }
    this._meta = { notes: {}, photos: {}, docs: {}, retention: {}, retention_info: {} };
    this._buildCard();
    this._initMobile();
    this._loadMeta(); this._metaTimer = setInterval(() => (this.isConnected ? this._loadMeta() : clearInterval(this._metaTimer)), 300000); // signed URLs last one hour
    this._labels = {}; this._lab = ""; this._loadLabels(); this._labTimer = setInterval(() => (this.isConnected ? this._loadLabels() : clearInterval(this._labTimer)), 300000);
    this._loadUsers(); this._userTimer = setInterval(() => (this.isConnected ? this._loadUsers() : clearInterval(this._userTimer)), 300000);
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
    const bar = this._bar = document.createElement("div"); bar.className = "bar";
    const mkBtn = (svg, title, fn) => { const b = document.createElement("button"); b.className = "ib"; b.title = title; b.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${svg}"/></svg>`; b.onclick = fn; return b; };
    const pb = mkBtn("M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z", L.print, () => this._print()); pb.innerHTML = diIcon("printer");
    // paper format of the printout: portrait / landscape sheet symbol (remembered in this browser)
    try { this._ori = localStorage.getItem("eiOri"); } catch (e) { /* ignore */ }
    if (this._ori !== "portrait") this._ori = "landscape"; // wide tables: landscape is the default
    const SHEET = {
      portrait: '<path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v5h5"/>',
      landscape: '<path d="M3 7a2 2 0 0 1 2-2h11l5 5v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M16 5v5h5"/>',
    };
    const ob = document.createElement("button"); ob.className = "ib";
    const paintOri = () => {
      ob.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SHEET[this._ori]}</svg>`;
      ob.title = this._ori === "portrait" ? L.portrait : L.landscape;
    };
    paintOri();
    ob.onclick = () => { this._ori = this._ori === "portrait" ? "landscape" : "portrait"; try { localStorage.setItem("eiOri", this._ori); } catch (e) { /* ignore */ } paintOri(); };
    const cb = mkBtn("", L.csv, () => this._csv()); cb.innerHTML = diIcon("csv");
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
    this._selLab = document.createElement("select"); this._selLab.onchange = () => { this._lab = this._selLab.value; this._render(); };
    const toggle = (svg, title, key) => {
      const b = mkBtn(svg, title, () => {
        this[key] = !this[key]; paint();
        try { localStorage.setItem("ei_" + key, this[key] ? "1" : "0"); } catch (e) { /* ignore */ }
        this._refresh(true);
      });
      const paint = () => { b.style.background = this[key] ? "var(--primary-color,#03a9f4)" : ""; b.style.color = this[key] ? "#fff" : ""; b.style.borderColor = this[key] ? "transparent" : ""; };
      paint(); return b;
    };
    const eye = "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
    const warn = "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z";
    const hb = toggle(eye, L.hidden, "_showHidden"); hb.innerHTML = diIcon("hiddenEntity");
    const ub = toggle(warn, L.hideOff, "_hideOff");
    const wb = toggle("", L.wideTip, "_wide"); // the symbol of Device Inventory: four lines
    wb.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 5h16M4 9.5h16M4 14h16M4 18.5h16"/></svg>';
    const bb = toggle("", L.blurTip, "_blur");
    const paintBlur = () => { bb.innerHTML = diIcon(this._blur ? "eyeoff" : "eye"); }; // the symbol of Device Inventory: eye / crossed-out eye
    paintBlur(); { const o = bb.onclick; bb.onclick = (ev) => { o(ev); paintBlur(); }; }
    const rb = toggle("", L.recColsTip, "_recCols");
    rb.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${RET_SYMBOL}</svg>`;
    const fb = toggle("M3 5h18l-7 8v6l-4 2v-8z", L.onlyNotes, "_onlyNotes"); // the funnel symbol of Device Inventory
    fb.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>';
    const AL = { dec: "M11 3h2v18h-2zM3 6h7v2H3zM14 6h7v2h-7zM5 11h5v2H5zM14 11h5v2h-5zM3 16h7v2H3zM14 16h5v2h-5z", left: "M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z", right: "M3 3h18v2H3V3zm6 4h12v2H9V7zM3 11h18v2H3v-2zm6 4h12v2H9v-2zM3 19h18v2H3v-2z" };
    try { this._align = localStorage.getItem("ei_align"); } catch (e) { /* ignore */ }
    if (!AL[this._align]) this._align = "dec"; // default: aligned by the decimal separator
    const alB = mkBtn(AL[this._align], "", () => {
      this._align = this._align === "dec" ? "left" : this._align === "left" ? "right" : "dec";
      try { localStorage.setItem("ei_align", this._align); } catch (e) { /* ignore */ }
      paintAl();
    });
    const paintAl = () => {
      alB.querySelector("path").setAttribute("d", AL[this._align]);
      alB.title = { dec: L.alignDec, left: L.alignLeft, right: L.alignRight }[this._align];
      if (this._wrap) this._wrap.className = "wrap al-" + this._align + (this._wide ? " wide" : "") + (this._edit ? " edit" : "") + (this._blur ? " blur" : "");
    };
    // printer + paper format form one joined button group
    const grp = document.createElement("span"); grp.style.cssText = "display:inline-flex";
    pb.style.borderRadius = "8px 0 0 8px"; ob.style.borderRadius = "0 8px 8px 0"; ob.style.marginLeft = "-1px";
    grp.append(pb, ob);
    this._edit = false; this._tgt = "view";
    this._editBox = document.createElement("span"); this._editBox.style.cssText = "display:inline-flex;gap:6px;align-items:center;margin-left:auto";
    bar.append(grp, cb, this._pauseB, this._cnt, qi, this._selArea, this._selInt, this._selLab, hb, alB, wb, ub, fb, bb, rb, this._editBox);
    this._paintEdit();
    this._wrap = document.createElement("div"); this._wrap.className = "wrap al-" + this._align;
    alB.title = { dec: L.alignDec, left: L.alignLeft, right: L.alignRight }[this._align];
    this._wrap.onclick = (ev) => this._click(ev);
    // long press (touch or mouse) or right click on a column heading: type a new column name right in the heading; the click after a long press does not sort
    {
      let tm = null, fired = false, sx = 0, sy = 0;
      const stop = () => { clearTimeout(tm); tm = null; };
      const headOf = (ev) => (ev.target.closest && !this._edit ? ev.target.closest("thead th[data-col]") : null);
      this._wrap.addEventListener("pointerdown", (ev) => { const th = headOf(ev); if (!th || ev.button) return; fired = false; sx = ev.clientX; sy = ev.clientY; stop(); tm = setTimeout(() => { tm = null; fired = true; this._renameHead(th); }, 600); });
      this._wrap.addEventListener("pointermove", (ev) => { if (tm && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) stop(); });
      ["pointerup", "pointercancel"].forEach((n) => this._wrap.addEventListener(n, stop));
      this._wrap.addEventListener("click", (ev) => { if (fired) { fired = false; ev.stopPropagation(); ev.preventDefault(); } }, true);
      this._wrap.addEventListener("contextmenu", (ev) => { const th = headOf(ev); if (th) { ev.preventDefault(); stop(); fired = true; this._renameHead(th); } });
    }
    // remember what the pointer went down on: when the table is redrawn between pressing and releasing (live update), the click lands on the wrapper and would be lost
    this._wrap.addEventListener("mousedown", (ev) => {
      const td = ev.target.closest && ev.target.closest("td[data-col]"), tr = td && td.closest("tr[data-id]"), a = ev.target.closest && ev.target.closest("[data-act]");
      this._down = td && tr ? { id: tr.dataset.id, col: td.dataset.col, act: a ? a.dataset.act : null, t: Date.now() } : null;
    }, true);
    this._wrap.addEventListener("change", (ev) => this._cfgChange(ev));
    this._wrap.addEventListener("mousedown", (ev) => this._cfgGrip(ev));
    // column editor: change the order by dragging a heading onto another one (the width is set with the grip at the right edge)
    let dragCol = null;
    this._wrap.addEventListener("dragstart", (ev) => {
      const th = this._edit && ev.target.closest && ev.target.closest("th[data-col]");
      if (!th || ev.target.closest("input")) { ev.preventDefault(); return; }
      dragCol = th.dataset.col; ev.dataTransfer.effectAllowed = "move"; try { ev.dataTransfer.setData("text/plain", dragCol); } catch (e) { /* ignore */ }
    });
    this._wrap.addEventListener("dragover", (ev) => {
      const th = dragCol && ev.target.closest && ev.target.closest("th[data-col]");
      if (!th) return;
      ev.preventDefault(); this._wrap.querySelectorAll("th.dropt").forEach((x) => { if (x !== th) x.classList.remove("dropt"); }); th.classList.add("dropt");
    });
    this._wrap.addEventListener("dragend", () => { dragCol = null; this._wrap.querySelectorAll("th.dropt").forEach((x) => x.classList.remove("dropt")); });
    this._wrap.addEventListener("drop", (ev) => {
      const th = dragCol && ev.target.closest && ev.target.closest("th[data-col]");
      if (!th) return;
      ev.preventDefault();
      const c = dragCol, t = th.dataset.col, cfg = this._layout(this._tgt); dragCol = null;
      if (c === t) { th.classList.remove("dropt"); return; }
      const i = cfg.order.indexOf(c), j = cfg.order.indexOf(t);
      if (i < 0 || j < 0) return;
      cfg.order.splice(i, 1); cfg.order.splice(cfg.order.indexOf(t) + (i < j ? 1 : 0), 0, c);
      this._saveLayout(this._tgt); this._render();
    });
    this._wrap.addEventListener("mouseover", (ev) => this._hover(ev));
    this._wrap.addEventListener("mouseout", (ev) => { if (!ev.relatedTarget || !ev.relatedTarget.closest || !ev.relatedTarget.closest("[data-act]")) this._hidePop(); });
    this._wrap.addEventListener("scroll", () => { if (this._wrap.scrollTop + this._wrap.clientHeight > this._wrap.scrollHeight - 500) this._more(); }, { passive: true });
    card.append(head, bar, this._wrap);
    this._body.appendChild(card);
  }

  // small screens: the tab bar slides away while the table is scrolled down; only pulling down at the very top of the list (or a swipe / wheel up there) brings it back
  _initMobile() {
    const top = this._top, wrap = this._wrap, body = this._body;
    const mq = window.matchMedia("(max-width: 700px), ((max-height: 520px) and (pointer: coarse))");
    let acc = 0;
    const setHidden = (hide) => {
      if (hide === top.classList.contains("hide")) return;
      top.classList.toggle("hide", hide);
      fit();
    };
    // the list gets exactly the height that is left below the toolbar (the toolbar wraps into several rows on a phone), so the list scrolls and not the page
    const fit = () => {
      const off = wrap.getBoundingClientRect().top - body.getBoundingClientRect().top;
      wrap.style.setProperty("--ei-wrap-max", `${Math.max(120, innerHeight - (top.classList.contains("hide") ? 0 : top.offsetHeight) - off - 24)}px`);
    };
    this._fitWrap = fit;
    if (window.ResizeObserver) { const ro = new ResizeObserver(fit); ro.observe(top); ro.observe(this._bar || body); }
    window.addEventListener("resize", fit); fit();
    mq.addEventListener && mq.addEventListener("change", () => { if (!mq.matches) setHidden(false); });
    let last = wrap.scrollTop; const born = Date.now();
    wrap.addEventListener("scroll", () => {
      const t = wrap.scrollTop, dy = t - last; last = t;
      if (Date.now() - born < 500) return;
      if (!mq.matches) { setHidden(false); return; }
      acc = Math.sign(dy) === Math.sign(acc) ? acc + dy : dy;
      if (t > 12 && acc > 12) setHidden(true); // scrolling up does not bring it back
    }, { passive: true });
    // pulling further down at the very top of the list (finger or mouse wheel) shows the bar again
    let y0 = null, wheel = 0;
    wrap.addEventListener("touchstart", (e) => { y0 = wrap.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
    wrap.addEventListener("touchmove", (e) => { if (y0 !== null && wrap.scrollTop <= 0 && e.touches[0].clientY - y0 > 40) { y0 = null; setHidden(false); } }, { passive: true });
    wrap.addEventListener("wheel", (e) => { if (wrap.scrollTop <= 0 && e.deltaY < 0) { wheel += -e.deltaY; if (wheel > 60) { wheel = 0; setHidden(false); } } else wheel = 0; }, { passive: true });
    // a swipe up or wheel down hides the bar even when the list is too short to scroll, so it always behaves the same
    let sy = null, wd = 0;
    body.addEventListener("touchstart", (e) => { sy = e.touches[0].clientY; }, { passive: true });
    body.addEventListener("touchmove", (e) => { if (sy !== null && mq.matches && sy - e.touches[0].clientY > 20) { sy = null; setHidden(true); } }, { passive: true });
    body.addEventListener("wheel", (e) => { if (!mq.matches) return; if (e.deltaY > 0) { wd += e.deltaY; if (wd > 20) { wd = 0; setHidden(true); } } else wd = 0; }, { passive: true });
  }

  _tick() { if (!this._paused) this._refresh(); }

  // recompute everything; re-render only if something changed (or every 30 s for the "changed" column)
  _refresh(force) {
    if (!this._hass || !this._tabs) return;
    if (this._inl) return; // a cell is being edited: do not redraw it
    if (!force && this._down && Date.now() - this._down.t < 400) return; // the pointer is pressed on a cell: no redraw under the finger (the next tick catches up)
    const rows = this._collect(), now = Date.now();
    const changed = this._nChanged > 0 || !this._rows || rows.length !== this._rows.length;
    this._rows = rows;
    if (!force && !changed && now - (this._lastRender || 0) < 30000) return; // nothing new: no work at all
    this._counts = { all: { n: 0, off: 0 } };
    rows.forEach((e) => {
      if (e.user) { const c = (this._counts.users = this._counts.users || { n: 0, off: 0 }); c.n++; return; }
      if (e.hidden && !this._showHidden) return;
      const off = OFFLINE.has(e.state);
      this._counts.all.n++; if (off) this._counts.all.off++;
      e.tabs.forEach((k) => { const c = (this._counts[k] = this._counts[k] || { n: 0, off: 0 }); c.n++; if (off) c.off++; });
    });
    this._drawTabs();
    this._render();
  }

  // tabs of group gi in display order: the first group is fixed, the others by number of entities (ties keep the default order)
  _groupKeys(gi) {
    const ks = GROUPS[gi][1], c = this._counts || {};
    if (!TABS_BY_COUNT || gi === 0 || GROUPS[gi][0] === "gElectro") return ks; // fixed order: light group and electrical group (power next to energy)
    return ks.map((k, i) => [k, i]).sort((a, b) => ((c[b[0]] || { n: 0 }).n - (c[a[0]] || { n: 0 }).n) || a[1] - b[1]).map((x) => x[0]);
  }

  _label(k) { return this._L.t[k] || k; }

  _drawTabs() {
    const L = this._L, c = this._counts;
    const keys = GROUPS.flatMap((_, gi) => this._groupKeys(gi)).filter((k) => k === "all" || (c[k] && c[k].n > 0));
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
    this._active = k; this._area = ""; this._int = ""; this._lab = "";
    try { localStorage.setItem("eiTab", k); } catch (e) { /* ignore */ }
    this._sigT = null; this._drawTabs(); this._render();
    this._wrap.scrollTop = 0;
  }

  // entities of the active tab after search / filters
  _filtered() {
    const k = this._active, q = this._q.trim().toLowerCase();
    return (this._rows || []).filter((e) => {
      if (!this._vis(e)) return false;
      if (k !== "all" && !e.tabs.includes(k)) return false;
      if (k === "all" && e.user) return false;
      if (this._area && e.area !== this._area) return false;
      if (this._int && e.platform !== this._int) return false;
      if (this._lab && (this._lab === "\u0001none" ? (e.labels || []).length : !(e.labels || []).includes(this._lab))) return false;
      if (q && !(`${e.name} ${e.id} ${e.area} ${e.device} ${e.platform} ${e.dc} ${e.state} ${e.maker} ${e.model} ${(this._meta.notes[e.id] || {}).t || ""} ${(this._meta.docs[e.id] || []).map((d) => d.name).join(" ")} ${(e.labels || []).map((i) => this._labelName(i)).join(" ")}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }

  // hidden / disabled entities and (optionally) unavailable ones are filtered out; the "unavailable" tab always shows them
  _vis(e) {
    return (!e.hidden || this._showHidden) && !(this._hideOff && this._active !== "unavailable" && OFFLINE.has(e.state))
      && (!this._onlyNotes || e.user || !!((this._meta.notes[e.id] || {}).t || (this._meta.photos[e.id] || []).length));
  }

  // layout of the display ("view") or the printer ("print"): order of all columns, hidden ones, widths and own names
  _layout(tgt) {
    this._lay = this._lay || {};
    if (this._lay[tgt]) return this._lay[tgt];
    let c = null;
    try { c = JSON.parse(localStorage.getItem(tgt === "print" ? "eiPrint" : "eiView") || "null"); } catch (e) { c = null; }
    c = c || {};
    const order = (c.order || []).filter((k, i, a) => ALLCOLS.includes(k) && a.indexOf(k) === i);
    ALLCOLS.forEach((k, i) => { // columns that are new go right behind their predecessor in the default order
      if (order.includes(k)) return;
      let at = 0;
      for (let j = i - 1; j >= 0; j--) { const q = order.indexOf(ALLCOLS[j]); if (q >= 0) { at = q + 1; break; } }
      order.splice(at, 0, k);
    });
    if (!c.recAfterUnit) { // layouts saved before: the recorder columns go behind the unit once
      const REC = ["retention", "recrows", "recint", "recupd"], rest = order.filter((k) => !REC.includes(k)), at = rest.indexOf("unit");
      if (at >= 0) { rest.splice(at + 1, 0, ...REC); order.splice(0, order.length, ...rest); }
    }
    return (this._lay[tgt] = { order, off: new Set(c.off || DEFAULT_OFF[tgt]), w: c.w || {}, n: c.n || {}, recAfterUnit: true });
  }

  _saveLayout(tgt) {
    const c = this._layout(tgt);
    try { localStorage.setItem(tgt === "print" ? "eiPrint" : "eiView", JSON.stringify({ order: c.order, off: [...c.off], w: c.w, n: c.n, recAfterUnit: true })); } catch (e) { /* ignore */ }
  }

  // columns of the active tab in the order of the layout; all = also the hidden ones (column editor)
  _cols(tgt = "view", all = false) {
    const base = TABCOLS[this._active] || BASE, cfg = this._layout(tgt);
    const cols = cfg.order.filter((c) => base.includes(c));
    if (all) return cols;
    if (tgt === "view" && !this._edit) { // the recorder columns are switched by the button in the toolbar (not by the column editor)
      return cols.filter((c) => (c === "retention" || c === "recrows" || c === "recint" || c === "recupd") ? this._recCols : !cfg.off.has(c));
    }
    return cols.filter((c) => !cfg.off.has(c));
  }

  _colName(tgt, c) { const n = this._layout(tgt).n[c]; return n || this._L["c_" + c] || c; }

  _sorted(list) {
    const k = this._active, cols = this._cols("view", true);
    let [col, dir] = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
    if (!cols.includes(col)) { col = "name"; dir = 1; }
    const keyOf = (e) => this._cell(e, col)[1];
    const withKey = list.map((e) => [e, keyOf(e)]);
    // "Value" sorts by the number alone, "Unit" by the unit (Wh < kWh < MWh) and then by the number
    const byUnit = col === "unit", ud = dir, vd = col === "unit" ? 1 : dir;
    withKey.sort((x, y) => {
      if (byUnit) {
        const ua = x[0].unit || "", ub = y[0].unit || "";
        if (ua !== ub) { const a1 = unitKey(ua), b1 = unitKey(ub); return (a1[0].localeCompare(b1[0]) || a1[1] - b1[1] || ua.localeCompare(ub)) * ud; }
        if (col === "unit") { const na = num(x[0].state), nb = num(y[0].state); if (na !== nb && na !== null && nb !== null) return (na - nb) * vd; return x[0].id.localeCompare(y[0].id); }
      }
      const a = x[1], b = y[1];
      const ea = a === "" || a === null, eb = b === "" || b === null;
      if (ea !== eb) return ea ? 1 : -1; // empty values always last
      if (typeof a === "number" && typeof b === "number") return (a - b) * vd || x[0].id.localeCompare(y[0].id);
      return String(a).localeCompare(String(b), undefined, { numeric: true }) * vd || x[0].id.localeCompare(y[0].id);
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
    const inTab = (this._rows || []).filter((e) => this._vis(e) && (k === "all" ? !e.user : e.tabs.includes(k)));
    const fill = (sel, vals, all, cur) => {
      const key = vals.join("\u0001") + "|" + cur;
      if (sel._key === key) return; sel._key = key;
      sel.innerHTML = ""; const o0 = document.createElement("option"); o0.value = ""; o0.textContent = all; sel.appendChild(o0);
      vals.forEach((v) => { const o = document.createElement("option"); o.value = v; o.textContent = v; sel.appendChild(o); });
      sel.value = cur;
    };
    fill(this._selArea, [...new Set(inTab.map((e) => e.area).filter(Boolean))].sort((a, b) => a.localeCompare(b)), L.allAreas, this._area);
    fill(this._selInt, [...new Set(inTab.map((e) => e.platform).filter(Boolean))].sort(), L.allInts, this._int);
    { // labels that exist in this tab (+ "without label"); the option text is the label name, the value its id
      const ids = [...new Set(inTab.flatMap((e) => e.labels || []))].sort((a, b) => this._labelName(a).localeCompare(this._labelName(b)));
      const key = ids.map((i) => i + this._labelName(i)).join("\u0001") + "|" + this._lab + "|" + (inTab.some((e) => !(e.labels || []).length) ? 1 : 0);
      if (this._selLab._key !== key) {
        this._selLab._key = key; this._selLab.innerHTML = "";
        const add = (v, t) => { const o = document.createElement("option"); o.value = v; o.textContent = t; this._selLab.appendChild(o); };
        add("", L.allLabels); ids.forEach((i) => add(i, this._labelName(i))); if (ids.length) add("\u0001none", L.noLabel);
        this._selLab.value = this._lab;
      }
      this._selLab.style.display = ids.length ? "" : "none"; // no labels in this tab: no selector
    }

    const list = this._sorted(this._filtered());
    this._list = list;
    this._cnt.textContent = `Σ ${list.length}${list.length !== inTab.length ? "/" + inTab.length : ""}`;
    const tgt = this._edit ? this._tgt : "view", cfg = this._layout(tgt), cols = this._cols(tgt, this._edit);
    this._offSet = this._edit ? cfg.off : new Set();
    this._wrap.className = "wrap al-" + this._align + (this._edit ? " edit" : "") + (this._wide ? " wide" : "") + (this._blur ? " blur" : "");
    if (this._edit) {
      const rgb = tgt === "print" ? "251,140,0" : "30,136,229";
      const icon = tgt === "print"
        ? "<path d='M6 9V3h12v6'/><path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'/><rect x='6' y='14' width='12' height='7'/>"
        : "<rect x='2' y='3' width='20' height='14' rx='2'/><path d='M8 21h8M12 17v4'/>";
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.5 -0.5 25 25' width='500' height='500'><g fill='none' stroke='rgba(${rgb},0.13)' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'>${icon}</g></svg>`;
      Object.assign(this._wrap.style, { backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain", minHeight: "460px", outline: `3px solid rgb(${rgb})`, outlineOffset: "-3px" });
    } else {
      Object.assign(this._wrap.style, { backgroundImage: "", backgroundRepeat: "", backgroundPosition: "", backgroundSize: "", minHeight: "", outline: "", outlineOffset: "" });
    }
    const [sc, sd] = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
    const prevTop = this._wrap.scrollTop, prevLeft = this._wrap.scrollLeft;
    if (!list.length && !this._edit) { this._wrap.innerHTML = `<div class="none">${esc(L.none)}</div>`; return; }
    const th = cols.map((c) => {
      const nm = cfg.n[c] || L["c_" + c] || c;
      if (this._edit) { // controls right in the heading: show / print, move left / right, own name, drag the right edge to resize
        return `<th data-col="${c}" draggable="true" style="position:relative;cursor:default${cfg.off.has(c) ? ";opacity:.45" : ""}"><span class="cfgl">${c === "led" && !cfg.n[c] ? "●" : c === "icon" && !cfg.n[c] ? svgIcon("shape", 16) : HEAD_SYM[c] && !cfg.n[c] ? headSym(c) : esc(nm)}</span><div class="cfgbox"><div class="cfgc"><input type="checkbox" data-cfg="vis"${cfg.off.has(c) ? "" : " checked"}><button data-cfg="mv" data-d="-1">◀</button><button data-cfg="mv" data-d="1">▶</button></div><input type="text" data-cfg="name" value="${esc(cfg.n[c] || "")}" placeholder="${esc(L["c_" + c] || c)}" title="${esc(L.renameTip)}"></div><span class="grip" data-cfg="grip" title="↔"></span></th>`;
      }
      return `<th data-col="${c}" title="${esc(nm)}">${c === "led" && !cfg.n[c] ? "●" : c === "icon" && !cfg.n[c] ? svgIcon("shape", 16) : HEAD_SYM[c] && !cfg.n[c] ? headSym(c) : esc(nm)}${c === sc ? (sd > 0 ? " ▲" : " ▼") : ""}</th>`;
    }).join("");
    const wcss = ["#", ...cols].filter((c) => cfg.w[c]).map((c) => { const w = Math.round(tgt === "print" ? cfg.w[c] * MM : cfg.w[c]); return `td[data-col="${c}"],th[data-col="${c}"]{width:${w}px;max-width:${w}px;min-width:${w}px;overflow:hidden;text-overflow:${c === "#" || NOCLIP.includes(c) ? "clip" : "ellipsis"}}`; }).join("");
    // long lists are drawn in blocks (the DOM is the slow part); the rest follows while scrolling. Sorting, search, CSV and print use the whole list.
    this._maxDec = {};
    ["value", "cur", "target"].forEach((c) => { // widths of the decimals and of the unit = longest in the column, so separators and units line up
      this._wrap.style.removeProperty("--wf-" + c); this._wrap.style.removeProperty("--wu-" + c);
      if (cols.includes(c)) {
        let f = 0, u = 0;
        for (const e of list) { const x = this._cell(e, c); if (x[2] > f) f = x[2]; if (x[3] > u) u = x[3]; }
        this._wrap.style.setProperty("--wf-" + c, f + "ch"); this._wrap.style.setProperty("--wu-" + c, u + "ch");
        this._maxDec[c] = f; // number of characters of the longest decimal part (with the separator)
      }
    });
    this._cols_ = cols; this._shown = Math.min(list.length, CHUNK);
    if ((cols.includes("retention") || cols.includes("recrows") || cols.includes("recint")) && this._admin) this._loadRecAge();
    this._wrap.innerHTML = `<style>${wcss}</style><table><thead><tr>${this._edit ? '<th data-col="#" style="position:relative"># <span class="grip" data-cfg="grip" title="↔"></span></th>' : "<th>#</th>"}${th}</tr></thead><tbody>${this._rowsHtml(0, this._shown)}</tbody></table>`;
    this._fillIcons();
    if (prevTop > 0) { while (this._shown < list.length && this._wrap.scrollHeight < prevTop + this._wrap.clientHeight + 400) this._more(); } // keep the scroll position after a refresh
    this._wrap.scrollTop = prevTop; this._wrap.scrollLeft = prevLeft;
  }

  // ---------- hover preview (photos, document names, whole comment)
  _hover(ev) {
    { // cut off text (ellipsis): the full text as tooltip
      const t = ev.target, td = t.closest && t.closest("td[data-col]");
      if (td && !t.closest("[title]:not(td):not(.idt)") && !td.querySelector("input")) {
        const el = t.closest(".idt") || td;
        if (el.scrollWidth > el.clientWidth + 1) { if (!el.title) el.title = el.textContent.trim(); }
        else if (el.title && el.dataset.tt) { el.title = ""; }
        if (el.title && !el.dataset.tt && el.title === el.textContent.trim()) el.dataset.tt = "1";
      }
    }
    const a = ev.target.closest && ev.target.closest("[data-act]"), row = a && a.closest("tr[data-id]");
    if (!a || !row || a === this._popFor) return;
    const id = row.dataset.id, m = this._meta;
    let node = null;
    if (a.dataset.act === "photos" && (m.photos[id] || []).length) {
      const ps = m.photos[id];
      node = document.createElement("div");
      node.style.cssText = `display:grid;grid-template-columns:repeat(${ps.length > 1 ? 2 : 1},auto);gap:6px`;
      ps.slice(0, 6).forEach((q) => { const im = document.createElement("img"); im.src = q.url; im.style.cssText = ps.length > 1 ? "width:150px;height:150px;object-fit:cover;border-radius:4px" : "max-width:260px;max-height:260px;object-fit:contain"; node.appendChild(im); });
    } else if (a.dataset.act === "docs" && (m.docs[id] || []).length) {
      node = document.createElement("div"); node.style.cssText = "line-height:1.5;white-space:nowrap";
      m.docs[id].forEach((d) => { const r = document.createElement("div"); r.textContent = d.name; node.appendChild(r); });
    } else if (a.dataset.act === "note" && (m.notes[id] || {}).t) {
      node = document.createElement("div"); node.style.cssText = "max-width:420px;white-space:pre-wrap"; node.textContent = m.notes[id].t;
    }
    if (!node) return;
    this._hidePop();
    const pop = document.createElement("div");
    pop.style.cssText = "position:fixed;z-index:9000;pointer-events:none;background:var(--card-background-color,#fff);color:var(--primary-text-color);border:1px solid var(--divider-color,#888);border-radius:8px;padding:8px;box-shadow:0 4px 16px rgba(0,0,0,.35);font-size:12px";
    pop.appendChild(node); this.shadowRoot.appendChild(pop);
    const r = a.getBoundingClientRect(), pr = pop.getBoundingClientRect();
    pop.style.left = Math.max(4, Math.min(r.left, innerWidth - pr.width - 8)) + "px";
    pop.style.top = (r.bottom + pr.height + 8 > innerHeight ? Math.max(4, r.top - pr.height - 6) : r.bottom + 4) + "px";
    this._pop = pop; this._popFor = a;
  }

  _hidePop() { if (this._pop) { this._pop.remove(); this._pop = null; this._popFor = null; } }

  // ---------- dialogs: photos, documents, comment
  _modal(title, sub) {
    const ov = document.createElement("div");
    ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center";
    const bx = document.createElement("div");
    bx.style.cssText = "background:var(--card-background-color,#fff);color:var(--primary-text-color,#000);border-radius:12px;padding:16px;width:min(720px,94vw);max-height:88vh;overflow:auto;box-shadow:0 8px 32px rgba(0,0,0,.4);font-family:var(--ha-font-family-body,Roboto,sans-serif)";
    const close = () => { ov.remove(); document.removeEventListener("keydown", kd, true); };
    const kd = (e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
    document.addEventListener("keydown", kd, true);
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
    const h = document.createElement("div"); h.style.cssText = "font-weight:600;font-size:16px";
    h.textContent = title;
    const sb = document.createElement("div"); sb.style.cssText = "font-size:12px;opacity:.65;margin:2px 0 10px"; sb.textContent = sub;
    const body = document.createElement("div");
    bx.append(h, sb, body); ov.appendChild(bx); this.shadowRoot.appendChild(ov);
    return { body, close };
  }

  _btn(txt, primary, fn) {
    const b = document.createElement("button"); b.textContent = txt;
    b.style.cssText = `padding:8px 16px;border-radius:8px;font-size:14px;cursor:pointer;border:1px solid var(--divider-color,#888);${primary ? "background:var(--primary-color,#03a9f4);color:#fff;border-color:transparent" : "background:transparent;color:inherit"}`;
    b.onclick = fn; return b;
  }

  _footer(...btns) { const f = document.createElement("div"); f.style.cssText = "display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap"; f.append(...btns); return f; }

  async _call(msg) { this._meta = await this._hass.callWS(msg); this._render(); }

  // resize a picture before the upload (max. 1600 px, JPEG)
  _resize(f) {
    return new Promise((res) => {
      const u = URL.createObjectURL(f), im = new Image();
      im.onload = () => {
        try {
          const sc = Math.min(1, 1600 / Math.max(im.width, im.height)), cv = document.createElement("canvas");
          cv.width = Math.round(im.width * sc); cv.height = Math.round(im.height * sc);
          cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
          URL.revokeObjectURL(u); cv.toBlob((b) => res(b || f), "image/jpeg", 0.85);
        } catch (x) { res(f); }
      };
      im.onerror = () => { URL.revokeObjectURL(u); res(f); };
      im.src = u;
    });
  }

  _pickFiles(accept, fn) {
    const inp = document.createElement("input");
    inp.type = "file"; inp.multiple = true; inp.style.display = "none"; if (accept) inp.accept = accept;
    document.body.appendChild(inp);
    inp.onchange = async () => { const files = [...(inp.files || [])]; inp.remove(); if (files.length) await fn(files); };
    inp.click();
  }

  async _upload(url, blob, name) {
    const fd = new FormData(); fd.append("file", blob, name);
    const r = await this._hass.fetchWithAuth(url, { method: "POST", body: fd });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`);
  }

  // the symbol is changed in Home Assistant's own entity settings (icon picker with search); only entities of the registry have one
  _iconDialog(e) {
    const L = this._L;
    if (!this._admin) { alert(L.iconAdmin); return; }
    if (!(this._hass.entities || {})[e.id]) { alert(L.iconNoReg); return; }
    this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: e.id, view: "settings" } }));
  }

  // rename: the name of the entity registry (HA puts the device name in front when the entity belongs to a device)
  async _nameDialog(e, focus) {
    const L = this._L;
    if (!this._admin) { alert(L.nameAdmin); return; }
    let reg;
    try { reg = await this._hass.callWS({ type: "config/entity_registry/get", entity_id: e.id }); } catch (x) { alert(L.nameNoReg); return; }
    const { body, close } = this._modal(L.nameTitle, e.id);
    const lab = document.createElement("div"); lab.style.cssText = "font-size:12px;opacity:.7;margin-bottom:4px"; lab.textContent = L.nameLabel;
    const inp = document.createElement("input"); inp.type = "text"; inp.value = reg.name || ""; inp.placeholder = reg.original_name || e.name;
    inp.style.cssText = "width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit;font-size:15px";
    inp.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === "Enter") save.click(); };
    const idLab = document.createElement("div"); idLab.style.cssText = "font-size:12px;opacity:.7;margin:12px 0 4px"; idLab.textContent = L.idLabel;
    const idInp = document.createElement("input"); idInp.type = "text"; idInp.value = e.id; idInp.style.cssText = inp.style.cssText + ";font-family:monospace;font-size:14px";
    idInp.onkeydown = inp.onkeydown;
    body.append(lab, inp, idLab, idInp);
    const hint = (txt) => { const d = document.createElement("div"); d.style.cssText = "font-size:12px;opacity:.65;margin-top:6px"; d.textContent = txt; body.appendChild(d); };
    if (reg.has_entity_name && e.device) hint(L.nameHintDev.replace("{dev}", e.device));
    if (reg.original_name) hint(L.nameDefault.replace("{n}", reg.original_name));
    hint(L.idWarn);
    const doSave = async (name) => {
      const newId = idInp.value.trim(), dom = e.id.slice(0, e.id.indexOf("."));
      if (newId !== e.id && !(newId.startsWith(dom + ".") && /^[a-z0-9_]+\.[a-z0-9_]+$/.test(newId))) { alert(L.idInvalid.replace("{d}", dom)); return; }
      try {
        const msg = { type: "config/entity_registry/update", entity_id: e.id, name: name || null };
        if (newId !== e.id) msg.new_entity_id = newId;
        await this._hass.callWS(msg); close();
        setTimeout(() => { this._refresh(true); this._loadMeta(); }, 1500);
      }
      catch (x) { alert(`${L.nameFail}: ${(x && x.message) || x}`); }
    };
    const save = this._btn(L.save, true, () => doSave(inp.value.trim()));
    const reset = this._btn(L.nameReset, false, () => doSave(""));
    const det = this._btn(L.nameDetails, false, () => { close(); this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: e.id } })); });
    const rec = this._btn(L.retBtn, false, () => { close(); this._retentionDialog(e); });
    body.appendChild(this._footer(det, rec, reset, this._btn(L.cancel, false, close), save));
    setTimeout(() => { const f = focus === "id" ? idInp : inp; f.focus(); f.select(); }, 50);
  }

  // edit name or entity id right in the table cell; leaving the field (Enter / click elsewhere) asks whether the change is really meant, Esc discards
  async _inlineEdit(td, e, field) {
    const L = this._L;
    if (this._inl) return;
    if (!this._admin) { alert(L.nameAdmin); return; }
    let reg;
    try { reg = await this._hass.callWS({ type: "config/entity_registry/get", entity_id: e.id }); } catch (x) { alert(L.nameNoReg); return; }
    this._inl = true;
    const old = field === "id" ? e.id : (reg.name || e.name), html = td.innerHTML;
    const inp = document.createElement("input"); inp.type = "text"; inp.value = old;
    inp.style.cssText = "width:100%;min-width:140px;box-sizing:border-box;padding:1px 4px;margin:0;border-radius:4px;border:1px solid var(--primary-color);background:var(--card-background-color,transparent);color:var(--primary-text-color);font:inherit" + (field === "id" ? ";font-family:monospace" : "");
    td.innerHTML = ""; td.style.overflow = "visible"; td.appendChild(inp);
    let done = false;
    const finish = (restore) => { done = true; this._inl = false; td.style.overflow = ""; if (restore) td.innerHTML = html; };
    const commit = async () => {
      if (done) return;
      const v = inp.value.trim();
      if (v === old || (field === "id" && !v)) { finish(true); return; }
      done = true; // the confirm dialog takes the focus away: do not react to that
      const dom = e.id.slice(0, e.id.indexOf("."));
      if (field === "id" && !(v.startsWith(dom + ".") && /^[a-z0-9_]+\.[a-z0-9_]+$/.test(v))) { alert(L.idInvalid.replace("{d}", dom)); finish(true); return; }
      if (!confirm((field === "id" ? L.editConfirmId : L.editConfirmName).replace("{old}", old).replace("{new}", v))) { finish(true); return; }
      try {
        const msg = { type: "config/entity_registry/update", entity_id: e.id };
        if (field === "id") msg.new_entity_id = v; else msg.name = v;
        await this._hass.callWS(msg);
        finish(false);
        setTimeout(() => { this._refresh(true); this._loadMeta(); }, 1500);
        td.textContent = v; // until the list is refreshed
      } catch (x) { alert(`${L.nameFail}: ${(x && x.message) || x}`); finish(true); }
    };
    inp.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === "Enter") commit(); else if (ev.key === "Escape") { done = true; finish(true); } };
    inp.onblur = () => commit();
    inp.onclick = (ev) => ev.stopPropagation();
    inp.focus(); inp.select();
  }

  // type the retention (days) right into the Recorder column: Enter / click elsewhere saves, Esc cancels, empty removes the rule
  _retentionInline(span, e) {
    const L = this._L, cur = (this._meta.retention || {})[e.id] || 0, td = span.closest("td");
    if (!td || td.querySelector("input")) return;
    const html = td.innerHTML, inp = Object.assign(document.createElement("input"), { type: "number", min: 1, max: 3650, value: cur || "", placeholder: "–" });
    inp.style.cssText = "width:70px;box-sizing:border-box;padding:1px 4px;border-radius:4px;border:1px solid var(--primary-color);background:var(--card-background-color,transparent);color:var(--primary-text-color);font:inherit";
    td.innerHTML = ""; td.appendChild(inp); inp.focus(); inp.select();
    let done = false;
    const finish = async (save) => {
      if (done) return; done = true;
      const v = parseInt(inp.value, 10), days = v >= 1 ? Math.min(v, 3650) : 0;
      if (!save || days === cur) { td.innerHTML = html; return; }
      try { await this._call({ type: "entity_inventory/set_retention", entity_id: e.id, days: days || null }); }
      catch (x) { alert(`${(x && x.message) || x}`); td.innerHTML = html; }
    };
    inp.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === "Enter") finish(true); else if (ev.key === "Escape") finish(false); };
    inp.onblur = () => finish(true);
    inp.onclick = (ev) => ev.stopPropagation();
  }

  // a window with explaining paragraphs and a confirm button; used before anything is switched on or deleted
  _confirmDialog(title, paras, okText, onOk, danger) {
    const L = this._L, { body, close } = this._modal(title, "");
    paras.forEach((p) => { const d = document.createElement("div"); d.style.cssText = "margin:8px 0;font-size:13px;line-height:1.5;white-space:pre-wrap"; if (typeof p === "string") d.textContent = p; else d.appendChild(p); body.appendChild(d); });
    const ok = this._btn(okText, true, async () => { ok.disabled = true; try { await onOk(); } finally { close(); } });
    if (danger) { ok.style.background = "var(--error-color,#db4437)"; }
    body.appendChild(this._footer(this._btn(L.cancel, false, close), ok));
    return body;
  }

  // the lines of a preview of the retention job (what would be deleted)
  _previewParas(pv) {
    const L = this._L, rec = pv.recorder || {}, out = [];
    out.push(rec.keep_days ? L.retGlobal.replace("{n}", rec.keep_days) : L.retGlobalUnknown);
    const groups = pv.groups || [];
    if (!groups.length) out.push(L.retPvNone);
    else {
      out.push(groups.map((g) => L.retPvGroup.replace("{days}", g.days).replace("{entities}", g.entities).replace("{rows}", g.rows == null ? "?" : g.rows.toLocaleString())).join("\n"));
      out.push(L.retPvTotal.replace("{rows}", groups.reduce((a, g) => a + (g.rows || 0), 0).toLocaleString()).replace("{entities}", groups.reduce((a, g) => a + g.entities, 0)));
    }
    if (pv.skipped) out.push(L.retPvSkipped.replace("{n}", pv.skipped).replace("{g}", rec.keep_days || "?"));
    out.push(L.retPvHow);
    return out;
  }

  // asks the server what would be deleted (entities and history rows per number of days); `defaultDays` previews a default that is not saved yet
  async _retPreview(defaultDays) {
    const msg = { type: "entity_inventory/retention_preview" };
    if (defaultDays !== undefined) msg.default_days = defaultDays;
    return this._hass.callWS(msg);
  }

  // recorder retention of one entity (and the settings for all entities): how many days of history to keep
  _retentionDialog(e) {
    const L = this._L, admin = this._admin, m = this._meta, { body, close } = this._modal(`${L.retTitle} – ${e.name}`, e.id);
    const info = m.retention_info || {}, cur = (m.retention || {})[e.id] || 0, g = (info.recorder || {}).keep_days || 0, def = info.default_days || 0;
    const note = (txt, css, parent) => { const d = document.createElement("div"); d.style.cssText = css || "font-size:12px;opacity:.75;margin:6px 0;line-height:1.45;white-space:pre-wrap"; d.textContent = txt; (parent || body).appendChild(d); return d; };
    note(L.retIntro);
    note(g ? L.retGlobal.replace("{n}", g) : L.retGlobalUnknown, "font-size:13px;margin:8px 0;padding:8px 10px;border-radius:8px;background:rgba(127,127,127,.15)");
    // how far back the history of this entity reaches: the oldest state the recorder still has
    const since = note(L.retSinceBusy, "font-size:13px;font-weight:600;margin:8px 0 2px"), stats = note("", "font-size:13px;margin:2px 0 8px");
    (async () => {
      await this._loadRecAge();
      const ra = this._recAge;
      if (!ra || ra.err) { since.textContent = L.retSinceFail; return; }
      const ts = ra.oldest[e.id];
      since.textContent = ts ? L.retSince.replace("{t}", new Date(ts * 1000).toLocaleString()).replace("{n}", Math.max(0, Math.floor((ra.now - ts) / 86400))) : L.retSinceNone;
      const n = (ra.count || {})[e.id];
      if (n) stats.textContent = this._statsText(L.retStats, n, ts, (ra.last || {})[e.id]);
    })();
    let sel = cur;
    const PRESETS = [0, 1, 3, 7, 14, 30, 90, 180, 365, 3650];
    const box = document.createElement("div"); box.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:8px 0";
    const custom = Object.assign(document.createElement("input"), { type: "number", min: 1, max: 3650, value: cur && !PRESETS.includes(cur) ? cur : "", placeholder: L.retCustom, disabled: !admin });
    custom.style.cssText = "width:150px;padding:6px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit";
    custom.onkeydown = (ev) => ev.stopPropagation();
    const hint = document.createElement("div"), longer = document.createElement("div");
    hint.style.cssText = "font-size:13px;margin:6px 0;line-height:1.45";
    longer.style.cssText = "font-size:12.5px;margin:8px 0;padding:10px 12px;border-radius:8px;border:1px solid var(--warning-color,#ffa000);line-height:1.5;display:none";
    const yaml = (n) => `recorder:\n  purge_keep_days: ${n}`;
    const paintHint = () => {
      longer.style.display = "none"; longer.innerHTML = "";
      if (!sel) { hint.textContent = L.retRuleNone.replace("{d}", def ? L.retRuleDefault.replace("{n}", def) : ""); return; }
      if (sel === 3650) { hint.textContent = L.retRuleMax.replace("{g}", g || "?"); return; }
      if (g && sel === g) { hint.textContent = L.retRuleSame.replace("{g}", g); return; }
      if (g && sel > g) {
        hint.textContent = L.retRuleLong.replace("{g}", g);
        longer.style.display = "";
        const t = document.createElement("div"); t.style.cssText = "font-weight:600;margin-bottom:6px"; t.textContent = L.retLongerTitle.replace("{g}", g); longer.appendChild(t);
        [L.retLonger1.replace("{n}", sel), L.retLonger2, L.retLonger3, L.retLonger4].forEach((x) => { const d = document.createElement("div"); d.style.cssText = "margin:4px 0;white-space:pre-wrap"; d.textContent = x; longer.appendChild(d); });
        const pre = document.createElement("pre"); pre.style.cssText = "margin:8px 0;padding:8px;border-radius:6px;background:rgba(127,127,127,.18);font-size:12px;user-select:all"; pre.textContent = yaml(sel); longer.appendChild(pre);
        const cp = this._btn(L.retYamlCopy, false, () => { try { navigator.clipboard.writeText(yaml(sel)); } catch (x) { /* ignore */ } cp.textContent = L.retYamlCopied; setTimeout(() => (cp.textContent = L.retYamlCopy), 1500); });
        longer.appendChild(cp);
        return;
      }
      hint.textContent = L.retRuleShort.replace("{n}", sel);
    };
    const paint = () => { box.querySelectorAll("button").forEach((b) => { const on = +b.dataset.d === sel; b.style.background = on ? "var(--primary-color,#03a9f4)" : ""; b.style.color = on ? "#fff" : ""; b.style.borderColor = on ? "transparent" : ""; }); paintHint(); };
    PRESETS.forEach((d) => { const b = this._btn(d === 0 ? L.retNone : d === 3650 ? L.retMax : L.retDays.replace("{n}", d), false, () => { sel = d; custom.value = ""; paint(); }); b.dataset.d = d; b.disabled = !admin; box.appendChild(b); });
    custom.oninput = () => { const v = parseInt(custom.value, 10); sel = v >= 1 ? Math.min(v, 3650) : 0; paint(); };
    box.appendChild(custom); body.append(box, hint, longer); paint();

    // settings for all entities: default retention, the nightly job, preview / delete now
    const hr = document.createElement("div"); hr.style.cssText = "border-top:1px solid var(--divider-color,#888);margin:16px 0 8px"; body.appendChild(hr);
    note(L.retAllTitle, "font-weight:600;font-size:14px;margin:6px 0");
    note(L.retDefaultHelp);
    const defRow = document.createElement("div"); defRow.style.cssText = "display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:8px 0";
    const defIn = Object.assign(document.createElement("input"), { type: "number", min: 1, max: 3650, value: def || "", placeholder: "–", disabled: !admin });
    defIn.style.cssText = "width:90px;padding:6px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit";
    defIn.onkeydown = (ev) => ev.stopPropagation();
    const status = note("", "font-size:12.5px;margin:6px 0;line-height:1.45;white-space:pre-wrap");
    const saveDefault = this._btn(L.retDefaultSave, false, async () => {
      const v = parseInt(defIn.value, 10), days = v >= 1 ? Math.min(v, 3650) : null;
      if (days === (def || null)) return;
      status.textContent = L.retPvBusy;
      let pv = null;
      try { pv = await this._retPreview(days); } catch (x) { status.textContent = L.retPvFail.replace("{e}", (x && x.message) || x); return; }
      status.textContent = "";
      const paras = days ? [L.retDefaultConfirmText.replace("{n}", days), ...this._previewParas(pv)] : [L.retDefaultOff];
      this._confirmDialog(L.retDefaultConfirmTitle, paras, L.retSave, async () => { await this._call({ type: "entity_inventory/set_default_retention", days }); });
    });
    saveDefault.disabled = !admin;
    defRow.append(document.createTextNode(L.retDefaultLabel + " "), defIn, saveDefault); body.appendChild(defRow);
    const rules = Object.keys(m.retention || {}).length;
    const jobRow = document.createElement("label"); jobRow.style.cssText = "display:flex;gap:8px;align-items:center;margin-top:10px;font-size:13px";
    const jobCb = Object.assign(document.createElement("input"), { type: "checkbox", checked: !!info.enabled, disabled: !admin });
    jobCb.onchange = async () => {
      const want = jobCb.checked;
      if (!want) { try { await this._call({ type: "entity_inventory/retention_enabled", enabled: false }); } catch (x) { alert(`${(x && x.message) || x}`); jobCb.checked = true; } return; }
      jobCb.checked = false; // only switched on after the confirmation
      status.textContent = L.retPvBusy;
      let pv = null;
      try { pv = await this._retPreview(); } catch (x) { status.textContent = L.retPvFail.replace("{e}", (x && x.message) || x); return; }
      status.textContent = "";
      this._confirmDialog(L.retEnableTitle, [L.retEnableText, ...this._previewParas(pv)], L.retConfirmOn, async () => { await this._call({ type: "entity_inventory/retention_enabled", enabled: true }); });
    };
    jobRow.append(jobCb, document.createTextNode(L.retJob)); body.appendChild(jobRow);
    note(`${L.retRules.replace("{n}", rules)} · ${L.retLast.replace("{t}", info.last_run ? new Date(info.last_run).toLocaleString() : L.retNever)}`);
    const pvBtn = this._btn(L.retPreviewBtn, false, async () => {
      status.textContent = L.retPvBusy;
      try { const pv = await this._retPreview(); status.textContent = ""; this._confirmDialog(L.retPvTitle, this._previewParas(pv), L.tabsClose, async () => {}); }
      catch (x) { status.textContent = L.retPvFail.replace("{e}", (x && x.message) || x); }
    });
    const run = this._btn(L.retRunNow, false, async () => {
      status.textContent = L.retPvBusy;
      let pv = null;
      try { pv = await this._retPreview(); } catch (x) { status.textContent = L.retPvFail.replace("{e}", (x && x.message) || x); return; }
      status.textContent = "";
      if (!(pv.groups || []).length) { this._confirmDialog(L.retRunTitle, this._previewParas(pv), L.tabsClose, async () => {}); return; }
      this._confirmDialog(L.retRunTitle, [L.retRunAsk, ...this._previewParas(pv)], L.retDeleteNow, async () => {
        status.textContent = "…";
        try {
          await this._call({ type: "entity_inventory/run_retention" });
          const res = (this._meta.retention_info || {}).last_result || {};
          status.textContent = res.error === "recorder_not_available" ? L.retNoRec : res.error ? L.retFail.replace("{e}", res.error) : L.retDone.replace("{n}", res.entities || 0);
        } catch (x) { status.textContent = L.retFail.replace("{e}", (x && x.message) || x); }
      }, true);
    });
    pvBtn.disabled = !admin; run.disabled = !admin;
    if (!admin) note(L.retAdmin);
    const save = this._btn(L.save, true, async () => {
      save.textContent = "…";
      try { await this._call({ type: "entity_inventory/set_retention", entity_id: e.id, days: sel || null }); close(); }
      catch (x) { alert(`${(x && x.message) || x}`); save.textContent = L.save; }
    });
    body.appendChild(this._footer(pvBtn, run, this._btn(admin ? L.cancel : L.tabsClose, !admin, close), ...(admin ? [save] : [])));
  }

  // state class of an entity: what it means and whether Home Assistant keeps long-term statistics for it (not changeable from here)
  _scDialog(e) {
    const L = this._L, { body, close } = this._modal(`${L.scTitle} – ${e.name}`, e.id);
    const p = (txt, css) => { const d = document.createElement("div"); d.style.cssText = css || "margin:8px 0;font-size:13px;line-height:1.5;white-space:pre-wrap"; d.textContent = txt; body.appendChild(d); return d; };
    p(`${L.scTitle}: ${e.sc || L.scNone}`, "font-size:15px;font-weight:600;margin:6px 0");
    const key = { measurement: L.scMeasurement, total: L.scTotal, total_increasing: L.scTotalInc }[e.sc];
    if (key) p(key);
    const stat = p(L.scStatsBusy);
    (async () => {
      try {
        const list = await this._hass.callWS({ type: "recorder/list_statistic_ids" }), it = (list || []).find((x) => x.statistic_id === e.id);
        if (!it) { stat.textContent = L.scStatsNo; return; }
        const what = [it.has_mean ? "mean" : "", it.has_sum ? "sum" : ""].filter(Boolean).join(" + ") || "–";
        stat.textContent = L.scStatsYes.replace("{what}", what).replace("{unit}", it.statistics_unit_of_measurement || "–").replace("{src}", it.source || "–");
      } catch (x) { stat.textContent = L.scStatsFail; }
    })();
    p(L.scChange);
    p(L.scRecNote, "margin:8px 0;font-size:12px;opacity:.75;line-height:1.5");
    const go = this._btn(L.scDevTools, false, () => { close(); history.pushState({ from: location.pathname + location.search }, "", "/developer-tools/statistics"); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); });
    body.appendChild(this._footer(go, this._btn(L.tabsClose, true, close)));
  }

  _photosDialog(e) {
    const L = this._L, { body, close } = this._modal(`${L.photosTitle} – ${e.name}`, e.id);
    const draw = () => {
      body.innerHTML = "";
      const ps = this._meta.photos[e.id] || [];
      if (!ps.length) { const n = document.createElement("div"); n.style.cssText = "opacity:.6;padding:12px 0"; n.textContent = L.noPhotos; body.appendChild(n); }
      const g = document.createElement("div"); g.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px";
      ps.forEach((q) => {
        const w = document.createElement("div"); w.style.cssText = "position:relative";
        const im = document.createElement("img"); im.src = q.url; im.style.cssText = "width:100%;height:150px;object-fit:cover;border-radius:6px;cursor:zoom-in";
        im.onclick = () => window.open(q.url, "_blank", "noopener");
        w.appendChild(im);
        if (this._admin) {
          const x = document.createElement("button"); x.textContent = "✕"; x.title = L.del;
          x.style.cssText = "position:absolute;top:4px;right:4px;width:26px;height:26px;border-radius:50%;border:none;background:rgba(0,0,0,.6);color:#fff;cursor:pointer;font-size:13px";
          x.onclick = async () => { if (confirm(L.confirmDel.replace("{name}", "🖼"))) { await this._call({ type: "entity_inventory/delete_photo", entity_id: e.id, photo_id: q.id }); draw(); } };
          w.appendChild(x);
        }
        g.appendChild(w);
      });
      body.appendChild(g);
      const add = this._admin ? this._btn(L.addPhotos, true, () => this._pickFiles("image/*", async (files) => {
        add.textContent = "…";
        try {
          for (let i = 0; i < files.length; i++) { add.textContent = `… ${i + 1}/${files.length}`; await this._upload(`/api/entity_inventory/upload/${e.id}`, await this._resize(files[i]), "photo.jpg"); }
        } catch (x) { alert(`${L.uploadFail}: ${x.message || x}`); }
        await this._loadMeta(); draw();
      })) : null;
      body.appendChild(this._footer(...(add ? [add] : []), this._btn(L.tabsClose, !add, close)));
    };
    draw();
  }

  _docsDialog(e) {
    const L = this._L, { body, close } = this._modal(`${L.docsTitle} – ${e.name}`, e.id);
    const draw = () => {
      body.innerHTML = "";
      const ds = this._meta.docs[e.id] || [];
      if (!ds.length) { const n = document.createElement("div"); n.style.cssText = "opacity:.6;padding:12px 0"; n.textContent = L.noDocs; body.appendChild(n); }
      ds.forEach((d) => {
        const r = document.createElement("div"); r.style.cssText = "display:flex;align-items:center;gap:10px;padding:6px 4px;border-bottom:1px solid var(--divider-color,#444)";
        const ic = document.createElement("span"); ic.innerHTML = svgIcon("doc", 22); ic.style.cssText = "flex:none;opacity:.8";
        const a = document.createElement("a"); a.href = d.url; a.target = "_blank"; a.rel = "noopener"; a.textContent = d.name || "document";
        a.style.cssText = "flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--primary-color);text-decoration:none";
        const dt = document.createElement("span"); dt.style.cssText = "opacity:.6;font-size:12px;flex:none"; dt.textContent = d.ts ? new Date(d.ts).toLocaleDateString() : "";
        r.append(ic, a, dt);
        if (this._admin) {
          const mk = (txt, title, fn) => { const b = document.createElement("button"); b.textContent = txt; b.title = title; b.style.cssText = "border:none;background:transparent;color:inherit;cursor:pointer;opacity:.7;font-size:15px;padding:2px 6px"; b.onclick = fn; return b; };
          r.append(
            mk("✎", L.rename, async () => { const n = prompt(L.renamePrompt, d.name || ""); if (n && n.trim()) { await this._call({ type: "entity_inventory/rename_doc", entity_id: e.id, doc_id: d.id, name: n.trim() }); draw(); } }),
            mk("✕", L.del, async () => { if (confirm(L.confirmDel.replace("{name}", d.name || ""))) { await this._call({ type: "entity_inventory/delete_doc", entity_id: e.id, doc_id: d.id }); draw(); } }),
          );
        }
        body.appendChild(r);
      });
      const add = this._admin ? this._btn(L.addDocs, true, () => this._pickFiles("", async (files) => {
        add.textContent = "…";
        try {
          for (let i = 0; i < files.length; i++) { add.textContent = `… ${i + 1}/${files.length}`; await this._upload(`/api/entity_inventory/doc_upload/${e.id}`, files[i], files[i].name); }
        } catch (x) { alert(`${L.uploadFail}: ${x.message || x}`); }
        await this._loadMeta(); draw();
      })) : null;
      body.appendChild(this._footer(...(add ? [add] : []), this._btn(L.tabsClose, !add, close)));
    };
    draw();
  }

  _noteDialog(e) {
    const L = this._L, { body, close } = this._modal(`${L.noteTitle} – ${e.name}`, e.id);
    const ta = document.createElement("textarea");
    ta.rows = 9; ta.value = (this._meta.notes[e.id] || {}).t || ""; ta.placeholder = L.notePh; ta.readOnly = !this._admin;
    ta.style.cssText = "width:100%;box-sizing:border-box;padding:8px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit;resize:vertical";
    ta.onkeydown = (ev) => ev.stopPropagation();
    body.appendChild(ta);
    const save = this._admin ? this._btn(L.save, true, async () => { save.textContent = "…"; try { await this._call({ type: "entity_inventory/set_note", entity_id: e.id, text: ta.value }); close(); } catch (x) { alert(x.message || x); save.textContent = L.save; } }) : null;
    body.appendChild(this._footer(this._btn(this._admin ? L.cancel : L.tabsClose, !save, close), ...(save ? [save] : [])));
    setTimeout(() => ta.focus(), 50);
  }

  // puts Home Assistant's own state icon (ha-state-icon: the icon set by the user, else the default of the type) into the icon cells; the elements are kept per entity, so a redraw does not make them flicker
  _fillIcons() {
    const cache = this._iconNodes || (this._iconNodes = new Map()), h = this._hass;
    this._wrap.querySelectorAll("span.eicon:empty").forEach((sp) => {
      const id = sp.closest("tr").dataset.id, st = h.states[id];
      if (!st) return;
      let n = cache.get(id);
      if (!n) {
        n = document.createElement(customElements.get("ha-state-icon") ? "ha-state-icon" : "ha-icon");
        n.style.setProperty("--mdc-icon-size", "20px");
        cache.set(id, n);
        if (cache.size > 3000) cache.delete(cache.keys().next().value);
      }
      if (n.localName === "ha-state-icon") { n.hass = h; n.stateObj = st; } else n.setAttribute("icon", st.attributes.icon || "mdi:eye");
      sp.appendChild(n);
    });
  }

  // every number of a column gets the same number of decimals: the missing zeros are added on the right (display only; 236,0 -> 236,00 next to 1,20)
  _padDecimals(html, col) {
    const f = this._maxDec && this._maxDec[col];
    if (this._align !== "dec" || !f || f < 2) return html; // only with the decimal-separator alignment
    return html.replace(/<span class="vf">([^<]*)<\/span>/, (m, d) => d.length >= f ? m : `<span class="vf">${(d || this._dec) + "0".repeat(f - (d || this._dec).length)}</span>`);
  }

  _rowsHtml(from, to) {
    const cols = this._cols_, out = [];
    for (let i = from; i < to; i++) {
      const e = this._list[i];
      out.push(`<tr data-id="${esc(e.id)}"><td class="dim" data-col="#">${i + 1}</td>${cols.map((c) => `<td data-col="${c}"${this._offSet && this._offSet.has(c) ? " data-off=1" : ""}>${this._padDecimals(this._cell(e, c)[0], c)}</td>`).join("")}</tr>`);
    }
    return out.join("");
  }

  _more() {
    const tb = this._wrap.querySelector("tbody");
    if (!tb || !this._list || this._shown >= this._list.length) return;
    const to = Math.min(this._list.length, this._shown + CHUNK);
    tb.insertAdjacentHTML("beforeend", this._rowsHtml(this._shown, to));
    this._fillIcons();
    this._shown = to;
  }

  // the click target after a redraw: the element that was pressed, looked up again in the new table
  // rename a column in the heading (display names; empty = default)
  _renameHead(th) {
    const L = this._L, c = th.dataset.col, cfg = this._layout("view");
    if (this._inl || !c) return;
    const inp = document.createElement("input");
    inp.type = "text"; inp.value = cfg.n[c] || ""; inp.placeholder = L["c_" + c] || c; inp.title = L.renameTip;
    inp.style.cssText = "width:100%;min-width:60px;box-sizing:border-box;font:inherit;font-weight:700;padding:1px 3px;border:1px solid var(--primary-color);border-radius:4px;background:var(--card-background-color,transparent);color:var(--primary-text-color)";
    th.textContent = ""; th.appendChild(inp); this._inl = true; inp.focus(); inp.select();
    let done = false;
    const fin = (save) => {
      if (done) return; done = true; this._inl = false;
      if (save) { const v = inp.value.trim(); if (v) cfg.n[c] = v; else delete cfg.n[c]; this._saveLayout("view"); }
      this._render();
    };
    inp.onkeydown = (ev) => { ev.stopPropagation(); if (ev.key === "Enter") fin(true); else if (ev.key === "Escape") fin(false); };
    inp.onblur = () => fin(true);
    inp.onclick = (ev) => ev.stopPropagation();
  }

  _fixTarget(ev) {
    const t = ev.target, d = this._down;
    if (d && Date.now() - d.t < 2500 && !(t.closest && t.closest("tr[data-id]"))) {
      const row = [...this._wrap.querySelectorAll("tr[data-id]")].find((x) => x.dataset.id === d.id);
      const td = row && row.querySelector(`td[data-col="${d.col}"]`), el = (td && d.act && td.querySelector(`[data-act="${d.act}"]`)) || td;
      if (el) return { target: el, shiftKey: ev.shiftKey };
    }
    return ev;
  }

  _click(ev) {
    ev = this._fixTarget(ev);
    const chip = ev.target.closest && ev.target.closest(".chip[data-label]");
    if (chip) { this._labelDialog(chip.dataset.label); return; }
    const mv = ev.target.closest("[data-cfg=mv]");
    if (mv) { // move a column one place left / right (among the columns of this tab)
      const c = mv.closest("th").dataset.col, d = +mv.dataset.d, cfg = this._layout(this._tgt), base = TABCOLS[this._active] || BASE;
      const i = cfg.order.indexOf(c); let j = i + d;
      while (j >= 0 && j < cfg.order.length && !base.includes(cfg.order[j])) j += d;
      if (j >= 0 && j < cfg.order.length) { [cfg.order[i], cfg.order[j]] = [cfg.order[j], cfg.order[i]]; this._saveLayout(this._tgt); this._render(); }
      return;
    }
    if (this._edit) return; // in the column editor the headings do not sort
    const th = ev.target.closest("th[data-col]");
    if (th) {
      const k = this._active, c = th.dataset.col, cur = this._sort[k] || SORT_DEFAULT[k] || ["name", 1];
      this._sort[k] = [c, cur[0] === c ? -cur[1] : 1];
      this._render(); return;
    }
    const act = ev.target.closest("[data-act]"), row = ev.target.closest("tr[data-id]");
    if (act && row && !row.dataset.id.startsWith("user:")) {
      const e = (this._rows || []).find((r) => r.id === row.dataset.id);
      if (act.dataset.act === "copy") {
        try { navigator.clipboard.writeText(act.dataset.copy === "name" ? (e ? e.name : "") : act.dataset.copy === "value" ? (e ? this._valueText(e) : "") : row.dataset.id); } catch (x) { /* ignore */ }
        act.innerHTML = svgIcon("check", 14); act.style.color = "var(--success-color,#43a047)"; act.style.visibility = "visible";
        setTimeout(() => { act.innerHTML = svgIcon("copy", 14); act.style.color = ""; act.style.visibility = ""; }, 800);
        return;
      }
      if (e && act.dataset.act === "icon") { this._hidePop(); this._iconDialog(e); return; }
      if (e && act.dataset.act === "retention") { this._hidePop(); if (ev.shiftKey && this._admin) this._retentionInline(act, e); else this._retentionDialog(e); return; }
      if (e) { this._hidePop(); if (act.dataset.act === "photos") this._photosDialog(e); else if (act.dataset.act === "docs") this._docsDialog(e); else this._noteDialog(e); }
      return;
    }
    const td = ev.target.closest("td[data-col]"), tr = ev.target.closest("tr[data-id]");
    if (!td || !tr) return;
    const id = tr.dataset.id;
    if (id.startsWith("user:")) { if (td.dataset.col === "name" || td.dataset.col === "person") { history.pushState({ from: location.pathname + location.search }, "", "/config/person"); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); } return; }
    if (td.dataset.col === "id") {
      const e = (this._rows || []).find((r) => r.id === id);
      if (e) this._nameDialog(e, "id");
    } else if (td.dataset.col === "sc") {
      const e = (this._rows || []).find((r) => r.id === id);
      if (e) this._scDialog(e);
    } else if (["device", "platform", "area"].includes(td.dataset.col)) { // device page / integration page / area page of HA
      const e = (this._rows || []).find((r) => r.id === id), c = td.dataset.col;
      const path = !e ? "" : c === "device" ? (e.deviceId && `/config/devices/device/${e.deviceId}?historyBack=1`) : c === "platform" ? (e.platform && e.platform !== "core" && `/config/integrations/integration/${e.platform}?historyBack=1`) : (e.areaId && `/config/areas/area/${e.areaId}?historyBack=1`);
      if (path) {
        history.pushState({ from: location.pathname + location.search }, "", path);
        window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
      }
    } else if (td.dataset.col === "name") {
      const e = (this._rows || []).find((r) => r.id === id);
      if (e) this._nameDialog(e);
    } else if (["value", "state", "pos", "tilt", "bright", "cur", "target", "mode", "action"].includes(td.dataset.col)) { // opens the normal HA dialog with the history
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: id } }));
    }
  }

  // ------------------------------------------------------------ export / print
  // column editor: visibility checkbox and own name
  _cfgChange(ev) {
    const el = ev.target.closest && ev.target.closest("[data-cfg]");
    if (!el || !this._edit) return;
    const c = el.closest("th").dataset.col, cfg = this._layout(this._tgt);
    if (el.dataset.cfg === "vis") { if (el.checked) cfg.off.delete(c); else cfg.off.add(c); }
    else if (el.dataset.cfg === "name") { const v = el.value.trim(); if (v) cfg.n[c] = v; else delete cfg.n[c]; }
    else return;
    this._saveLayout(this._tgt); this._render();
  }

  // column editor: drag the right edge of a heading to set the width (double click = automatic)
  _cfgGrip(ev) {
    const g = ev.target.closest && ev.target.closest("[data-cfg=grip]");
    if (!g || !this._edit) return;
    ev.preventDefault(); ev.stopPropagation();
    const th = g.closest("th"), c = th.dataset.col, cfg = this._layout(this._tgt), tgt = this._tgt;
    const x0 = ev.clientX, w0 = th.getBoundingClientRect().width; let cur = w0;
    const cells = () => [th, ...this._wrap.querySelectorAll(`td[data-col="${c}"]`)];
    const mv = (e) => { cur = Math.max(8, w0 + e.clientX - x0); cells().forEach((x) => { x.style.width = x.style.maxWidth = x.style.minWidth = cur + "px"; }); };
    const up = () => {
      document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up);
      if (cur !== w0) { cfg.w[c] = tgt === "print" ? Math.round(cur / MM) : Math.round(cur); this._saveLayout(tgt); this._render(); }
    };
    document.addEventListener("mousemove", mv); document.addEventListener("mouseup", up);
  }

  // sets every width to the widest content of its column
  _autoWidth() {
    const tgt = this._tgt, cfg = this._layout(tgt), tb = this._wrap.querySelector("table");
    if (!tb) return;
    const natural = (n) => { const rg = document.createRange(); rg.selectNodeContents(n); const cs = getComputedStyle(n); return Math.ceil(rg.getBoundingClientRect().width + parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)) + 2; };
    const w = {};
    tb.querySelectorAll("tbody tr").forEach((r) => [...r.children].forEach((td) => { const c = td.dataset.col; if (!c) return; const x = natural(td); if (!(w[c] >= x)) w[c] = x; }));
    // the heading counts with its text only (the editor controls fit into 76 px anyway when the column is that wide)
    const probe = document.createElement("span"); probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font:inherit;font-weight:600"; tb.appendChild(probe);
    tb.querySelectorAll("thead th[data-col]").forEach((th) => { const c = th.dataset.col; probe.textContent = c === "#" ? "#" : c === "led" ? "●" : c === "icon" && !this._layout(tgt).n.icon ? "mm" : HEAD_SYM[c] && !this._layout(tgt).n[c] ? "mmmm" : this._colName(tgt, c); w[c] = Math.max(Math.ceil(probe.getBoundingClientRect().width) + 14, w[c] || 0); });
    probe.remove();
    Object.keys(w).forEach((c) => { cfg.w[c] = tgt === "print" ? Math.round(w[c] / MM) : w[c]; });
    this._saveLayout(tgt); this._render();
  }

  // buttons of the column editor at the right end of the toolbar
  _paintEdit() {
    const L = this._L, box = this._editBox;
    box.innerHTML = "";
    const mk = (svg, title, fn, on) => {
      const b = document.createElement("button"); b.className = "ib"; b.title = title; b.innerHTML = svg; b.onclick = fn;
      if (on) { b.style.background = "var(--primary-color,#03a9f4)"; b.style.color = "#fff"; b.style.borderColor = "transparent"; }
      return b;
    };
    const st = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
    const fl = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${d}"/></svg>`;
    const toggle = () => { this._edit = !this._edit; this._tgt = "view"; this._paintEdit(); this._render(); };
    box.append(mk(st('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>'), this._edit ? L.doneTip : L.cfgBtn, toggle, this._edit));
    if (this._edit) {
      box.append(
        mk(diIcon("monitor"), L.tgtView, () => { this._tgt = "view"; this._paintEdit(); this._render(); }, this._tgt === "view"),
        mk(diIcon("printer"), L.tgtPrint, () => { this._tgt = "print"; this._paintEdit(); this._render(); }, this._tgt === "print"),
      );
      const au = mk("", L.autoTip, () => this._autoWidth()); au.textContent = "Auto"; au.style.fontWeight = "600";
      box.append(
        au,
        mk(diIcon("reset"), L.resetTip, () => {
          if (!confirm(`${this._tgt === "print" ? L.tgtPrint : L.tgtView}: ${L.resetAsk}`)) return;
          try { localStorage.removeItem(this._tgt === "print" ? "eiPrint" : "eiView"); } catch (e) { /* ignore */ }
          delete this._lay[this._tgt]; this._render();
        }),
        mk(diIcon("check"), L.doneTip, toggle), // OK / done: leaves the column editor
      );
    }
  }

  _tableData(tgt = "view") {
    const cols = this._cols(tgt).filter((c) => c !== "led" && c !== "icon");
    const strip = (h) => String(h).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    return {
      cols,
      head: cols.map((c) => this._colName(tgt, c)),
      rows: (this._list || []).map((e) => cols.map((c) => c === "changed" ? new Date(e.ts).toLocaleString() : c === "photos" ? (this._meta.photos[e.id] || []).length || "" : c === "docs" ? (this._meta.docs[e.id] || []).map((d) => d.name).join("; ") : c === "note" ? (this._meta.notes[e.id] || {}).t || "" : c === "labels" ? (e.labels || []).map((i) => this._labelName(i)).join(", ") : strip(this._cell(e, c)[0]))),
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

  // the path of the tab symbol (taken from the rendered header icon, so every Material icon works)
  _tabIconPath() {
    const find = (root, depth) => {
      if (!root || depth > 6) return null;
      const own = root.querySelector && root.querySelector("path[d]");
      if (own) return own.getAttribute("d");
      for (const el of root.querySelectorAll ? root.querySelectorAll("*") : []) {
        if (el.shadowRoot) { const r = find(el.shadowRoot, depth + 1); if (r) return r; }
      }
      return null;
    };
    const ic = this._hico;
    return ic ? (ic.shadowRoot ? find(ic.shadowRoot, 0) : find(ic, 0)) : null;
  }

  _print() {
    const L = this._L, { cols, head, rows } = this._tableData("print"), list = this._list || [], pcfg = this._layout("print");
    const wst = (c) => (pcfg.w[c] ? ` style="width:${pcfg.w[c]}mm;max-width:${pcfg.w[c]}mm;word-break:break-word;white-space:normal"` : "");
    const title = this._label(this._active), path = this._tabIconPath();
    const stand = `${L.stand}: ${new Date().toLocaleString(this._hass.language || "en")} | ${rows.length} ${L.entities}`;
    const small = this._ori === "portrait" || cols.length > 11;
    const img = (u) => `<img src="${esc(u.startsWith("http") ? u : location.origin + u)}">`;
    const scr = (t) => String(t).replace(/[^\s]/g, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]);
    const hid = (i, k) => this._blur && (BLURCOLS.includes(cols[k]) || (cols[k] === "name" && list[i] && list[i].user));
    const body = rows.map((r, i) => `<tr>${r.map((c, k) => hid(i, k) ? `<td${wst(cols[k])} class="bl">${esc(scr(c)).replace(/\n/g, "<br>")}</td>` : cols[k] === "photos"
      ? `<td${wst(cols[k])}>${(this._meta.photos[list[i].id] || []).slice(0, 8).map((q) => img(q.url)).join("")}</td>`
      : `<td${wst(cols[k])}${cols[k] === "note" || cols[k] === "docs" ? ' class="wrap"' : ""}>${esc(c).replace(/\n/g, "<br>")}</td>`).join("")}</tr>`).join("");
    // title row inside the table head: it repeats on every page together with the column headings; the page number is at the bottom right
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
      @page{size:A4 ${this._ori};margin:8mm 8mm 12mm;@bottom-right{content:counter(page) "/" counter(pages);font:8pt Arial,sans-serif;color:#444}}
      body{font-family:Arial,sans-serif;font-size:${small ? 7.5 : 9}pt;color:#000;margin:0}
      th.ttl{background:#fff;border:none;border-bottom:.5pt solid #999;padding:0 0 2mm;font-size:13pt}
      th.ttl .ico{display:inline-block;vertical-align:middle;margin-right:2.5mm}th.ttl .ico svg{width:8mm;height:8mm;display:block;fill:#000}
      th.ttl small{font-size:8pt;font-weight:normal;color:#444;margin-left:4mm}
      table{border-collapse:collapse;width:100%}th,td{border:.5pt solid #999;padding:1mm 1.4mm;text-align:left;vertical-align:top;white-space:nowrap}
      td.wrap{white-space:normal;max-width:70mm}td.bl{color:transparent;text-shadow:0 0 5px #000;-webkit-print-color-adjust:exact;print-color-adjust:exact}th{background:#e8e8e8}
      thead{display:table-header-group}tr{page-break-inside:avoid}img{width:${small ? 48 : 64}px;height:${small ? 48 : 64}px;object-fit:cover;margin:1px}</style></head><body>
      <table><thead><tr><th class="ttl" colspan="${cols.length}">${path ? `<span class="ico"><svg viewBox="0 0 24 24"><path d="${esc(path)}"/></svg></span>` : ""}${esc(title)}<small>${esc(stand)}</small></th></tr>
      <tr>${head.map((h, k) => `<th${wst(cols[k])}>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></body></html>`;
    // printed from a hidden frame (no pop-up window); waits until the photos are loaded
    const f = document.createElement("iframe");
    const avail = Math.round(((this._ori === "portrait" ? 210 : 297) - 16) * 96 / 25.4); // printable width in px (A4 minus the 8 mm margins)
    f.style.cssText = `position:fixed;right:0;bottom:0;width:${avail}px;height:0;border:0`;
    document.body.appendChild(f);
    const doc = f.contentDocument; doc.open(); doc.write(html); doc.close();
    let done = false;
    const go = () => { if (done) return; done = true; try { // a table wider than the page is scaled down to fit, so no column is cut off
        const w = doc.documentElement.scrollWidth; if (w > avail + 2) doc.body.style.zoom = String(avail / w);
         f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { alert(`${L.printFail}: ${e}`); } setTimeout(() => f.remove(), 60000); };
    const imgs = [...doc.images]; let left = imgs.length;
    if (!left) { go(); return; }
    imgs.forEach((im) => { const fin = () => { if (--left <= 0) go(); }; if (im.complete) fin(); else im.onload = im.onerror = fin; });
    setTimeout(go, 20000);
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
    GROUPS.forEach(([gk], gi) => {
      const present = this._groupKeys(gi).filter((k) => this._keys && this._keys.includes(k));
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
