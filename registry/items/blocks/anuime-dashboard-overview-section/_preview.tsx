"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDashboardOverviewSection } from "./anuime-dashboard-overview-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDashboardOverviewSection character={character} />;
}
