"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDashboardDeveloperSection } from "./anuime-dashboard-developer-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDashboardDeveloperSection character={character} />;
}
