"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeField } from "./anuime-field";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeField character={character} />;
}
