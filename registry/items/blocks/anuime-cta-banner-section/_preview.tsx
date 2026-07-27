"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCtaBannerSection } from "./anuime-cta-banner-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeCtaBannerSection character={character} />;
}
