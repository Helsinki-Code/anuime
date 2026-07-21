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
  const styles = resolveAnuimeRecipe(recipe, character);
  const statusLabel = { success: "Success", info: "Information", warning: "Warning" }[status];
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-full max-w-sm items-start ${styles.gap} ${styles.surface} ${styles.surfacePadding}`}
    >
      <span
        className={`mt-1 size-2.5 shrink-0 rounded-full ${status === "success" ? "bg-emerald-400" : status === "warning" ? "bg-amber-400" : "bg-current"}`}
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
          className="rounded px-2 text-lg opacity-60 hover:opacity-100"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
