"use client";

import { AnuimeRadioGroup } from "./anuime-radio-group";

export function Preview() {
  return (
    <AnuimeRadioGroup
      legend="Choose a power"
      defaultValue="signal"
      options={[
        { value: "signal", label: "Signal Cut" },
        { value: "cache", label: "Dream Cache" },
        { value: "grid", label: "Gridforge" },
      ]}
    />
  );
}
