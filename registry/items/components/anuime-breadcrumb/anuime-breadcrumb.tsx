import type { AnchorHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeBreadcrumbItem = { label: string; href?: string };
export type AnuimeBreadcrumbProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  items?: AnuimeBreadcrumbItem[];
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
};

export function AnuimeBreadcrumb({
  character = "kira",
  recipe,
  items = [
    { label: "Registry", href: "#" },
    { label: "Components", href: "#" },
    { label: "Breadcrumb" },
  ],
  linkProps,
}: AnuimeBreadcrumbProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "breadcrumb");
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.href ?? item.label} className="flex items-center gap-2">
            {index ? (
              <span aria-hidden="true" className="opacity-40">
                /
              </span>
            ) : null}
            {item.href && index < items.length - 1 ? (
              <a
                href={item.href}
                className={`${styles.accent} underline-offset-4 hover:underline`}
                {...linkProps}
              >
                {item.label}
              </a>
            ) : (
              <span
                aria-current={index === items.length - 1 ? "page" : undefined}
                className="font-medium"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
