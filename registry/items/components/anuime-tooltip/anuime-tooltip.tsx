"use client";

import { useId, useState, type ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTooltipProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  children: ReactNode;
};

export function AnuimeTooltip({ character = "kira", recipe, label, children }: AnuimeTooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span
        aria-describedby={id}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="inline-flex outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        hidden={!visible}
        className={`absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-64 -translate-x-1/2 px-3 py-2 text-xs shadow-xl ${styles.surface}`}
      >
        {label}
      </span>
    </span>
  );
}
