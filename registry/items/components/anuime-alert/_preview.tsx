"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAlert } from "./anuime-alert";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeAlert character={character} />;
}
