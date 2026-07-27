"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeFeatureBentoSection } from "./anuime-feature-bento-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeFeatureBentoSection character={character} />;
}
