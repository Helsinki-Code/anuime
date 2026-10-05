import { Link } from "@tanstack/react-router";

import { worldIds, worlds } from "../../lib/anuime/worlds";
import type { RegistryRouteItem } from "../../lib/registry/sections";
import { CatalogBrowser } from "./catalog-browser";
import { DocsPageHeader } from "./docs-page-header";

type RegistryListItem = RegistryRouteItem & {
  title: string;
  description: string;
};

type RegistryItemListProps = {
  catalog: {
    title: string;
    description: string;
    basePath: string;
    items: RegistryListItem[];
  };
};

export function RegistryItemList({ catalog }: RegistryItemListProps) {
  const isComponentCatalog = catalog.basePath === "/components";
  return (
    <div className="flex w-full flex-col gap-8">
      <DocsPageHeader
        title={catalog.title}
        description={catalog.description}
        pagePath={catalog.basePath}
      />

      {isComponentCatalog ? (
        <section className="relative overflow-hidden rounded-2xl border bg-[linear-gradient(120deg,color-mix(in_oklab,var(--accent)_10%,var(--background)),var(--background)_55%)] p-5 sm:p-7">
          <div className="pointer-events-none absolute -top-16 -right-12 size-48 rounded-full border border-[var(--anuime-accent,var(--accent))]/20" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[var(--anuime-accent,var(--accent))] uppercase">
                Character Design Systems 4
              </p>
              <h2 className="mt-2 max-w-xl font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                One production catalog. Three unmistakable interface voices.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Every Extended component carries explicit Kira, Mochi, and Atlas construction
                logic—shape, marker, rhythm, type, and motion—without introducing a new motif.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["51", "components"],
                ["34", "extended"],
                ["3", "systems"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-20 rounded-xl border bg-background/75 p-3">
                  <div className="text-xl font-bold">{value}</div>
                  <div className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {isComponentCatalog ? (
        <nav aria-label="Browse by character world" className="grid gap-2 sm:grid-cols-3">
          {worldIds.map((worldId) => {
            const world = worlds[worldId];
            return (
              <Link
                key={worldId}
                to="/characters/$character"
                params={{ character: worldId }}
                className="group rounded-xl border bg-card/70 p-4 transition-colors hover:border-[var(--anuime-accent,var(--accent))]/60"
              >
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                  {world.character} · {world.location}
                </span>
                <span className="mt-2 block text-sm font-semibold tracking-tight">
                  Browse {world.character} components
                  <span className="ml-1 text-[var(--anuime-accent,var(--accent))] transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      ) : null}

      {catalog.items.length > 0 ? (
        <CatalogBrowser items={catalog.items} />
      ) : (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          Add items under <code>registry/items</code> to publish the registry.
        </p>
      )}
    </div>
  );
}
