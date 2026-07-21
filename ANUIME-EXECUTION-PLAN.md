# AnUIme Production Execution Plan

**Version:** 1.0
**Date:** 2026-07-21
**Base repository:** TanStack Start + shadcn-compatible registry
**Target:** Public MVP in 16 weeks, followed by a gated AI Director proof

## 1. Product goal

Launch AnUIme as an open-source React component registry where three original anime characters represent complete, accessible design systems.

The first public product must prove one behavior:

> A developer can choose a character, preview a component, install its source, and successfully use it in a real project.

The MVP is not an AI code generator, social network, character game, marketplace, or enterprise design platform.

## 2. MVP scope

### Included

- Three original character systems: Kira, Mochi, and Atlas
- Twelve production-ready registry components
- Character switching on every component preview
- Deterministic mixing across color, shape, structure, motion, and density
- Shareable recipe URLs
- shadcn-compatible installation and manual-copy instructions
- Light/dark behavior where appropriate
- Keyboard, screen-reader, responsive, and reduced-motion support
- Public documentation, changelog, contribution guide, and IP policy
- Anonymous product analytics and installation telemetry where technically and legally appropriate
- Waitlist, alpha cohort, beta cohort, and launch assets

### Excluded from MVP

- Eve or another conversational agent
- Arbitrary code generation
- User accounts and cloud recipe storage
- Billing
- Community voting and leaderboards
- Public user submissions
- Figma, GitHub, Discord, or other external integrations
- Custom model training
- AR/VR, sound-reactive animation, or mobile applications

## 3. Launch components

Build in risk order rather than marketing order.

### Foundation six

1. Button
2. Input
3. Checkbox
4. Card
5. Tabs
6. Dialog

These establish form behavior, interaction states, surfaces, composition, focus management, and motion.

### Completion six

7. Select
8. Toast
9. Navigation menu
10. Command palette
11. Data table
12. Authentication panel

The authentication panel is a presentational block with mock handlers—not a bundled authentication provider.

## 4. System architecture

### Canonical layers

```text
Character design specification
        ↓
Semantic design tokens
        ↓
Versioned recipe schema + compatibility rules
        ↓
Registry components and character variants
        ↓
Live preview / deterministic Character Mixer
        ↓
Registry JSON / owned React source installation
```

### Non-negotiable separation

- `registry/items/**` contains installable AnUIme source.
- `src/components/ui/**` remains limited to the documentation application shell.
- `registry/docs/**` contains authored public documentation.
- Product-specific schemas, token validation, and mixing rules belong in reusable library modules, not route components.
- Routes consume the product model; they do not define it.
- Character artwork and tokens must be versioned independently from marketing screenshots.

### Proposed repository map

```text
registry/
  config.ts
  docs/
    index.mdx
    installation.mdx
    characters.mdx
    recipes.mdx
    accessibility.mdx
    contributing.mdx
    originality-and-ip.mdx
    changelog.mdx
  items/
    bases/
      anuime/
    themes/
      kira/
      mochi/
      atlas/
    lib/
      anuime-recipe/
      anuime-tokens/
    components/
      anuime-button/
      anuime-input/
      ...
    blocks/
      anuime-auth-panel/

src/
  components/
    docs/
    studio/
  lib/
    anuime/
      characters.ts
      recipe-schema.ts
      recipe-codec.ts
      recipe-validator.ts
      recipe-mixer.ts
      recipe-presets.ts
  routes/
    index.tsx
    studio.tsx
    characters.index.tsx
    characters.$character.tsx
```

Exact route names should be confirmed during implementation against TanStack Router conventions; generated route-tree files must never be edited manually.

## 5. Character-system contract

No component implementation begins until each launch character has an approved design bible containing:

- Product use cases and anti-use cases
- Original character silhouette, palette, and visual references
- Semantic light/dark color tokens
- Typography scale and fallback strategy
- Spacing and density rules
- Radius, border, surface, shadow, and elevation rules
- Iconography direction
- Motion durations, easing, choreography, and reduced-motion fallback
- Focus, hover, active, selected, loading, success, warning, and error behavior
- Contrast results for semantic color combinations
- Prohibited combinations and originality notes

Character styling must never be implemented as three unrelated component copies. Components consume semantic tokens and narrow variants.

## 6. Recipe and Mixer contract

### Recipe dimensions

- `colorSystem`
- `shapeSystem`
- `structureSystem`
- `motionSystem`
- `density`
- `mode`
- Per-component validated variants

### Rules

- A recipe is JSON-serializable, versioned, deterministic, and URL-encodable.
- The same recipe version must render the same public component state.
- Unknown versions fail safely with a clear migration message.
- Compatibility rules return structured warnings or errors.
- Reduced-motion preference overrides decorative recipe motion.
- Recipe URLs contain no personal or secret data.
- The initial Mixer edits approved values only; it does not generate CSS or code strings.

## 7. Sixteen-week delivery plan

### Phase 0 — Decisions and baseline | Week 1

**Product**

- Approve the one-line promise and MVP boundaries.
- Confirm the three character names or rename them before artwork begins.
- Define success metrics and event vocabulary.
- Approve originality, moderation, and accessibility principles.

**Engineering**

- Capture current build, test, bundle, and registry-doctor baselines.
- Audit existing starter content and mark what will be replaced.
- Define token, character, and recipe TypeScript schemas.
- Create architectural decision records for registry layout and recipe ownership.

**Exit gate**

- Scope is signed off.
- Current repository builds cleanly.
- Character and recipe contracts are reviewed.
- No unresolved naming or IP question blocks visual work.

### Phase 1 — Brand and system foundation | Weeks 2–3

**Design**

- Complete Kira, Mochi, and Atlas design bibles.
- Produce original key art, avatars, and simple marks.
- Validate semantic palettes for contrast and color-blind distinguishability.

**Engineering**

- Rebrand registry configuration, metadata, navigation, footer, favicon, and homepage.
- Replace starter documentation with AnUIme overview and installation guidance.
- Implement token and recipe schemas with unit tests.
- Implement character selection and deterministic recipe serialization.
- Establish visual-regression and accessibility-testing approach.

**Growth**

- Publish a simple waitlist with one primary CTA.
- Begin an owned email list.
- Prepare a public build-in-progress changelog.

**Exit gate**

- All three systems can style a neutral token specimen page.
- Recipe round trips are deterministic.
- Homepage accurately explains the product without AI claims.

### Phase 2 — Product proof | Weeks 4–6

Build Button, Card, and Input across all three systems.

For each item:

1. Scaffold using `scripts/new.ts`.
2. Implement installable source under `registry/items/**`.
3. Add `_registry.mdx` usage and dependency metadata.
4. Add a client-safe `_preview.tsx`.
5. Test keyboard, screen reader, responsive, light/dark, and reduced-motion behavior.
6. Run file checks, registry doctor, focused tests, and production build.
7. Install into at least two clean consumer projects.

Add character switching to previews and create the first “one component, three systems” demo.

**Research**

- Recruit five frontend/design-engineering testers.
- Observe selection, preview, installation, and customization without coaching.
- Record verbatim confusion and value language.

**Exit gate**

- At least four of five testers complete installation without assistance.
- No critical accessibility defects.
- Installed output has no dependency on the docs application.
- At least three testers say the character distinction is meaningful beyond color.

### Phase 3 — Private alpha | Weeks 7–9

- Add Checkbox, Tabs, and Dialog.
- Implement the full five-dimension deterministic Mixer.
- Add recipe warnings, reset, undo/redo, and shareable URLs.
- Add component-state inspection for focus, disabled, loading, error, and reduced motion.
- Add anonymous events for preview, character switch, mix, copy/install, and successful follow-up visit.
- Invite 25 external alpha users in weekly batches.
- Conduct at least eight recorded sessions and five real-project follow-ups.

**Exit gate**

- 60% of activated testers install a second component.
- At least 10 testers use an AnUIme component in a real project.
- Recipe URLs reproduce the same state across supported browsers.
- P0 defects are zero; P1 defects have owners and deadlines.

### Phase 4 — Public MVP build-out | Weeks 10–13

- Add Select, Toast, Navigation menu, Command palette, Data table, and Authentication panel.
- Finish characters, recipes, accessibility, contribution, IP, and changelog documentation.
- Add registry search metadata and consistent component screenshots.
- Validate all install commands and registry JSON.
- Add end-to-end smoke paths for browse → preview → install.
- Establish versioning and migration policy for tokens and recipes.
- Conduct external accessibility and originality reviews.

**Exit gate**

- All twelve components pass the definition of done.
- Production build and registry doctor pass.
- Every component installs into a clean consumer fixture.
- There is a documented rollback path for registry releases.
- No unlicensed character, font, image, sound, or reference asset ships.

### Phase 5 — Public beta and launch preparation | Weeks 14–15

**Product**

- Open the registry under a visible Beta label.
- Invite the waitlist in controlled batches.
- Add a feedback entry point to every component page.
- Publish known limitations and a public issue template.

**Launch assets**

- 60–90 second product demonstration
- Three character-system cards
- “Same component, three characters” animation
- Installation GIF
- Five polished screenshots
- Founder story and technical launch post
- Product Hunt assets if that channel is selected
- GitHub README and social preview image

**Channels**

- Owned: website, email, changelog
- Rented: choose at most two of X, LinkedIn, YouTube, Reddit, or relevant developer communities
- Borrowed: recruit 10 design-engineer, anime-tech, or indie-development creators; prioritize hands-on previews over paid mentions

**Exit gate**

- Activation and installation funnels are observable.
- Onboarding and failure states have been tested.
- Support owner and incident process are defined.
- Launch site survives expected traffic in a load smoke test.

### Phase 6 — General availability | Week 16

**Launch-day sequence**

1. Verify production registry and clean-project installations.
2. Publish launch post, changelog, demo, and repository release.
3. Email the owned list.
4. Announce on the selected rented channels.
5. Activate borrowed-channel previews.
6. Respond to every substantive question and issue.
7. Monitor registry errors, install success, performance, and accessibility reports.
8. Publish a 24-hour status update and a seven-day learning report.

**GA success target**

- 500 successful component installs
- 20 identifiable public projects using AnUIme
- 25% preview-to-install conversion among high-intent visitors
- 30% first-to-second component installation among activated users
- Zero unresolved critical accessibility or security defects

Targets are hypotheses and should be recalibrated after alpha traffic establishes a baseline.

## 8. Eve AI Director plan

Eve begins only after the deterministic Mixer works and users demonstrate demand for conversational editing.

### Eve proof prerequisites

- Correct Vercel Eve package provenance is verified.
- Node 24 service environment is available.
- Eve is deployed separately from the TanStack registry.
- The AI Director can be disabled without affecting manual product workflows.

### Proof scope | Four weeks after MVP

- `get_studio_context`
- `search_design_options`
- `propose_recipe_patch`
- `validate_recipe`
- Development-only streaming Studio panel
- At least 30 deterministic, safety, and multi-turn evals

Do not add save, publish, billing, external connections, arbitrary code generation, shell access, or subagents during the proof.

### Eve adoption gate

- 95% schema-valid recipe patches without repair
- 100% pass rate for prohibited combinations and unapproved publication tests
- Auth and tenant-isolation tests pass
- Disconnect, cancellation, retry, and redeploy recovery pass
- P95 latency meets the agreed Studio budget
- Accepted-recipe cost fits the proposed margin
- Users accept AI suggestions more often than they discard or manually reconstruct them

## 9. Definition of done for every component

- Original visual treatment across all three character systems
- Stable TypeScript API
- No docs-app-only imports
- Correct registry metadata and dependency declarations
- Interactive preview and meaningful usage documentation
- Keyboard-complete interaction
- Visible focus treatment
- Screen-reader labels and announcements where required
- Supported responsive states
- Reduced-motion behavior
- Light/dark behavior where applicable
- Automated focused tests
- Clean `vp check --fix` result for touched files
- Clean `bun --bun ./scripts/doctor.ts` result
- Successful `vp build`
- Successful install and render in a clean consumer fixture

## 10. Quality and operational gates

### Accessibility

- WCAG 2.2 AA target
- Automated checks plus manual keyboard and screen-reader testing
- No motion-only communication
- Reduced-motion support for every decorative animation
- Documented contrast results for semantic token pairs

### Performance

- Per-component dependency and JavaScript budgets
- No character artwork on the critical installation path
- Avoid runtime style generation where static tokens suffice
- Preview animations must not cause layout instability

### Security and privacy

- No secrets in recipe URLs or client analytics
- Dependency and license review before release
- Sanitized authored MDX and community content boundaries
- Rate limiting for any future state-changing or AI endpoint
- Explicit retention policy before accounts or AI sessions

### Release operations

- Semantic versioning policy
- Changelog on every public release
- Registry JSON smoke test in CI
- Consumer-fixture installation test
- Preview deployment before production
- Documented rollback and deprecation procedure

## 11. Metrics model

### North-star metric

Weekly components installed and retained in active projects.

### Funnel

1. Relevant landing-page visitor
2. Component preview opened
3. Character switched or recipe changed
4. Install command copied or invoked
5. Installation succeeds
6. Second component installed
7. Component retained in a real project after four weeks

### Qualitative evidence

- Can users describe the difference among characters without reading the design bibles?
- Does character language make design decisions easier?
- Do installed components survive real customization?
- Are users asking for more components, more characters, or conversational direction?

## 12. Team and ownership

Minimum effective team:

| Ownership                  | Primary responsibility                             |
| -------------------------- | -------------------------------------------------- |
| Product/engineering lead   | Scope, architecture, registry, release gates       |
| Design engineer            | Tokens, components, Mixer, accessibility           |
| Character/visual designer  | Original characters, design bibles, launch visuals |
| Developer relations/growth | Alpha recruitment, docs feedback, launch channels  |
| External reviewers         | Accessibility and originality/IP review            |

If one person owns multiple roles, reduce simultaneous work rather than lowering quality gates.

## 13. Immediate next sprint

### Sprint objective

Prove that one shared component architecture can express three meaningfully different character systems and remain installable.

### First ten tasks

1. Confirm or rename Kira, Mochi, and Atlas.
2. Approve the MVP scope and exclusions in this plan.
3. Run and record the repository baseline checks.
4. Replace `_cn` identity in registry configuration and product metadata.
5. Define the character-token TypeScript contract.
6. Define recipe schema v1 and URL serialization tests.
7. Complete the three character design-bible drafts.
8. Scaffold the AnUIme Button registry item.
9. Implement its neutral structure and three token-driven systems.
10. Test installation in a clean consumer fixture and conduct the first user walkthrough.

### Sprint success

- One Button implementation renders as three coherent character systems.
- It installs from the registry into a clean React project.
- Recipe v1 can select and serialize the character system.
- Keyboard, focus, contrast, and reduced-motion checks pass.
- The implementation reveals no need for three duplicated component trees.
