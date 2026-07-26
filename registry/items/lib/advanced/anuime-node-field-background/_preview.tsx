"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeNodeFieldBackground } from "./anuime-node-field-background";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeNodeFieldBackground character={character} className="min-h-56 p-8">
      <p className="font-mono text-xs text-muted-foreground uppercase">Network state</p>
      <h3 className="mt-3 text-2xl font-bold">Signals stay connected.</h3>
    </AnuimeNodeFieldBackground>
  );
}
