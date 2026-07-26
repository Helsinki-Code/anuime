import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeTerminalEntry = {
  command: string;
  output?: string;
};

export type AnuimeTerminalWindowProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: string;
  entries: readonly AnuimeTerminalEntry[];
  revealLatest?: boolean;
};

export function AnuimeTerminalWindow({
  character = "kira",
  recipe,
  title = "Terminal",
  entries,
  revealLatest = false,
  className = "",
  ...props
}: AnuimeTerminalWindowProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <div
      data-character={system}
      data-anuime-component="terminal-window"
      className={`overflow-hidden border border-border bg-[var(--anuime-elevated,var(--popover))] text-foreground ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px] ring-1 ring-border ring-inset"
      } ${className}`}
      {...props}
    >
      <header className="flex min-h-10 items-center gap-3 border-b border-border px-4">
        <PromptMark character={system} />
        <span className="font-mono text-xs">{title}</span>
      </header>
      <div className="relative grid gap-4 p-4 font-mono text-xs">
        <span
          aria-hidden="true"
          className={`absolute top-4 bottom-4 left-[21px] ${
            system === "atlas" ? "w-0.5 bg-border" : "w-px bg-border"
          }`}
        />
        {entries.map((entry) => {
          const latest = entry === entries.at(-1);
          return (
            <div key={`${entry.command}-${entry.output ?? ""}`} className="relative pl-6">
              <PromptMark character={system} compact />
              <div>
                <span className="text-muted-foreground">$ </span>
                {entry.command}
              </div>
              {entry.output ? (
                <pre
                  data-anuime-tier={revealLatest && latest ? "expressive" : undefined}
                  data-anuime-context={revealLatest && latest ? "transition" : undefined}
                  className={`anuime-terminal-output mt-2 whitespace-pre-wrap text-muted-foreground ${
                    revealLatest && latest
                      ? system === "kira"
                        ? "motion-safe:animate-[anuime-terminal-kira_1700ms_ease-out_both]"
                        : system === "mochi"
                          ? "motion-safe:animate-[anuime-terminal-mochi_1700ms_ease-in-out_both]"
                          : "motion-safe:animate-[anuime-terminal-atlas_1700ms_linear_both]"
                      : ""
                  }`}
                >
                  {entry.output}
                </pre>
              ) : null}
            </div>
          );
        })}
      </div>
      <style>{`@keyframes anuime-terminal-kira{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}@keyframes anuime-terminal-mochi{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}@keyframes anuime-terminal-atlas{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}@media(prefers-reduced-motion:reduce){.anuime-terminal-output{animation:none!important;clip-path:none!important;transform:none!important}}`}</style>
    </div>
  );
}

function PromptMark({
  character,
  compact = false,
}: {
  character: "kira" | "mochi" | "atlas";
  compact?: boolean;
}) {
  const position = compact ? "absolute -left-0.5 top-0.5" : "relative";
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className={`${position} size-2 rounded-full border border-[var(--anuime-accent,var(--accent))]`}
      />
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className={`${position} size-2 rounded-full border border-[var(--anuime-accent,var(--accent))] bg-[var(--anuime-surface,var(--background))]`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${position} size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))]`}
    />
  );
}
