# Eve × AnUIme Production-Fit Analysis

**Decision memo — 2026-07-21**

## Executive decision

**Conditional yes:** Eve is a strong architectural fit for AnUIme's future **AI Director**, but it is not a fit for the registry, design-system engine, component renderer, or the first non-AI launch milestone.

The recommended architecture is:

- Keep the existing TanStack Start application as the public website, documentation system, component registry, preview renderer, and source of truth.
- Introduce Eve as a separately deployed backend agent service only when AnUIme adds conversational, multi-turn art direction.
- Give the Eve agent a narrow set of typed AnUIme tools that return validated theme recipes. Do not let it generate or publish arbitrary component source.
- Put adoption behind a technical proof because Eve is explicitly documented as preview software and the currently installed npm package is not the framework described by the docs.

**Fit score:**

- Eve for the whole AnUIme platform: **3/10**
- Eve for the constrained AI Director: **8.5/10 after blockers are resolved**
- Eve as a launch-critical dependency today: **4/10**
- Eve as a post-MVP capability behind a feature flag: **9/10 potential**

---

## 1. What Eve actually provides

Based on the bundled documentation, Eve is a filesystem-first TypeScript framework for durable backend agents. An agent is authored under an `agent/` directory using instructions, tools, skills, connections, channels, sandboxes, subagents, schedules, and runtime configuration.

Its most relevant capabilities are:

### Durable sessions

Conversations persist across turns, process restarts, timeouts, and redeployments. Turns checkpoint at step boundaries and can park without consuming compute while waiting for a person, OAuth authorization, or a subagent.

This is materially useful for AnUIme because a design conversation can span multiple edits:

1. “Make this Atlas card warmer.”
2. “Keep its structure but use Mochi motion.”
3. “Reduce density and show the mobile version.”
4. “Save this as my launch recipe.”

The session can retain decisions and resumable state instead of forcing the frontend to reconstruct every interaction.

### Stable message and streaming API

Eve exposes stable HTTP session routes and an NDJSON event stream. It distinguishes a `continuationToken` for resuming a conversation from a `sessionId` used to stream and inspect a run.

The frontend SDK can project streamed text, reasoning, tool calls, results, approvals, authorization prompts, and attachments into React state. The React hook can target a separate Eve host, which matters because AnUIme uses TanStack Start rather than one of Eve's first-class Next.js, Nuxt, or SvelteKit integrations.

### Typed tools

Tools use Zod schemas and run in the application runtime. This is the best Eve capability for AnUIme: the model can be limited to explicit product operations such as:

- `search_components`
- `get_character_system`
- `create_recipe_draft`
- `validate_recipe`
- `compare_recipe`
- `save_recipe`
- `request_preview`

The model would select from existing character tokens, variants, and compositions rather than inventing implementation code.

### Human-in-the-loop controls

Tools and connected operations can require approval. A durable turn can park until the user approves or denies the action.

Useful AnUIme approval points include:

- Saving over an existing team recipe
- Publishing a recipe to the community gallery
- Exporting a brand token set
- Creating a paid generation or render job
- Inviting collaborators or changing shared assets

Previewing and editing a local draft should not require approval.

### Durable state and session context

Eve supports session-scoped state and authenticated session context. This can hold the active component, selected characters, unresolved design conflicts, draft recipe ID, and current revision.

Durable agent state must not become AnUIme's canonical product database. Final recipes, ownership, billing, publication state, and audit history should live in AnUIme's application database. Eve state should contain workflow context and references to canonical records.

### Evals

Eve's eval framework supports deterministic assertions, tool-call assertions, multi-turn cases, datasets, LLM judges, CI exit codes, JSON output, and JUnit reporting.

This is one of the strongest reasons to consider Eve. AnUIme can test that the AI Director:

- Produces schema-valid recipes
- Never selects prohibited token combinations
- Calls `validate_recipe` before offering export
- Preserves accessibility constraints
- Honors reduced-motion requests
- Does not imitate named copyrighted characters
- Refuses to publish without approval
- Maintains intent across multiple design turns

### Sandboxes

Eve provides per-session isolated workspaces with local and hosted backends, filesystem persistence, configurable egress, and credential brokering.

AnUIme should not need sandbox shell access for the initial AI Director. Recipe generation is structured configuration, not autonomous software development. Enabling shell and arbitrary file tools would increase cost and attack surface without improving the core experience.

If a later feature compiles isolated customer code or renders untrusted components, a locked-down sandbox may become valuable. That should be a separate reviewed execution service, with deny-all network access by default.

### Connections

Eve can discover tools from MCP or OpenAPI services, with operation filters, authentication, and approval policies.

This is useful later for Figma export, GitHub pull requests, issue trackers, or team workflows. It is unnecessary for the MVP and should not be used when a small authored tool can expose a narrower AnUIme API.

### Subagents

Eve supports root-agent copies and declared specialist agents with separate prompts, tools, state, and sandboxes.

AnUIme does not need multiple agents at launch. One constrained Director using deterministic tools is easier to evaluate and secure. Possible later specialists include an accessibility reviewer or motion reviewer, but only if eval evidence shows a single agent cannot reliably handle those checks.

### Schedules and messaging channels

Eve supports cron schedules and channels such as web, Slack, Discord, Telegram, Teams, Twilio, GitHub, and Linear.

These are not part of the core AnUIme creation loop. A Discord community assistant or scheduled recipe-quality audit could be useful after launch, but neither should influence the initial architecture.

---

## 2. Fit with the current repository

The current repository is already a strong base for AnUIme's non-agent product:

- TanStack Start application
- React 19 and TypeScript
- shadcn-compatible registry JSON
- Installable, source-owned components
- Live component previews
- MDX documentation
- Syntax-highlighted source
- Registry validation and installation commands
- Nitro-backed server routes

This foundation should remain in place.

### What stays in TanStack Start

- Public marketing site
- Documentation and component catalog
- Character-system pages
- Component preview and Character Mixer UI
- Registry JSON and CLI installation
- Authentication and account UI
- Recipe storage API and permissions
- Billing
- Community gallery
- Analytics
- Canonical component and token definitions

### What belongs in Eve

- Conversational AI Director sessions
- Multi-turn design intent and working context
- Calls to narrow, typed AnUIme recipe tools
- Streaming progress to the Studio UI
- Approval pauses for external or shared actions
- Agent-specific evals and traces

### What must not belong in Eve

- The canonical component registry
- Character token source files
- Accessibility rules as prompt-only instructions
- User ownership and authorization decisions
- Billing state
- Arbitrary code publication
- Production recipe validation logic

Validation and authorization must be deterministic application code that the agent calls, not behavior the prompt merely requests.

---

## 3. Recommended production topology

```text
Browser
  |
  +-- TanStack Start / AnUIme --------------------------------+
  |     - Catalog, docs, previews, mixer                       |
  |     - Auth, billing, recipes, registry                     |
  |     - Canonical schemas and validation                     |
  |                                                            |
  +-- /api/director proxy or authenticated client ------------+---- Eve service
                                                               |      - Durable session
                                                               |      - Streaming events
                                                               |      - Narrow typed tools
                                                               |      - HITL approvals
                                                               |      - Evals/tracing
                                                               |
                                                               +---- AnUIme internal API/database
                                                                      - Recipe records
                                                                      - User/team authorization
                                                                      - Catalog snapshots
                                                                      - Audit trail
```

Run Eve as a separate service rather than trying to make it own the TanStack application build. Eve documents first-class combined-app adapters for Next.js, Nuxt, and SvelteKit, but not TanStack Start. Its generic React client can call an explicit host, so a separate service is the cleanest integration.

Prefer a same-origin TanStack proxy if practical. It simplifies browser authentication, CORS, rate limiting, and hiding the internal Eve origin. The proxy must preserve streaming and cancellation semantics.

---

## 4. Proposed AI Director contract

### Input

The Studio sends:

- User instruction
- Current component ID
- Current recipe ID and revision
- Selected character systems
- Current viewport and preview state
- Authenticated user/team identity through the server boundary

Page context should be ephemeral where possible. Do not place secrets, raw authorization claims, or unnecessary personal data in durable model history.

### Agent output

The agent returns prose plus a versioned recipe patch:

```ts
type RecipePatch = {
  schemaVersion: "1";
  baseRecipeId: string;
  baseRevision: number;
  operations: Array<
    | { op: "set_character_weight"; character: CharacterId; value: number }
    | { op: "set_token"; token: AllowedTokenPath; value: AllowedTokenValue }
    | { op: "set_variant"; component: ComponentId; variant: string; value: string }
    | { op: "set_motion_profile"; profile: MotionProfileId }
  >;
  explanation: string[];
};
```

The application validates the patch, applies it to a draft, renders the preview, and returns validation results. The agent never writes registry source directly.

### Minimum tools

1. `get_studio_context` — returns the allowed current recipe and catalog snapshot.
2. `search_design_options` — searches approved tokens, variants, and compositions.
3. `propose_recipe_patch` — records a schema-valid draft patch.
4. `validate_recipe` — runs deterministic compatibility, accessibility, and version checks.
5. `save_recipe` — persists an authorized private draft; idempotent by operation key.
6. `publish_recipe` — publishes only after explicit approval and server-side authorization.

The model should not receive `bash`, `write_file`, unrestricted `web_fetch`, generic delegation, or arbitrary external connections in production.

---

## 5. Security requirements

Eve's documentation explicitly warns that defaults may be permissive. Production adoption requires a deny-by-default profile.

### Required controls

- Author route authentication for every non-public session route.
- Bind every session and recipe operation to the authenticated principal and team.
- Enforce authorization again inside every data-mutating tool.
- Disable default shell, write, web-fetch, and root delegation tools unless a reviewed feature needs them.
- Do not expose database credentials to the model or sandbox.
- Use least-privilege authored tools instead of broad MCP/OpenAPI surfaces.
- Require approvals for publish, overwrite, external transmission, and paid actions.
- Use idempotency keys for every mutation because an interrupted step may rerun.
- Configure explicit sandbox egress policy if a sandbox is ever enabled.
- Treat reasoning events as sensitive; do not expose or retain them by default.
- Rate-limit session creation, turns, tool calls, and paid model usage.
- Define retention and deletion policies for sessions, events, attachments, and telemetry.
- Validate uploaded files before giving them to a model.
- Log authorization decisions and mutations without logging secrets or full private prompts.

### Prompt-injection boundary

Component documentation, community recipes, and uploaded references are untrusted content. They must never be allowed to redefine system policy or directly select tools. Product tools should return typed data with provenance, and the application must validate every resulting recipe patch.

---

## 6. Production blockers discovered

### Blocker 1: package identity mismatch

The documentation says the current package and CLI are named `eve`, but the locally installed `node_modules/eve/package.json` is `eve@0.5.4`, an Apache-licensed “Simple custom events” package with no documented agent exports or CLI. The docs appear alongside a package that cannot implement them.

This is a hard blocker. Before any proof:

- Identify the authoritative Vercel package source and registry.
- Verify package ownership, integrity, version, license, and release provenance.
- Confirm that the installed package exports `defineAgent`, `eve/tools`, channels, client hooks, and the CLI.
- Pin an exact tested version rather than a floating preview release.

### Blocker 2: Node runtime mismatch

The Eve docs require Node 24 or newer and say scaffolding pins `engines.node` to a supported 24.x major. The current environment reports Node 22.22.3.

The Eve service needs a Node 24 toolchain. Do not silently change the registry app's runtime until its TanStack/Vite+ build is verified on Node 24. A separate service avoids forcing the entire app to migrate immediately.

### Blocker 3: preview stability

Eve's docs explicitly state that the framework, APIs, documentation, and behavior may change before general availability. A launch-critical dependency needs:

- Exact version pinning
- Upgrade policy
- Regression evals
- Export/recovery path for sessions and recipes
- Operational owner
- Rollback plan

### Blocker 4: no first-class TanStack Start adapter

The documented combined-app integrations cover Next.js, Nuxt, and SvelteKit. Generic React is supported through an explicit host, but TanStack route/build integration is not documented.

Use a separate Eve service plus a tested streaming proxy or direct authenticated client. Do not improvise a build-plugin integration inside the production app.

### Blocker 5: durable production operations need validation

The design promises crash recovery, local workflow state, Vercel Workflow support, sandbox persistence, and self-hosted worlds. These must be proven under the chosen deployment mode, including:

- Redeploy during an active turn
- Provider timeout and retry
- Idempotent mutation replay
- Client disconnect and stream resumption
- Session cancellation
- Multiple near-concurrent messages
- Auth revocation during a parked session
- Data deletion and retention
- Cost and latency under realistic workloads

---

## 7. Adoption plan

### Stage A — Launch AnUIme without Eve

Ship the registry, three character systems, first components, live switching, and deterministic Character Mixer. Collect evidence that users want conversational editing.

### Stage B — Isolated technical spike

After resolving package provenance and Node 24:

- Create a separate Eve proof service.
- Disable unnecessary default tools.
- Implement only `get_studio_context`, `propose_recipe_patch`, and `validate_recipe`.
- Connect a development-only Studio panel through an explicit host.
- Run durability, auth, cancellation, and replay tests.
- Create at least 30 deterministic and multi-turn eval cases.

Do not connect billing, community publishing, customer repositories, or external channels.

### Stage C — Private AI Director alpha

- Feature flag by user ID.
- Store canonical recipes in AnUIme, not agent state.
- Add private draft saving with server-side authorization.
- Monitor latency, model spend, invalid patch rate, correction rate, and successful recipe adoption.
- Review transcripts and failures under an explicit user consent and retention policy.

### Stage D — Production beta

Proceed only when the gates below pass. Add approvals for publishing and external actions, operational dashboards, budgets, and rollback behavior.

---

## 8. Go/no-go gates

Eve can enter AnUIme production only if all of these are true:

- The correct framework package and CLI can be installed from a verified source.
- The service builds and runs on a pinned Node 24 environment.
- The TanStack app can stream, resume, and cancel an Eve session reliably.
- Authentication and tenant isolation pass adversarial tests.
- All mutation tools are idempotent and independently authorize the caller.
- Default shell, write, fetch, and delegation capabilities are disabled.
- At least 95% of representative prompts produce schema-valid patches without manual repair.
- 100% of prohibited-token and publish-without-approval evals pass.
- Redeploy, timeout, disconnect, cancellation, and stale-token tests pass.
- P95 time to first useful UI update and total-turn latency meet the Studio UX budget.
- Model and infrastructure cost per accepted recipe fits the product margin.
- The AI Director can be disabled without breaking the registry or manual Mixer.

If any gate fails, AnUIme launches with deterministic controls and revisits Eve later.

---

## 9. Final recommendation

Eve is not the foundation of AnUIme. The existing registry is the foundation.

Eve's durability, typed tools, streaming, human approvals, state, and eval system make it a compelling engine for a conversational AI Director. Its filesystem-first structure also makes agent behavior reviewable and version-controlled. Those strengths align well with AnUIme's need for multi-turn creative direction that remains bounded by a real design system.

However, the framework is preview software, the current runtime is below its documented Node requirement, TanStack Start lacks a first-class adapter, and the installed package identity does not match the documented framework. Those are production blockers, not minor setup issues.

**Recommendation:** launch the manual, deterministic AnUIme product on the current TanStack registry base; run Eve as a separate, feature-flagged proof service; adopt it for the AI Director only after the package, runtime, security, durability, quality, and cost gates pass.
