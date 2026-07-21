import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  ratio?: number;
  children?: ReactNode;
};
export function AnuimeAspectRatio({
  character = "kira",
  recipe,
  ratio = 16 / 9,
  children = <span className="m-auto text-sm opacity-60">16:9 media</span>,
  className = "",
  style,
  ...props
}: AnuimeAspectRatioProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      className={`${styles.surface} flex w-full overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
