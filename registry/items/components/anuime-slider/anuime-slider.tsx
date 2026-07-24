import type { InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  output?: string;
};

const sliderConstruction = {
  kira: "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[2px] [&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-[var(--anuime-accent,var(--accent))] [&::-webkit-slider-thumb]:bg-[var(--anuime-surface,var(--background))] [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rotate-45 [&::-moz-range-thumb]:rounded-[2px] [&::-moz-range-thumb]:border-[1.5px] [&::-moz-range-thumb]:border-[var(--anuime-accent,var(--accent))] [&::-moz-range-thumb]:bg-[var(--anuime-surface,var(--background))]",
  mochi:
    "[&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[1.5px] [&::-webkit-slider-thumb]:border-[var(--anuime-secondary-accent,var(--border))] [&::-webkit-slider-thumb]:bg-[var(--anuime-surface,var(--background))] [&::-webkit-slider-thumb]:shadow-[0_1px_3px_color-mix(in_oklab,var(--foreground)_15%,transparent)] [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[1.5px] [&::-moz-range-thumb]:border-[var(--anuime-secondary-accent,var(--border))] [&::-moz-range-thumb]:bg-[var(--anuime-surface,var(--background))]",
  atlas:
    "[&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--anuime-accent,var(--accent))] [&::-webkit-slider-thumb]:bg-[radial-gradient(circle,var(--anuime-accent,var(--accent))_0_2px,var(--anuime-surface,var(--background))_2px)] [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[var(--anuime-accent,var(--accent))] [&::-moz-range-thumb]:bg-[var(--anuime-surface,var(--background))]",
} as const;

export function AnuimeSlider({
  character = "kira",
  recipe,
  label = "Signal intensity",
  output,
  min = 0,
  max = 100,
  defaultValue = 68,
  className = "",
  ...props
}: AnuimeSliderProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "slider");
  const system = styles.recipe.structureSystem;
  return (
    <label data-character={system} className="grid gap-2 text-sm font-semibold">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        {output ? <output className={styles.accent}>{output}</output> : null}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        className={`h-[3px] w-full appearance-none rounded-[2px] bg-border outline-none ${sliderConstruction[system]} ${className}`}
        {...props}
      />
    </label>
  );
}

export function AnuimeRangeSlider({
  character = "atlas",
  recipe,
  label = "Range",
  min = 0,
  max = 100,
  lower = 25,
  upper = 75,
}: {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  min?: number;
  max?: number;
  lower?: number;
  upper?: number;
}) {
  const styles = resolveAnuimeRecipe(recipe, character, "slider");
  const system = styles.recipe.structureSystem;
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-semibold">{label}</legend>
      <label className="grid gap-1 text-xs">
        <span>Minimum</span>
        <input
          aria-label={`${label} minimum`}
          type="range"
          min={min}
          max={max}
          defaultValue={lower}
          className={`h-[3px] w-full appearance-none rounded-[2px] bg-border outline-none ${sliderConstruction[system]}`}
        />
      </label>
      <label className="grid gap-1 text-xs">
        <span>Maximum</span>
        <input
          aria-label={`${label} maximum`}
          type="range"
          min={min}
          max={max}
          defaultValue={upper}
          className={`h-[3px] w-full appearance-none rounded-[2px] bg-border outline-none ${sliderConstruction[system]}`}
        />
      </label>
    </fieldset>
  );
}
