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
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <div className={`${styles.surface} overflow-x-auto`}>
      <table className={`w-full border-collapse text-sm ${className}`} {...props} />
    </div>
  );
}
export function AnuimeTableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="border-b bg-black/5 text-left dark:bg-white/5" {...props} />;
}
export function AnuimeTableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y" {...props} />;
}
export function AnuimeTableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="hover:bg-black/5 dark:hover:bg-white/5" {...props} />;
}
export function AnuimeTableHead(props: HTMLAttributes<HTMLTableCellElement>) {
  return <th scope="col" className="px-4 py-3 font-semibold" {...props} />;
}
export function AnuimeTableCell(props: HTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-3" {...props} />;
}
