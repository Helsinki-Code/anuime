"use client";

import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCopyButton } from "@/components/ui/anuime-copy-button";
import { AnuimeScrollArea } from "@/components/ui/anuime-scroll-area";
import { AnuimeScrollProgress } from "@/components/ui/anuime-scroll-progress";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeStickyRail } from "@/components/ui/anuime-sticky-rail";
import { AnuimeTypography } from "@/components/ui/anuime-typography";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeArticleReaderSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeArticleReaderSection({
  character = "kira",
  className = "",
}: AnuimeArticleReaderSectionProps) {
  return (
    <section
      data-anuime-section="anuime-article-reader-section"
      data-anuime-category="blog"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            blog
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Stay with the argument, not the chrome.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Preserve location, reading progress, and useful actions without crowding the page.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-typography">
            <AnuimeTypography character={character} />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-scroll-area">
            <AnuimeScrollArea character={character} className="h-48">
              <div className="grid gap-3 p-4">
                <strong>Stay with the argument, not the chrome.</strong>
                <p className="text-sm text-muted-foreground">
                  Preserve location, reading progress, and useful actions without crowding the page.
                </p>
              </div>
            </AnuimeScrollArea>
          </div>
          <div className="min-w-0" data-composes="anuime-separator">
            <AnuimeSeparator character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Continue reading</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-scroll-progress">
            <AnuimeScrollProgress character={character} value={64} />
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
          <div className="min-w-0" data-composes="anuime-copy-button">
            <AnuimeCopyButton
              character={character}
              value="npx shadcn@latest add https://anuime.vercel.app/r/anuime-article-reader-section.json"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
