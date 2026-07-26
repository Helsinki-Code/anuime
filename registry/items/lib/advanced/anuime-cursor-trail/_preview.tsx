"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCursorTrail } from "./anuime-cursor-trail";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeCursorTrail
      character={character}
      className="grid min-h-52 place-items-center border border-border"
    >
      <span className="text-sm text-muted-foreground">Trace the authored axis</span>
    </AnuimeCursorTrail>
  );
}
