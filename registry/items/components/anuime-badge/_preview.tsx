"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeStatusIndicator } from "./anuime-badge";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeStatusIndicator character={character} label="Ready to install" />;
}
