import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "size-4 border-2", md: "size-6 border-[3px]", lg: "size-10 border-4" } as const;
export function AnuimeSpinner({
  character = "kira",
  recipe,
  label = "Loading",
  size = "md",
  className = "",
  ...props
}: AnuimeSpinnerProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "spinner");
  return (
    <span role="status" className={`inline-flex items-center gap-2 ${className}`} {...props}>
      <span
        aria-hidden="true"
        className={`${styles.accent} ${sizes[size]} animate-spin rounded-full border-current border-r-transparent motion-reduce:animate-none`}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
