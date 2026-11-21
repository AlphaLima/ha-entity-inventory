# Changelog

Versions follow [Semantic Versioning](https://semver.org/). Each version is a git tag `vX.Y.Z` and a GitHub release; HACS shows that number.

## 0.3.2b6 – 2026-11-21
- Multiple selection: hide / show, switch on / off and recorder retention for many entities at once (keyboard: arrows and space bar)
- Tab for hidden / disabled entities (disabled ones read from the entity registry)
- Rename dialog: hide / show and enable / disable an entity
- Recorder: printout includes the recorder columns, column editor fix, long press renames a column

## 0.3.2b5 – 2026-11-21
- Printout includes the recorder columns when they are switched on in the toolbar (like the screen)

## 0.3.2b4 – 2026-11-21
- Long press or right click on a column heading renames the column (display names)
- Column editor: the box with checkbox, arrows and name is no longer clipped by a stored column width
- README: German user manual, recorder columns and retention

## 0.3.2b3 – 2026-11-21
- Recorder retention: default retention for all entities, global purge_keep_days shown, hints for keeping data longer, preview and explaining confirm dialogs, all languages
- Recorder columns (stored for, entries, average interval, last report) with a switch in the toolbar, placed behind the unit
- State class: information dialog with the long-term statistics
- Fix: a click on a cell is no longer lost when the table is redrawn

## 0.3.2b2 – 2026-11-21
- Back button: opening a device, integration, person or label page from the table remembers the panel, so Back returns to it

## 0.3.2b1 – 2026-11-21
- Recorder retention per entity: dialog, Recorder column with the storage time of each entity, nightly purge_entities job (off by default)
- Button to blur sensitive data (user IDs, user names, trackers, persons, comments) on screen and in print
- Same symbols as Device Inventory for the same functions
- Decimals are padded with zeros with the decimal-separator alignment; value cells keep their decimal widths
- Copy symbol moves the text aside without changing the column width
- Helpers tab also lists input_boolean and the helper integrations
- Column editor: # column width, widths below the content width

## 0.3.1 – 2026-11-20
- Manifest: sorted keys and category as required by hassfest and HACS validation
- Norwegian translation file (no.json)

## 0.3.0 – 2026-11-20
- Everything from the 0.3.0 test version
- All 14 languages like Device Inventory (English fallback per text)
- Print: a table wider than the page is scaled down to fit
- Thermostats: temperature unit from the Home Assistant unit system
- Column editor: reorder by drag and drop, hover controls, widths below the content width, # column adjustable
- Button for wider row spacing, copy buttons for name / ID / value, full text as tooltip
- README with description, screenshots and install guide

## 0.3.0b1 – 2026-11-20
- First public test version: inventory of all Home Assistant entities with tabs by type (light, electrical, climate, blinds, consumption, automation, more), photos, documents and comments per entity, labels and scenes, editable and printable column layouts, rename of name and entity ID, copy buttons, phone layout like Device Inventory

