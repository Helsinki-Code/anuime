import { IconArrowRight } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import {
  CharacterSystemCard,
  CharacterThemeSurface,
  SignatureControl,
} from "@/components/anuime-v2/system-preview";
import { characterIds, characterSystems } from "@/lib/anuime/characters";

import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/characters/")({
  head: () =>
    getSeoHead({
      title: "Character systems — AnUIme",
      description:
        "Explore Kira, Mochi, and Atlas as complete artifact-to-geometry design systems.",
      path: "/characters",
    }),
  component: CharactersPage,
});

function CharactersPage() {
  return (
    <main>
      <section className="anuime-grid border-b px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Three systems · six theme variants
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Identity is a construction map.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Each character begins with seven authored artifacts, abstracts them into geometry, and
            assigns that geometry to real component carriers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {characterIds.map((character) => (
            <CharacterSystemCard key={character} character={character} />
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Geometry parity
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Light draws. Dark emits.</h2>
            <p className="mt-3 text-muted-foreground">
              Both modes keep the same component geometry. Only atmosphere, luminance, and
              restrained emission change.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {characterIds.map((character) => (
              <div key={character} className="grid grid-cols-2 border">
                {(["light", "dark"] as const).map((mode) => (
                  <CharacterThemeSurface
                    key={mode}
                    character={character}
                    mode={mode}
                    className="grid min-h-52 content-between gap-6 p-4"
                  >
                    <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                      {characterSystems[character].name} · {mode}
                    </p>
                    <SignatureControl character={character} compact />
                  </CharacterThemeSurface>
                ))}
              </div>
            ))}
          </div>
          <Link
            to="/design-philosophy"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
          >
            See how the rule works <IconArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
