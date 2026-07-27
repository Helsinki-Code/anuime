"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCodeDiff } from "@/components/ui/anuime-code-diff";
import { AnuimeCodeWindow } from "@/components/ui/anuime-code-window";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeHeroDeveloperSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeHeroDeveloperSection({
  character = "kira",
  className = "",
}: AnuimeHeroDeveloperSectionProps) {
  return (
    <section
      data-anuime-section="anuime-hero-developer-section"
      data-anuime-category="hero"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid min-h-[38rem] max-w-7xl content-center gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-4xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            hero
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Readable source is part of the design.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Open with inspectable code, a meaningful diff, and a command ready to run.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Open with inspectable code, a meaningful diff, and a command ready to run.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Open developer guide</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-kbd">
            <AnuimeKbd character={character}>⌘ K</AnuimeKbd>
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Hero Developer</AnuimeBadge>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-window">
            <AnuimeCodeWindow
              character={character}
              code={
                'export function Example() {\n  return <main data-character="kira">Composed from registry primitives.</main>;\n}'
              }
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-diff">
            <AnuimeCodeDiff
              character={character}
              lines={[
                {
                  kind: "context",
                  content: "export function Experience() {",
                  oldLine: 1,
                  newLine: 1,
                },
                { kind: "removal", content: "  return <Generic />", oldLine: 2 },
                { kind: "addition", content: "  return <AnuimeSection />", newLine: 2 },
                { kind: "context", content: "}", oldLine: 3, newLine: 3 },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-hero-developer-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
