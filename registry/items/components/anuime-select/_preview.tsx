"use client";
import { AnuimeSelect } from "./anuime-select";
export function Preview() {
  return (
    <AnuimeSelect
      character="mochi"
      label="Choose your familiar"
      options={[
        { value: "kira", label: "Kira — Incisive" },
        { value: "mochi", label: "Mochi — Gracious" },
        { value: "atlas", label: "Atlas — Engineered" },
      ]}
      hint="You can mix individual dimensions later."
    />
  );
}
