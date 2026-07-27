"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeTeamGridSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeTeamGridSection({
  character = "kira",
  className = "",
}: AnuimeTeamGridSectionProps) {
  return (
    <section
      data-anuime-section="anuime-team-grid-section"
      data-anuime-category="team"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            team
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Meet the people carrying the work.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Organize roles and expertise without flattening everyone into identical cards.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Team Grid"
              title="Meet the people carrying the work."
              description="Organize roles and expertise without flattening everyone into identical cards."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Team Grid</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Meet the whole team</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Team Grid"
              title="Meet the people carrying the work."
              size="lg"
            >
              Organize roles and expertise without flattening everyone into identical cards.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="Meet the people carrying the work."
              description="Organize roles and expertise without flattening everyone into identical cards."
              footer={<span className="text-sm font-semibold">Meet the whole team</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
