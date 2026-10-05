import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const fixtures = ["vite-react", "next-react", "tanstack-start"];

for (const fixture of fixtures) {
  const result = spawnSync("pnpm", ["run", "build"], {
    cwd: resolve(root, "fixtures", fixture),
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`consumer fixture build passed: ${fixture}`);
}
