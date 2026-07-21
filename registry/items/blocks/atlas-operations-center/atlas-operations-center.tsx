import { AnuimeBadge } from "@/components/ui/anuime-badge";
import { AnuimeSidebar } from "@/components/ui/anuime-sidebar";
import { AnuimeSkeleton } from "@/components/ui/anuime-skeleton";
import {
  AnuimeTable,
  AnuimeTableBody,
  AnuimeTableCell,
  AnuimeTableHead,
  AnuimeTableHeader,
  AnuimeTableRow,
} from "@/components/ui/anuime-table";
import { createAnuimeRecipe, resolveAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export type AtlasOperationsCenterProps = {
  recipe?: AnuimeRecipeV2;
  loading?: boolean;
  modules?: { id: string; name: string; owner: string; status: string }[];
};

export function AtlasOperationsCenter({
  recipe = createAnuimeRecipe("atlas"),
  loading = false,
  modules = [
    { id: "api", name: "Registry API", owner: "Platform", status: "Ready" },
    { id: "studio", name: "Component Lab", owner: "Design Systems", status: "Stable" },
    { id: "director", name: "AI Director", owner: "Agents", status: "Preview" },
  ],
}: AtlasOperationsCenterProps) {
  const styles = resolveAnuimeRecipe(recipe, "atlas");
  return (
    <section
      className={`${styles.surface} grid min-h-[30rem] overflow-hidden lg:grid-cols-[15rem_minmax(0,1fr)]`}
    >
      <AnuimeSidebar
        recipe={recipe}
        title="Gridforge"
        items={[
          { id: "map", label: "System Map", href: "#", active: true },
          { id: "modules", label: "Module Dock", href: "#" },
          { id: "inspect", label: "Blueprint Inspector", href: "#" },
        ]}
      />
      <div className={`${styles.surfacePadding} min-w-0`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className={`${styles.accent} font-mono text-xs tracking-[0.18em] uppercase`}>
              Grid Snap · Forge Table
            </p>
            <h2 className="mt-2 text-3xl font-bold">Operations Center</h2>
          </div>
          <AnuimeBadge recipe={recipe} tone="success">
            All systems legible
          </AnuimeBadge>
        </div>
        <div className="mt-6">
          {loading ? (
            <AnuimeSkeleton recipe={recipe} lines={6} label="Loading structural modules" />
          ) : (
            <AnuimeTable recipe={recipe}>
              <AnuimeTableHeader>
                <AnuimeTableRow>
                  <AnuimeTableHead>Module</AnuimeTableHead>
                  <AnuimeTableHead>Owner</AnuimeTableHead>
                  <AnuimeTableHead>Status</AnuimeTableHead>
                </AnuimeTableRow>
              </AnuimeTableHeader>
              <AnuimeTableBody>
                {modules.map((module) => (
                  <AnuimeTableRow key={module.id}>
                    <AnuimeTableCell>{module.name}</AnuimeTableCell>
                    <AnuimeTableCell>{module.owner}</AnuimeTableCell>
                    <AnuimeTableCell>{module.status}</AnuimeTableCell>
                  </AnuimeTableRow>
                ))}
              </AnuimeTableBody>
            </AnuimeTable>
          )}
        </div>
        <details className={`${styles.surface} ${styles.surfacePadding} mt-5`}>
          <summary className="cursor-pointer font-bold">Blueprint Inspector</summary>
          <p className="mt-2 text-sm opacity-70">
            Dependencies, ownership, and state remain progressively disclosed instead of crowding
            the primary grid.
          </p>
        </details>
      </div>
    </section>
  );
}
