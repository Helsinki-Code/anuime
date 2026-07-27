"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDashboardOperationsSection } from "./anuime-dashboard-operations-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDashboardOperationsSection character={character} />;
}
