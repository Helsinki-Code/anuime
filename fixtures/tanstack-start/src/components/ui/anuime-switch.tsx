"use client";

import { useId, useState } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSwitchProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function AnuimeSwitch({
  character = "kira",
  recipe,
  label,
  description,
  checked,
  defaultChecked = false,
  disabled,
  onCheckedChange,
}: AnuimeSwitchProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultChecked);
  const active = checked ?? internal;
  const styles = resolveAnuimeRecipe(recipe, character);
  const toggle = () => {
    if (disabled) return;
    const next = !active;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };
  return (
    <div className="flex max-w-sm items-center justify-between gap-4">
      <div>
        <span id={`${id}-label`} className="block text-sm font-semibold">
          {label}
        </span>
        {description ? (
          <span id={`${id}-description`} className="mt-1 block text-xs text-muted-foreground">
            {description}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-description` : undefined}
        disabled={disabled}
        onClick={toggle}
        className={`relative h-7 w-12 shrink-0 border p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 ${styles.control} ${active ? styles.primary : styles.secondary}`}
      >
        <span
          className={`block size-5 rounded-full bg-current transition-transform ${active ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
