import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeToastProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title: string;
  description?: string;
  status?: "success" | "info" | "warning";
  onDismiss?: () => void;
};

export function AnuimeToast({
  character = "kira",
  recipe,
  title,
  description,
  status = "info",
  onDismiss,
}: AnuimeToastProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "toast");
  const system = styles.recipe.structureSystem;
  const statusLabel = { success: "Success", info: "Information", warning: "Warning" }[status];
  const marker = {
    kira: "h-2.5 w-[5px] -skew-x-[18deg] bg-[var(--anuime-accent,var(--accent))]",
    mochi:
      "size-3 rotate-45 rounded-[2px] bg-[var(--anuime-secondary-accent,var(--accent))] shadow-[inset_0_0_0_3px_var(--anuime-surface,var(--background))]",
    atlas: "h-4 w-[2.5px] bg-[var(--anuime-accent,var(--accent))]",
  }[system];
  return (
    <div
      role="status"
      aria-live="polite"
      data-character={system}
      className={`flex w-full max-w-[340px] items-start gap-3 px-4 py-3.5 shadow-[0_8px_24px_color-mix(in_oklab,var(--foreground)_18%,transparent)] ${styles.surface}`}
    >
      <span
        className={`mt-1 shrink-0 ${status === "warning" ? "bg-[var(--anuime-secondary-accent,var(--accent))]" : status === "success" ? "bg-[var(--anuime-accent,var(--accent))]" : ""} ${marker}`}
        aria-label={statusLabel}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {description ? <p className="mt-1 text-xs leading-5 opacity-70">{description}</p> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-[4px] px-2 text-lg opacity-60 hover:bg-secondary hover:opacity-100"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
