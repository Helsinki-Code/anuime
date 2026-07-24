# AnUIme v2 — Phase 0 extraction

Status: **approved on 2026-07-25**. Phase 1 is authorized through the first-three-component
checkpoint only.

The six HTML boards in `Character Design Systems 3/` are the only source of design truth. Their exact hashes are recorded in `manifest.json`. The extraction is split so future code and lint tools can consume it without parsing prose:

- `themes.json` — typography, declared token ladders, supporting source colors, geometry ladders, and light/dark behavior.
- `laws.json` — global and per-character machine constraints, all board captions that carry construction laws, and the seven artifact → geometry → component mappings.
- `components.json` — component-level anatomy, dimensions, motifs, state behavior, theme behavior, and source references.
- `motion.json` — every board `@keyframes` rule verbatim, every animation declaration used by Expressive Moments, timings, and static reduced-motion outcomes.
- `derived-not-specified.json` — every current registry component not explicitly constructed on a board, with the motif basis proposed for later derivation.

## Diff-able extraction summary

| System | Declared palette | Workhorse geometry | Signature focus | Expressive power |
| --- | --- | --- | --- | --- |
| Kira | Violet paper/mass, cyan edge/state, red destructive | 5–8px hard-soft rectangles; no elongated pills; chevrons, kites, circuit nodes, strap buckles, collar rings, 114° fringe lines, shards | 240ms perimeter trace settling into collar ring + stem | Blade slash, circuit ignition, chevron crystallize, smoke + shard |
| Mochi | Ivory/plum, rose state, champagne/candlelit gold | 8–14px soft rectangles plus intentional pearl/badge circles; clasps, pearls, crescents, stars, ribbon rules, drape curves, veil washes | Rose veil bloom rising from the interaction point and settling | Pearl orbit, word bloom, star blossom, waning crescent |
| Atlas | Cool paper/ink navy, cobalt line/emission, red destructive | 4–9px structural rectangles; buckles, segmented straps, panel brackets, survey diamonds, lens bezels, 76° beams, core rings | 180ms four-corner dock around the control | HUD assembly, blueprint plot-in, dock-lock, dormant grid |

## Global laws

1. Workhorse components stay abstract and restrained. Character power is allowed only in waiting and transition states.
2. Each character has exactly seven workhorse motifs. The board's eighth `POWER` tile is an expressive-only assembly of those motifs, not an eighth workhorse motif.
3. Light and dark use identical geometry. Light draws the system; dark emits it.
4. Artifact → geometry → component carrier mappings are binding. Components absent from the boards must be derived from these mappings and remain reviewable as derivations.
5. Reduced motion disables all motion in an Expressive Moments container. Static geometry must remain recognizable and usable.
6. Token values are never silently adjusted for contrast. Any WCAG failure must be reported with a minimal proposed adjustment.

## Approved source interpretations

- Kira says “114° … the only angle in the system,” while the same source explicitly uses 45° kite rotation, −18° shard skew, and −24° blade skew. The machine rule scopes 114° to **directional system axes** (sweeps, fringe/light direction) and allows the three authored construction transforms only for their named motifs.
- Kira says “no pill geometry anywhere in the set,” while the source uses true circles for nodes/status marks. The machine rule forbids elongated capsule geometry (`width != height` with maximal radius) but retains authored circles as circuit nodes.
- The boards name seven motifs but render eight legend tiles. The eighth tile is consistently named `POWER` and only maps to expressive states, so it is modeled separately from the seven workhorse laws.

## Catalog coverage

The current registry contains 51 component items. Sixteen have explicit workhorse constructions on all three boards. The remaining 35 are listed for review in `derived-not-specified.json`; several have close source anatomy (for example `table`, `field`, `empty-state`, and `spinner`) but no explicit standalone board construction, so they remain flagged rather than being treated as specified.

The three interpretations above are approved. `themes.json` also contains the required computed
contrast audit. Its Mochi Light and Atlas Light muted-foreground corrections remain proposals and
have not changed any declared token.
