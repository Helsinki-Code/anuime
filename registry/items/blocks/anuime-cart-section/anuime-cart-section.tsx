"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeNumberTicker } from "@/components/ui/anuime-number-ticker";
import { AnuimeSeparator } from "@/components/ui/anuime-separator";
import { AnuimeSheet } from "@/components/ui/anuime-sheet";
import { AnuimeTable } from "@/components/ui/anuime-table";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCartSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCartSection({ character = "kira", className = "" }: AnuimeCartSectionProps) {
  return (
    <section
      data-anuime-section="anuime-cart-section"
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
            Every item and total, accounted for.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Keep quantity, adjustments, and the order summary explicit before checkout.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-sheet">
            <AnuimeSheet character={character} />
          </div>
          <div className="min-w-0 lg:col-span-2" data-composes="anuime-table">
            <AnuimeTable character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Continue to checkout</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-separator">
            <AnuimeSeparator character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-number-ticker">
            <AnuimeNumberTicker
              character={character}
              from={0}
              value={2418}
              className="text-3xl font-bold"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-loading-button">
            <AnuimeLoadingButton character={character} loading={false}>
              Continue to checkout
            </AnuimeLoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
