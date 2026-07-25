"use client";

import { AnuimeRadioGroup } from "./anuime-radio-group";

export function Preview() {
  return (
    <AnuimeRadioGroup
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
