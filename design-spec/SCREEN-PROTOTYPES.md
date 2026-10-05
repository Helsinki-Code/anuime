# Screen-level implementation requirements

These requirements apply to Kira, Mochi, and Atlas together. Every prototype must support pointer, keyboard, narrow layouts, light/dark, and Still mode. The scene enhances semantic HTML; it never owns labels, form state, or navigation.

## Homepage

Reserve the first screen for a world selector, a concise promise, Open Studio/Browse components actions, and a working flagship task framed by the world. A three-world selector changes the active stage without loading all three GLBs. Subsequent sections show real application scenes, source ownership, an executable installation example, and a link to integration docs. Catalog counts come from registry metadata. Do not label a copied command as an installed component.

Mobile: world selector and title, then the task surface, then the character/environment crop. Primary actions remain above the first long content section. No horizontal overflow or scenery covering controls.

## Character world

Start with the character identity and a meaningful task that triggers attention, confirmation, or recovery. Add light/dark comparison and signature component specimens below the stage. Build with this character opens the corresponding complete starter in Studio. List asset maturity honestly. Environment loading is optional to reading and interacting.

## Catalog and component detail

Catalog filters cover task, component type, character, maturity, and interaction. Search and filters compose, preserve state in navigation, and offer an empty state with reset. Cards use inexpensive static/HTML previews.

Detail layout: searchable catalog navigation, title and purpose, large selected preview, state/props controls, then code/accessibility/dependencies. The install action remains available while inspecting. Provide real loading, error, empty, disabled, and success states where the component supports them; omit meaningless states. Compare three characters without creating three active world canvases. Copied examples include imports, theme scope, required props, and callback placeholders.

Mobile: preview first, state controls next, code/install actions within reach. Long code scrolls within its own region. Labels do not truncate without an accessible full value.

## Studio

Desktop: top project/world bar; left Catalog/Outline panel; center responsive scene canvas; right Inspect/World panel; collapsible lower Code/Validation/Export area. Scene structure consists of sections, stacks, grids, and approved slots. No arbitrary absolute positioning.

Every selected node has a visible name, editable supported props, duplicate/remove controls, and move earlier/later actions. Pointer reordering and keyboard reordering produce the same document. Undo/redo handles scene operations but leaves text input undo native. Deletion selects the nearest remaining node. Announce reorder, removal, and validation results through a polite live region.

First run: choose world, choose starter, edit one component, perform its sample interaction, export. Users can skip guidance and return to it. Opened example scenes reproduce the complete composition, not only the first component.

Mobile: full-width preview and Build/Inspect/Export tabs. Selecting a node makes Inspect available without hiding the current selection context. Device inspection supports mobile/tablet/desktop widths; viewport controls never shrink touch targets below usable size.

Local project lifecycle: name, autosave state, rename, duplicate, delete, import, export. IndexedDB failures expose a recovery notice and JSON download; unsaved edits stay in memory. Validate size, version, node IDs, props, layout, references, and nesting before replacing the current document. Functions/executable code are rejected. Failed import leaves the current project intact.

Export: show validation, exact dependency/install instructions, fonts/styles, scene JSON, React/TypeScript, asset manifest, and attribution. Capture image at a deterministic scene frame with current form state and fonts. If graphics capture fails, clearly offer an illustrated export. Never silently produce a blank PNG.

## Examples

Each flagship implements a complete local sample workflow with coherent data. Gallery cards show purpose and world; detail pages explain the workflow and allow full-scene remix. Community publishing remains server-disabled until its storage, authorization, and moderation gates pass.

## Documentation

Readable article column with searchable navigation, breadcrumb, in-page headings, code examples, and integration troubleshooting. Character identity appears in typography, framing, and restrained artwork. Do not run ambient 3D while reading long articles. Preserve registry/item URLs and provide migrations for breaking APIs.

## Verification evidence

For each surface record route, world, theme, viewport, interaction result, keyboard result, screenshot, and outstanding issues. Exercise 200% zoom, long labels, reduced motion, blocked storage, clipboard failure, graphics failure, and slow assets. Visual polish alone does not satisfy task completion.
