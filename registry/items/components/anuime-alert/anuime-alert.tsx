import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeAlertProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  tone?: "info" | "success" | "warning" | "error";
};

const toneStyles = {
  info: "border-sky-500/40",
  success: "border-emerald-500/40",
  warning: "border-amber-500/50",
  error: "border-red-500/50",
} as const;

export function AnuimeAlert({
  character = "kira",
  recipe,
  title = "Signal received",
  description = "The operation completed with an accessible status message.",
  icon,
  tone = "info",
  className = "",
  ...props
}: AnuimeAlertProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`${styles.surface} ${styles.surfacePadding} ${toneStyles[tone]} ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <div>
          <p className="font-semibold">{title}</p>
          <div className="mt-1 text-sm opacity-80">{description}</div>
        </div>
      </div>
    </div>
  );
}
