import type { InputHTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeInputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function AnuimeInputGroup({
  character = "kira",
  recipe,
  label = "Search components",
  leading = "⌕",
  trailing,
  className = "",
  ...props
}: AnuimeInputGroupProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "input-group");
  return (
    <label className="grid gap-2 text-sm font-semibold">
      <span>{label}</span>
      <span className={`${styles.field} flex items-center gap-2 border p-0 focus-within:ring-2`}>
        <span aria-hidden="true" className="pl-3 opacity-60">
          {leading}
        </span>
        <input
          className={`min-w-0 flex-1 bg-transparent px-1 py-2 outline-none ${className}`}
          {...props}
        />
        {trailing ? <span className="pr-2">{trailing}</span> : null}
      </span>
    </label>
  );
}
