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
  info: "border-[var(--anuime-accent,var(--border))]",
  success: "border-[var(--anuime-accent,var(--border))]",
  warning: "border-[var(--anuime-secondary-accent,var(--border))]",
  error: "border-destructive",
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
  const styles = resolveAnuimeRecipe(recipe, character, "alert");
  const system = styles.recipe.structureSystem;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      data-character={system}
      className={`${styles.surface} ${styles.surfacePadding} ${toneStyles[tone]} ${className}`}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon ? (
          <span aria-hidden="true">{icon}</span>
        ) : (
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 ${
              system === "kira"
                ? "h-2.5 w-[5px] -skew-x-[18deg] bg-[var(--anuime-accent,var(--accent))]"
                : system === "mochi"
                  ? "size-2.5 rotate-45 rounded-[2px] bg-[var(--anuime-secondary-accent,var(--accent))]"
                  : "h-[11px] w-[2.5px] bg-[var(--anuime-accent,var(--accent))]"
            }`}
          />
        )}
        <div>
          <p className="font-semibold">{title}</p>
          <div className="mt-1 text-sm opacity-80">{description}</div>
        </div>
      </div>
    </div>
  );
}
