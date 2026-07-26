"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCursorHighlight } from "./anuime-cursor-highlight";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeCursorHighlight
      character={character}
      className="grid min-h-52 place-items-center border border-border"
    >
      <span className="text-sm text-muted-foreground">Move across the field</span>
    </AnuimeCursorHighlight>
  );
}
