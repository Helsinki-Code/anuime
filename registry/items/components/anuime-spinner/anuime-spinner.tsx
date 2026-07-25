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
  const system = styles.recipe.structureSystem;
  return (
    <span
      role="status"
      data-character={system}
      data-anuime-component="spinner"
      className={`inline-flex items-center gap-2 ${className}`}
      {...props}
    >
      {system === "mochi" ? (
        <span aria-hidden="true" className="inline-flex items-center gap-1">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className={`${size === "lg" ? "size-2.5" : size === "sm" ? "size-1.5" : "size-2"} animate-pulse rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-accent,var(--accent))] motion-reduce:animate-none`}
              style={{ animationDelay: `${item * 120}ms` }}
            />
          ))}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`relative ${styles.accent} ${sizes[size]} animate-spin rounded-full ${styles.indicator} motion-reduce:rotate-[114deg] motion-reduce:animate-none`}
        >
          {system === "atlas" ? (
            <span className={`${styles.node} absolute top-1/2 left-1/2 -translate-1/2`} />
          ) : null}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
