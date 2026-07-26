"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStickyReveal } from "./anuime-sticky-reveal";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeStickyReveal
      character={character}
      eyebrow="Character system"
      title="A reveal with provenance."
      body="One controlled entrance, then a stable reading surface."
    />
  );
}
