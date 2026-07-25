import { useId, type SelectHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSelectOption = { value: string; label: string };
export type AnuimeSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  options: AnuimeSelectOption[];
  hint?: string;
};

export function AnuimeSelect({
  character = "kira",
  recipe,
  label,
  options,
  hint,
  id,
  className = "",
  ...props
}: AnuimeSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const styles = resolveAnuimeRecipe(recipe, character, "select");
  return (
    <label
      htmlFor={selectId}
      data-character={styles.recipe.structureSystem}
      data-anuime-component="select"
      className={`grid w-full max-w-sm gap-2 text-sm font-medium ${styles.typography}`}
    >
      {label}
      <span className="relative">
        <select
          id={selectId}
          aria-describedby={hint ? `${selectId}-hint` : undefined}
          className={`w-full border px-3 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className={`${styles.marker} pointer-events-none absolute top-1/2 right-4 -translate-y-2/3`}
        />
      </span>
      {hint ? (
        <span id={`${selectId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
