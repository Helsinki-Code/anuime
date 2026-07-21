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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label className="grid w-full max-w-md gap-2 text-sm font-medium" htmlFor={inputId}>
      {label}
      <textarea
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? descriptionId : undefined}
        className={`min-h-28 w-full resize-y border px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field} ${error ? "border-red-500" : ""} ${className}`}
        {...props}
      />
      {hint || error ? (
        <span
          id={descriptionId}
          className={`text-xs ${error ? "text-red-500" : "text-muted-foreground"}`}
        >
          {error ?? hint}
        </span>
      ) : null}
    </label>
  );
}
