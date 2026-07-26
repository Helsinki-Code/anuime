import { readFileSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnuimeBorderTraceButton } from "../../../registry/items/lib/advanced/anuime-border-trace-button/anuime-border-trace-button";
import { AnuimeCodeDiff } from "../../../registry/items/lib/advanced/anuime-code-diff/anuime-code-diff";
import { AnuimeCodeWindow } from "../../../registry/items/lib/advanced/anuime-code-window/anuime-code-window";
import { AnuimeCommandDock } from "../../../registry/items/lib/advanced/anuime-command-dock/anuime-command-dock";
import { AnuimeConnectionBeam } from "../../../registry/items/lib/advanced/anuime-connection-beam/anuime-connection-beam";
import { AnuimeCopyButton } from "../../../registry/items/lib/advanced/anuime-copy-button/anuime-copy-button";
import { AnuimeFileTree } from "../../../registry/items/lib/advanced/anuime-file-tree/anuime-file-tree";
import { AnuimeFloatingDock } from "../../../registry/items/lib/advanced/anuime-floating-dock/anuime-floating-dock";
import { AnuimeLoadingButton } from "../../../registry/items/lib/advanced/anuime-loading-button/anuime-loading-button";
import { AnuimeScrambleText } from "../../../registry/items/lib/advanced/anuime-scramble-text/anuime-scramble-text";
import { AnuimeScrollProgress } from "../../../registry/items/lib/advanced/anuime-scroll-progress/anuime-scroll-progress";
import { AnuimeSplitButton } from "../../../registry/items/lib/advanced/anuime-split-button/anuime-split-button";
import { AnuimeStickyRail } from "../../../registry/items/lib/advanced/anuime-sticky-rail/anuime-sticky-rail";
import { AnuimeTerminalWindow } from "../../../registry/items/lib/advanced/anuime-terminal-window/anuime-terminal-window";
import { createAnuimeRecipe } from "./recipe";

const batchItemNames = [
  "anuime-scramble-text",
  "anuime-border-trace-button",
  "anuime-loading-button",
  "anuime-copy-button",
  "anuime-split-button",
  "anuime-floating-dock",
  "anuime-command-dock",
  "anuime-scroll-progress",
  "anuime-sticky-rail",
  "anuime-code-window",
  "anuime-terminal-window",
  "anuime-file-tree",
  "anuime-code-diff",
  "anuime-connection-beam",
] as const;

const characters = ["kira", "mochi", "atlas"] as const;
const advancedRoot = join(process.cwd(), "registry/items/lib/advanced");

describe("AnUIme advanced atomic batch 2", () => {
  it.each(characters)("renders all 14 items as %s in both theme modes", (character) => {
    for (const mode of ["light", "dark"] as const) {
      const recipe = { ...createAnuimeRecipe(character), mode };
      const markup = renderToStaticMarkup(
        <div className={mode === "dark" ? "dark" : undefined}>
          <AnuimeScrambleText recipe={recipe} text="Resolved" active={false} />
          <AnuimeBorderTraceButton recipe={recipe}>Focus</AnuimeBorderTraceButton>
          <AnuimeLoadingButton recipe={recipe} loading>
            Run
          </AnuimeLoadingButton>
          <AnuimeCopyButton recipe={recipe} value="copy" />
          <AnuimeSplitButton
            recipe={recipe}
            label="Deploy"
            options={[{ id: "preview", label: "Preview" }]}
          />
          <AnuimeFloatingDock
            recipe={recipe}
            items={[{ id: "home", label: "Home" }]}
            activeId="home"
          />
          <AnuimeCommandDock
            recipe={recipe}
            commands={[{ id: "search", label: "Search" }]}
            activeId="search"
          />
          <AnuimeScrollProgress recipe={recipe} value={50} />
          <AnuimeStickyRail
            recipe={recipe}
            items={[{ id: "overview", label: "Overview" }]}
            activeId="overview"
          />
          <AnuimeCodeWindow recipe={recipe} code="const ready = true;" />
          <AnuimeTerminalWindow
            recipe={recipe}
            entries={[{ command: "vp test", output: "passed" }]}
          />
          <AnuimeFileTree
            recipe={recipe}
            nodes={[{ id: "src", label: "src", children: [{ id: "app", label: "app.tsx" }] }]}
          />
          <AnuimeCodeDiff
            recipe={recipe}
            lines={[{ kind: "addition", content: "+ ready", newLine: 1 }]}
          />
          <AnuimeConnectionBeam recipe={recipe} active={false} />
        </div>,
      );

      expect(
        markup.match(new RegExp(`data-character="${character}"`, "gu"))?.length,
      ).toBeGreaterThanOrEqual(14);
      for (const item of batchItemNames) {
        expect(markup).toContain(`data-anuime-component="${item.replace("anuime-", "")}"`);
      }
    }
  });

  it("publishes consistent registry:ui metadata and exact local dependencies", () => {
    for (const item of batchItemNames) {
      const metadata = readMetadata(item);
      expect(metadata).toContain(`name: ${item}`);
      expect(metadata).toContain("type: registry:ui");
      expect(metadata).toMatch(/title: "AnUIme /u);
      expect(metadata).toContain("  - anuime-recipe");
      expect(metadata).toContain(`  - path: ${item}.tsx`);
    }

    for (const button of [
      "anuime-border-trace-button",
      "anuime-loading-button",
      "anuime-copy-button",
      "anuime-split-button",
    ] as const) {
      expect(readMetadata(button)).toContain("  - anuime-button");
    }
  });

  it("preserves the approved contrast lock and token-only color policy", () => {
    for (const item of batchItemNames) {
      const source = readSource(item);
      expect(source).not.toMatch(/#[\da-f]{3,8}\b/iu);
      expect(source).not.toMatch(/\b(?:rgb|hsl)a?\(/iu);
      expect(source).not.toContain("color-mix(");
      expect(source).not.toMatch(
        /\btext-(?:white|black|primary|primary-foreground|secondary|secondary-foreground|accent|accent-foreground|destructive|destructive-foreground)\b/u,
      );
    }
  });

  it("uses only approved authored angles and character timings", () => {
    const allSources = batchItemNames.map(readSource).join("\n");
    expect(allSources).toContain("rotate-[114deg]");
    expect(allSources).toContain("rotate-[76deg]");
    expect(allSources).toContain("skew-x-[-18deg]");
    expect(allSources).toContain("rotate-45");
    expect(allSources).not.toMatch(/(?:rotate|skew)[^"\s]*(?:225|40deg|-8deg|-45deg)/u);

    expect(allSources).toContain("duration-[240ms]");
    expect(allSources).toContain("duration-[250ms]");
    expect(allSources).toContain("duration-[180ms]");
    expect(readSource("anuime-loading-button")).toContain("1150ms");
    expect(readSource("anuime-terminal-window")).toContain("1700ms");
  });

  it("gates power motion and provides reduced-motion fallbacks", () => {
    for (const item of ["anuime-scramble-text", "anuime-connection-beam"] as const) {
      const source = readSource(item);
      expect(source).toContain('data-anuime-tier="expressive"');
      expect(source).toContain('data-anuime-context="transition"');
    }

    const loading = readSource("anuime-loading-button");
    expect(loading).toContain('data-anuime-tier="expressive"');
    expect(loading).toContain('data-anuime-context="waiting"');

    expect(readSource("anuime-scramble-text")).toContain("prefers-reduced-motion: reduce");
    for (const item of [
      "anuime-border-trace-button",
      "anuime-loading-button",
      "anuime-split-button",
      "anuime-floating-dock",
      "anuime-command-dock",
      "anuime-scroll-progress",
      "anuime-sticky-rail",
      "anuime-terminal-window",
      "anuime-file-tree",
      "anuime-connection-beam",
    ] as const) {
      expect(readSource(item)).toMatch(/motion-reduce:|prefers-reduced-motion/u);
    }
  });
});

function readMetadata(item: (typeof batchItemNames)[number]): string {
  return readFileSync(join(advancedRoot, item, "_registry.mdx"), "utf8");
}

function readSource(item: (typeof batchItemNames)[number]): string {
  return readFileSync(join(advancedRoot, item, `${item}.tsx`), "utf8");
}
