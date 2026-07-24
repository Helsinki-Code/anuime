import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSkeletonProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label?: string;
  lines?: number;
};

export function AnuimeSkeleton({
  character = "kira",
  recipe,
  label = "Loading content",
  lines = 3,
}: AnuimeSkeletonProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "skeleton");
  const system = styles.recipe.structureSystem;
  const sweep = {
    kira: "rounded-[4px] bg-[linear-gradient(114deg,var(--secondary)_32%,color-mix(in_oklab,var(--anuime-accent,var(--accent))_12%,var(--secondary))_46%,var(--secondary)_60%)] [background-size:620px_100%] [animation:anuime-kira-sweep_1.8s_linear_infinite]",
    mochi:
      "rounded-[5px] bg-[linear-gradient(100deg,var(--secondary)_32%,color-mix(in_oklab,var(--anuime-secondary-accent,var(--accent))_10%,var(--secondary))_46%,var(--secondary)_60%)] [background-size:620px_100%] [animation:anuime-mochi-sweep_2.6s_ease-in-out_infinite]",
    atlas:
      "rounded-[4px] bg-[linear-gradient(76deg,var(--secondary)_32%,color-mix(in_oklab,var(--anuime-accent,var(--accent))_10%,var(--secondary))_46%,var(--secondary)_60%)] [background-size:620px_100%] [animation:anuime-atlas-sweep_2.2s_linear_infinite]",
  }[system];
  return (
    <div data-character={system} className="w-full max-w-md" role="status" aria-label={label}>
      <style>{`
        @keyframes anuime-kira-sweep { to { background-position: 620px 0; } }
        @keyframes anuime-mochi-sweep { 50% { background-position: 620px 0; } }
        @keyframes anuime-atlas-sweep { to { background-position: 620px 0; } }
      `}</style>
      <div aria-hidden="true" className="grid gap-2">
        <div className={`h-3.5 w-3/5 motion-reduce:animate-none ${sweep}`} />
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`h-2.5 motion-reduce:animate-none ${sweep} ${
              index === lines - 1 ? "w-[78%]" : "w-[90%]"
            }`}
          />
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
