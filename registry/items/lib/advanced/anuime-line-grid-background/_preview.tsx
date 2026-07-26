"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLineGridBackground } from "./anuime-line-grid-background";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeLineGridBackground character={character} className="min-h-56 p-8">
      <p className="font-mono text-xs text-muted-foreground uppercase">Ambient field</p>
      <h3 className="mt-3 text-2xl font-bold">Structure without noise.</h3>
    </AnuimeLineGridBackground>
  );
}
