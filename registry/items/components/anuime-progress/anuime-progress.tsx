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

const atlasSegments = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const nodePositions = [0, 25, 50, 75, 100] as const;

export function AnuimeProgress({
  character = "atlas",
  recipe,
  label,
  value,
  max = 100,
}: AnuimeProgressProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const safeMax = max > 0 ? max : 100;
  const percent =
    value === undefined ? undefined : Math.max(0, Math.min(100, (value / safeMax) * 100));

  return (
    <div
      data-character={system}
      className="grid w-full max-w-md gap-2 text-foreground"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={value}
      aria-busy={percent === undefined}
    >
      <div className="flex justify-between gap-4 text-sm leading-5 font-semibold">
        <span>{label}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {percent === undefined ? "WORKING" : `${Math.round(percent)}%`}
        </span>
      </div>
      {system === "atlas" ? (
        <div className="flex w-full gap-[3px]" aria-hidden="true">
          {atlasSegments.map((segment) => {
            const complete = percent === undefined ? segment < 3 : segment < percent / 10;
            return (
              <span
                key={segment}
                className={`h-[5px] min-w-0 flex-1 rounded-[1.5px] border transition-colors duration-[var(--anuime-transition-duration,180ms)] ${
                  complete
                    ? "border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]"
                    : "border-transparent bg-border"
                }`}
              />
            );
          })}
        </div>
      ) : (
        <NodeProgress system={system} percent={percent} />
      )}
    </div>
  );
}

function NodeProgress({
  system,
  percent,
}: {
  system: "kira" | "mochi";
  percent: number | undefined;
}) {
  const displayedPercent = percent ?? 35;
  const isMochi = system === "mochi";

  return (
    <div className="relative h-2 w-full" aria-hidden="true">
      <span
        className={`absolute top-1/2 right-0 left-0 -translate-y-1/2 rounded-[2px] bg-border ${
          isMochi ? "h-0.5" : "h-[3px]"
        }`}
      />
      <span
        className={`absolute top-1/2 left-0 -translate-y-1/2 rounded-[2px] ${
          isMochi
            ? "h-0.5 bg-[var(--anuime-secondary-accent,var(--accent))]"
            : "h-[3px] bg-[var(--anuime-accent,var(--accent))]"
        }`}
        style={{ width: `${displayedPercent}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-between">
        {nodePositions.map((position) => {
          const complete = position <= displayedPercent;
          return (
            <span
              key={position}
              className={`shrink-0 rounded-full border-[1.5px] transition-colors duration-[var(--anuime-transition-duration,180ms)] ${
                isMochi ? "size-2" : "size-[7px]"
              } ${
                complete
                  ? "border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-accent,var(--accent))]"
                  : isMochi
                    ? "border-[var(--anuime-secondary-accent,var(--input))] bg-[var(--anuime-surface,var(--background))]"
                    : "border-[var(--anuime-border-strong,var(--input))] bg-[var(--anuime-surface,var(--background))]"
              }`}
            />
          );
        })}
      </span>
    </div>
  );
}
