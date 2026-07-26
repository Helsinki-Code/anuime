"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeStickyRevealProps = HTMLAttributes<HTMLDivElement> & {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  eyebrow?: string;
  title: string;
  body?: string;
};

export function AnuimeStickyReveal({
  character = "mochi",
  recipe,
  eyebrow,
  title,
  body,
  className = "",
  ...props
}: AnuimeStickyRevealProps) {
  const system = resolveAnuimeRecipe(recipe, character).recipe.structureSystem;
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduced(query?.matches ?? false);
    if (query?.matches || !globalThis.IntersectionObserver) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      data-character={system}
      data-anuime-component="sticky-reveal"
      data-anuime-tier="expressive"
      data-anuime-context="transition"
      className={`relative w-full overflow-hidden border border-border bg-[var(--anuime-surface,var(--background))] p-8 text-foreground ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute border-[var(--anuime-accent,var(--accent))] ${
          system === "atlas"
            ? "inset-3 border-t-2 border-l-2"
            : system === "mochi"
              ? "inset-x-6 top-4 h-5 rounded-full border-t opacity-60"
              : "top-8 -left-4 h-px w-24 rotate-[114deg] border-t"
        }`}
      />
      {system === "kira" ? (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 size-4 rounded-full border border-[var(--anuime-accent,var(--accent))]"
        />
      ) : system === "atlas" ? (
        <span
          aria-hidden="true"
          className="absolute right-5 bottom-5 h-px w-20 rotate-[76deg] border-t border-[var(--anuime-accent,var(--accent))]"
        />
      ) : null}
      <div
        className="motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
        style={{
          opacity: visible || reduced ? 1 : 0,
          transform:
            visible || reduced
              ? "none"
              : system === "kira"
                ? "translate(18px, -40px)"
                : system === "atlas"
                  ? "translate(-12px, -48px)"
                  : "translateY(18px)",
          transition: reduced ? "none" : "opacity 1700ms ease-out, transform 1700ms ease-out",
        }}
      >
        {eyebrow ? (
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h3 className={`mt-2 text-3xl font-bold ${system === "mochi" ? "font-serif" : ""}`}>
          {title}
        </h3>
        {body ? <p className="mt-3 max-w-prose text-sm text-muted-foreground">{body}</p> : null}
      </div>
    </div>
  );
}
