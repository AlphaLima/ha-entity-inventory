<p align="center"><img src="docs/icon.png" width="128" alt="Entity Inventory icon"></p>

# Entity Inventory for Home Assistant

One overview of **every entity in your smart home**, sorted by type – with live values, units, read / write access, photos, documents, comments and a printable documentation.
Made for installations with thousands of entities, where nobody remembers any more *which sensor measures what, where it sits and which contract or manual belongs to it*.

Sister project of [Device Inventory](https://github.com/AlphaLima/ha-device-inventory): the same look, the same column editor, the same print layout, the same phone behaviour – Device Inventory lists the **devices**, Entity Inventory lists the **entities**.

## What you get

- **One tab per type, in groups:** *All & light* (all entities, lights, dimmers, brightness) · *Electrical* (power, energy, voltage, current, frequency) · *Climate* (temperature, humidity, thermostats) · *Blinds* (covers, slats) · *Consumption* (gas, water, volume) · *Automation* (automations & scripts, scenes, helpers) · *More* (switches, batteries, media players, persons, user accounts, binary sensors, trackers, labels, other sensors, unavailable). Tabs without entries are not shown, the others carry a red badge for unavailable entities. A dialog switches single tabs on and off (kept in your browser).
- **The right columns per tab:** covers show position and slat angle, lights the brightness, thermostats current / target / mode / action, sensors value and unit in separate columns, …
- **Values lined up properly:** decimal separators sit exactly below each other (or left / right aligned – one button), units form their own column, sorting by value *or* by unit (SI prefixes are understood: mW < W < kW).
- **Click behaviour like Home Assistant:** value → history dialog, symbol → entity settings, device / integration / area → the matching Home Assistant page, label → label dialog, name / entity ID → rename dialog (name and entity ID, with a warning about automations that use the old ID).
- **Photos, documents and comments per entity:** several photos (hover preview, gallery), documents of any file type up to 25 MB (electricity contract, gas contract, manual, picture of the meter …; PDFs and images open in the browser), a comment text that the search also finds. Stored on the server (`.storage/entity_inventory`, `config/entity_inventory/<entity_id>/`): shared by all users and part of your backups. Renaming an entity ID takes everything along.
- **Access column `r/w`:** read-only (`r`), write-only (`w`) or both (`rw`) per entity.
- **Entity symbol** in its own column; a click opens a dialog to change it.
- **Labels and scenes:** a labels column with the coloured Home Assistant labels, a tab with every labelled entity, a selector to show only one label (or *without label*), a tab with scenes and their last activation.
- **User accounts tab:** all Home Assistant accounts with role, last login and linked person (administrators only).
- **Filters:** search over name, ID, area, device, integration, comments and document names; area, integration and label selectors; buttons to hide unavailable / hidden entities and to show only entries that have a comment or a photo.
- **Your own columns:** show / hide, drag and drop to reorder, width (also narrower than the content), own column names – separately for the **screen** and for the **printout**.
- **Print / PDF documentation** of exactly what you see (portrait or landscape, symbol and page number in the heading, photos and comments included) and **CSV export**.
- **Comfort:** copy buttons for name, entity ID and value (appear on hover), the full text as tooltip when a cell is cut off, wider / tighter row spacing, live pause button, fast even with thousands of rows.
- **Phone friendly:** the tab bar slides away while you scroll the list and comes back when you pull down at the top – exactly like Device Inventory.

Everything is computed live in the browser from `hass.states` and the entity / device / area / label registry. The server part only registers the panel and stores comments, photos and documents. Changes (rename, symbol, labels) need an administrator.

> Status: **v0.x – test versions.** In daily use on the author's system (Home Assistant **2026.11**, several thousand entities). It needs Home Assistant 2024.7 or newer but has so far only been tested on 2026.11. Please report problems as an [issue](https://github.com/AlphaLima/ha-entity-inventory/issues) with your Home Assistant version.

**Languages:** English and German (taken from the language of the logged-in user; every other language shows English). Translations for more languages are welcome as pull requests – the texts are in `frontend/entity-inventory-panel.js`, object `L10N`.

## Install

**HACS:** *Custom repositories* → add `AlphaLima/ha-entity-inventory` as type *Integration* → install **Entity Inventory** → restart Home Assistant.
Test versions (`v0.x.yb…`) are *pre-releases*: switch on *Show beta versions* in the HACS entry to get them.
Manual: copy `custom_components/entity_inventory` to your `config/custom_components/`.

Then *Settings → Devices & services → Add integration → Entity Inventory* (one click, nothing to configure). *Entity Inventory* appears in the sidebar. After an update reload the browser page (Ctrl+F5) – the panel JavaScript is loaded automatically. Changes to Python files need a Home Assistant restart.

## Privacy and security

Nothing leaves your Home Assistant: no cloud, no tracking. Comments, photos and documents are stored in your configuration folder, every logged-in Home Assistant user can read them, only administrators can add, change or delete them. Do not store passwords or access data in comments or documents.

## For developers

- `custom_components/entity_inventory/frontend/entity-inventory-panel.js` – the whole panel (one file, no build step).
- `custom_components/entity_inventory/__init__.py` – panel registration, storage, upload / download views, websocket commands.
- `scripts/deploy.ps1` – copies the integration to a Home Assistant config share (`-JsOnly` for the panel only).
- `scripts/release.py beta|patch|minor|major|final` – bumps the version, updates `CHANGELOG.md`, commits and tags; pushing the tag creates the GitHub release.
- `dev/*.html` – the panel with mock data, open in a browser without Home Assistant.

## License

MIT – see [LICENSE](LICENSE).
