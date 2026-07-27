"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCustomerMetricsSection } from "./anuime-customer-metrics-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCustomerMetricsSection character={character} />;
}
