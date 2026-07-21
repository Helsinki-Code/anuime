import { useId, type InputHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeComboboxOption = { value: string; label: string };
export type AnuimeComboboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "list"> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  options: AnuimeComboboxOption[];
  hint?: string;
};

export function AnuimeCombobox({
  character = "kira",
  recipe,
  label,
  options,
  hint,
  id,
  ...props
}: AnuimeComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-options`;
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <label className="grid w-full max-w-sm gap-2 text-sm font-medium" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        list={listId}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        className={`w-full border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.field}`}
        {...props}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </datalist>
      {hint ? (
        <span id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
