import type { AnuimeButtonProps } from "@/components/ui/anuime-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { resolveAnuimeRecipe } from "@/lib/anuime-recipe";

export type AnuimeBorderTraceButtonProps = AnuimeButtonProps;

const duration = {
  kira: "duration-[240ms]",
  mochi: "duration-[250ms]",
  atlas: "duration-[180ms]",
} as const;

export function AnuimeBorderTraceButton({
  character = "kira",
  recipe,
  className = "",
  children,
  ...props
}: AnuimeBorderTraceButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button");
  const system = styles.recipe.structureSystem;

  return (
    <AnuimeButton
      character={character}
      recipe={recipe}
      data-anuime-component="border-trace-button"
      className={`group relative isolate overflow-visible ${className}`}
      {...props}
    >
      {system === "mochi" ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-1 -z-10 rounded-[8px] bg-[radial-gradient(circle_at_center,var(--anuime-accent,var(--accent))_0,transparent_68%)] opacity-0 transition-opacity ${duration[system]} ease-out group-focus-visible:opacity-20 motion-reduce:transition-none`}
        />
      ) : null}
      {system === "kira" ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-0.5 rounded-[5px] border border-[var(--anuime-accent,var(--accent))] opacity-0 transition-[clip-path,opacity] [clip-path:inset(0_100%_0_0)] ${duration[system]} ease-out group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none`}
        >
          <span className="absolute -bottom-2 left-1/2 h-2 w-px bg-[var(--anuime-accent,var(--accent))]" />
        </span>
      ) : null}
      {system === "atlas" ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-1 opacity-0 transition-[inset,opacity] ${duration[system]} linear group-focus-visible:-inset-0.5 group-focus-visible:opacity-100 motion-reduce:transition-none`}
        >
          <span className="absolute top-0 left-0 size-2.5 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
          <span className="absolute top-0 right-0 size-2.5 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))]" />
          <span className="absolute bottom-0 left-0 size-2.5 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
          <span className="absolute right-0 bottom-0 size-2.5 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]" />
        </span>
      ) : null}
      {children}
    </AnuimeButton>
  );
}
