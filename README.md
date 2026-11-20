# Entity Inventory (Spielwiese)

Schwesterprojekt zu `ha-device-inventory`: ein Sidebar-Panel mit **allen Entitäten**, sortiert nach Typ.
Rein lokal, nichts veröffentlicht. Alles wird live im Browser aus `hass` berechnet (States + Entity-/Geräte-/Bereichs-Registry) – der Server tut nichts außer das Panel zu registrieren.

Tabs: Alle · Temperatur · Feuchte · Leistung · Energie · Verbrauch · Spannung/Strom · Batterien | Cover · Lamellen · Lichter · Dimmer · Schalter · Thermostate · Medien | Binärsensoren · Anwesenheit · Automationen/Skripte · Helfer · Sonstige Sensoren · Nicht verfügbar
(Tabs ohne Einträge erscheinen nicht; Ein-/Ausblenden über den Listen-Button, wird im Browser gemerkt.)

Je Tab passende Spalten (z. B. Cover: Position + Lamellenwinkel, Lichter: Helligkeit %, Thermostate: Ist/Soll/Modus/Aktion), Sortierung per Klick auf die Spaltenüberschrift, Suche, Filter Bereich/Integration, CSV, Druck, Live-Pause.
Klick auf den Namen öffnet den More-Info-Dialog, Klick auf die Entity-ID kopiert sie.

## Fotos, Dokumente, Kommentare (seit 0.2.0)
Je Entität drei Spalten am Zeilenende: **Fotos** (mehrere, Hover-Vorschau, Klick = Galerie), **Dokumente** (beliebige Dateien bis 25 MB, z. B. Strom-/Gasvertrag, PDFs und Bilder öffnen im Browser, umbenennen/löschen) und **Kommentar** (Text, Suche findet ihn auch).
Gespeichert wird serverseitig: Kommentare in `.storage/entity_inventory`, Dateien unter `config/entity_inventory/<entity_id>/` – geteilt für alle Benutzer und Teil des Backups. Ändern dürfen nur Administratoren. Wird eine Entity-ID umbenannt, ziehen Kommentare/Fotos/Dokumente mit.
Nach Änderungen an `.py`-Dateien ist ein HA-Neustart nötig.

## Installation (lokal)
`custom_components/entity_inventory` nach `config/custom_components/` kopieren, HA neu starten, dann *Einstellungen → Geräte & Dienste → Integration hinzufügen → Entity Inventory*. Nach Änderungen an der JS-Datei genügt Strg+F5.

## Test ohne HA
`dev/test_inline.html` im Browser öffnen (Mock-Daten; wird mit `python` aus `test.html` + Panel-JS erzeugt).
