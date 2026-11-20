/* Entity Inventory sidebar panel: one tab per entity type (temperature, power, energy, covers, lights …).
   Everything is computed live in the browser from hass.states + the entity / device / area registry. */

const L10N = {
  en: {
    blurTip: "Blur sensitive data (user IDs, user names, trackers, persons, comments) e.g. for screenshots (highlighted = on)",
    title: "Entity Inventory", tabsBtn: "Show or hide tabs", tabsShowAll: "Show all", tabsClose: "Close",
    gLight: "All and light", gElectro: "Electrical", gClimate: "Climate", gCover: "Blinds", gUsage: "Consumption", gAuto: "Automation", gMore: "More",
    search: "Search (name, entity ID, area, device, integration …)", count: "Entities shown / in this tab",
    csv: "Export CSV", print: "Print / PDF", pause: "Pause live update", resume: "Resume live update",
    allAreas: "All areas", allInts: "All integrations", hidden: "Show hidden / disabled entities (highlighted = shown)",
    retSince: "Stored in the recorder since: {t} ({n} days)", retSinceNone: "No history stored in the recorder.", retSinceFail: "Age of the history could not be read.", retSinceBusy: "Reading the age of the history …",
    retShort: "{n} d", retRule: "rule: {n} d", retErr: "The recorder query failed: {e}",
    c_retention: "Stored for (days, recorder)", retTitle: "Recorder – retention", retBtn: "Recorder", retTip: "Recorder retention of this entity: click opens the dialog, Shift+click types the number of days right here",
    retIntro: "History of this entity (the recorder database) older than the chosen number of days is deleted every night. A rule can only shorten the global retention of the recorder (purge_keep_days), it cannot keep data longer.",
    retNone: "No rule (recorder default)", retDays: "{n} days", retCustom: "Other number of days", retJob: "Run the nightly retention job (03:20) for all entities with a rule", retRules: "{n} entities with a rule",
    retRunNow: "Run now", retRunAsk: "Delete the history older than the rules of all entities that have a retention rule? This cannot be undone.", retLast: "Last run: {t}", retDone: "Done: {n} entities processed.", retFail: "The recorder reported an error: {e}", retNoRec: "The recorder is not available.", retAdmin: "Only administrators can change the recorder retention.", retNever: "never",
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
      scene: "Scenes with their last activation", labels: "Every entity that has at least one label", auto: "Automations and scripts", helper: "input_*, counters, timers, schedules", sensor: "Sensors that fit no measurement tab",
      unavailable: "Entities that are unavailable or unknown right now",
    },
  },
  de: {
    blurTip: "Sensible Daten verwischen (Benutzer-IDs, Benutzernamen, Tracker, Personen, Kommentare), z. B. für Screenshots (farbig = aktiv)",
    title: "Entitäten-Inventar", tabsBtn: "Tabs ein- oder ausblenden", tabsShowAll: "Alle anzeigen", tabsClose: "Schließen",
    gLight: "Alle und Licht", gElectro: "Elektro", gClimate: "Klima", gCover: "Rollo", gUsage: "Verbrauch", gAuto: "Automatisierung", gMore: "Weiteres",
    search: "Suche (Name, Entity-ID, Bereich, Gerät, Integration …)", count: "Angezeigte Entitäten / in diesem Tab",
    csv: "CSV exportieren", print: "Drucken / PDF", pause: "Live-Aktualisierung anhalten", resume: "Live-Aktualisierung fortsetzen",
    allAreas: "Alle Bereiche", allInts: "Alle Integrationen", hidden: "Versteckte / deaktivierte Entitäten zeigen (farbig = angezeigt)",
    retSince: "Im Recorder gespeichert seit: {t} ({n} Tage)", retSinceNone: "Im Recorder ist kein Verlauf gespeichert.", retSinceFail: "Das Alter des Verlaufs konnte nicht gelesen werden.", retSinceBusy: "Alter des Verlaufs wird gelesen …",
    retShort: "{n} T", retRule: "Regel: {n} T", retErr: "Recorder-Abfrage fehlgeschlagen: {e}",
    c_retention: "Gespeichert seit (Tage, Recorder)", retTitle: "Recorder – Aufbewahrung", retBtn: "Recorder", retTip: "Recorder-Aufbewahrung dieser Entität: Klick öffnet den Dialog, Umschalt+Klick trägt die Tage direkt hier ein",
    retIntro: "Der Verlauf dieser Entität (Recorder-Datenbank), der älter ist als die gewählte Anzahl Tage, wird jede Nacht gelöscht. Eine Regel kann die globale Aufbewahrung des Recorders (purge_keep_days) nur verkürzen, nicht verlängern.",
    retNone: "Keine Regel (Recorder-Standard)", retDays: "{n} Tage", retCustom: "Andere Anzahl Tage", retJob: "Nächtlichen Aufbewahrungs-Job (03:20) für alle Entitäten mit Regel ausführen", retRules: "{n} Entitäten mit Regel",
    retRunNow: "Jetzt ausführen", retRunAsk: "Den Verlauf, der älter ist als die Regeln, für alle Entitäten mit Aufbewahrungsregel jetzt löschen? Das lässt sich nicht rückgängig machen.", retLast: "Letzter Lauf: {t}", retDone: "Fertig: {n} Entitäten bearbeitet.", retFail: "Der Recorder meldet einen Fehler: {e}", retNoRec: "Der Recorder ist nicht verfügbar.", retAdmin: "Nur Administratoren können die Recorder-Aufbewahrung ändern.", retNever: "nie",
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
      scene: "Szenen mit ihrer letzten Aktivierung", labels: "Jede Entität, die mindestens ein Label hat", auto: "Automationen und Skripte", helper: "input_*, Zähler, Timer, Zeitpläne", sensor: "Sensoren, die in keinen Mess-Tab passen",
      unavailable: "Entitäten, die gerade nicht verfügbar oder unbekannt sind",
    },
  },
  fr: {
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
const diIcon = (n, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle">${DI_ICONS[n]}</svg>`;
const svgIcon = (k, size = 18) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" style="vertical-align:middle"><path d="${ICON[k]}"/></svg>`;
// every column key in its default order; the layout (order, visibility, width, name) is kept separately for the display and for the printer
const ALLCOLS = ["led", "icon", "name", "id", "access", "value", "unit", "state", "pos", "tilt", "bright", "mode", "cur", "target", "action", "trackers", "source", "username", "person", "role", "provider", "local", "system", "userid", "class", "sc", "area", "device", "platform", "labels", "changed", "retention", "photos", "docs", "note"];
// columns blurred by the "blur sensitive data" button (and the names of user accounts)
const BLURCOLS = ["userid", "username", "trackers", "person", "note"];
const DEFAULT_OFF = { view: ["retention"], print: ["led", "icon", "retention"] }; // the recorder column is off until you want it (the dialog is also reachable from the rename dialog)
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

  // how far back the recorder holds each entity (one query for all entities, cached on the server for five minutes)
  async _loadRecAge(force) {
    if (this._recBusy || (!force && this._recAge && Date.now() - this._recAge.t < 300000)) return;
    this._recBusy = true;
    try {
      const r = await this._hass.callWS({ type: "entity_inventory/recorder_age" });
      this._recAge = { t: Date.now(), now: r.now, oldest: r.oldest || {} };
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
    const go = (path) => { close(); history.pushState(null, "", path); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); };
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
    else if (/^(input_|counter$|timer$|schedule$)/.test(d)) t.push("helper");
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
    if (col === "changed" || col === "photos" || col === "docs" || col === "note" || col === "labels" || col === "retention") return this._cell0(e, col); // the relative time changes, everything else only with the state
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
      case "sc": return [esc(e.sc), e.sc];
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
      td[data-col=id]{cursor:pointer;opacity:.8}td[data-col=id],td[data-col=name]{position:relative;overflow:visible}td[data-col=access],th[data-col=access]{width:1%;padding-left:2px;padding-right:2px;text-align:center}.idt{display:block;overflow:hidden;text-overflow:ellipsis}tr:hover .idt{padding-left:19px}@media (hover:none){.idt{padding-left:19px}}td[data-col=id]:hover{color:var(--primary-color)}
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
    try { this._showHidden = localStorage.getItem("ei__showHidden") === "1"; this._hideOff = localStorage.getItem("ei__hideOff") === "1"; this._onlyNotes = localStorage.getItem("ei__onlyNotes") === "1"; this._wide = localStorage.getItem("ei__wide") === "1"; this._blur = localStorage.getItem("ei__blur") === "1"; } catch (e) { /* ignore */ }
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
    bar.append(grp, cb, this._pauseB, this._cnt, qi, this._selArea, this._selInt, this._selLab, hb, alB, wb, ub, fb, bb, this._editBox);
    this._paintEdit();
    this._wrap = document.createElement("div"); this._wrap.className = "wrap al-" + this._align;
    alB.title = { dec: L.alignDec, left: L.alignLeft, right: L.alignRight }[this._align];
    this._wrap.onclick = (ev) => this._click(ev);
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
    return (this._lay[tgt] = { order, off: new Set(c.off || DEFAULT_OFF[tgt]), w: c.w || {}, n: c.n || {} });
  }

  _saveLayout(tgt) {
    const c = this._layout(tgt);
    try { localStorage.setItem(tgt === "print" ? "eiPrint" : "eiView", JSON.stringify({ order: c.order, off: [...c.off], w: c.w, n: c.n })); } catch (e) { /* ignore */ }
  }

  // columns of the active tab in the order of the layout; all = also the hidden ones (column editor)
  _cols(tgt = "view", all = false) {
    const base = TABCOLS[this._active] || BASE, cfg = this._layout(tgt);
    const cols = cfg.order.filter((c) => base.includes(c));
    return all ? cols : cols.filter((c) => !cfg.off.has(c));
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
        return `<th data-col="${c}" draggable="true" style="position:relative;cursor:default${cfg.off.has(c) ? ";opacity:.45" : ""}"><span class="cfgl">${c === "led" && !cfg.n[c] ? "●" : c === "icon" && !cfg.n[c] ? svgIcon("shape", 16) : c === "retention" && !cfg.n[c] ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle">${RET_SYMBOL}</svg>` : esc(nm)}</span><div class="cfgbox"><div class="cfgc"><input type="checkbox" data-cfg="vis"${cfg.off.has(c) ? "" : " checked"}><button data-cfg="mv" data-d="-1">◀</button><button data-cfg="mv" data-d="1">▶</button></div><input type="text" data-cfg="name" value="${esc(cfg.n[c] || "")}" placeholder="${esc(L["c_" + c] || c)}" title="${esc(L.renameTip)}"></div><span class="grip" data-cfg="grip" title="↔"></span></th>`;
      }
      return `<th data-col="${c}" title="${esc(nm)}">${c === "led" && !cfg.n[c] ? "●" : c === "icon" && !cfg.n[c] ? svgIcon("shape", 16) : c === "retention" && !cfg.n[c] ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle">${RET_SYMBOL}</svg>` : esc(nm)}${c === sc ? (sd > 0 ? " ▲" : " ▼") : ""}</th>`;
    }).join("");
    const wcss = ["#", ...cols].filter((c) => cfg.w[c]).map((c) => { const w = Math.round(tgt === "print" ? cfg.w[c] * MM : cfg.w[c]); return `td[data-col="${c}"],th[data-col="${c}"]{width:${w}px;max-width:${w}px;min-width:${w}px;overflow:hidden;text-overflow:${c === "#" || NOCLIP.includes(c) ? "clip" : "ellipsis"}}`; }).join("");
    // long lists are drawn in blocks (the DOM is the slow part); the rest follows while scrolling. Sorting, search, CSV and print use the whole list.
    ["value", "cur", "target"].forEach((c) => { // widths of the decimals and of the unit = longest in the column, so separators and units line up
      this._wrap.style.removeProperty("--wf-" + c); this._wrap.style.removeProperty("--wu-" + c);
      if (cols.includes(c)) {
        let f = 0, u = 0;
        for (const e of list) { const x = this._cell(e, c); if (x[2] > f) f = x[2]; if (x[3] > u) u = x[3]; }
        this._wrap.style.setProperty("--wf-" + c, f + "ch"); this._wrap.style.setProperty("--wu-" + c, u + "ch");
      }
    });
    this._cols_ = cols; this._shown = Math.min(list.length, CHUNK);
    if (cols.includes("retention") && this._admin) this._loadRecAge();
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

  // recorder retention of one entity: how many days of history to keep (a nightly job calls recorder.purge_entities)
  _retentionDialog(e) {
    const L = this._L, admin = this._admin, m = this._meta, { body, close } = this._modal(`${L.retTitle} – ${e.name}`, e.id);
    const info = m.retention_info || {}, cur = (m.retention || {})[e.id] || 0;
    const note = (txt, css) => { const d = document.createElement("div"); d.style.cssText = css || "font-size:12px;opacity:.7;margin:6px 0"; d.textContent = txt; body.appendChild(d); return d; };
    note(L.retIntro);
    // how far back the history of this entity reaches: the oldest state the recorder still has
    const since = note(L.retSinceBusy, "font-size:13px;font-weight:600;margin:8px 0");
    (async () => {
      await this._loadRecAge();
      const ra = this._recAge;
      if (!ra || ra.err) { since.textContent = L.retSinceFail; return; }
      const ts = ra.oldest[e.id];
      since.textContent = ts ? L.retSince.replace("{t}", new Date(ts * 1000).toLocaleString()).replace("{n}", Math.max(0, Math.floor((ra.now - ts) / 86400))) : L.retSinceNone;
    })();
    let sel = cur;
    const PRESETS = [0, 1, 3, 7, 14, 30, 90, 180, 365];
    const box = document.createElement("div"); box.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:8px 0";
    const custom = Object.assign(document.createElement("input"), { type: "number", min: 1, max: 3650, value: cur && !PRESETS.includes(cur) ? cur : "", placeholder: L.retCustom, disabled: !admin });
    custom.style.cssText = "width:150px;padding:6px;border-radius:8px;border:1px solid var(--divider-color,#888);background:transparent;color:var(--primary-text-color);font:inherit";
    custom.onkeydown = (ev) => ev.stopPropagation();
    const paint = () => box.querySelectorAll("button").forEach((b) => { const on = +b.dataset.d === sel; b.style.background = on ? "var(--primary-color,#03a9f4)" : ""; b.style.color = on ? "#fff" : ""; b.style.borderColor = on ? "transparent" : ""; });
    PRESETS.forEach((d) => { const b = this._btn(d ? L.retDays.replace("{n}", d) : L.retNone, false, () => { sel = d; custom.value = ""; paint(); }); b.dataset.d = d; b.disabled = !admin; box.appendChild(b); });
    custom.oninput = () => { const v = parseInt(custom.value, 10); sel = v >= 1 ? Math.min(v, 3650) : 0; paint(); };
    box.appendChild(custom); body.appendChild(box); paint();
    // the nightly job: one switch for all entities that have a rule
    const rules = Object.keys(m.retention || {}).length;
    const jobRow = document.createElement("label"); jobRow.style.cssText = "display:flex;gap:8px;align-items:center;margin-top:14px;font-size:13px";
    const jobCb = Object.assign(document.createElement("input"), { type: "checkbox", checked: !!info.enabled, disabled: !admin });
    jobCb.onchange = async () => { try { await this._call({ type: "entity_inventory/retention_enabled", enabled: jobCb.checked }); } catch (x) { alert(`${x && x.message || x}`); jobCb.checked = !jobCb.checked; } };
    jobRow.append(jobCb, document.createTextNode(L.retJob)); body.appendChild(jobRow);
    note(`${L.retRules.replace("{n}", rules)} · ${L.retLast.replace("{t}", info.last_run ? new Date(info.last_run).toLocaleString() : L.retNever)}`);
    const status = note("");
    const run = this._btn(L.retRunNow, false, async () => {
      if (!confirm(L.retRunAsk)) return;
      run.disabled = true; status.textContent = "…";
      try {
        await this._call({ type: "entity_inventory/run_retention" });
        const res = (this._meta.retention_info || {}).last_result || {};
        status.textContent = res.error === "recorder_not_available" ? L.retNoRec : res.error ? L.retFail.replace("{e}", res.error) : L.retDone.replace("{n}", res.entities || 0);
      } catch (x) { status.textContent = L.retFail.replace("{e}", (x && x.message) || x); }
      run.disabled = false;
    });
    run.disabled = !admin || !rules;
    if (!admin) note(L.retAdmin);
    const save = this._btn(L.save, true, async () => {
      save.textContent = "…";
      try { await this._call({ type: "entity_inventory/set_retention", entity_id: e.id, days: sel || null }); close(); }
      catch (x) { alert(`${(x && x.message) || x}`); save.textContent = L.save; }
    });
    body.appendChild(this._footer(run, this._btn(admin ? L.cancel : L.tabsClose, !admin, close), ...(admin ? [save] : [])));
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

  _rowsHtml(from, to) {
    const cols = this._cols_, out = [];
    for (let i = from; i < to; i++) {
      const e = this._list[i];
      out.push(`<tr data-id="${esc(e.id)}"><td class="dim" data-col="#">${i + 1}</td>${cols.map((c) => `<td data-col="${c}"${this._offSet && this._offSet.has(c) ? " data-off=1" : ""}>${this._cell(e, c)[0]}</td>`).join("")}</tr>`);
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

  _click(ev) {
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
    if (id.startsWith("user:")) { if (td.dataset.col === "name" || td.dataset.col === "person") { history.pushState(null, "", "/config/person"); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); } return; }
    if (td.dataset.col === "id") {
      const e = (this._rows || []).find((r) => r.id === id);
      if (e) this._nameDialog(e, "id");
    } else if (["device", "platform", "area"].includes(td.dataset.col)) { // device page / integration page / area page of HA
      const e = (this._rows || []).find((r) => r.id === id), c = td.dataset.col;
      const path = !e ? "" : c === "device" ? (e.deviceId && `/config/devices/device/${e.deviceId}`) : c === "platform" ? (e.platform && e.platform !== "core" && `/config/integrations/integration/${e.platform}`) : (e.areaId && `/config/areas/area/${e.areaId}`);
      if (path) {
        history.pushState(null, "", path);
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
    tb.querySelectorAll("thead th[data-col]").forEach((th) => { const c = th.dataset.col; probe.textContent = c === "#" ? "#" : c === "led" ? "●" : c === "icon" && !this._layout(tgt).n.icon ? "mm" : c === "retention" && !this._layout(tgt).n.retention ? "mmmmm" : this._colName(tgt, c); w[c] = Math.max(Math.ceil(probe.getBoundingClientRect().width) + 14, w[c] || 0); });
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
