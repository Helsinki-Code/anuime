"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTable } from "./anuime-table";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeTable character={character} />;
}
