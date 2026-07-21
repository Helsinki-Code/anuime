"use client";
import { AnuimeDataTable } from "./anuime-data-table";
const rows = [
  { id: "1", component: "Button", character: "Kira", status: "Ready" },
  { id: "2", component: "Dialog", character: "Atlas", status: "Review" },
  { id: "3", component: "Card", character: "Mochi", status: "Ready" },
];
export function Preview() {
  return (
    <AnuimeDataTable
      character="atlas"
      caption="Component readiness"
      rows={rows}
      columns={[
        { key: "component", header: "Component" },
        { key: "character", header: "System" },
        {
          key: "status",
          header: "Status",
          render: (value) => <span className="rounded-full border px-2 py-1 text-xs">{value}</span>,
        },
      ]}
    />
  );
}
