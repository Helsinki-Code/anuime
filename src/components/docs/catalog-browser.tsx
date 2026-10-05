"use client";

import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { anuimeExtendedComponentNames } from "../../../registry/items/lib/anuime-recipe/anuime-recipe";
import type { RegistryRouteItem } from "../../lib/registry/sections";
import { getRegistrySectionIdForType } from "../../lib/registry/sections";

type CatalogItem = RegistryRouteItem & { title: string; description: string };
const interactions = ["all", "input", "navigation", "feedback", "layout"] as const;
type Interaction = (typeof interactions)[number];

function isInteraction(value: string): value is Exclude<Interaction, "all"> {
  return value !== "all" && interactions.some((option) => option === value);
}

function itemCharacter(item: CatalogItem) {
  const value = (item.name + " " + item.title + " " + item.description).toLowerCase();
  if (value.includes("mochi")) return "mochi";
  if (value.includes("atlas")) return "atlas";
  if (value.includes("kira")) return "kira";
  return "shared";
}

function itemInteraction(item: CatalogItem): Exclude<Interaction, "all"> {
  const value = (item.name + " " + item.title + " " + item.description).toLowerCase();
  if (/input|field|select|combobox|textarea|form|search|command/.test(value)) return "input";
  if (/menu|nav|tab|breadcrumb|pagination|sidebar|toolbar|drawer/.test(value)) return "navigation";
  if (/toast|alert|dialog|modal|progress|loader|tooltip|feedback|success|error/.test(value))
    return "feedback";
  return "layout";
}

export function CatalogBrowser({ items }: { items: CatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [character, setCharacter] = useState("all");
  const [maturity, setMaturity] = useState("all");
  const [interaction, setInteraction] = useState<Interaction>("all");
  const extendedNames = useMemo(
    () => new Set(anuimeExtendedComponentNames.map((name) => "anuime-" + name)),
    [],
  );
  const types = useMemo(() => [...new Set(items.map((item) => item.type))].toSorted(), [items]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const searchable = (item.name + " " + item.title + " " + item.description).toLowerCase();
      const itemMaturity = extendedNames.has(item.name) ? "beta" : "stable";
      return (
        (!needle || searchable.includes(needle)) &&
        (type === "all" || item.type === type) &&
        (character === "all" || itemCharacter(item) === character) &&
        (maturity === "all" || itemMaturity === maturity) &&
        (interaction === "all" || itemInteraction(item) === interaction)
      );
    });
  }, [character, extendedNames, interaction, items, maturity, query, type]);
  const reset = () => {
    setQuery("");
    setType("all");
    setCharacter("all");
    setMaturity("all");
    setInteraction("all");
  };

  return (
    <section aria-label="Filter component catalog" className="flex flex-col gap-4">
      <div className="grid gap-2 rounded-xl border bg-muted/20 p-3 sm:grid-cols-[minmax(0,1fr)_repeat(4,minmax(0,auto))]">
        <label className="sr-only" htmlFor="catalog-search">
          Search components
        </label>
        <input
          id="catalog-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components, tasks, or patterns…"
          className="h-10 min-w-0 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <FilterSelect label="Type" value={type} onChange={setType} options={types} />
        <FilterSelect
          label="Character"
          value={character}
          onChange={setCharacter}
          options={["shared", "kira", "mochi", "atlas"]}
        />
        <FilterSelect
          label="Maturity"
          value={maturity}
          onChange={setMaturity}
          options={["stable", "beta"]}
        />
        <FilterSelect
          label="Interaction"
          value={interaction}
          onChange={(value) => {
            if (isInteraction(value)) setInteraction(value);
          }}
          options={interactions.filter((value) => value !== "all")}
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filtered.length}</strong> of {items.length}{" "}
          components
        </span>
        {filtered.length !== items.length ? (
          <button type="button" onClick={reset} className="font-medium text-foreground underline">
            Reset filters
          </button>
        ) : null}
      </div>
      {filtered.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item, index) => (
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
                <span className="rounded-full border border-border bg-secondary px-2 py-1 font-mono text-[8px] font-semibold tracking-wider text-secondary-foreground uppercase">
                  {extendedNames.has(item.name) ? "Beta" : "Stable"}
                </span>
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
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm font-medium">No components match these filters.</p>
          <button type="button" onClick={reset} className="mt-2 text-xs underline">
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex items-center gap-2 rounded-lg border bg-background px-2.5 sm:block sm:border-0 sm:bg-transparent sm:p-0">
      <span className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase sm:mb-1 sm:block">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 min-w-0 flex-1 bg-transparent text-sm outline-none sm:w-full sm:rounded-lg sm:border sm:bg-background sm:px-2"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace("registry:", "")}
          </option>
        ))}
      </select>
    </label>
  );
}
