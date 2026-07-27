"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeComparisonCard } from "@/components/ui/anuime-comparison-card";
import { AnuimeLineReveal } from "@/components/ui/anuime-line-reveal";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeLeadershipSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeLeadershipSection({
  character = "kira",
  className = "",
}: AnuimeLeadershipSectionProps) {
  return (
    <section
      data-anuime-section="anuime-leadership-section"
      data-anuime-category="team"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            team
          </p>
          <AnuimeLineReveal character={character} className="text-3xl font-bold sm:text-5xl">
            Leadership with a visible operating thesis.
          </AnuimeLineReveal>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Pair each leader with scope, decisions, and the principles guiding their work.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Leadership"
              title="Leadership with a visible operating thesis."
              description="Pair each leader with scope, decisions, and the principles guiding their work."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Pair each leader with scope, decisions, and the principles guiding their work.",
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
            <AnuimeButton character={character}>Read leadership notes</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-comparison-card">
            <AnuimeComparisonCard
              character={character}
              eyebrow="Recommended"
              title="Leadership"
              price="Built in"
              selected
              features={[
                { label: "Character-aware construction" },
                { label: "Accessible defaults" },
                { label: "Opaque hand-rolled styling", included: false },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
