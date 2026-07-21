import { useId, type InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  description?: string;
};

export function AnuimeCheckbox({
  character = "kira",
  recipe,
  label,
  description,
  id,
  ...props
}: AnuimeCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label
      htmlFor={inputId}
      className="flex max-w-sm items-start gap-3 rounded-xl border p-4 transition hover:bg-muted/40"
    >
      <input
        id={inputId}
        type="checkbox"
        className={`mt-0.5 size-5 shrink-0 ${styles.checkbox}`}
        {...props}
      />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {description ? (
          <span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
