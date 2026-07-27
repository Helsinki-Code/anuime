"use client";

import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeTestimonialGridSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeTestimonialGridSection({
  character = "kira",
  className = "",
}: AnuimeTestimonialGridSectionProps) {
  return (
    <section
      data-anuime-section="anuime-testimonial-grid-section"
      data-anuime-category="social-proof"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            social proof
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Specific praise from specific people.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Give every customer voice a role, context, and readable place in the evidence grid.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Testimonial Grid"
              title="Specific praise from specific people."
              description="Give every customer voice a role, context, and readable place in the evidence grid."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Testimonial Grid</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Testimonial Grid"
              title="Specific praise from specific people."
              size="lg"
            >
              Give every customer voice a role, context, and readable place in the evidence grid.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="Specific praise from specific people."
              description="Give every customer voice a role, context, and readable place in the evidence grid."
              footer={<span className="text-sm font-semibold">Read customer stories</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
