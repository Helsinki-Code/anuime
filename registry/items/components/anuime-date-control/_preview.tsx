"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDateControl } from "./anuime-date-control";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeDateControl
      character={character}
      label="Launch date"
      hint="Uses your browser and locale date controls."
    />
  );
}
