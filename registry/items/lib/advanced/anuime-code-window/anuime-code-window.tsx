import type { HTMLAttributes, ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCodeWindowProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: string;
  language?: string;
  code?: string;
  children?: ReactNode;
  showLineNumbers?: boolean;
};

export function AnuimeCodeWindow({
  character = "kira",
  recipe,
  title = "component.tsx",
  language = "tsx",
  code,
  children,
  showLineNumbers = true,
  className = "",
  ...props
}: AnuimeCodeWindowProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;
  const lines = toNumberedLines(code ?? "");

  return (
    <div
      data-character={system}
      data-anuime-component="code-window"
      className={`relative overflow-hidden border border-border bg-[var(--anuime-elevated,var(--popover))] text-foreground ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px]"
      } ${system === "atlas" ? "ring-1 ring-border ring-inset" : ""} ${className}`}
      {...props}
    >
      <header className="relative flex min-h-11 items-center gap-3 border-b border-border px-4">
        <WindowMark character={system} />
        <span className="font-mono text-xs">{title}</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground uppercase">
          {language}
        </span>
        {system === "kira" ? (
          <span
            aria-hidden="true"
            className="absolute right-4 bottom-0 h-px w-16 origin-right rotate-[114deg] bg-[var(--anuime-accent,var(--accent))]"
          />
        ) : null}
        {system === "mochi" ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 h-px bg-[var(--anuime-accent,var(--accent))]"
          />
        ) : null}
      </header>
      {children ?? (
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6">
          <code>
            {lines.map((line) => (
              <span key={line.id} className="block">
                {showLineNumbers ? (
                  <span
                    aria-hidden="true"
                    className="mr-4 inline-block w-5 text-right text-muted-foreground select-none"
                  >
                    {line.number}
                  </span>
                ) : null}
                {line.content || " "}
              </span>
            ))}
          </code>
        </pre>
      )}
      {system === "atlas" ? <AtlasCorners /> : null}
    </div>
  );
}

function toNumberedLines(code: string) {
  const occurrences = new Map<string, number>();
  return code.split("\n").map((content, index) => {
    const occurrence = (occurrences.get(content) ?? 0) + 1;
    occurrences.set(content, occurrence);
    return {
      id: `${content}-${occurrence}`,
      number: index + 1,
      content,
    };
  });
}

function WindowMark({ character }: { character: "kira" | "mochi" | "atlas" }) {
  if (character === "kira") {
    return (
      <span
        aria-hidden="true"
        className="h-2.5 w-5 rounded-[2px] border border-[var(--anuime-accent,var(--accent))]"
      />
    );
  }
  if (character === "mochi") {
    return (
      <span
        aria-hidden="true"
        className="relative h-2.5 w-5 rounded-[3px] border border-[var(--anuime-accent,var(--accent))]"
      >
        <span className="absolute top-1/2 -left-1 h-px w-1 bg-[var(--anuime-accent,var(--accent))]" />
        <span className="absolute top-1/2 -right-1 h-px w-1 bg-[var(--anuime-accent,var(--accent))]" />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="relative h-3 w-6 rounded-[3px] border border-[var(--anuime-accent,var(--accent))]"
    >
      <span className="absolute inset-1 rounded-[1px] border border-[var(--anuime-accent,var(--accent))]" />
    </span>
  );
}

function AtlasCorners() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-1">
      <span className="absolute top-0 left-0 size-2.5 border-t-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute top-0 right-0 size-2.5 border-t-2 border-r-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute bottom-0 left-0 size-2.5 border-b-2 border-l-2 border-[var(--anuime-accent,var(--accent))]" />
      <span className="absolute right-0 bottom-0 size-2.5 border-r-2 border-b-2 border-[var(--anuime-accent,var(--accent))]" />
    </span>
  );
}
