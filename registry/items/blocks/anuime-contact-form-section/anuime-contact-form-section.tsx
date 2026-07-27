"use client";

import { AnuimeAlert } from "@/components/ui/anuime-alert";
import { AnuimeButton } from "@/components/ui/anuime-button";
import { AnuimeCard } from "@/components/ui/anuime-card";
import { AnuimeField } from "@/components/ui/anuime-field";
import { AnuimeFramedBackground } from "@/components/ui/anuime-framed-background";
import { AnuimeInput } from "@/components/ui/anuime-input";
import { AnuimeLoadingButton } from "@/components/ui/anuime-loading-button";
import { AnuimeSelect } from "@/components/ui/anuime-select";
import { AnuimeTextarea } from "@/components/ui/anuime-textarea";
import type { AnuimeCharacter } from "@/lib/anuime-recipe";

export type AnuimeContactFormSectionProps = {
  character?: AnuimeCharacter;
  className?: string;
};

export function AnuimeContactFormSection({
  character = "kira",
  className = "",
}: AnuimeContactFormSectionProps) {
  return (
    <section
      data-anuime-section="anuime-contact-form-section"
      data-anuime-category="contact"
      data-anuime-laws="global.two-tier global.theme-geometry-parity global.token-only-color global.reduced-motion"
      className={`w-full bg-background text-foreground ${className}`}
    >
      <AnuimeFramedBackground character={character} className="w-full">
        <div className="mx-auto grid max-w-6xl gap-8 p-6 md:p-10">
          <header id="overview" className="grid max-w-3xl gap-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              contact
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Give us the context to help well.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Collect the request, route it clearly, and set expectations before submission.
            </p>
          </header>
          <div
            id="details"
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] items-start gap-5"
          >
            <div className="min-w-0" data-composes="anuime-card">
              <AnuimeCard
                character={character}
                eyebrow="Contact Form"
                title="Give us the context to help well."
                description="Collect the request, route it clearly, and set expectations before submission."
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
            <div className="min-w-0" data-composes="anuime-textarea">
              <AnuimeTextarea
                character={character}
                label="How can we help?"
                placeholder="Share the useful context…"
              />
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
              <AnuimeButton character={character}>Send request</AnuimeButton>
            </div>
            <div className="min-w-0" data-composes="anuime-alert">
              <AnuimeAlert
                character={character}
                title="Context preserved"
                description="Collect the request, route it clearly, and set expectations before submission."
              />
            </div>
            <div className="min-w-0" data-composes="anuime-loading-button">
              <AnuimeLoadingButton character={character} loading={false}>
                Send request
              </AnuimeLoadingButton>
            </div>
          </div>
        </div>
      </AnuimeFramedBackground>
    </section>
  );
}
