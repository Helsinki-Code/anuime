"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeOnboardingCompleteSection } from "./anuime-onboarding-complete-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeOnboardingCompleteSection character={character} />;
}
