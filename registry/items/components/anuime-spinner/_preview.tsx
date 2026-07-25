"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSpinner } from "./anuime-spinner";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSpinner character={character} />;
}
