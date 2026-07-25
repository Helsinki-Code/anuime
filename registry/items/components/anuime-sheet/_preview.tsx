"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSheet } from "./anuime-sheet";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSheet character={character} />;
}
