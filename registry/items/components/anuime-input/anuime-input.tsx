import { useId, type InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  hint?: string;
  error?: string;
};

export function AnuimeInput({
  character = "kira",
  recipe,
  label,
  hint,
  error,
  id,
  className = "",
  ...props
}: AnuimeInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label className="grid w-full max-w-sm gap-2 text-sm font-medium" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? descriptionId : undefined}
        className={`h-11 w-full border px-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field} ${error ? "border-red-500" : ""} ${className}`}
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
