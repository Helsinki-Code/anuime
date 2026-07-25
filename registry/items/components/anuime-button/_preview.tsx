"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeButton } from "./anuime-button";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeButton character={character}>Activate system</AnuimeButton>;
}
