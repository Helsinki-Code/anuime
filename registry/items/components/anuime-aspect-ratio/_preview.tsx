"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAspectRatio } from "./anuime-aspect-ratio";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeAspectRatio character={character} />;
}
