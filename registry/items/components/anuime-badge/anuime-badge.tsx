import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  children?: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
};

const tones = {
  neutral: "",
  success: "border-emerald-500/40 text-emerald-600",
  warning: "border-amber-500/40 text-amber-600",
  danger: "border-red-500/40 text-red-600",
} as const;

export function AnuimeBadge({
  character = "kira",
  recipe,
  children = "Ready",
  tone = "neutral",
  className = "",
  ...props
}: AnuimeBadgeProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <span
      className={`${styles.shapeControl} ${styles.secondary} ${tones[tone]} inline-flex items-center border px-2.5 py-1 text-xs font-bold ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function AnuimeStatusIndicator({
  label = "Online",
  tone = "success",
  ...props
}: Omit<AnuimeBadgeProps, "children"> & { label?: string }) {
  const dot = {
    neutral: "bg-current",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  }[tone];
  return (
    <AnuimeBadge tone={tone} {...props}>
      <span aria-hidden="true" className={`mr-1.5 size-1.5 rounded-full ${dot}`} />
      {label}
    </AnuimeBadge>
  );
}
