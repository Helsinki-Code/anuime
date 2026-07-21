"use client";

import { AnuimeAccordion } from "@/components/ui/anuime-accordion";
import { AnuimeDataTable } from "@/components/ui/anuime-data-table";
import { createAnuimeRecipe, type AnuimeRecipeV2 } from "@/lib/anuime-recipe";

export function AtlasGridforge({
  recipe = createAnuimeRecipe("atlas"),
}: {
  recipe?: AnuimeRecipeV2;
}) {
  return (
    <section className="grid gap-5 rounded-sm border-2 border-blue-400/35 bg-slate-950 p-5 text-slate-50 shadow-[12px_12px_0_-4px_rgba(96,165,250,0.18)] xl:grid-cols-[1.4fr_0.8fr]">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-blue-400 uppercase">
          Atlas · Gridforge
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Operations control grid</h2>
        <div className="mt-5">
          <AnuimeDataTable
            recipe={recipe}
            caption="Service readiness"
            rows={[
              { id: "1", service: "Registry", owner: "Core", status: "Ready" },
              { id: "2", service: "Studio", owner: "Creative", status: "Review" },
              { id: "3", service: "Gallery", owner: "Trust", status: "Gated" },
            ]}
            columns={[
              { key: "service", header: "Service" },
              { key: "owner", header: "Owner" },
              { key: "status", header: "Status" },
            ]}
          />
        </div>
      </div>
      <AnuimeAccordion
        recipe={recipe}
        items={[
          {
            id: "health",
            title: "System health",
            content: "All deterministic recipe services are operational.",
          },
          {
            id: "risks",
            title: "Open risks",
            content: "Human art review and external alpha validation remain visible gates.",
          },
          {
            id: "audit",
            title: "Audit trail",
            content: "Changes remain attributable and inspectable.",
          },
        ]}
      />
    </section>
  );
}
