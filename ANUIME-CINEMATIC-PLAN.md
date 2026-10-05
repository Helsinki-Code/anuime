PLEASE IMPLEMENT THIS PLAN:

# AnUIme: cinematic anime design-system overhaul

## 1. Product direction and release scope

Rebuild AnUIme as a modern React component system where users enter a character’s world, experience its personality through real interactions, compose an interface, and install the same result in their own application.

The first redesigned release will cover the entire public product: homepage, character worlds, component catalog, documentation, examples, Studio, local projects, exports, registry, and MCP.

The agreed direction is:

- Cinematic presentation throughout the product.
- Evolved Kira, Mochi, and Atlas identities.
- Real-time 3D environments and animated characters.
- AI-assisted asset production followed by cleanup and human art review.
- A structured, responsive scene builder.
- Cloud accounts, AI access, community publishing, subscriptions, and teams delivered through subsequent gates.

All 70 findings in the [enhancement review](/Users/vikky/Desktop/anuime/anuime/ANUIME-ENHANCEMENT-REVIEW.md) remain in the roadmap. This plan adds the missing creative direction, 3D production, and complete UI/UX design.

Keep React, TypeScript, TanStack Start, Tailwind, and shadcn-compatible source distribution. The overhaul should extend the existing foundation.

## 2. Visual identity, worlds, and user experience

### Three complete anime worlds

| World                       | Environment and character presence                                                                            | Interface language                                                                                | Flagship application                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Kira: Signal District**   | Stylized rooftop command station, layered city skyline, rain-lit architecture, animated Kira beside the scene | Violet surfaces, cyan signal edges, angular framing, circuit focus, decisive light-trace feedback | Mission Control: projects, command search, deployment activity, release confirmation |
| **Mochi: Dream Atelier**    | Magical studio opening into a moon garden, fabric, floating keepsakes, animated Mochi guiding creative tasks  | Ivory/plum surfaces, rose feedback, champagne structure, pearl progress, soft unfolding panels    | Creative Sanctuary: onboarding, collections, project planning, publishing            |
| **Atlas: Architect Hangar** | Mecha workshop and observation deck, modular machinery, drafting displays, animated Atlas inspecting systems  | Cool paper/ink-navy surfaces, cobalt instrumentation, docked panels, segmented controls           | Operations Deck: metrics, data tables, service status, task queues                   |

Preserve recognizable character silhouettes and motifs. Expand the old design rules to permit cinematic environments, character animation, and ambient world behavior. Everyday controls retain clear labels, predictable interaction, and readable content.

Light and dark receive separately authored lighting and environment treatments while keeping component geometry consistent.

### Asset production

Produce the following for each character:

- One cleaned, rigged, textured character model with desktop and mobile detail levels.
- Five animation clips: idle, greeting, attention, confirmation, and recovery.
- Facial expressions for neutral, focused, pleased, and concerned states.
- One modular 3D environment with day/night lighting.
- A matching illustrated fallback and responsive poster crops.
- A small set of reusable environmental props and interaction effects.

Use existing character references for every generation. Preserve editable source files, exported GLB assets, texture sources, provenance, and distribution terms.

AI output is a draft asset. Cleanup must address anatomy, costume consistency, topology, deformation, materials, and performance before an asset becomes release-ready. Generic substitute characters do not satisfy the visual acceptance criteria.

Retain the existing character typefaces: Space Grotesk for Kira, Karla with Cormorant display accents for Mochi, Archivo for Atlas, and JetBrains Mono for technical labels. Package fonts consistently with exported themes.

### Cinematic interaction rules

- World entry uses one short establishing transition; content becomes interactive immediately.
- Character changes update environment, lighting, typography, tokens, and motion together.
- Character reactions follow meaningful events such as finishing onboarding or completing an export.
- Buttons, fields, tabs, and menus respond immediately; decorative sequences never delay actions.
- Background motion pauses when hidden and has a persistent user pause control.
- Reduced motion removes camera travel and decorative movement while preserving the world’s artwork and geometry.
- Provide Cinematic, Balanced, and Still experience settings. Cinematic is the intended default when supported; device performance can reduce rendering quality.
- No sound autoplay. An optional interface-sound pack starts muted; voice acting is outside the first release.

### Redesign every main screen

| Surface               | Planned experience                                                                                                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Homepage**          | A live three-world showcase with a working interface embedded in the environment. Primary actions: “Open Studio” and “Browse components.” Follow with actual scene examples and a visible installation demonstration. |
| **Character pages**   | Interactive character/world presentation, meaningful controls to demonstrate signature behavior, light/dark comparison, component specimens, and a direct “Build with this character” action.                         |
| **Component catalog** | Search and filters for task, component type, character, maturity, and interaction. Lightweight previews on cards; cinematic presentation on the selected item.                                                        |
| **Component details** | Live state controls, character comparison, editable props, accessibility notes, complete code examples, dependencies, and a persistent install action.                                                                |
| **Examples gallery**  | Complete applications with functioning sample workflows. Each example can open as the same full composition in Studio.                                                                                                |
| **Studio**            | A scene editor with catalog/outline on the left, responsive preview in the center, and properties/world controls on the right. Code, validation, and export live in a collapsible lower panel.                        |
| **Documentation**     | Strong character identity around readable content, searchable navigation, practical integration examples, and restrained rendering while reading.                                                                     |
| **Mobile**            | Full-width preview with tabbed Build, Inspect, and Export panels. Touch controls replace hover dependencies; scenery frames content without covering controls.                                                        |

The first-run Studio flow is: choose a world → choose a starter scene → edit one component → preview an interaction → export working source.

## 3. Implementation architecture and enhancements

### A. Shared design and 3D runtime

Create a canonical world specification covering tokens, typography, geometry, lighting, environment assets, character animations, and interaction cues. Generate shared outputs for the website, registry, Studio, and agent tools.

Introduce an optional world renderer using Three.js and React Three Fiber. Use GLB models and named animation clips. Keep essential UI as semantic HTML layered with the scene, allowing the application to function independently of graphics loading.

Use one active world canvas per workspace, lazy-loaded models, shared materials, detail levels, and on-demand rendering when animation settles. Provide illustrated fallbacks for loading, errors, unsupported graphics, and context loss. These mechanisms are supported by the [React Three Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [Canvas fallback API](https://r3f.docs.pmnd.rs/api/canvas), and [Three.js GLTF loader](https://threejs.org/docs/pages/GLTFLoader.html).

Export ordinary components without a mandatory 3D dependency. World scenes install the additional runtime and assets explicitly.

### B. Public interfaces and compatibility

Add these shared contracts:

| Interface               | Responsibility                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `WorldDefinition`       | Character identity, approved environments, theme variants, asset versions, animation clips, and supported cues  |
| `ExperiencePreferences` | Cinematic/Balanced/Still setting, character visibility, graphics quality, and sound preference                  |
| `SceneDocumentV1`       | World selection, recipe, ordered sections, component nodes, validated props, responsive layout, and attribution |
| `ComponentDefinition`   | Registry identity, editable props, supported states, slots, dependencies, examples, and maturity                |
| `SceneValidationResult` | Actionable errors/warnings for incompatible recipes, invalid composition, missing assets, and unsupported props |

Keep existing recipe-v2 URLs working. Convert existing single-component Studio links into a one-node scene internally without changing their meaning.

Separate world presentation from component recipes so introducing 3D does not break existing component consumers. Existing shared recipes continue to use categorical character ownership per dimension. Weighted structural mixing is excluded; future color blending requires its own validated version.

### C. Registry and component quality

Address **E09–E18, E26–E38, E52–E57**.

- Generate catalog counts, Studio availability, dependency metadata, and documentation status from one source.
- Audit every existing item; classify it as stable, beta, or experimental.
- Preserve existing item URLs and provide migrations for breaking APIs.
- Standardize labels, refs, HTML props, controlled state, disabled/loading behavior, and class overrides.
- Fix dialog naming, tooltip relationships, date labels, duplicated IDs, tabs, keyboard behavior, and repeated-instance failures.
- Make recipe color, shape, density, mode, and motion settings produce documented effects.
- Add real compatibility rules rather than accepting every syntactically valid recipe.
- Make theme scope survive portals and allow multiple character systems on one page.
- Replace incomplete copy snippets with compilable examples including required props and theme setup.
- Add sorting/filtering/pagination capabilities to the advanced table; retain a lightweight basic table.
- Add a notification provider and queue while retaining the simple toast primitive.
- Document native date/select/combobox scope and offer richer variants as separate items.

Review all 70 blocks by their advertised purpose. Replace generic component grids with coherent flows, meaningful data props, and application callbacks. Checkout, onboarding, search, dashboards, and publishing examples must visibly perform their sample task.

### D. Studio and full-scene export

Address **E19–E25, E32–E35, E63**.

The editor supports structured sections, grids, stacks, and approved component slots. Users can add, reorder, duplicate, and remove nodes with pointer and keyboard controls.

Provide:

- Component props and sample-data editing.
- World, character, lighting, theme, density, and motion controls.
- Real interaction, loading, error, empty, and success states.
- Mobile/tablet/desktop inspection and three-character comparison.
- Undo/redo that preserves native text-field undo.
- Named local projects with autosave, duplicate, rename, delete, and JSON import/export.
- IndexedDB-backed project storage with explicit recovery when storage is unavailable.
- JSON portability for complete scenes; preserve URL sharing for bounded single-component recipes.
- React/TypeScript source export with exact dependencies, fonts, styles, asset manifest, and a complete install command.

Functions and arbitrary executable code are not serialized into scene documents. Export generates typed callback placeholders and integration instructions.

Repair image export by capturing the styled DOM, current form state, fonts, and a deliberately captured 3D frame. Pause at a deterministic frame during capture. If graphics capture fails, report the failure and offer the illustrated scene export.

### E. Security, operations, and measurement

Address **E01–E08, E47–E51, E58–E62, E70**.

- Reject absent or blank production secrets; remove production development-password fallbacks.
- Add bounded request parsing, shared rate controls, consistent API errors, and stable identity-based AI quotas.
- Keep unready account, publishing, and AI endpoints disabled server-side.
- Verify security headers on rendered pages, prerendered output, and APIs.
- Pin the tested toolchain and run reproducible installs.
- Add error reporting, registry/MCP health checks, graphics-load failures, export failures, and release rollback instructions.
- Record preview-to-export/install intent accurately; do not label copied commands as successful installations.
- Use opt-in follow-ups and real-project evidence to measure successful installation and retention.
- Update documentation, sitemap, Markdown/LLM discovery, provenance, and release claims from the actual catalog.

### F. Subsequent platform releases

These enhancements are included in the roadmap but do not block the first creative release.

| Release                     | Included work                                                                                                                                                                                                                                                  | Gate                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Cloud projects**          | Recoverable sign-in, shared persistent database, private projects, revisions, account export/deletion, migrations, backups, and remix-safe deletion. **E03, E06, E46, E64**                                                                                    | Local scene workflows validated; authorization and restore tests pass                 |
| **AI Director beta**        | Shared schemas/catalog, independently enforced constraints, scene-aware proposals, visible diffs, cancellation, stable sessions, acceptance metrics, quotas, and required eval CI. Improve MCP’s bounded inputs and advisory review accuracy. **E07, E39–E43** | Deterministic manual workflow reliable; safety, quality, latency, and cost gates pass |
| **Community publishing**    | Approved database entries connected to the gallery, scene detail links, attribution, reporting, moderator roles, audit history, blocking, and takedown flows. **E44–E46, E66**                                                                                 | Durable identity/storage and moderation operations ready                              |
| **Design interoperability** | Canonical JSON/CSS token export, then Figma-compatible export with round-trip checks. **E65**                                                                                                                                                                  | Exported tokens reproduce the supported design systems                                |
| **Commercial features**     | Validated plans, entitlements, usage quotas, billing recovery, cancellation, team roles, tenant isolation, approvals, and private registries. **E67–E68**                                                                                                      | Demonstrated repeat use and willingness to pay                                        |
| **Additional worlds**       | New character packs following the same asset, design, accessibility, and installation process. **E69**                                                                                                                                                         | Existing three worlds meet the release standard                                       |

## 4. Delivery phases and acceptance gates

The work proceeds in internal phases, with one coherent public redesign across all three worlds.

| Phase                                            | Deliverables                                                                                                                                                  | Exit condition                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **1. Baseline and creative specification**       | Restore the build environment; verify audit findings; classify the catalog; create revised world bibles, screen layouts, motion storyboards, and asset briefs | Agreed design source and reproducible baseline; each existing item has a disposition |
| **2. Asset production and rendering foundation** | Three character models, environments, animation sets, fallback artwork, world renderer, preferences, and token generation                                     | All three worlds render with faithful identities and graceful graphics fallback      |
| **3. Whole-product UI/UX redesign**              | Homepage, character pages, catalog, details, gallery, docs, navigation, mobile layouts, and flagship scenes                                                   | Every main route uses the new design language and remains task-complete              |
| **4. Components, blocks, and Studio**            | Corrected APIs, compatibility rules, structured composition editor, local projects, full remix, working code/image exports                                    | A user can customize a scene and reproduce it in a fresh React application           |
| **5. Release qualification**                     | Full install matrix, browser/accessibility coverage, performance budgets, observability, documentation, and external usability sessions                       | Release criteria below pass across all three worlds                                  |
| **6. Platform expansion**                        | Cloud → AI beta → publishing → interoperability/commercial features                                                                                           | Each capability passes its specific gate before exposure                             |

The first implementation work should produce the baseline, revised world specification, and screen-level prototype requirements. The first visual review must show all three worlds on the homepage, component detail, Studio, and mobile, so the overhaul is evaluated as a complete product.

## 5. Test plan, release criteria, and defaults

### Visual and asset acceptance

- Each character remains recognizable against the supplied references in neutral and animated poses.
- All three worlds have distinct scenery, component construction, typography, and motion.
- Characters deform correctly during every named clip.
- Interfaces remain readable over day/night scenery.
- Every world has an authored still fallback; missing assets never produce a blank working screen.
- Visual snapshots cover core components, flagship scenes, and exported consumer output.
- Human review checks animation quality and likeness; screenshots alone cannot certify these.

### Functional and accessibility acceptance

- Real registry installation succeeds in fresh Vite React, Next.js, and TanStack Start projects for every stable item.
- Exported examples compile and reproduce the selected recipe and scene.
- Keyboard operation covers editing, reordering, dialogs, menus, tabs, and export.
- Screen readers can complete the primary workflow without accessing the 3D canvas.
- Test 200% zoom, long content, RTL behavior where supported, touch input, and repeated component instances.
- Browser coverage includes Chromium, Firefox, WebKit, and mobile layouts.
- Reduced-motion and Still modes preserve all tasks.
- Test blocked storage, corrupt imports, asset failures, graphics-context loss, offline recovery, and failed clipboard/export operations.

### Performance targets

Treat these as initial release budgets to measure, not claims about current performance:

- HTML and working controls render before 3D assets finish loading.
- Target LCP ≤2.5 seconds, INP ≤200 ms, and CLS ≤0.1 on the agreed test profile.
- Target 60 fps on the reference desktop and at least 30 fps on the reference midrange mobile device.
- Start with a compressed scene-transfer budget of 6 MB desktop and 3 MB mobile, excluding subsequent user-selected worlds.
- Load only the selected world; reuse the renderer and dispose unused graphics resources.
- Automatically lower visual quality when frame rate remains below budget.
- No active background rendering while the page is hidden.
- Basic component installations add no 3D runtime.

### Product acceptance

Conduct five observed walkthroughs before broad release. At least four participants must independently choose a world, customize a scene, export/install it, and render the result. At least four should distinguish the three world identities without relying on their names.

The release must satisfy both outcomes: users feel the intended anime atmosphere, and developers obtain working, maintainable source.

### Explicit defaults and dependencies

- Whole-product public overhaul; no Kira-only public redesign.
- Existing character identities evolve; old restrictions are revised where they prevent the agreed cinematic experience.
- Real-time 3D worlds and rigged characters are part of the target release. Asset production and human review are required workstreams.
- Semantic HTML remains the interaction layer; graphics enhance its presentation.
- Structured responsive composition replaces freeform positioning.
- Local projects and source ownership remain available without an account.
- Cinematic is the intended experience; system accessibility preferences and graphics capability take precedence.
- Existing recipe links and install URLs remain compatible.
- All 70 audit enhancements are retained, with cloud and commercial work staged as agreed.
