"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeStickyReveal } from "@/components/ui/anuime-sticky-reveal";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeFeatureTimelineSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeFeatureTimelineSection({
  character = "kira",
  className = "",
}: AnuimeFeatureTimelineSectionProps) {
  return (
    <section
      data-anuime-section="anuime-feature-timeline-section"
      data-anuime-category="features"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            features
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            From first signal to shipped interface.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Show capability as a sequence so every stage has context and consequence.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Feature Timeline"
              title="From first signal to shipped interface."
              description="Show capability as a sequence so every stage has context and consequence."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Feature Timeline</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Follow the workflow</AnuimeButton>
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-timeline-flow">
            <AnuimeTimelineFlow
              character={character}
              currentId="active"
              items={[
                { id: "planned", title: "Planned", detail: "Scope and owner confirmed" },
                { id: "active", title: "Active", detail: "Work is in progress" },
                { id: "complete", title: "Complete", detail: "Outcome verified" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-sticky-reveal">
            <AnuimeStickyReveal
              character={character}
              eyebrow="Feature Timeline"
              title="From first signal to shipped interface."
              body="Show capability as a sequence so every stage has context and consequence."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="From first signal to shipped interface."
              description="Show capability as a sequence so every stage has context and consequence."
              footer={<span className="text-sm font-semibold">Follow the workflow</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
