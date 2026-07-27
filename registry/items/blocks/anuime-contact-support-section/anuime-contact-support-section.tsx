"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCommandDock } from "@/components/ui/anuime-command-dock";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeContactSupportSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeContactSupportSection({
  character = "kira",
  className = "",
}: AnuimeContactSupportSectionProps) {
  return (
    <section
      data-anuime-section="anuime-contact-support-section"
      data-anuime-category="contact"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            contact
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Support begins with a useful route.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Separate urgent help, product guidance, and self-service without dead ends.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Contact Support"
              title="Support begins with a useful route."
              description="Separate urgent help, product guidance, and self-service without dead ends."
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
                    "Separate urgent help, product guidance, and self-service without dead ends.",
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
                    "Separate urgent help, product guidance, and self-service without dead ends.",
                },
                {
                  id: "next",
                  title: "What happens next?",
                  content: "Choose the next action when the context is clear.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Open support</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-signal-card">
            <AnuimeSignalCard
              character={character}
              label="Live signal"
              title="All systems nominal"
              description="Separate urgent help, product guidance, and self-service without dead ends."
              status="healthy"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-command-dock">
            <AnuimeCommandDock
              character={character}
              commands={[
                { id: "search", label: "Search", shortcut: "⌘K" },
                { id: "open", label: "Open support", shortcut: "↵" },
              ]}
              activeId="search"
              onSelect={() => undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
