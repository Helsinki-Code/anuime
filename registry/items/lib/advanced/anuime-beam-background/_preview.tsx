"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeBeamBackground } from "./anuime-beam-background";

export function Preview({ character = "atlas" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeBeamBackground character={character} active className="min-h-56 p-8">
      <p className="font-mono text-xs text-muted-foreground uppercase">Transition field</p>
      <h3 className="mt-3 text-2xl font-bold">Direction, authored.</h3>
    </AnuimeBeamBackground>
  );
}
