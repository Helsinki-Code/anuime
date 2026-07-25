"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeAvatar } from "./anuime-avatar";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeAvatar character={character} />;
}
