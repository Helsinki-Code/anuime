import { useId, type TextareaHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  hint?: string;
  error?: string;
};

export function AnuimeTextarea({
  character = "kira",
  recipe,
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: AnuimeTextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const styles = resolveAnuimeRecipe(recipe, character, "textarea");
  return (
    <label
      className={`grid w-full max-w-md gap-2 text-sm font-medium ${styles.typography}`}
      htmlFor={inputId}
      data-character={styles.recipe.structureSystem}
      data-anuime-component="textarea"
    >
      {label}
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? descriptionId : undefined}
        className={`min-h-28 w-full resize-y border px-4 py-3 outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/10 ${styles.field} ${className}`}
        {...props}
      />
      {hint || error ? (
        <span
          id={descriptionId}
          className={`text-xs ${error ? "text-destructive" : "text-muted-foreground"}`}
        >
          {error ?? hint}
        </span>
      ) : null}
    </label>
  );
}
