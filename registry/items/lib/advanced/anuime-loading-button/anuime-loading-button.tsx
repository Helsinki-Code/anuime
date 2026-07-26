import type { AnuimeButtonProps } from "@/components/ui/anuime-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { resolveAnuimeRecipe } from "@/lib/anuime-recipe";

export type AnuimeLoadingButtonProps = AnuimeButtonProps & {
  loading?: boolean;
  loadingLabel?: string;
};

export function AnuimeLoadingButton({
  character = "kira",
  recipe,
  loading = false,
  loadingLabel = "Working",
  disabled,
  children,
  className = "",
  ...props
}: AnuimeLoadingButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button");
  const system = styles.recipe.structureSystem;

  return (
    <AnuimeButton
      character={character}
      recipe={recipe}
      data-anuime-component="loading-button"
      aria-busy={loading}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? <WaitingIndicator character={system} /> : null}
      <span>{loading ? loadingLabel : children}</span>
    </AnuimeButton>
  );
}

function WaitingIndicator({ character }: { character: "kira" | "mochi" | "atlas" }) {
  if (character === "kira") {
    return (
      <span
        data-anuime-tier="expressive"
        data-anuime-context="waiting"
        aria-hidden="true"
        className="relative size-4 rounded-full border border-border"
      >
        <span className="absolute top-1/2 left-1/2 h-px w-3 origin-left rotate-[114deg] bg-[var(--anuime-accent,var(--accent))] motion-safe:animate-pulse motion-reduce:animate-none" />
      </span>
    );
  }

  if (character === "mochi") {
    return (
      <span
        data-anuime-tier="expressive"
        data-anuime-context="waiting"
        aria-hidden="true"
        className="relative size-4 motion-safe:animate-[spin_1150ms_linear_infinite] motion-reduce:animate-none"
      >
        {[
          "left-0 top-1.5 size-2",
          "right-0 top-1.5 size-1.5",
          "left-1.5 top-0 size-1",
          "bottom-0 left-1.5 size-1",
        ].map((position) => (
          <span
            key={position}
            className={`absolute rounded-full border border-[var(--anuime-accent,var(--accent))] ${position}`}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      data-anuime-tier="expressive"
      data-anuime-context="waiting"
      aria-hidden="true"
      className="relative grid size-4 place-items-center rounded-full border-2 border-[var(--anuime-accent,var(--accent))] motion-safe:animate-pulse motion-reduce:animate-none"
    >
      <span className="size-1 rotate-45 bg-[var(--anuime-accent,var(--accent))]" />
    </span>
  );
}
