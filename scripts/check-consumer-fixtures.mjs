import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const fixtures = ["vite-react", "next-react", "tanstack-start"];
const tsc = resolve(root, "node_modules/.bin/tsc");

for (const fixture of fixtures) {
  const fixtureRoot = resolve(root, "fixtures", fixture);
  if (!existsSync(resolve(fixtureRoot, "package.json"))) process.exit(1);
  const result = spawnSync(tsc, ["-p", resolve(fixtureRoot, "tsconfig.json"), "--noEmit"], {
    cwd: fixtureRoot,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`consumer fixture typecheck passed: ${fixture}`);
}
