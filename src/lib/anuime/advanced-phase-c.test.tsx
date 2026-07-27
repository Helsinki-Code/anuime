import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import inventory from "../../../design-spec/advanced-catalog-phase-a.json";
import laws from "../../../design-spec/laws.json";

type Character = "kira" | "mochi" | "atlas";
type SectionModule = Record<string, ComponentType<{ character?: Character }>>;

const blockModules = import.meta.glob<SectionModule>(
  "../../../registry/items/blocks/anuime-*-section/anuime-*-section.tsx",
  { eager: true },
);
const blocksRoot = join(process.cwd(), "registry/items/blocks");
const sections = inventory.composedSections;
const infrastructureDependencies = [
  "anuime-theme-kira",
  "anuime-theme-mochi",
  "anuime-theme-atlas",
  "anuime-recipe",
];
const characters: Character[] = ["kira", "mochi", "atlas"];
const expectedCategories = [
  "auth",
  "pricing",
  "blog",
  "features",
  "hero",
  "nav",
  "social-proof",
  "cta",
  "stats",
  "team",
  "faq",
  "contact",
  "dashboard",
  "ecommerce",
  "onboarding",
  "changelog",
  "careers",
  "status",
  "waitlist",
  "docs",
];

describe("AnUIme advanced Phase C composed sections", () => {
  it("matches the approved 60-section, 20-category inventory exactly", () => {
    expect(sections).toHaveLength(60);
    expect(new Set(sections.map((section) => section.id)).size).toBe(60);
    expect([...new Set(sections.map((section) => section.category))]).toEqual(expectedCategories);
    expect(Object.keys(blockModules)).toHaveLength(60);
  });

  it("publishes a source, preview, and registry manifest for every section", () => {
    for (const section of sections) {
      const directory = join(blocksRoot, section.id);
      expect(existsSync(join(directory, `${section.id}.tsx`))).toBe(true);
      expect(existsSync(join(directory, "_preview.tsx"))).toBe(true);
      expect(existsSync(join(directory, "_registry.mdx"))).toBe(true);
    }
  });

  it("composes every approved dependency in source and declares the exact install graph", () => {
    for (const section of sections) {
      const source = readSource(section.id);
      const registry = readRegistry(section.id);
      const approvedDependencies = [...section.existing, ...section.new];
      const declaredDependencies = readLocalRegistryDependencies(registry);

      expect(declaredDependencies).toEqual([
        ...infrastructureDependencies,
        ...approvedDependencies,
      ]);
      for (const dependency of approvedDependencies) {
        const exportName = componentExportName(dependency);
        expect(
          source.match(new RegExp(`\\b${exportName}\\b`, "g"))?.length ?? 0,
        ).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("keeps authored section styling to semantic layout and cleared token pairings", () => {
    for (const section of sections) {
      const source = readSource(section.id);
      expect(source).not.toMatch(/#[\da-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(|color-mix\(/i);
      expect(source).not.toMatch(/(?:rotate|skew|linear-gradient)\s*[-[(]?\s*\d/i);
      expect(source).not.toMatch(/\b(?:animate|duration|transition|ease|delay)-/);
      expect(source).not.toMatch(/\b(?:bg|text|border)-(?:primary|secondary|accent|destructive)\b/);
      expect(source).toContain("bg-background");
      expect(source).toContain("text-foreground");
      expect(source).toContain("text-muted-foreground");
    }
  });

  it("uses only real law citations from the authoritative law file", () => {
    const lawIds = collectLawIds(laws);
    for (const section of sections) {
      const source = readSource(section.id);
      const registry = readRegistry(section.id);
      const cited = [
        ...source.matchAll(/data-anuime-laws="([^"]+)"/g),
        ...registry.matchAll(/`((?:global|kira|mochi|atlas)\.[^`]+)`/g),
      ].flatMap((match) => match[1].split(/\s+/));

      expect(cited.length).toBeGreaterThan(0);
      for (const citation of cited) {
        expect(lawIds.has(citation)).toBe(true);
      }
    }
  });

  it("keeps delight primitives inside approved success contexts", () => {
    const expressiveSuccessDependencies = new Set([
      "anuime-confetti-field",
      "anuime-particle-field",
      "anuime-success-burst",
    ]);
    const expressiveSectionIds = sections
      .filter((section) =>
        [...section.existing, ...section.new].some((dependency) =>
          expressiveSuccessDependencies.has(dependency),
        ),
      )
      .map((section) => section.id);
    expect(expressiveSectionIds.every((id) => /(?:success|complete|checkout)/.test(id))).toBe(true);
  });

  it("renders all sixty compositions for every character without losing provenance", () => {
    for (const section of sections) {
      const modulePath = Object.keys(blockModules).find((path) =>
        path.endsWith(`/${section.id}/${section.id}.tsx`),
      );
      expect(modulePath).toBeDefined();
      const exportName = sectionExportName(section.id);
      const Component = blockModules[modulePath ?? ""]?.[exportName];
      expect(Component).toBeTypeOf("function");

      for (const character of characters) {
        const markup = renderToStaticMarkup(createElement(Component, { character }));
        expect(markup).toContain(`data-anuime-section="${section.id}"`);
        expect(markup).toContain(`data-anuime-category="${section.category}"`);
        expect(markup).toContain(`data-character="${character}"`);
      }
    }
  });
});

function readSource(id: string) {
  return readFileSync(join(blocksRoot, id, `${id}.tsx`), "utf8");
}

function readRegistry(id: string) {
  return readFileSync(join(blocksRoot, id, "_registry.mdx"), "utf8");
}

function readLocalRegistryDependencies(registry: string) {
  const body = registry.match(/localRegistryDependencies:\n([\s\S]*?)\nfiles:/)?.[1] ?? "";
  return [...body.matchAll(/^\s+-\s+(.+)$/gm)].map((match) => match[1].trim());
}

function componentExportName(id: string) {
  return `Anuime${humanize(id)}`;
}

function sectionExportName(id: string) {
  return `Anuime${humanize(id)}`;
}

function humanize(id: string) {
  return id
    .replace(/^anuime-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function collectLawIds(value: unknown, ids = new Set<string>()) {
  if (Array.isArray(value)) {
    for (const item of value) collectLawIds(item, ids);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "id" && typeof item === "string") ids.add(item);
      collectLawIds(item, ids);
    }
  }
  return ids;
}
