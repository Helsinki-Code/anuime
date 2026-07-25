"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeInput } from "./anuime-input";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeInput
      character={character}
      label="Call sign"
      hint="This is how your party will know you."
      placeholder="Starlight"
    />
  );
}
