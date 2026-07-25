"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDrawer } from "./anuime-drawer";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDrawer character={character} />;
}
