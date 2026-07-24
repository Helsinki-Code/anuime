import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnuimeCheckbox } from "../../../registry/items/components/anuime-checkbox/anuime-checkbox";
import { AnuimeProgress } from "../../../registry/items/components/anuime-progress/anuime-progress";
import { AnuimeSwitch } from "../../../registry/items/components/anuime-switch/anuime-switch";
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
