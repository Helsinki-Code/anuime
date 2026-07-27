"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCodeDiff } from "@/components/ui/anuime-code-diff";
import { AnuimeCodeWindow } from "@/components/ui/anuime-code-window";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import { AnuimeTerminalWindow } from "@/components/ui/anuime-terminal-window";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeDocsExampleSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeDocsExampleSection({
  character = "kira",
  className = "",
}: AnuimeDocsExampleSectionProps) {
  return (
    <section
      data-anuime-section="anuime-docs-example-section"
      data-anuime-category="docs"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-[90rem] gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            docs
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Learn from the source and the result together.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Put explanation, code, terminal output, and the meaningful diff side by side.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Docs Example"
              title="Learn from the source and the result together."
              description="Put explanation, code, terminal output, and the meaningful diff side by side."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Put explanation, code, terminal output, and the meaningful diff side by side.",
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
            <AnuimeButton character={character}>Install example</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-alert">
            <AnuimeAlert
              character={character}
              title="Context preserved"
              description="Put explanation, code, terminal output, and the meaningful diff side by side."
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-window">
            <AnuimeCodeWindow
              character={character}
              code={
                'export function Example() {\n  return <main data-character="kira">Composed from registry primitives.</main>;\n}'
              }
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-terminal-window">
            <AnuimeTerminalWindow
              character={character}
              entries={[
                {
                  command: "npx shadcn@latest add anuime-docs-example-section",
                  output: "Installed composed section and dependencies.",
                },
                { command: "vp test run", output: "Composition checks passed." },
              ]}
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
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-docs-example-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
