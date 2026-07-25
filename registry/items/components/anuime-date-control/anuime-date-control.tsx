import { useId, type InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeDateControlProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  hint?: string;
};

export function AnuimeDateControl({
  character = "kira",
  recipe,
  label,
  hint,
  id,
  ...props
}: AnuimeDateControlProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const styles = resolveAnuimeRecipe(recipe, character, "date-control");
  return (
    <label
      className={`grid w-full max-w-sm gap-2 text-sm font-medium ${styles.typography}`}
      htmlFor={inputId}
      data-character={styles.recipe.structureSystem}
      data-anuime-component="date-control"
    >
      {label}
      <span className="relative">
        <input
          id={inputId}
          type="date"
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          className={`w-full border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field}`}
          {...props}
        />
        <span
          aria-hidden="true"
          className={`${styles.hollowNode} pointer-events-none absolute top-1/2 right-10 -translate-y-1/2`}
        />
      </span>
      {hint ? (
        <span id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
