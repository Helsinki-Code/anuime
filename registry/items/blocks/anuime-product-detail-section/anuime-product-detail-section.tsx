"use client";

import { AnuimeAspectRatio } from "@/components/ui/anuime-aspect-ratio";
import { AnuimeBorderTraceButton } from "@/components/ui/anuime-border-trace-button";
import { AnuimeBreadcrumb } from "@/components/ui/anuime-breadcrumb";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeRadioGroup } from "@/components/ui/anuime-radio-group";
import { AnuimeSignalCard } from "@/components/ui/anuime-signal-card";
import { AnuimeTabs } from "@/components/ui/anuime-tabs";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeProductDetailSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeProductDetailSection({
  character = "kira",
  className = "",
}: AnuimeProductDetailSectionProps) {
  return (
    <section
      data-anuime-section="anuime-product-detail-section"
      data-anuime-category="ecommerce"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 p-6 md:p-10">
        <AnuimeBreadcrumb character={character} />
        <header id="overview" className="grid max-w-3xl gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            ecommerce
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Make the purchase decision feel informed.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Bring media, options, proof, and the primary action into a coherent product view.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Product Detail"
              title="Make the purchase decision feel informed."
              description="Bring media, options, proof, and the primary action into a coherent product view."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-tabs">
            <AnuimeTabs
              character={character}
              tabs={[
                {
                  id: "overview",
                  label: "Overview",
                  content:
                    "Bring media, options, proof, and the primary action into a coherent product view.",
                },
                {
                  id: "details",
                  label: "Details",
                  content: "Every dependency remains visible and inspectable.",
                },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-radio-group">
            <AnuimeRadioGroup
              character={character}
              legend="Choose an option"
              defaultValue="recommended"
              options={[
                { value: "recommended", label: "Recommended" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Add to cart</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-aspect-ratio">
            <AnuimeAspectRatio character={character} />
          </div>
          <div className="min-w-0" data-composes="anuime-signal-card">
            <AnuimeSignalCard
              character={character}
              label="Live signal"
              title="All systems nominal"
              description="Bring media, options, proof, and the primary action into a coherent product view."
              status="healthy"
            />
          </div>
          <div className="min-w-0" data-composes="anuime-border-trace-button">
            <AnuimeBorderTraceButton character={character}>Add to cart</AnuimeBorderTraceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
