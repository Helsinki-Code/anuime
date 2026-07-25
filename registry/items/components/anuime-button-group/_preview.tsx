"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeButtonGroup } from "./anuime-button-group";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeButtonGroup character={character} />;
}
