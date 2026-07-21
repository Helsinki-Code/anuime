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

export function AnuimeButton({
  character = "kira",
  recipe,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: AnuimeButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-sm font-bold transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
