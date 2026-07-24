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

const inputConstruction = {
  kira: {
    input: "h-9 rounded-[5px] px-3 text-[13.5px]",
    error: "h-2 w-1 -skew-x-[18deg]",
  },
  mochi: {
    input: "h-9 rounded-[10px] px-3.5 text-[13.5px]",
    error: "size-2 rotate-45 rounded-[2px]",
  },
  atlas: {
    input:
      "h-9 rounded-[7px] px-3 text-[13.5px] shadow-[inset_0_1px_2px_color-mix(in_oklab,var(--foreground)_6%,transparent)]",
    error: "h-[11px] w-[2.5px]",
  },
} as const;

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
  const styles = resolveAnuimeRecipe(recipe, character, "input");
  const system = styles.recipe.structureSystem;
  const construction = inputConstruction[system];
  return (
    <label
      data-character={system}
      className="grid w-full max-w-sm gap-2 text-sm font-medium"
      htmlFor={inputId}
    >
      {label}
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? descriptionId : undefined}
        className={`w-full border outline-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/10 ${construction.input} ${styles.field} ${className}`}
        {...props}
      />
      {hint || error ? (
        <span
          id={descriptionId}
          className={`flex items-start gap-2 text-xs ${
            error ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {error ? (
            <span
              aria-hidden="true"
              className={`mt-0.5 shrink-0 bg-destructive ${construction.error}`}
            />
          ) : null}
          {error ?? hint}
        </span>
      ) : null}
    </label>
  );
}
