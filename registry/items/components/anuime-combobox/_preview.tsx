"use client";

import { AnuimeCombobox } from "./anuime-combobox";

export function Preview() {
  return (
    <AnuimeCombobox
      label="Find a component"
      placeholder="Start typing…"
      options={[
        { value: "Button", label: "Button" },
        { value: "Accordion", label: "Accordion" },
      ]}
    />
  );
}
