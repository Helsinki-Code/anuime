import { useId } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeRadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};
export type AnuimeRadioGroupProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  legend: string;
  name?: string;
  options: AnuimeRadioOption[];
  defaultValue?: string;
  disabled?: boolean;
};

export function AnuimeRadioGroup({
  character = "kira",
  recipe,
  legend,
  name,
  options,
  defaultValue,
  disabled,
}: AnuimeRadioGroupProps) {
  const id = useId();
  const styles = resolveAnuimeRecipe(recipe, character, "radio-group");
  return (
    <fieldset
      disabled={disabled}
      data-character={styles.recipe.structureSystem}
      data-anuime-component="radio-group"
      className={`grid max-w-md ${styles.gap} ${styles.typography}`}
    >
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-start gap-3 border ${styles.surfacePadding} ${styles.surface}`}
        >
          <input
            type="radio"
            name={name ?? id}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            disabled={option.disabled}
            className={`mt-0.5 size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${styles.indicator}`}
          />
          <span>
            <span className="block text-sm font-semibold">{option.label}</span>
            {option.description ? (
              <span className="mt-1 block text-xs text-muted-foreground">{option.description}</span>
            ) : null}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
