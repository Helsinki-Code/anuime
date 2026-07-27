"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFloatingNavSection } from "./anuime-floating-nav-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFloatingNavSection character={character} />;
}
