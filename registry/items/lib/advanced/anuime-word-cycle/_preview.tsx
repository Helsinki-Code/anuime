"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeWordCycle } from "./anuime-word-cycle";

export function Preview({ character = "mochi" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeWordCycle
      character={character}
      words={["precise", "gracious", "structural"]}
      className="text-2xl"
    />
  );
}
