"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeScrambleText } from "./anuime-scramble-text";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeScrambleText
      character={character}
      text="SYSTEM RESOLVED"
      className="text-xl font-bold"
    />
  );
}
