import { IconArrowRight, IconShieldCheck } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { characterIds, characterSystems } from "@/lib/anuime/characters";

import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/characters/")({
  head: () =>
    getSeoHead({
      title: "The AnUIme Cast",
      description: "Meet the three original characters behind AnUIme's complete design systems.",
      path: "/characters",
    }),
  component: CharactersPage,
});

function CharactersPage() {
  return (
    <main>
      <section className="anuime-grid border-b px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-violet-600 uppercase dark:text-violet-400">
            Original launch cast
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Personalities with system rules.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Each illustrated character governs color, shape, structure, density, motion, and
            accessible interaction behavior.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-3 lg:px-8 lg:py-20">
        {characterIds.map((id) => {
          const character = characterSystems[id];
          return (
            <article
              key={id}
              className={`anuime-character anuime-${id} group overflow-hidden rounded-3xl border bg-background shadow-sm`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <picture>
                  <source srcSet={character.keyArt.webp} type="image/webp" />
                  <img
                    src={character.keyArt.png}
                    alt={character.keyArt.alt}
                    width="1024"
                    height="1536"
                    loading="lazy"
                    className="size-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.025]"
                  />
                </picture>
              </div>
              <div className="p-6">
                <p className="font-mono text-xs tracking-[0.18em] text-[var(--anuime-accent)] uppercase">
                  {character.role}
                </p>
                <h2 className="mt-2 text-3xl font-semibold">{character.name}</h2>
                <p className="mt-2 font-medium">{character.tagline}</p>
                <div className="mt-4 rounded-2xl border border-[var(--anuime-accent)]/30 bg-[var(--anuime-accent)]/5 p-4">
                  <p className="font-mono text-xs tracking-[0.16em] text-[var(--anuime-accent)] uppercase">
                    Signature power · {character.specialty.name}
                  </p>
                  <p className="mt-2 text-sm font-medium">{character.specialty.invocation}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {character.description}
                </p>
                <Link
                  to="/characters/$character"
                  params={{ character: id }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--anuime-accent)]"
                >
                  Enter character system <IconArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
      <div className="mx-auto mb-20 flex max-w-4xl items-start gap-3 rounded-2xl border bg-muted/35 p-5 text-sm text-muted-foreground">
        <IconShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-500" />
        <p>
          These are AI-assisted original concept assets with recorded provenance. Human cleanup,
          similarity review, and final production licensing approval remain required before a stable
          release.
        </p>
      </div>
    </main>
  );
}
