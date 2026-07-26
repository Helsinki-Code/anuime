"use client";

import { useEffect, useState } from "react";

import type { AnuimeButtonProps } from "@/components/ui/anuime-button";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { resolveAnuimeRecipe } from "@/lib/anuime-recipe";

export type AnuimeCopyButtonProps = Omit<AnuimeButtonProps, "onClick"> & {
  value: string;
  label?: string;
  copiedLabel?: string;
  onCopied?: () => void;
};

export function AnuimeCopyButton({
  character = "kira",
  recipe,
  value,
  label = "Copy",
  copiedLabel = "Copied",
  onCopied,
  className = "",
  ...props
}: AnuimeCopyButtonProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "button");
  const system = styles.recipe.structureSystem;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = globalThis.setTimeout(() => setCopied(false), 1200);
    return () => globalThis.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await globalThis.navigator?.clipboard?.writeText(value);
    setCopied(true);
    onCopied?.();
  };

  return (
    <AnuimeButton
      character={character}
      recipe={recipe}
      data-anuime-component="copy-button"
      aria-label={copied ? copiedLabel : label}
      className={className}
      onClick={() => {
        void copy();
      }}
      {...props}
    >
      <CopyMark character={system} copied={copied} />
      <span>{copied ? copiedLabel : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </AnuimeButton>
  );
}

function CopyMark({
  character,
  copied,
}: {
  character: "kira" | "mochi" | "atlas";
  copied: boolean;
}) {
  if (character === "kira") {
    return copied ? (
      <svg aria-hidden="true" viewBox="0 0 18 14" className="h-3.5 w-[18px]">
        <polyline
          points="2,7 7,12 16,2"
          fill="none"
          stroke="var(--anuime-accent,var(--accent))"
          strokeWidth="2"
        />
      </svg>
    ) : (
      <span
        aria-hidden="true"
        className="relative size-3 border border-[var(--anuime-accent,var(--accent))]"
      >
        <span className="absolute -top-1 -right-1 size-1 rounded-full bg-[var(--anuime-accent,var(--accent))]" />
      </span>
    );
  }

  if (character === "mochi") {
    return copied ? (
      <span aria-hidden="true" className="relative size-3">
        <span className="absolute top-0 left-1/2 h-full w-px bg-[var(--anuime-accent,var(--accent))]" />
        <span className="absolute top-1/2 left-0 h-px w-full bg-[var(--anuime-accent,var(--accent))]" />
      </span>
    ) : (
      <span
        aria-hidden="true"
        className="size-3 rounded-full border border-[var(--anuime-accent,var(--accent))] [clip-path:inset(0_0_0_42%)]"
      />
    );
  }

  return copied ? (
    <span
      aria-hidden="true"
      className="relative size-3 rounded-full border-2 border-[var(--anuime-accent,var(--accent))]"
    >
      <span className="absolute top-1/2 left-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-[var(--anuime-accent,var(--accent))]" />
    </span>
  ) : (
    <span
      aria-hidden="true"
      className="size-3 rotate-45 border border-[var(--anuime-accent,var(--accent))]"
    />
  );
}
