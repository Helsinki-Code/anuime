"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeRadioGroup } from "./anuime-radio-group";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeRadioGroup
      character={character}
      legend="Choose a construction system"
      defaultValue="blade"
      options={[
        { value: "blade", label: "Blade trace" },
        { value: "pearl", label: "Pearl clasp" },
        { value: "strap", label: "Docked strap" },
      ]}
    />
  );
}
