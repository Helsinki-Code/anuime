"use client";
import { AnuimeSelect } from "./anuime-select";
export function Preview() {
  return (
    <AnuimeSelect
      character="mochi"
      label="Choose your familiar"
      options={[
        { value: "kira", label: "Kira — Neon Ronin" },
        { value: "mochi", label: "Mochi — Dream Familiar" },
        { value: "atlas", label: "Atlas — Mecha Architect" },
      ]}
      hint="You can mix individual dimensions later."
    />
  );
}
