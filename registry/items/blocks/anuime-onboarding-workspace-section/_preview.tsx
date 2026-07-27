"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeOnboardingWorkspaceSection } from "./anuime-onboarding-workspace-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeOnboardingWorkspaceSection character={character} />;
}
