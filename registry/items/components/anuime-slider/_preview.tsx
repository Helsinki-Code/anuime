"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeSlider } from "./anuime-slider";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeSlider character={character} />;
}
