"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDocsShellSection } from "./anuime-docs-shell-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDocsShellSection character={character} />;
}
