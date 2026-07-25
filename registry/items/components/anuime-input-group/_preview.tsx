"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeInputGroup } from "./anuime-input-group";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeInputGroup character={character} />;
}
