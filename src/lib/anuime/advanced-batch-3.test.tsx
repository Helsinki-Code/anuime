import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AnuimeChartCallout } from "../../../registry/items/lib/advanced/anuime-chart-callout/anuime-chart-callout";
import { AnuimeConfettiField } from "../../../registry/items/lib/advanced/anuime-confetti-field/anuime-confetti-field";
import { AnuimeCursorHighlight } from "../../../registry/items/lib/advanced/anuime-cursor-highlight/anuime-cursor-highlight";
import { AnuimeCursorTrail } from "../../../registry/items/lib/advanced/anuime-cursor-trail/anuime-cursor-trail";
import { AnuimeNodeMap } from "../../../registry/items/lib/advanced/anuime-node-map/anuime-node-map";
import { AnuimeOrbitMap } from "../../../registry/items/lib/advanced/anuime-orbit-map/anuime-orbit-map";
import { AnuimePageLoader } from "../../../registry/items/lib/advanced/anuime-page-loader/anuime-page-loader";
import { AnuimeParallaxLayer } from "../../../registry/items/lib/advanced/anuime-parallax-layer/anuime-parallax-layer";
import { AnuimeParticleField } from "../../../registry/items/lib/advanced/anuime-particle-field/anuime-particle-field";
import { AnuimeProgressLoader } from "../../../registry/items/lib/advanced/anuime-progress-loader/anuime-progress-loader";
import { AnuimeScrollStack } from "../../../registry/items/lib/advanced/anuime-scroll-stack/anuime-scroll-stack";
import { AnuimeStickyReveal } from "../../../registry/items/lib/advanced/anuime-sticky-reveal/anuime-sticky-reveal";
import { AnuimeSuccessBurst } from "../../../registry/items/lib/advanced/anuime-success-burst/anuime-success-burst";
import { AnuimeTimelineFlow } from "../../../registry/items/lib/advanced/anuime-timeline-flow/anuime-timeline-flow";
import { createAnuimeRecipe } from "./recipe";

const batchItemNames = [
  "anuime-node-map",
  "anuime-orbit-map",
  "anuime-timeline-flow",
  "anuime-chart-callout",
  "anuime-scroll-stack",
  "anuime-parallax-layer",
  "anuime-sticky-reveal",
  "anuime-cursor-highlight",
  "anuime-cursor-trail",
  "anuime-page-loader",
  "anuime-progress-loader",
  "anuime-success-burst",
  "anuime-particle-field",
  "anuime-confetti-field",
] as const;

const expressiveItems = batchItemNames.filter(
  (item) => !["anuime-node-map", "anuime-timeline-flow", "anuime-chart-callout"].includes(item),
);
const characters = ["kira", "mochi", "atlas"] as const;
const advancedRoot = join(process.cwd(), "registry/items/lib/advanced");

describe("AnUIme advanced atomic batch 3", () => {
  it.each(characters)("renders all 14 items as %s in both theme modes", (character) => {
    for (const mode of ["light", "dark"] as const) {
      const recipe = { ...createAnuimeRecipe(character), mode };
      const markup = renderToStaticMarkup(
        <div className={mode === "dark" ? "dark" : undefined}>
          <AnuimeNodeMap recipe={recipe} nodes={[{ id: "a", label: "A", x: 50, y: 50 }]} />
          <AnuimeOrbitMap recipe={recipe} />
          <AnuimeTimelineFlow recipe={recipe} items={[{ id: "a", title: "A" }]} />
          <AnuimeChartCallout recipe={recipe} label="Value" value="42" />
          <AnuimeScrollStack recipe={recipe} items={[{ id: "a", content: <span>A</span> }]} />
          <AnuimeParallaxLayer recipe={recipe} layers={[{ id: "a", content: <span>A</span> }]} />
          <AnuimeStickyReveal recipe={recipe} title="Reveal" />
          <AnuimeCursorHighlight recipe={recipe}>Highlight</AnuimeCursorHighlight>
          <AnuimeCursorTrail recipe={recipe}>Trail</AnuimeCursorTrail>
          <AnuimePageLoader recipe={recipe} />
          <AnuimeProgressLoader recipe={recipe} value={50} />
          <AnuimeSuccessBurst recipe={recipe} />
          <AnuimeParticleField recipe={recipe}>Field</AnuimeParticleField>
          <AnuimeConfettiField recipe={recipe}>Success</AnuimeConfettiField>
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

  it("publishes consistent registry:ui metadata with the recipe dependency", () => {
    for (const item of batchItemNames) {
      const metadata = readMetadata(item);
      expect(metadata).toContain(`name: ${item}`);
      expect(metadata).toContain("type: registry:ui");
      expect(metadata).toMatch(/title: "AnUIme /u);
      expect(metadata).toContain("  - anuime-recipe");
      expect(metadata).toContain(`  - path: ${item}.tsx`);
    }
  });

  it("keeps registry previews aligned with the Kira specimen frame and prevents field collapse", () => {
    for (const item of batchItemNames) {
      expect(readPreview(item)).toContain('character = "kira"');
    }

    for (const item of [
      "anuime-node-map",
      "anuime-timeline-flow",
      "anuime-scroll-stack",
      "anuime-parallax-layer",
      "anuime-sticky-reveal",
      "anuime-cursor-highlight",
      "anuime-cursor-trail",
      "anuime-page-loader",
      "anuime-progress-loader",
      "anuime-particle-field",
      "anuime-confetti-field",
    ] as const) {
      expect(readSource(item)).toContain("w-full");
    }
    expect(readPreview("anuime-scroll-stack")).toContain('minHeight: "32rem"');
  });

  it("renders the approved workhorse carriers instead of generic shared skins", () => {
    const node = forCharacters((character) => (
      <AnuimeNodeMap
        character={character}
        nodes={[{ id: "a", label: "A", x: 50, y: 50, active: true }]}
      />
    ));
    expect(node.kira).toContain("size-[3px]");
    expect(node.mochi).toContain("rounded-full");
    expect(node.atlas).toContain("rotate-45");

    const timeline = forCharacters((character) => (
      <AnuimeTimelineFlow character={character} currentId="a" items={[{ id: "a", title: "A" }]} />
    ));
    expect(timeline.kira).toContain("border-r-2 border-b-2");
    expect(timeline.mochi).toContain("rounded-full");
    expect(timeline.atlas).toContain("before:w-1");

    const callout = forCharacters((character) => (
      <AnuimeChartCallout character={character} label="Value" value="42" />
    ));
    expect(callout.kira).toContain("skew-x-[-18deg]");
    expect(callout.kira).toContain("rounded-full");
    expect(callout.mochi).toContain("<svg");
    expect(callout.mochi).toContain("rounded-full");
    expect(callout.atlas).toContain("rotate-45");
    expect(callout.atlas).toContain("border-t-2 border-l-2");
  });

  it("renders every approved expressive carrier and exact directional construction", () => {
    const orbit = forCharacters((character) => <AnuimeOrbitMap character={character} />);
    expect(orbit.kira).toContain("rounded-full border");
    expect(orbit.mochi).toContain("left-[38%] top-[18%]");
    expect(orbit.atlas).toContain("rotate-45");

    const scrollStack = forCharacters((character) => (
      <AnuimeScrollStack character={character} items={[{ id: "a", content: <span>A</span> }]} />
    ));
    expect(scrollStack.kira).toContain("rotate-[114deg]");
    expect(scrollStack.mochi).toContain("rounded-full border-t");
    expect(scrollStack.atlas).toContain("border-t-2 border-r-2");

    const parallax = forCharacters((character) => (
      <AnuimeParallaxLayer character={character} layers={[{ id: "a", content: <span>A</span> }]} />
    ));
    expect(parallax.kira.match(/rotate-\[114deg\]/gu)?.length).toBe(2);
    expect(parallax.mochi).toContain("opacity-[0.04]");
    expect(parallax.atlas.match(/rotate-\[76deg\]/gu)?.length).toBe(2);
    expect(readSource("anuime-parallax-layer")).toContain("Math.cos(axisRadians)");

    const sticky = forCharacters((character) => (
      <AnuimeStickyReveal character={character} title="Reveal" />
    ));
    expect(sticky.kira).toContain("rotate-[114deg]");
    expect(sticky.kira).toContain("rounded-full");
    expect(sticky.mochi).toContain("rounded-full border-t");
    expect(sticky.atlas).toContain("rotate-[76deg]");
    expect(sticky.atlas).toContain("border-t-2 border-l-2");

    const cursor = forCharacters((character) => (
      <AnuimeCursorHighlight character={character}>Target</AnuimeCursorHighlight>
    ));
    expect(cursor.kira).toContain("rounded-full");
    expect(cursor.kira).toContain("rotate-45");
    expect(cursor.mochi).toContain("opacity-20");
    expect(cursor.atlas).toContain("border-t-2 border-l-2");
    expect(cursor.atlas).toContain("rotate-45");

    const trail = forCharacters((character) => (
      <AnuimeCursorTrail character={character}>Target</AnuimeCursorTrail>
    ));
    expect(trail.kira.match(/data-anuime-trail-point/gu)?.length).toBe(4);
    expect(trail.mochi.match(/data-anuime-trail-point/gu)?.length).toBe(3);
    expect(trail.atlas.match(/data-anuime-trail-point/gu)?.length).toBe(4);
    expect(readSource("anuime-cursor-trail")).toContain("Math.cos(axisRadians)");

    const loader = forCharacters((character) => <AnuimePageLoader character={character} />);
    expect(loader.kira).toContain("skew-x-[-24deg]");
    expect(loader.mochi).toContain("anuime-mochi-orbit");
    expect(loader.atlas).toContain("anuime-atlas-bracket-tl");
    expect(loader.atlas).toContain("anuime-atlas-bracket-br");

    const progress = forCharacters((character) => <AnuimeProgressLoader character={character} />);
    expect(progress.kira).toContain("after:left-full");
    expect(progress.mochi).toContain("rounded-full");
    expect(progress.atlas).toContain("rotate-45");

    const success = forCharacters((character) => <AnuimeSuccessBurst character={character} />);
    expect(success.kira).toContain("anuime-success-fragment");
    expect(success.mochi.match(/data-motif="mochi-star"/gu)?.length).toBe(1);
    expect(success.atlas).toContain("rotate-45");

    const particles = forCharacters((character) => (
      <AnuimeParticleField character={character}>Field</AnuimeParticleField>
    ));
    expect(particles.kira).toContain("rotate-[114deg]");
    expect(particles.mochi).toContain("opacity-20");
    expect(particles.atlas).toContain("rounded-full border-2");

    const confetti = forCharacters((character) => (
      <AnuimeConfettiField character={character}>Success</AnuimeConfettiField>
    ));
    expect(confetti.kira).toContain("skew-x-[-18deg]");
    expect(confetti.mochi.match(/data-motif="mochi-star"/gu)?.length).toBe(1);
    expect(confetti.atlas).toContain("rotate-45");
    expect(readSource("anuime-confetti-field")).toContain("Math.cos((114 * Math.PI) / 180)");
  });

  it("preserves the contrast lock and token-only color policy", () => {
    for (const item of batchItemNames) {
      const source = readSource(item);
      expect(source).not.toMatch(/#[\da-f]{3,8}\b/iu);
      expect(source).not.toMatch(/\b(?:rgb|hsl)a?\(/iu);
      expect(source).not.toContain("color-mix(");
      expect(source).not.toMatch(/\btext-(?:white|black|primary|secondary|accent|destructive)\b/u);
    }
  });

  it("uses only approved angles and exact motion timings", () => {
    const sources = batchItemNames.map(readSource).join("\n");
    for (const angle of [
      "rotate-[114deg]",
      "rotate-[76deg]",
      "skew-x-[-18deg]",
      "skew-x-[-24deg]",
      "rotate-45",
    ]) {
      expect(sources).toContain(angle);
    }
    expect(sources).not.toMatch(/(?:rotate|skew)[^"\s]*(?:225|40deg|-8deg|-45deg)/u);
    for (const timing of ["240ms", "250ms", "180ms", "1000ms", "1150ms", "1200ms", "1700ms"]) {
      expect(sources).toContain(timing);
    }
  });

  it("gates every expressive item and supplies a reduced-motion fallback", () => {
    for (const item of expressiveItems) {
      const source = readSource(item);
      expect(source).toContain('data-anuime-tier="expressive"');
      expect(source).toMatch(/motion-reduce:|prefers-reduced-motion/u);
    }
    for (const item of [
      "anuime-node-map",
      "anuime-timeline-flow",
      "anuime-chart-callout",
    ] as const) {
      expect(readSource(item)).not.toContain("data-anuime-tier");
    }
  });

  it("keeps cursor effects additive and Mochi celebration restrained", () => {
    for (const item of ["anuime-cursor-highlight", "anuime-cursor-trail"] as const) {
      expect(readSource(item)).not.toContain("cursor-none");
    }
    const mochiSuccess = renderToStaticMarkup(<AnuimeConfettiField character="mochi" />);
    expect(mochiSuccess.match(/data-motif="mochi-star"/gu)?.length).toBe(1);
    expect(readSource("anuime-confetti-field")).not.toMatch(/infinite/u);
    expect(readSource("anuime-success-burst")).not.toMatch(/animation:[^;}]*infinite/u);
  });
});

function readMetadata(item: (typeof batchItemNames)[number]): string {
  return readFileSync(join(advancedRoot, item, "_registry.mdx"), "utf8");
}

function readSource(item: (typeof batchItemNames)[number]): string {
  return readFileSync(join(advancedRoot, item, `${item}.tsx`), "utf8");
}

function readPreview(item: (typeof batchItemNames)[number]): string {
  return readFileSync(join(advancedRoot, item, "_preview.tsx"), "utf8");
}

function forCharacters(render: (character: (typeof characters)[number]) => ReactNode) {
  return {
    kira: renderToStaticMarkup(render("kira")),
    mochi: renderToStaticMarkup(render("mochi")),
    atlas: renderToStaticMarkup(render("atlas")),
  };
}
