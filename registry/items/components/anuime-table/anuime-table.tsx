import type { HTMLAttributes, TableHTMLAttributes } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

type RecipeProps = { character?: AnuimeCharacter; recipe?: AnuimeRecipeV2 };
export function AnuimeTable({
  character = "atlas",
  recipe,
  className = "",
  ...props
}: TableHTMLAttributes<HTMLTableElement> & RecipeProps) {
  const styles = resolveAnuimeRecipe(recipe, character, "table");
  return (
    <div
      data-character={styles.recipe.structureSystem}
      data-anuime-component="table"
      className={`${styles.surface} overflow-x-auto ${styles.typography} [&_thead]:border-b-2 [&_thead]:border-[var(--anuime-accent,var(--accent))]`}
    >
      <table className={`w-full border-collapse text-sm ${className}`} {...props} />
    </div>
  );
}
export function AnuimeTableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="border-b bg-secondary/60 text-left" {...props} />;
}
export function AnuimeTableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y" {...props} />;
}
export function AnuimeTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="hover:bg-secondary/60" {...props} />;
}
export function AnuimeTableHead(props: HTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" className="px-4 py-3 font-semibold" {...props} />;
}
export function AnuimeTableCell(props: HTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-3" {...props} />;
}
