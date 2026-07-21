import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const fixtures = ["vite-react", "next-react", "tanstack-start"];
const components = ["anuime-button", "anuime-switch", "anuime-accordion"];

await Promise.all(
  fixtures.map(async (fixture) => {
    const fixtureRoot = resolve(root, "fixtures", fixture, "src");
    const recipeTarget = resolve(fixtureRoot, "lib", "anuime-recipe.ts");
    await mkdir(dirname(recipeTarget), { recursive: true });
    await cp(resolve(root, "registry/items/lib/anuime-recipe/anuime-recipe.ts"), recipeTarget);
    await Promise.all(
      components.map(async (component) => {
        const target = resolve(fixtureRoot, "components", "ui", `${component}.tsx`);
        await mkdir(dirname(target), { recursive: true });
        await cp(resolve(root, "registry/items/components", component, `${component}.tsx`), target);
      }),
    );
  }),
);

console.log("Synced canonical registry sources into 3 consumer fixtures.");
