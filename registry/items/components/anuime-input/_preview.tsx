"use client";

import { AnuimeInput } from "./anuime-input";

export function Preview() {
  return (
    <AnuimeInput
      character="mochi"
      label="Call sign"
      hint="This is how your party will know you."
      placeholder="Starlight"
    />
  );
}
