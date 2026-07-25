"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTextarea } from "./anuime-textarea";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeTextarea
      character={character}
      label="Mission brief"
      placeholder="Describe the intended experience…"
    />
  );
}
