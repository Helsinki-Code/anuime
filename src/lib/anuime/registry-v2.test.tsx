import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnuimeCheckbox } from "../../../registry/items/components/anuime-checkbox/anuime-checkbox";
import { AnuimeProgress } from "../../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeSwitch } from "../../../registry/items/components/anuime-switch/anuime-switch";
import {
  anuimeComponentConstructionMap,
  anuimeExtendedComponentNames,
  anuimeExtendedConstructionMap,
} from "../../../registry/items/lib/anuime-recipe/anuime-recipe";
import { createAnuimeRecipe } from "./recipe";

const workspace = process.cwd();

const themeFiles = {
  kira: "registry/items/themes/anuime-theme-kira/_registry.mdx",
  mochi: "registry/items/themes/anuime-theme-mochi/_registry.mdx",
  atlas: "registry/items/themes/anuime-theme-atlas/_registry.mdx",
} as const;

describe("AnUIme registry v2 themes and signatures", () => {
  it.each(Object.entries(themeFiles))(
    "%s installs one canonical light/dark theme item",
    (name, path) => {
      const source = readFileSync(resolve(workspace, path), "utf8");
      expect(source).toContain(`name: anuime-theme-${name}`);
      expect(source).toContain("registryDependencies:\n  - button");
      expect(source).toContain("  light:");
      expect(source).toContain("  dark:");
      expect(source).not.toMatch(/\bskin\b/i);
    },
  );

  it("ships the approved AA muted-foreground corrections", () => {
    const mochi = readFileSync(resolve(workspace, themeFiles.mochi), "utf8");
    const atlas = readFileSync(resolve(workspace, themeFiles.atlas), "utf8");
    expect(mochi).toContain('muted-foreground: "#826c72"');
    expect(atlas).toContain('muted-foreground: "#677282"');
  });

  it("promotes all 34 Extended-board components from derived to specified", () => {
    expect(anuimeExtendedComponentNames).toHaveLength(34);
    expect(new Set(anuimeExtendedComponentNames).size).toBe(34);

    for (const component of anuimeExtendedComponentNames) {
      expect(anuimeComponentConstructionMap[component].specification).toBe("specified");
      expect(anuimeExtendedConstructionMap[component]).toBeDefined();
    }
  });

  it("keeps motifs off only the two Extended components marked NO MOTIF FIT", () => {
    const componentsWithoutMotifs = Object.entries(anuimeExtendedConstructionMap)
      .filter(([, construction]) => Object.values(construction).flat().length === 0)
      .map(([component]) => component)
      .toSorted();

    expect(componentsWithoutMotifs).toEqual(["aspect-ratio", "typography"]);
  });

  it("declares every local alias import as a registry dependency", () => {
    const sourceFiles = getSourceFiles(resolve(workspace, "registry/items"));
    const failures: string[] = [];

    for (const sourcePath of sourceFiles) {
      const source = readFileSync(sourcePath, "utf8");
      const metadataPath = join(dirname(sourcePath), "_registry.mdx");
      const metadata = readFileSync(metadataPath, "utf8");

      for (const match of source.matchAll(
        /from\s+["']@\/(?:components\/(?:ui|blocks)|lib|hooks)\/([^"']+)["']/gu,
      )) {
        const dependency = basename(match[1]);
        if (!metadata.includes(`  - ${dependency}`)) {
          failures.push(`${sourcePath}: ${dependency}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  it.each(["", "dark"])("renders every signature component in %s mode", (mode) => {
    const markup = renderToStaticMarkup(
      <div className={mode}>
        <AnuimeCheckbox
          character="kira"
          recipe={createAnuimeRecipe("kira")}
          label="Angular check"
          defaultChecked
        />
        <AnuimeSwitch
          character="mochi"
          recipe={createAnuimeRecipe("mochi")}
          label="Pearl switch"
          defaultChecked
        />
        <AnuimeProgress
          character="atlas"
          recipe={createAnuimeRecipe("atlas")}
          label="Strap"
          value={70}
        />
      </div>,
    );
    expect(markup).toContain('data-character="kira"');
    expect(markup).toContain('data-character="mochi"');
    expect(markup).toContain('data-character="atlas"');
    expect(markup.match(/h-\[5px\]/g)).toHaveLength(10);
    expect(markup).toContain('stroke-linejoin="miter"');
    expect(markup).toContain("1.5px var(--anuime-secondary-accent");
  });
});

function getSourceFiles(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const path = join(root, entry);
    if (statSync(path).isDirectory()) return getSourceFiles(path);
    return /\.[jt]sx?$/u.test(entry) && !entry.startsWith("_") ? [path] : [];
  });
}
