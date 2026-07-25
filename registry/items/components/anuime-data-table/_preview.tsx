"use client";

import type { AnuimeCharacter } from "@/lib/anuime-recipe";

import { AnuimeDataTable } from "./anuime-data-table";

const rows = [
  { id: "1", component: "Button", owner: "Core UI", status: "Ready" },
  { id: "2", component: "Dialog", owner: "Platform", status: "Review" },
  { id: "3", component: "Card", owner: "Growth", status: "Ready" },
];

export function Preview({ character = "kira" }: { character?: AnuimeCharacter }) {
  return (
    <AnuimeDataTable
      character={character}
      caption="Component readiness"
      rows={rows}
      columns={[
        { key: "component", header: "Component" },
        { key: "owner", header: "Owner" },
        {
          key: "status",
          header: "Status",
          render: (value) => (
            <span className="rounded-[4px] border px-2 py-1 text-xs">{value}</span>
          ),
        },
      ]}
    />
  );
}
