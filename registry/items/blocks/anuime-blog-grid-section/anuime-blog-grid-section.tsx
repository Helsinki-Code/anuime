"use client";

import { AnuimeAspectRatio } from "@/components/ui/anuime-aspect-ratio";
import { AnuimeAvatar } from "@/components/ui/anuime-avatar";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimePagination } from "@/components/ui/anuime-pagination";
import { AnuimeStickyReveal } from "@/components/ui/anuime-sticky-reveal";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeBlogGridSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeBlogGridSection({
  character = "kira",
  className = "",
}: AnuimeBlogGridSectionProps) {
  return (
    <section
      data-anuime-section="anuime-blog-grid-section"
      data-anuime-category="blog"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            blog
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            A publication built for discovery.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Balance editorial hierarchy with fast filtering and predictable pagination.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Blog Grid"
              title="A publication built for discovery."
              description="Balance editorial hierarchy with fast filtering and predictable pagination."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Blog Grid</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-avatar">
            <AnuimeAvatar character={character} fallback="AN" alt="AnUIme team" status="online" />
          </div>
          <div className="min-w-0" data-composes="anuime-pagination">
            <AnuimePagination
              character={character}
              page={1}
              pageCount={4}
              onPageChange={() => undefined}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-aspect-ratio">
            <AnuimeAspectRatio character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-bento-card">
            <AnuimeBentoCard
              character={character}
              eyebrow="Blog Grid"
              title="A publication built for discovery."
              size="lg"
            >
              Balance editorial hierarchy with fast filtering and predictable pagination.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-sticky-reveal">
            <AnuimeStickyReveal
              character={character}
              eyebrow="Blog Grid"
              title="A publication built for discovery."
              body="Balance editorial hierarchy with fast filtering and predictable pagination."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
