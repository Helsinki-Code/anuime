"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeCommandDock } from "@/components/ui/anuime-command-dock";
import { AnuimeCommandPalette } from "@/components/ui/anuime-command-palette";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeKbd } from "@/components/ui/anuime-kbd";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFaqSearchSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFaqSearchSection({
  character = "kira",
  className = "",
}: AnuimeFaqSearchSectionProps) {
  return (
    <section
      data-anuime-section="anuime-faq-search-section"
      data-anuime-category="faq"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">faq</p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Ask the documentation directly.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Combine command search, shortcuts, and expandable answers for fast resolution.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-command-palette">
            <AnuimeCommandPalette
              character={character}
              commands={[
                { id: "overview", label: "Open overview", group: "Navigate", shortcut: "O" },
                { id: "action", label: "Search questions", group: "Actions", shortcut: "A" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
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
                    "Combine command search, shortcuts, and expandable answers for fast resolution.",
                },
                {
                  id: "next",
                  title: "What happens next?",
                  content: "Choose the next action when the context is clear.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-kbd">
            <AnuimeKbd character={character}>⌘ K</AnuimeKbd>
          </div>
          <div className="min-w-0" data-composes="anuime-command-dock">
            <AnuimeCommandDock
              character={character}
              commands={[
                { id: "search", label: "Search", shortcut: "⌘K" },
                { id: "open", label: "Search questions", shortcut: "↵" },
              ]}
              activeId="search"
              onSelect={() => undefined}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>
              Search questions
            </AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
