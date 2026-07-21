# AnUIme

**Where characters become design systems.**

AnUIme is an open-source, shadcn-compatible React component registry where original anime characters represent complete, accessible design systems.

## Product

- Three launch systems: Kira, Mochi, and Atlas
- Twelve installable UI components and one authentication block
- Deterministic character recipes
- Interactive Character Studio
- Source-owned React and TypeScript
- Keyboard, focus, semantic status, and reduced-motion foundations

## Local Development

Use Vite+ for the application workflow:

```sh
vp install
vp dev
```

Open the local URL shown in the terminal. The public registry index is available at `/registry.json`; installable item JSON is served from `/r/<name>.json`.

## Install a Component

```sh
npx shadcn@latest add https://anuime.vercel.app/r/anuime-button.json
```

Installed components depend on the local `anuime-recipe` registry utility, which contains the shared character types and style contract.

## Author a Registry Item

Published source belongs under `registry/items/**`; `src/components/ui/**` is reserved for the documentation app shell.

```sh
bun --bun ./scripts/new.ts \
  --type registry:ui \
  --name anuime-badge \
  --description "A character-driven status badge."
```

Then complete the generated source, `_registry.mdx`, and `_preview.tsx` files.

## Verification

```sh
vp check --fix <touched-files>
bun --bun ./scripts/doctor.ts
vp build
```

## Architecture

```text
registry/items/       installable source and previews
registry/docs/        public product documentation
src/lib/anuime/       Studio character and recipe model
src/routes/studio.tsx deterministic Character Studio
src/routes/index.tsx  product landing page
```

The AI Director described in the product proposal is intentionally outside the launch-critical application. It will be evaluated as a separate service only after the deterministic workflow demonstrates adoption.

## Principles

- Original characters and artwork only
- No arbitrary generated component implementations
- Accessibility belongs to every character system
- Users own the installed source
- Recipes are explicit, versioned, and deterministic

See the in-app documentation for character-system, recipe, accessibility, and originality guidance.
