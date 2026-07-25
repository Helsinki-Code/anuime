"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSkeleton } from "./anuime-skeleton";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSkeleton character={character} label="Loading mission details" />;
}
