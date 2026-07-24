import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeColumn<Row> = {
  key: keyof Row;
  header: string;
  render?: (value: Row[keyof Row], row: Row) => React.ReactNode;
};
export type AnuimeDataTableProps<Row extends { id: string }> = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  caption: string;
  columns: AnuimeColumn<Row>[];
  rows: Row[];
  emptyMessage?: string;
};

export function AnuimeDataTable<Row extends { id: string }>({
  character = "atlas",
  recipe,
  caption,
  columns,
  rows,
  emptyMessage = "No records found.",
}: AnuimeDataTableProps<Row>) {
  const styles = resolveAnuimeRecipe(recipe, character, "data-table");
  const system = styles.recipe.structureSystem;
  const cellPadding = system === "mochi" ? "px-[18px]" : "px-4";
  const rowMarker = {
    kira: "size-[7px] rounded-full bg-[var(--anuime-accent,var(--accent))]",
    mochi:
      "size-1.5 rounded-full border border-[var(--anuime-secondary-accent,var(--border))] bg-[var(--anuime-accent,var(--accent))]",
    atlas: "size-1.5 rotate-45 bg-[var(--anuime-accent,var(--accent))]",
  }[system];
  return (
    <div data-character={system} className={`w-full overflow-x-auto ${styles.surface}`}>
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-current/15">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                scope="col"
                className={`${cellPadding} h-10 font-mono text-[11px] tracking-[0.08em] uppercase ${styles.accent}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="h-[46px] border-b border-border/70 last:border-0 hover:bg-secondary/50"
            >
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <td key={String(column.key)} className={`${cellPadding} py-3`}>
                    {column === columns[0] ? (
                      <span aria-hidden="true" className={`mr-2 inline-block ${rowMarker}`} />
                    ) : null}
                    {column.render ? column.render(value, row) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center opacity-60">
                {emptyMessage}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
