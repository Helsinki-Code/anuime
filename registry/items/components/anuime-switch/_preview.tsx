"use client";

import { AnuimeSwitch } from "./anuime-switch";

export function Preview() {
  return (
    <AnuimeSwitch
      label="Enable signature power"
      description="Respects reduced-motion settings."
      defaultChecked
    />
  );
}
