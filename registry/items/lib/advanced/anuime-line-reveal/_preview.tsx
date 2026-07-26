"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLineReveal } from "./anuime-line-reveal";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeLineReveal character={character} className="text-3xl font-bold">
      Character is construction.
    </AnuimeLineReveal>
  );
}
