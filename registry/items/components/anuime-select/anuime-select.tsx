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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label htmlFor={selectId} className="grid w-full max-w-sm gap-2 text-sm font-medium">
      {label}
      <select
        id={selectId}
        aria-describedby={hint ? `${selectId}-hint` : undefined}
        className={`h-11 w-full border px-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? (
        <span id={`${selectId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
