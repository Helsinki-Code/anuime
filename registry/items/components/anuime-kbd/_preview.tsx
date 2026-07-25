"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeKbd } from "./anuime-kbd";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeKbd character={character} />;
}
