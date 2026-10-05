import type { ButtonHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  variant?: "primary" | "secondary";
};

const buttonShape = {
  kira: "rounded-[5px]",
  mochi: "rounded-[10px]",
  atlas: "rounded-[7px]",
} as const;

const buttonType = {
  kira: "font-medium",
  mochi: "font-semibold",
  atlas: "font-medium",
} as const;

const buttonDensity = {
  compact: { kira: "h-8 px-3", mochi: "h-8 px-3", atlas: "h-8 px-3" },
  comfortable: { kira: "h-9 px-[18px]", mochi: "h-9 px-5", atlas: "h-9 px-[18px]" },
  spacious: { kira: "min-h-12 px-5", mochi: "min-h-12 px-5", atlas: "min-h-12 px-5" },
} as const;

export function AnuimeButton({
  character = "kira",
  recipe,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AnuimeButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button");
  const system = styles.recipe.structureSystem;
  const shape = styles.recipe.shapeSystem;
  return (
    <button
      type={type}
      data-character={system}
      className={`inline-flex items-center justify-center gap-2 text-[13.5px] transition-[background-color,border-color,color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 ${buttonShape[shape]} ${buttonType[system]} ${buttonDensity[styles.recipe.density][system]} ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
