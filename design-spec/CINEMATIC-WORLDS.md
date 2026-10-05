# AnUIme cinematic production specification

Status: implementation source for the approved overhaul. This document specifies the target; it does not certify release readiness. Runtime identity lives in `registry/items/lib/anuime-world/anuime-world.ts`. Asset inspection lives in `character-model-audit.json`.

## Shared composition

Keep the task surface in the foreground and the character at its edge, looking toward the working area. Scenery establishes location through depth, a recognizable horizon, and local props. Avoid wallpaper behind every paragraph. Foreground controls use opaque or nearly opaque surfaces; environment lighting never changes their text contrast.

Desktop uses a 12-column content grid with a readable central task area. The environment occupies the whole stage, but only the selected world owns a canvas. Character art appears in a reserved side area and never intersects action targets. On narrow screens, a cropped environment header establishes place above the full-width task surface. Controls remain usable while models load or fail.

The world selector names the character and place. Switching it changes the palette, font, construction, scenery, lighting, and interaction language together. Recipe dimension mixing remains an explicit advanced control separate from world selection.

## Kira: Signal District

A rooftop command station overlooks a city arranged in layered silhouettes. Railings and antenna structures frame the distant skyline. Wet surfaces reflect cyan signal traces and restrained violet light. Day is overcast lavender with warm light near the horizon; night uses deeper violet buildings and isolated cyan windows. No animated flashing lights.

Preserve Kira's asymmetric dark hair, violet technical coat, cyan costume accents, and angular silhouette from the supplied reference sheet and GLB. Keep the longer coat panels readable against the architecture. Character framing should reveal her full silhouette on entry, then settle outside the main task panel.

The interface uses Space Grotesk, clipped or angular accents, compact status instrumentation, and clear cyan focus indicators. Mission Control includes project selection, command search, a deployment queue, and a release confirmation. Deploy changes visible local sample state and adds a timestamped activity entry. Retry appears on a simulated failed release; it is not decorative text.

Props: rooftop rails, antenna modules, control terminal, roof vents, city blocks. Effects: fine rain, a short confirmation trace, distant signal movement. Rain is removed in Still mode.

## Mochi: Dream Atelier

An open studio leads through an arch into a moon garden. Folded fabric, a worktable, shelves, and suspended keepsakes create a lived-in creative space. Day uses ivory, champagne, and soft rose light. Night uses plum shadow, pearl highlights, and moonlit garden silhouettes.

Preserve Mochi's light hair with rounded buns, pink/ivory layered clothing, cape, keepsakes, and open guiding gesture. The thin floating ornament structures in the source GLB need inspection during simplification and rigging; do not erase them merely to meet a polygon target.

Karla carries controls and body copy. Cormorant Garamond is reserved for display titles. Rounded folded panels open from a stable anchor. Creative Sanctuary guides a user through naming a collection, adding an idea, organizing a project, and publishing a local sample collection. Completion changes the collection's state and provides an editable summary.

Props: worktable, fabric panels, shelves, garden arch, moon disc, keepsakes. Effects: sparse drifting particles and pearl progress. Keep motion away from text baselines.

## Atlas: Architect Hangar

An observation deck opens onto modular workshop machinery. Repeated structural bays and drafting displays convey order. Day uses cool paper surfaces and daylight from high windows. Night uses ink navy, cobalt instrumentation, and selective machinery lighting.

Preserve Atlas's blue hair, glasses, long structured coat, utility details, and tablet. The tablet is an independent future prop constraint: rigging must maintain the hand contact and avoid deformation through its flat surface.

Archivo carries the interface. Docked panels use ruled structure, segmented controls, and crisp borders. Operations Deck includes service metrics, a searchable/sortable task queue, task detail, and resolution. Resolving a task updates queue counts, metrics, and the activity record together.

Props: structural bays, catwalk, machinery modules, drafting desk, observation glazing. Effects: slow machinery movement and restrained instrument updates.

## Motion storyboard

| Event        | Kira                            | Mochi                               | Atlas                           | Functional timing                                                                |
| ------------ | ------------------------------- | ----------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| Entry        | Short lateral reveal of rooftop | Gentle reveal through garden arch   | Settle toward observation deck  | HTML is interactive immediately; camera finishes within the world entry duration |
| Greeting     | Brief glance and nod            | Small welcoming gesture             | Look up from tablet             | Once per explicit world entry; never on each rerender                            |
| Attention    | Focus toward terminal           | Indicate the active task            | Inspect the relevant display    | Trigger on meaningful task selection, not every keystroke                        |
| Confirmation | Decisive nod and signal trace   | Pleased expression and soft gesture | Acknowledging nod               | Commit UI state first; animation may follow                                      |
| Recovery     | Concerned glance then neutral   | Reassuring gesture                  | Focused inspection then neutral | Error text and retry action remain visible                                       |

Idle must loop without a visible pose jump. Interrupted reactions blend back to idle. Still and reduced-motion modes use an authored static pose and artwork. Pausing stops ambient movement and camera travel. Hidden documents stop rendering. Sound is muted until explicitly enabled.

## Asset delivery and acceptance

The current GLBs are high-detail, textured, static sources. Keep them unchanged. Produce separate desktop/mobile runtime exports after topology cleanup and texture compression. Initial character targets are approximately 35–60k triangles desktop and 12–25k mobile, subject to silhouette review; the complete world transfer budgets remain 6 MB desktop and 3 MB mobile. These polygon targets are production starting points, not proven performance.

Deliver each character with idle, greeting, attention, confirmation, and recovery clips; neutral, focused, pleased, and concerned expressions; and editable rig/texture sources. Inspect hands, face, coat folds, accessory contacts, and deformation in every clip. Export at consistent world scale and origin with documented forward direction. Preserve material/texture color-space settings.

Each environment needs modular source assets, authored day/night lighting, desktop/mobile variants, and desktop/tablet/mobile poster crops. Current key art is a temporary fallback only; it does not satisfy environment-poster acceptance.

Record source, generation/edit history, licenses, hashes, reviewer, and approval date. A model becomes `approved` in the canonical world contract only after optimization, visual/deformation review, and runtime checks. No source asset is automatically selected as a production runtime variant.

## First visual review matrix

Review all twelve desktop combinations: three worlds on homepage, character page, component detail, and Studio. Also review homepage, component detail, and Studio at 390 px width for each world. Compare light/dark and Still modes. Use the supplied reference sheets beside the rendered character when reviewing likeness.

Approval requires distinct scenery, construction, typography, and motion; readable task content; recognizable characters; working sample interactions; and no blank content during graphics failure. Static screenshots establish composition only. Human animation review and five observed usability sessions remain separate release gates.
