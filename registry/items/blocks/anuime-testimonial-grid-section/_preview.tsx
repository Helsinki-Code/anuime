"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeTestimonialGridSection } from "./anuime-testimonial-grid-section";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return <AnuimeTestimonialGridSection character={character} />;
}
