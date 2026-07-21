import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  label?: string;
  maxHeight?: string;
};

export function AnuimeScrollArea({
  character = "atlas",
  recipe,
  children = Array.from({ length: 8 }, (_, index) => (
    <p key={index} className="border-b py-3 last:border-0">
      Log entry {index + 1}
    </p>
  )),
  label = "Scrollable content",
  maxHeight = "16rem",
  className = "",
  style,
  tabIndex = 0,
  ...props
}: AnuimeScrollAreaProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={tabIndex}
      className={`${styles.surface} ${styles.surfacePadding} overflow-auto focus-visible:ring-2 ${className}`}
      style={{ maxHeight, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
