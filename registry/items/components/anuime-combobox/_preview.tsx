"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeCombobox } from "./anuime-combobox";

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeCombobox
      character={character}
      label="Find a component"
      placeholder="Start typing…"
      options={[
        { value: "Button", label: "Button" },
        { value: "Accordion", label: "Accordion" },
      ]}
    />
  );
}
