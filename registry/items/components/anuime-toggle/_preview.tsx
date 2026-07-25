"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeToggle } from "./anuime-toggle";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeToggle character={character}>Pin selection</AnuimeToggle>;
}
