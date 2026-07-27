"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeOnboardingStepsSection } from "./anuime-onboarding-steps-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeOnboardingStepsSection character={character} />;
}
