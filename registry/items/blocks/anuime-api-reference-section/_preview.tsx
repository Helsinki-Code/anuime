"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeApiReferenceSection } from "./anuime-api-reference-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeApiReferenceSection character={character} />;
}
