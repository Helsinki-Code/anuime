import { IconArrowRight } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import {
  CharacterThemeSurface,
  ExpressiveLoader,
  SignatureControl,
} from "@/components/anuime-v2/system-preview";
import { characterIds, characterSystems } from "@/lib/anuime/characters";

import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/design-philosophy")({
  head: () =>
    getSeoHead({
      title: "Design philosophy — AnUIme",
      description:
        "How AnUIme turns character artifacts into accessible component geometry using a strict two-tier rule.",
      path: "/design-philosophy",
    }),
  component: DesignPhilosophyPage,
});

function DesignPhilosophyPage() {
  return (
    <main>
      <section className="anuime-grid border-b px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Design philosophy
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Character is geometry with a job.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            AnUIme does not paint a character palette over generic controls. It extracts artifacts
            from an approved board, abstracts them into repeatable geometry, and assigns each shape
            to a functional carrier.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-px border bg-border md:grid-cols-3">
          {[
            [
              "01 · Artifact",
              "A hairpin, pearl, strap, panel, or beam visible in the source board.",
            ],
            [
              "02 · Geometry",
              "The artifact becomes an open chevron, strung bead, segmented band, or dock bracket.",
            ],
            [
              "03 · Carrier",
              "The geometry receives a component job: check, progress, focus, status, or structure.",
            ],
          ].map(([title, copy]) => (
            <article key={title} className="bg-background p-6">
              <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {title}
              </p>
              <p className="mt-4 leading-7">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              The two-tier rule
            </p>
            <h2 className="mt-3 text-4xl font-semibold">Workhorses abstract. Moments assemble.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Everyday controls use only the abstract construction map. Full character powers are
              reserved for waiting, transition, success, and empty states—moments when the interface
              is already asking the user to notice time or change.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {characterIds.map((character) => (
              <CharacterThemeSurface key={character} character={character} className="border">
                <div className="grid min-h-72 grid-rows-[1fr_auto]">
                  <div className="p-6">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                      Tier 1 · workhorse
                    </p>
                    <div className="mt-8">
                      <SignatureControl character={character} compact />
                    </div>
                  </div>
                  <div className="grid min-h-32 grid-cols-[1fr_7rem] items-center border-t bg-[var(--anuime-surface)] p-5">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                        Tier 2 · expressive
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        {characterSystems[character].specialty.name}
                      </p>
                    </div>
                    <ExpressiveLoader character={character} />
                  </div>
                </div>
              </CharacterThemeSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <h2 className="text-3xl font-semibold">Dark mode changes light, not identity.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Geometry stays identical in both modes. Kira’s cyan line, Mochi’s candlelit rose and
            gold, and Atlas’s cobalt data can emit in darkness, but they cannot introduce a new
            shape or carrier.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Accessibility is a construction constraint.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Contrast is audited, focus remains visible, semantic controls keep their native
            behavior, and reduced-motion users receive a stable final state. Expressiveness never
            overrides comprehension.
          </p>
        </div>
        <Link
          to="/characters"
          className="inline-flex items-center gap-2 text-sm font-semibold lg:col-span-2"
        >
          Inspect all three construction maps <IconArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
