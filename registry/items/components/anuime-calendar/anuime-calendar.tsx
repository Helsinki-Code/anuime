import type { InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCalendarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  mode?: "single" | "range";
  endName?: string;
};

export function AnuimeCalendar({
  character = "kira",
  recipe,
  label = "Choose a date",
  mode = "single",
  endName = "endDate",
  className = "",
  ...props
}: AnuimeCalendarProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "calendar");
  const inputClass = `${styles.field} ${styles.shapeControl} min-h-10 border px-3 py-2 outline-none focus-visible:ring-2 ${className}`;
  return (
    <fieldset
      data-character={styles.recipe.structureSystem}
      data-anuime-component="calendar"
      className={`grid ${styles.gap} ${styles.typography} ${styles.surface} ${styles.surfacePadding}`}
    >
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className={`flex flex-wrap ${styles.gap}`}>
        <input type="date" className={inputClass} {...props} />
        {mode === "range" ? (
          <>
            <span className="self-center text-sm opacity-60">to</span>
            <input type="date" name={endName} aria-label={`${label} end`} className={inputClass} />
          </>
        ) : null}
      </div>
    </fieldset>
  );
}

export const AnuimeDatePicker = AnuimeCalendar;
