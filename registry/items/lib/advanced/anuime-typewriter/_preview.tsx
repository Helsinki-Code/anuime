"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTypewriter } from "./anuime-typewriter";

export function Preview({ character = "atlas" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTypewriter character={character} text="Resolving component graph…" className="text-lg" />
  );
}
