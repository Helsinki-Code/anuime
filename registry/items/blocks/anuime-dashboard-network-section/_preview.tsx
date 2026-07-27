"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDashboardNetworkSection } from "./anuime-dashboard-network-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeDashboardNetworkSection character={character} />;
}
