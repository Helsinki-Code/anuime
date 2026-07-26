import { readFileSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnuimeBeamBackground } from "../../../registry/items/lib/advanced/anuime-beam-background/anuime-beam-background";
import { AnuimeBentoCard } from "../../../registry/items/lib/advanced/anuime-bento-card/anuime-bento-card";
import { AnuimeComparisonCard } from "../../../registry/items/lib/advanced/anuime-comparison-card/anuime-comparison-card";
import { AnuimeFramedBackground } from "../../../registry/items/lib/advanced/anuime-framed-background/anuime-framed-background";
import { AnuimeLineGridBackground } from "../../../registry/items/lib/advanced/anuime-line-grid-background/anuime-line-grid-background";
import { AnuimeLineReveal } from "../../../registry/items/lib/advanced/anuime-line-reveal/anuime-line-reveal";
import { AnuimeMetricCard } from "../../../registry/items/lib/advanced/anuime-metric-card/anuime-metric-card";
import { AnuimeNodeFieldBackground } from "../../../registry/items/lib/advanced/anuime-node-field-background/anuime-node-field-background";
import { AnuimeNumberTicker } from "../../../registry/items/lib/advanced/anuime-number-ticker/anuime-number-ticker";
import { AnuimeRadialFieldBackground } from "../../../registry/items/lib/advanced/anuime-radial-field-background/anuime-radial-field-background";
import { AnuimeSignalCard } from "../../../registry/items/lib/advanced/anuime-signal-card/anuime-signal-card";
import { AnuimeTraceCard } from "../../../registry/items/lib/advanced/anuime-trace-card/anuime-trace-card";
import { AnuimeTypewriter } from "../../../registry/items/lib/advanced/anuime-typewriter/anuime-typewriter";
import { AnuimeWordCycle } from "../../../registry/items/lib/advanced/anuime-word-cycle/anuime-word-cycle";
import { createAnuimeRecipe } from "./recipe";

const batchItemNames = [
  "anuime-line-grid-background",
  "anuime-radial-field-background",
  "anuime-beam-background",
  "anuime-node-field-background",
  "anuime-framed-background",
  "anuime-signal-card",
  "anuime-trace-card",
  "anuime-metric-card",
  "anuime-bento-card",
  "anuime-comparison-card",
  "anuime-line-reveal",
  "anuime-word-cycle",
  "anuime-typewriter",
  "anuime-number-ticker",
] as const;

const characters = ["kira", "mochi", "atlas"] as const;

describe("AnUIme advanced atomic batch 1", () => {
  it.each(characters)("renders all 14 items as %s in both theme modes", (character) => {
    for (const mode of ["light", "dark"] as const) {
      const recipe = { ...createAnuimeRecipe(character), mode };
      const markup = renderToStaticMarkup(
        <div className={mode === "dark" ? "dark" : undefined}>
          <AnuimeLineGridBackground recipe={recipe}>Grid</AnuimeLineGridBackground>
          <AnuimeRadialFieldBackground recipe={recipe}>Radial</AnuimeRadialFieldBackground>
          <AnuimeBeamBackground recipe={recipe} active>
            Beam
          </AnuimeBeamBackground>
          <AnuimeNodeFieldBackground recipe={recipe}>Nodes</AnuimeNodeFieldBackground>
          <AnuimeFramedBackground recipe={recipe}>Frame</AnuimeFramedBackground>
          <AnuimeSignalCard recipe={recipe} title="Signal" />
          <AnuimeTraceCard recipe={recipe} title="Trace" />
          <AnuimeMetricCard recipe={recipe} label="Metric" value="42" />
          <AnuimeBentoCard recipe={recipe} title="Bento" />
          <AnuimeComparisonCard
            recipe={recipe}
            title="Compare"
            features={[{ label: "Included" }]}
          />
          <AnuimeLineReveal recipe={recipe}>Reveal</AnuimeLineReveal>
          <AnuimeWordCycle recipe={recipe} words={["One", "Two"]} />
          <AnuimeTypewriter recipe={recipe} text="Typing" />
          <AnuimeNumberTicker recipe={recipe} value={42} />
        </div>,
      );

      expect(markup.match(new RegExp(`data-character="${character}"`, "gu"))).toHaveLength(14);
      for (const item of batchItemNames) {
        expect(markup).toContain(`data-anuime-component="${item.replace("anuime-", "")}"`);
      }
    }
  });

  it("publishes consistent AnUIme metadata and declares the recipe dependency", () => {
    for (const item of batchItemNames) {
      const metadata = readFileSync(
        join(process.cwd(), "registry/items/lib/advanced", item, "_registry.mdx"),
        "utf8",
      );
      expect(metadata).toContain(`name: ${item}`);
      expect(metadata).toMatch(/title: "AnUIme /u);
      expect(metadata).toContain("  - anuime-recipe");
    }
  });

  it("keeps the approved contrast pairing lock and token-only color policy", () => {
    for (const item of batchItemNames) {
      const source = readFileSync(
        join(process.cwd(), "registry/items/lib/advanced", item, `${item}.tsx`),
        "utf8",
      );
      expect(source).not.toMatch(/#[\da-f]{3,8}\b/iu);
      expect(source).not.toMatch(/\b(?:rgb|hsl)a?\(/iu);
      expect(source).not.toContain("color-mix(");
      expect(source).not.toMatch(
        /\btext-(?:white|black|primary|primary-foreground|secondary|secondary-foreground|accent|accent-foreground|destructive|destructive-foreground)\b/u,
      );
    }
  });

  it("keeps authored directional angles and reduced-motion fallbacks", () => {
    const lineGrid = readSource("anuime-line-grid-background");
    const beam = readSource("anuime-beam-background");
    const trace = readSource("anuime-trace-card");
    const reveal = readSource("anuime-line-reveal");

    expect(lineGrid).toContain("114deg");
    expect(beam).toContain("rotate-[114deg]");
    expect(beam).toContain("rotate-[76deg]");
    expect(trace).toContain("rotate-[114deg]");
    expect(reveal).toContain("rotate(114deg)");
    expect(reveal).toContain("rotate(76deg)");
    expect(`${beam}${trace}${reveal}`).not.toMatch(/rotate(?:-\[|\()?(?:24|-14)deg/u);

    expect(beam).toContain("prefers-reduced-motion:reduce");
    expect(reveal).toContain("prefers-reduced-motion:reduce");
    expect(readSource("anuime-word-cycle")).toContain("prefers-reduced-motion: reduce");
    expect(readSource("anuime-typewriter")).toContain("prefers-reduced-motion: reduce");
    expect(readSource("anuime-number-ticker")).toContain("prefers-reduced-motion: reduce");
  });

  it("marks every ambient or animated item as Expressive with a bounded context", () => {
    for (const item of [
      "anuime-line-grid-background",
      "anuime-radial-field-background",
      "anuime-beam-background",
      "anuime-node-field-background",
      "anuime-framed-background",
      "anuime-line-reveal",
      "anuime-word-cycle",
      "anuime-typewriter",
      "anuime-number-ticker",
    ] as const) {
      const source = readSource(item);
      expect(source).toContain('data-anuime-tier="expressive"');
      expect(source).toContain("data-anuime-context");
    }
  });
});

function readSource(item: (typeof batchItemNames)[number]): string {
  return readFileSync(
    join(process.cwd(), "registry/items/lib/advanced", item, `${item}.tsx`),
    "utf8",
  );
}
