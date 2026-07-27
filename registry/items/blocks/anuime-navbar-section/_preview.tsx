"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeNavbarSection } from "./anuime-navbar-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeNavbarSection character={character} />;
}
