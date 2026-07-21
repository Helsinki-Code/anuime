import { IconCopy, IconLock, IconSparkles } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { trackProductEvent } from "@/lib/analytics";
import { curatedGalleryEntries } from "@/lib/anuime/gallery";
import { componentCatalog, studioSearchFromDocument } from "@/lib/anuime/studio";
import { featureFlags } from "@/lib/feature-flags";

import { AnuimeButton } from "../../registry/items/components/anuime-button/anuime-button";
import { AnuimeCard } from "../../registry/items/components/anuime-card/anuime-card";
import { getSeoHead } from "../lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    getSeoHead({
      title: "Curated Recipe Gallery — AnUIme",
      description: "Explore approved AnUIme recipes and remix them safely in Component Lab.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main>
      <section className="anuime-grid border-b px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-violet-600 uppercase dark:text-violet-400">
            <IconSparkles className="size-4" /> Curated remix gallery
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Start from a direction worth remixing.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Only approved, schema-valid recipes appear here. Publishing remains closed until
            identity, moderation, reporting, deletion, and attribution are production-ready.
          </p>
          {!featureFlags.galleryPublish ? (
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground">
              <IconLock className="size-3.5" /> Community publishing is feature-gated
            </p>
          ) : null}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-3 lg:px-8 lg:py-20">
        {curatedGalleryEntries
          .filter((entry) => entry.moderationStatus === "approved")
          .map((entry) => {
            const componentId = entry.componentIds[0] ?? "button";
            const search = studioSearchFromDocument({
              recipe: entry.recipe,
              componentId,
              previewState: componentCatalog[componentId].states[0] ?? "default",
              viewport: "desktop",
              zoom: 1,
            });
            return (
              <article
                key={entry.id}
                className="flex flex-col rounded-3xl border bg-background p-5 shadow-sm"
              >
                <div className="rounded-2xl border bg-muted/30 p-5">
                  <AnuimeCard
                    recipe={entry.recipe}
                    eyebrow={entry.tags[0]}
                    title={entry.title}
                    description={entry.description}
                    action={<AnuimeButton recipe={entry.recipe}>Preview direction</AnuimeButton>}
                  />
                </div>
                <p className="mt-5 text-xs text-muted-foreground">By {entry.author.displayName}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="rounded-full border px-2.5 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/studio"
                  search={search}
                  onClick={() =>
                    trackProductEvent({
                      name: "gallery_remixed",
                      character: entry.recipe.colorSystem,
                    })
                  }
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
                >
                  <IconCopy className="size-4" /> Remix in Component Lab
                </Link>
              </article>
            );
          })}
      </section>
    </main>
  );
}
