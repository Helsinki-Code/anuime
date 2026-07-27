"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDocsNavSection } from "./anuime-docs-nav-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDocsNavSection character={character} />;
}
