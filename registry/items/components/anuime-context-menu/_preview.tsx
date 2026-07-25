"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeContextMenu } from "./anuime-context-menu";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeContextMenu character={character} />;
}
