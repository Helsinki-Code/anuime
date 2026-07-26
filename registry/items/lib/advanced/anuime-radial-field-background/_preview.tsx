"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeRadialFieldBackground } from "./anuime-radial-field-background";

export function Preview({ character = "mochi" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeRadialFieldBackground character={character} className="min-h-56 p-8">
      <p className="font-mono text-xs text-muted-foreground uppercase">Localized signal</p>
      <h3 className="mt-3 text-2xl font-bold">Focus gathers here.</h3>
    </AnuimeRadialFieldBackground>
  );
}
