"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeNodeMap } from "@/components/ui/anuime-node-map";
import { AnuimeOrbitMap } from "@/components/ui/anuime-orbit-map";
import { AnuimeTooltip } from "@/components/ui/anuime-tooltip";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeTeamOrbitSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeTeamOrbitSection({
  character = "kira",
  className = "",
}: AnuimeTeamOrbitSectionProps) {
  return (
    <section
      data-anuime-section="anuime-team-orbit-section"
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
            A team is a network of responsibility.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Show collaborators around the shared outcome and make working relationships visible.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-tooltip">
            <AnuimeTooltip character={character} label="More context is available">
              <span className="inline-flex min-h-10 items-center border border-border px-3 text-sm">
                Inspect detail
              </span>
            </AnuimeTooltip>
          </div>
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Team Orbit"
              title="A team is a network of responsibility."
              description="Show collaborators around the shared outcome and make working relationships visible."
            />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-orbit-map">
            <AnuimeOrbitMap character={character} className="mx-auto" />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-node-map">
            <AnuimeNodeMap
              character={character}
              nodes={[
                { id: "source", label: "Source", x: 16, y: 52, active: true },
                { id: "process", label: "Process", x: 50, y: 26 },
                { id: "outcome", label: "Outcome", x: 84, y: 62 },
              ]}
              links={[
                ["source", "process"],
                ["process", "outcome"],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
