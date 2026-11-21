<p align="center"><img src="docs/icon.png" width="128" alt="Entity Inventory icon"></p>

# Entity Inventory for Home Assistant

One overview of **every entity in your smart home**, sorted by type – with live values, units, read / write access, photos, documents, comments and a printable documentation.
Made for installations with thousands of entities, where nobody remembers any more *which sensor measures what, where it sits and which contract or manual belongs to it*.

Sister project of [Device Inventory](https://github.com/AlphaLima/ha-device-inventory): the same look, the same column editor, the same print layout, the same phone behaviour – Device Inventory lists the **devices**, Entity Inventory lists the **entities**.

## Screenshot

The *Dimmer* tab: tabs in groups on top (light, electrical, climate, blinds, consumption, automation, more), toolbar with search, area / integration / label selectors and the buttons for hidden entities, alignment, row spacing, unavailable entities, comment / photo filter and the column editor. Status LED, entity symbol, name, entity ID, read / write access (`r/w`), state, brightness, area, device, integration, coloured labels, last change and the photo / document / comment columns.

<p align="center"><img src="docs/screenshot-dimmer.png" width="900" alt="Dimmer tab of the Entity Inventory panel"></p>

The *Temperature* tab with 171 sensors, sorted by value: the value (decimal separators lined up), the unit in its own column, area, device, integration and the time of the last change. Cells that are cut off show their full text as a tooltip.

<p align="center"><img src="docs/screenshot-temperature.png" width="900" alt="Temperature tab of the Entity Inventory panel"></p>

## What you get

- **One tab per type, in groups:** *All & light* (all entities, lights, dimmers, brightness) · *Electrical* (power, energy, voltage, current, frequency) · *Climate* (temperature, humidity, thermostats) · *Blinds* (covers, slats) · *Consumption* (gas, water, volume) · *Automation* (automations & scripts, scenes, helpers: `input_*`, counters, timers, schedules and the helper integrations such as group, threshold, utility meter, statistics) · *More* (switches, batteries, media players, persons, user accounts, binary sensors, trackers, labels, other sensors, unavailable). Tabs without entries are not shown, the others carry a red badge for unavailable entities. A dialog switches single tabs on and off (kept in your browser).
- **The right columns per tab:** covers show position and slat angle, lights the brightness, thermostats current / target / mode / action, sensors value and unit in separate columns, …
- **Values lined up properly:** decimal separators sit exactly below each other (or left / right aligned – one button; with the decimal alignment missing zeros are added on the right, so `236,0` and `1,20` become `236,00` and `1,20`), units form their own column, sorting by value *or* by unit (SI prefixes are understood: mW < W < kW).
- **Click behaviour like Home Assistant:** value → history dialog, symbol → entity settings, device / integration / area → the matching Home Assistant page, label → label dialog, name / entity ID → rename dialog (name and entity ID, with a warning about automations that use the old ID).
- **Photos, documents and comments per entity:** several photos (hover preview, gallery), documents of any file type up to 25 MB (electricity contract, gas contract, manual, picture of the meter …; PDFs and images open in the browser), a comment text that the search also finds. Stored on the server (`.storage/entity_inventory`, `config/entity_inventory/<entity_id>/`): shared by all users and part of your backups. Renaming an entity ID takes everything along.
- **State class dialog:** a click on the state class explains it (`measurement`, `total`, `total_increasing`), shows whether Home Assistant keeps long-term statistics for the entity (hourly values for the Energy dashboard) and links to *Developer tools → Statistics*. The state class itself is set by the integration and cannot be changed here.
- **Access column `r/w`:** read-only (`r`), write-only (`w`) or both (`rw`) per entity.
- **Entity symbol** in its own column; a click opens a dialog to change it.
- **Labels and scenes:** a labels column with the coloured Home Assistant labels, a tab with every labelled entity, a selector to show only one label (or *without label*), a tab with scenes and their last activation.
- **User accounts tab:** all Home Assistant accounts with user name, role, login provider and linked person (administrators only).
- **Filters:** search over name, ID, area, device, integration, comments and document names; area, integration and label selectors; buttons to hide unavailable / hidden entities and to show only entries that have a comment or a photo.
- **Your own columns:** show / hide, drag and drop to reorder, width (also narrower than the content), own column names – separately for the **screen** and for the **printout**.
- **Print / PDF documentation** of exactly what you see (portrait or landscape, symbol and page number in the heading, photos and comments included) and **CSV export**.
- **Recorder columns (switch in the toolbar):** how long each entity is really stored in the recorder database (*stored for*), the number of entries, the average interval between two entries and the time of the last report (`last_updated`). They are read with one aggregate query and cached for five minutes; the columns sit behind the unit and help to get a feeling for which entities create the most data.
- **Recorder retention per entity and for all:** a dialog (from the *Recorder* column or the rename dialog) shows the global `purge_keep_days` of the recorder, how long the entity is stored and how many entries it has, lets you set a retention per entity and a default for all entities without a rule, and explains what to change in `configuration.yaml` to keep data longer (Home Assistant has no per-entity retention or sampling rate; a rule can only shorten the global retention). A nightly job (03:20, **off by default**) deletes older history with `recorder.purge_entities`; a preview shows entities and rows before anything is deleted, every step that switches the job on or deletes data asks for confirmation and explains what happens. Long-term statistics are never touched.
- **Blur sensitive data:** one button blurs user IDs, user names, trackers, persons and comments on screen and scrambles them in the printout – for screenshots and for publishing.
- **Comfort:** copy buttons for name, entity ID and value (appear on hover), the full text as tooltip when a cell is cut off, wider / tighter row spacing, live pause button, fast even with thousands of rows.
- **Back button:** opening a device, integration, person or label page from the table remembers the panel, so *Back* returns to it.
- **Phone friendly:** the tab bar slides away while you scroll the list and comes back when you pull down at the top – exactly like Device Inventory.

Everything is computed live in the browser from `hass.states` and the entity / device / area / label registry. The server part registers the panel, stores comments, photos and documents, and – for the recorder features – reads the recorder database (read-only aggregate queries) and calls `recorder.purge_entities` for the retention job. Changes (rename, symbol, labels, retention) need an administrator.

> Status: **v0.x – test versions.** The recorder retention is new and the most delicate part (it deletes data, but only when you switch the nightly job on or press *Run now*): try the preview first. In daily use on the author's system (Home Assistant **2026.11**, several thousand entities). It needs Home Assistant 2024.7 or newer but has so far only been tested on 2026.11. Please report problems as an [issue](https://github.com/AlphaLima/ha-entity-inventory/issues) with your Home Assistant version.

**Languages:** English, German, French, Spanish, Dutch, Italian, Polish, Portuguese, Czech, Russian, Swedish, Norwegian, Danish and Afrikaans (taken from the language of the logged-in user; every other language shows English). All languages except English and German are machine translations – corrections as pull requests are welcome (the texts are in `frontend/entity-inventory-panel.js`, object `L10N`).

## Install

**HACS:** *Custom repositories* → add `AlphaLima/ha-entity-inventory` as type *Integration* → install **Entity Inventory** → restart Home Assistant.
Test versions (`v0.x.yb…`) are *pre-releases*: switch on *Show beta versions* in the HACS entry to get them.
Manual: copy `custom_components/entity_inventory` to your `config/custom_components/`.

Then *Settings → Devices & services → Add integration → Entity Inventory* (one click, nothing to configure). *Entity Inventory* appears in the sidebar. After an update reload the browser page (Ctrl+F5) – the panel JavaScript is loaded automatically. Changes to Python files need a Home Assistant restart.

## Privacy and security

Nothing leaves your Home Assistant: no cloud, no tracking. The recorder retention deletes history from your own database only when you switch it on; deleted history can only be restored from a backup. Comments, photos and documents are stored in your configuration folder, every logged-in Home Assistant user can read them, only administrators can add, change or delete them. Do not store passwords or access data in comments or documents.

## For developers

- `custom_components/entity_inventory/frontend/entity-inventory-panel.js` – the whole panel (one file, no build step).
- `custom_components/entity_inventory/__init__.py` – panel registration, storage, upload / download views, websocket commands.
- `scripts/deploy.ps1` – copies the integration to a Home Assistant config share (`-JsOnly` for the panel only).
- `scripts/release.py beta|patch|minor|major|final` – bumps the version, updates `CHANGELOG.md`, commits and tags; pushing the tag creates the GitHub release.
- `dev/*.html` – the panel with mock data, open in a browser without Home Assistant.

## License

MIT – see [LICENSE](LICENSE).
