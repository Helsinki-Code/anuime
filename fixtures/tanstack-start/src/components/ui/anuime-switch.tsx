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

const switchConstruction = {
  kira: {
    track: "rounded-[5px]",
    thumb: "rounded-[3px]",
  },
  mochi: {
    track: "rounded-[8px]",
    thumb: "rounded-full",
  },
  atlas: {
    track: "rounded-[4px]",
    thumb: "rounded-[2px]",
  },
} as const;

export function AnuimeSwitch({
  character = "mochi",
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
  const styles = resolveAnuimeRecipe(recipe, character, "switch");
  const system = styles.recipe.structureSystem;
  const construction = switchConstruction[system];
  const toggle = () => {
    if (disabled) return;
    const next = !active;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  const thumbRing = active
    ? system === "mochi"
      ? "inset 0 0 0 1.5px var(--anuime-secondary-accent, var(--border))"
      : system === "kira"
        ? "inset 0 0 0 1px var(--anuime-accent, var(--accent))"
        : "none"
    : "inset 0 0 0 1px var(--anuime-border-strong, var(--input))";

  return (
    <div
      data-character={system}
      className="flex max-w-sm items-center justify-between gap-4 text-foreground"
    >
      <div className="min-w-0">
        <span id={`${id}-label`} className="block text-sm leading-5 font-semibold">
          {label}
        </span>
        {description ? (
          <span
            id={`${id}-description`}
            className="mt-0.5 block text-xs leading-5 text-muted-foreground"
          >
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
        className={`relative h-[22px] w-10 shrink-0 border p-0 transition-[background-color,border-color,box-shadow] duration-[var(--anuime-transition-duration,180ms)] outline-none focus-visible:ring-[1.5px] focus-visible:ring-[var(--anuime-accent,var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
          active
            ? "border-transparent bg-[var(--anuime-accent,var(--accent))]"
            : "border-[var(--anuime-border-strong,var(--input))] bg-transparent"
        } ${construction.track}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 grid size-4 place-items-center bg-[var(--anuime-surface,var(--background))] transition-[left,box-shadow] duration-[var(--anuime-transition-duration,180ms)] ${
            active ? "left-[21px]" : "left-0.5"
          } ${construction.thumb}`}
          style={{ boxShadow: thumbRing }}
        >
          {system === "atlas" ? (
            <span
              className={`h-2 w-[1.5px] rounded-[1px] ${
                active
                  ? "bg-[var(--anuime-accent,var(--accent))]"
                  : "bg-[var(--anuime-border-strong,var(--input))]"
              }`}
            />
          ) : null}
        </span>
      </button>
    </div>
  );
}
