import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeProgressProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  label: string;
  value?: number;
  max?: number;
};

export function AnuimeProgress({
  character = "kira",
  recipe,
  label,
  value,
  max = 100,
}: AnuimeProgressProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const percent = value === undefined ? undefined : Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="grid w-full max-w-md gap-2">
      <div className="flex justify-between gap-4 text-sm font-semibold">
        <span>{label}</span>
        <span>{percent === undefined ? "Working…" : `${Math.round(percent)}%`}</span>
      </div>
      <div
        className={`h-3 overflow-hidden border bg-black/10 ${styles.shapeControl}`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div
          className={`${styles.indicator} h-full min-h-0 p-0 ${percent === undefined ? "w-1/3 animate-pulse motion-reduce:animate-none" : ""}`}
          style={percent === undefined ? undefined : { width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
