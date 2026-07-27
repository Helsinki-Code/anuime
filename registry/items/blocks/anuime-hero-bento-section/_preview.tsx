"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHeroBentoSection } from "./anuime-hero-bento-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHeroBentoSection character={character} />;
}
