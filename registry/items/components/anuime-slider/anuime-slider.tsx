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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        {output ? <output className={styles.accent}>{output}</output> : null}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        className={`${styles.checkbox} w-full ${className}`}
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
  const styles = resolveAnuimeRecipe(recipe, character);
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
          className={`${styles.checkbox} w-full`}
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
          className={`${styles.checkbox} w-full`}
        />
      </label>
    </fieldset>
  );
}
