"use client";

import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeCheckbox } from "@/components/ui/anuime-checkbox";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeProgress } from "@/components/ui/anuime-progress";
import { AnuimeProgressLoader } from "@/components/ui/anuime-progress-loader";
import { AnuimeRadioGroup } from "@/components/ui/anuime-radio-group";
import { AnuimeSuccessBurst } from "@/components/ui/anuime-success-burst";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeCheckoutSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeCheckoutSection({
  character = "kira",
  className = "",
}: AnuimeCheckoutSectionProps) {
  return (
    <section
      data-anuime-section="anuime-checkout-section"
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
            Complete the order with confidence.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Show progress, payment choices, consent, and success as one continuous flow.
          </p>
        </header>
        <div
          id="details"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
        >
          <div className="min-w-0" data-composes="anuime-card">
            <AnuimeCard
              character={character}
              eyebrow="Checkout"
              title="Complete the order with confidence."
              description="Show progress, payment choices, consent, and success as one continuous flow."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-field">
            <AnuimeField
              character={character}
              label="Work email"
              description="Used only for this request."
            />
          </div>
          <div className="min-w-0" data-composes="anuime-input">
            <AnuimeInput
              character={character}
              label="Work email"
              hint="We will only use this for the requested follow-up."
              placeholder="you@company.com"
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
          <div className="min-w-0" data-composes="anuime-checkbox">
            <AnuimeCheckbox
              character={character}
              label="Keep me informed"
              description="Send relevant updates about this decision."
              defaultChecked
            />
          </div>
          <div className="min-w-0" data-composes="anuime-button">
            <AnuimeButton character={character}>Place order</AnuimeButton>
          </div>
          <div className="min-w-0" data-composes="anuime-progress">
            <AnuimeProgress character={character} label="Completion" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-progress-loader">
            <AnuimeProgressLoader character={character} label="Checkout progress" value={68} />
          </div>
          <div className="min-w-0" data-composes="anuime-success-burst">
            <AnuimeSuccessBurst character={character} className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
