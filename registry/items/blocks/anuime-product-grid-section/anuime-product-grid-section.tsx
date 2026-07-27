"use client";

import { AnuimeAspectRatio } from "@/components/ui/anuime-aspect-ratio";
import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeBentoCard } from "@/components/ui/anuime-bento-card";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimePagination } from "@/components/ui/anuime-pagination";
import { AnuimeSelect } from "@/components/ui/anuime-select";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeProductGridSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeProductGridSection({
  character = "kira",
  className = "",
}: AnuimeProductGridSectionProps) {
  return (
    <section
      data-anuime-section="anuime-product-grid-section"
      data-anuime-category="ecommerce"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            ecommerce
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Find the right product without fighting the grid.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep filters, availability, price, and pagination predictable across the catalog.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Product Grid"
              title="Find the right product without fighting the grid."
              description="Keep filters, availability, price, and pagination predictable across the catalog."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-badge">
            <AnuimeBadge character={character}>Product Grid</AnuimeBadge>
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Browse products</AnuimeButton>
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
              eyebrow="Product Grid"
              title="Find the right product without fighting the grid."
              size="lg"
            >
              Keep filters, availability, price, and pagination predictable across the catalog.
            </AnuimeBentoCard>
          </div>
          <div className="min-w-0" data-composes="anuime-loading-button">
            <AnuimeLoadingButton character={character} loading={false}>
              Browse products
            </AnuimeLoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
