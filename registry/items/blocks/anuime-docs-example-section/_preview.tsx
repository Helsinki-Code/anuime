"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDocsExampleSection } from "./anuime-docs-example-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDocsExampleSection character={character} />;
}
