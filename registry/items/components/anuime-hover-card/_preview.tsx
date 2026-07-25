"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHoverCard } from "./anuime-hover-card";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHoverCard character={character} />;
}
