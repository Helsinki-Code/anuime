"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFramedBackground } from "./anuime-framed-background";

export function Preview({ character = "atlas" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeFramedBackground character={character} className="min-h-56 p-8">
      <p className="font-mono text-xs text-muted-foreground uppercase">Bounded region</p>
      <h3 className="mt-3 text-2xl font-bold">A frame with a reason.</h3>
    </AnuimeFramedBackground>
  );
}
