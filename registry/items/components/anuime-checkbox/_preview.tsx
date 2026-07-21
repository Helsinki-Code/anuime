"use client";
import { AnuimeCheckbox } from "./anuime-checkbox";
export function Preview() {
  return (
    <AnuimeCheckbox
      character="atlas"
      label="Enable tactical motion"
      description="Respects the system reduced-motion preference."
      defaultChecked
    />
  );
}
