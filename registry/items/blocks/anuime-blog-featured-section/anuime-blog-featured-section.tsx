"use client";

import { AnuimeAspectRatio } from "@/components/ui/anuime-aspect-ratio";
import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeLineReveal } from "@/components/ui/anuime-line-reveal";
import { AnuimeTraceCard } from "@/components/ui/anuime-trace-card";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeBlogFeaturedSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeBlogFeaturedSection({
  character = "kira",
  className = "",
}: AnuimeBlogFeaturedSectionProps) {
  return (
    <section
      data-anuime-section="anuime-blog-featured-section"
      data-anuime-category="blog"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            blog
          </p>
          <AnuimeLineReveal character={character} className="text-3xl font-bold sm:text-5xl">
            One important idea deserves the lead.
          </AnuimeLineReveal>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Give a flagship story room for context, authorship, and a decisive reading path.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Blog Featured"
              title="One important idea deserves the lead."
              description="Give a flagship story room for context, authorship, and a decisive reading path."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Blog Featured</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Read featured story</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-aspect-ratio">
            <AnuimeAspectRatio character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-trace-card">
            <AnuimeTraceCard
              character={character}
              title="One important idea deserves the lead."
              description="Give a flagship story room for context, authorship, and a decisive reading path."
              footer={<span className="text-sm font-semibold">Read featured story</span>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
