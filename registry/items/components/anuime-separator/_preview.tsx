"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSeparator } from "./anuime-separator";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSeparator character={character} />;
}
