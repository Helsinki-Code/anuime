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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div
      className={`w-full max-w-md ${styles.surface} ${styles.surfacePadding}`}
      role="status"
      aria-label={label}
    >
      <div
        aria-hidden="true"
        className={`grid animate-pulse motion-reduce:animate-none ${styles.gap}`}
      >
        <div className={`h-6 w-2/5 bg-current opacity-25 ${styles.control}`} />
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`h-3 bg-current opacity-15 ${styles.control} ${index === lines - 1 ? "w-3/5" : "w-full"}`}
          />
        ))}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
