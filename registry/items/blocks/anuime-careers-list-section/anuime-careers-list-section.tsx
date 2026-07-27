"use client";

import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimePagination } from "@/components/ui/anuime-pagination";
import { AnuimeSelect } from "@/components/ui/anuime-select";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCareersListSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCareersListSection({
  character = "kira",
  className = "",
}: AnuimeCareersListSectionProps) {
  return (
    <section
      data-anuime-section="anuime-careers-list-section"
      data-anuime-category="careers"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            careers
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Find the work that fits your craft.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Filter open roles while keeping team, location, and responsibility visible.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Careers List"
              title="Find the work that fits your craft."
              description="Filter open roles while keeping team, location, and responsibility visible."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Careers List</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-select">
            <AnuimeSelect
              character={character}
              label="Filter results"
              options={[
                { value: "all", label: "All results" },
                { value: "active", label: "Active only" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>View role</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-pagination">
            <AnuimePagination
              character={character}
              page={1}
              pageCount={4}
              onPageChange={() => undefined}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Careers List"
              title="Find the work that fits your craft."
              size="lg"
            >
              Filter open roles while keeping team, location, and responsibility visible.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="Find the work that fits your craft."
              description="Filter open roles while keeping team, location, and responsibility visible."
              footer={<span className="text-sm font-semibold">View role</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
