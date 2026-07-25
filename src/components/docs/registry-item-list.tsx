import { Link } from "@tanstack/react-router";

import { anuimeExtendedComponentNames } from "../../../registry/items/lib/anuime-recipe/anuime-recipe";
import type { RegistryRouteItem } from "../../lib/registry/sections";
import { getRegistrySectionIdForType } from "../../lib/registry/sections";
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
  const extendedNames = new Set(
    anuimeExtendedComponentNames.map((componentName) => `anuime-${componentName}`),
  );

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

      {catalog.items.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {catalog.items.map((item, index) => (
            <Link
              key={item.name}
              to="/$section/$name"
              params={{ section: getRegistrySectionIdForType(item.type), name: item.name }}
              className="group relative flex min-h-36 flex-col overflow-hidden rounded-xl border bg-card p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--anuime-accent,var(--accent))]/50 hover:shadow-[0_18px_40px_-30px_color-mix(in_oklab,var(--anuime-accent,var(--accent))_75%,transparent)]"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
                  {String(index + 1).padStart(2, "0")} · {item.type.replace("registry:", "")}
                </span>
                {extendedNames.has(item.name) ? (
                  <span className="rounded-full border border-border bg-secondary px-2 py-1 font-mono text-[8px] font-semibold tracking-wider text-secondary-foreground uppercase">
                    Extended
                  </span>
                ) : null}
              </div>
              <span className="text-base font-semibold tracking-tight">{item.title}</span>
              <span className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </span>
              <span className="mt-auto pt-5 text-xs font-semibold text-[var(--anuime-accent,var(--accent))] opacity-0 transition-opacity group-hover:opacity-100">
                Inspect construction →
              </span>
              <span className="pointer-events-none absolute right-0 bottom-0 h-px w-0 bg-[var(--anuime-accent,var(--accent))] transition-[width] duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          Add items under <code>registry/items</code> to publish the registry.
        </p>
      )}
    </div>
  );
}
