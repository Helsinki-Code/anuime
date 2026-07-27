"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeChartCallout } from "@/components/ui/anuime-chart-callout";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeIncidentDetailSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeIncidentDetailSection({
  character = "kira",
  className = "",
}: AnuimeIncidentDetailSectionProps) {
  return (
    <section
      data-anuime-section="anuime-incident-detail-section"
      data-anuime-category="status"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            status
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            A complete account of the incident.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Track impact, response milestones, evidence, and the current resolution state.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-alert">
            <AnuimeAlert
              character={character}
              title="Context preserved"
              description="Track impact, response milestones, evidence, and the current resolution state."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Incident Detail</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Incident Detail"
              title="A complete account of the incident."
              description="Track impact, response milestones, evidence, and the current resolution state."
            />
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
          <div className="min-w-0" data-composes="anuime-chart-callout">
            <AnuimeChartCallout
              character={character}
              label="Period signal"
              value="+18.4%"
              detail="Measured against the previous operating window."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-incident-detail-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
