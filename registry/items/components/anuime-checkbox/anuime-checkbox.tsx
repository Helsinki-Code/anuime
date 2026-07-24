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

const checkboxConstruction = {
  kira: {
    box: "rounded-[3px] peer-checked:border-foreground peer-checked:bg-foreground",
    check: "stroke-[var(--anuime-accent,var(--accent))]",
    strokeLinecap: "square",
    strokeLinejoin: "miter",
  },
  mochi: {
    box: "rounded-[5px] peer-checked:border-[var(--anuime-accent,var(--accent))] peer-checked:bg-[var(--anuime-accent,var(--accent))]",
    check: "stroke-[var(--anuime-surface,var(--primary-foreground))]",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  atlas: {
    box: "rounded-[3px] peer-checked:border-[var(--anuime-accent,var(--accent))] peer-checked:bg-[var(--anuime-accent,var(--accent))]",
    check: "stroke-[var(--anuime-surface,var(--accent-foreground))]",
    strokeLinecap: "square",
    strokeLinejoin: "miter",
  },
} as const;

export function AnuimeCheckbox({
  character = "kira",
  recipe,
  label,
  description,
  id,
  className,
  disabled,
  ...props
}: AnuimeCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const styles = resolveAnuimeRecipe(recipe, character);
  const construction = checkboxConstruction[styles.recipe.structureSystem];

  return (
    <label
      htmlFor={inputId}
      data-character={styles.recipe.structureSystem}
      className="flex max-w-sm items-start gap-3 text-foreground has-disabled:cursor-not-allowed has-disabled:opacity-50"
    >
      <span className="relative mt-0.5 grid size-4 shrink-0">
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={`peer absolute inset-0 z-10 m-0 size-4 cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed ${className ?? ""}`}
          {...props}
        />
        <span
          aria-hidden="true"
          className={`grid size-4 place-items-center border border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))] transition-[background-color,border-color,box-shadow] duration-[var(--anuime-transition-duration,150ms)] peer-focus-visible:ring-[1.5px] peer-focus-visible:ring-[var(--anuime-accent,var(--ring))] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-checked:[&>svg]:opacity-100 ${construction.box}`}
        >
          <svg
            viewBox="0 0 10 8"
            className={`h-2 w-2.5 fill-none opacity-0 transition-opacity duration-[var(--anuime-transition-duration,150ms)] ${construction.check}`}
          >
            <path
              d="M1 4.25 3.55 6.8 9 1.2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap={construction.strokeLinecap}
              strokeLinejoin={construction.strokeLinejoin}
            />
          </svg>
        </span>
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-5 font-semibold">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
