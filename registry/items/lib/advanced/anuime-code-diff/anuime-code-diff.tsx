import type { HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeCodeDiffLine = {
  kind: "addition" | "removal" | "context";
  content: string;
  oldLine?: number;
  newLine?: number;
};

export type AnuimeCodeDiffProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  lines: readonly AnuimeCodeDiffLine[];
  label?: string;
};

export function AnuimeCodeDiff({
  character = "kira",
  recipe,
  lines,
  label = "Code changes",
  className = "",
  ...props
}: AnuimeCodeDiffProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  const system = styles.recipe.structureSystem;

  return (
    <div
      data-character={system}
      data-anuime-component="code-diff"
      role="region"
      aria-label={label}
      className={`overflow-hidden border border-border bg-[var(--anuime-elevated,var(--popover))] font-mono text-xs text-foreground ${
        system === "kira"
          ? "rounded-[5px]"
          : system === "mochi"
            ? "rounded-[10px]"
            : "rounded-[7px]"
      } ${className}`}
      {...props}
    >
      {lines.map((line) => {
        const changed = line.kind !== "context";
        return (
          <div
            key={`${line.kind}-${line.oldLine ?? "x"}-${line.newLine ?? "x"}-${line.content}`}
            data-diff-kind={line.kind}
            className={`grid min-h-8 grid-cols-[32px_32px_20px_1fr] items-center border-b border-border/60 last:border-b-0 ${
              changed ? "bg-[var(--anuime-surface,var(--muted))]" : ""
            }`}
          >
            <span className="text-right text-muted-foreground">{line.oldLine ?? ""}</span>
            <span className="text-right text-muted-foreground">{line.newLine ?? ""}</span>
            <DiffMark character={system} kind={line.kind} />
            <code className="overflow-x-auto px-2 whitespace-pre">{line.content}</code>
          </div>
        );
      })}
    </div>
  );
}

function DiffMark({
  character,
  kind,
}: {
  character: "kira" | "mochi" | "atlas";
  kind: AnuimeCodeDiffLine["kind"];
}) {
  if (kind === "context") {
    return <span aria-hidden="true" className="mx-auto h-px w-2 bg-border" />;
  }
  if (character === "kira") {
    return (
      <span
        aria-label={kind}
        className="mx-auto h-3 w-1.5 skew-x-[-18deg] bg-[var(--anuime-accent,var(--accent))]"
      />
    );
  }
  if (character === "mochi") {
    return (
      <span aria-label={kind} className="relative mx-auto size-3">
        <span className="absolute top-0 left-1/2 h-full w-px bg-[var(--anuime-accent,var(--accent))]" />
        <span className="absolute top-1/2 left-0 h-px w-full bg-[var(--anuime-accent,var(--accent))]" />
      </span>
    );
  }
  return (
    <span
      aria-label={kind}
      className={`mx-auto size-2 rotate-45 border border-[var(--anuime-accent,var(--accent))] ${
        kind === "addition" ? "bg-[var(--anuime-accent,var(--accent))]" : ""
      }`}
    />
  );
}
