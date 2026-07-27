"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeHeroDeveloperSection } from "./anuime-hero-developer-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeHeroDeveloperSection character={character} />;
}
