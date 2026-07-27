"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimePagination } from "@/components/ui/anuime-pagination";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeTimelineFlow } from "@/components/ui/anuime-timeline-flow";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeChangelogFeedSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeChangelogFeedSection({
  character = "kira",
  className = "",
}: AnuimeChangelogFeedSectionProps) {
  return (
    <section
      data-anuime-section="anuime-changelog-feed-section"
      data-anuime-category="changelog"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-5xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            changelog
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            A release history built to be scanned.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep dates, impact, and product areas aligned across every update.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Changelog Feed</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Changelog Feed"
              title="A release history built to be scanned."
              description="Keep dates, impact, and product areas aligned across every update."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-pagination">
            <AnuimePagination
              character={character}
              page={1}
              pageCount={4}
              onPageChange={() => undefined}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-separator">
            <AnuimeSeparator character={character} />
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
          <div className="min-w-0" data-composes="anuime-sticky-rail">
            <AnuimeStickyRail
              character={character}
              items={[
                { id: "overview", label: "Overview" },
                { id: "details", label: "Details" },
                { id: "next", label: "Next step" },
              ]}
              activeId="overview"
              onSelect={() => undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
