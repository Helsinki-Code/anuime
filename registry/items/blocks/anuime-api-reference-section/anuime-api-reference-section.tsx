"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCodeWindow } from "@/components/ui/anuime-code-window";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeFileTree } from "@/components/ui/anuime-file-tree";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import { AnuimeTable } from "@/components/ui/anuime-table";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeApiReferenceSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeApiReferenceSection({
  character = "kira",
  className = "",
}: AnuimeApiReferenceSectionProps) {
  return (
    <section
      data-anuime-section="anuime-api-reference-section"
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
            Every endpoint, parameter, and response in view.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Combine a browsable method index with precise examples and copyable source.
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
                    "Combine a browsable method index with precise examples and copyable source.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-accordion">
            <AnuimeAccordion
              character={character}
              items={[
                {
                  id: "purpose",
                  title: "What is included?",
                  content:
                    "Combine a browsable method index with precise examples and copyable source.",
                },
                {
                  id: "next",
                  title: "What happens next?",
                  content: "Choose the next action when the context is clear.",
                },
              ]}
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-table">
            <AnuimeTable character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>API Reference</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-kbd">
            <AnuimeKbd character={character}>⌘ K</AnuimeKbd>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-code-window">
            <AnuimeCodeWindow
              character={character}
              code={
                'export function Example() {\n  return <main data-character="kira">Composed from registry primitives.</main>;\n}'
              }
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-api-reference-section.json"
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-file-tree">
            <AnuimeFileTree
              character={character}
              nodes={[
                {
                  id: "app",
                  label: "app",
                  children: [
                    { id: "section", label: "anuime-api-reference-section.tsx" },
                    { id: "page", label: "page.tsx" },
                  ],
                },
              ]}
              defaultExpanded={["app"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
