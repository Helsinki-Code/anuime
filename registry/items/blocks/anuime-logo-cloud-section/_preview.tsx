"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeLogoCloudSection } from "./anuime-logo-cloud-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeLogoCloudSection character={character} />;
}
