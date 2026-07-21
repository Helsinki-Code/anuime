"use client";
import { AnuimeNavigationMenu } from "./anuime-navigation-menu";
export function Preview() {
  return (
    <AnuimeNavigationMenu
      character="atlas"
      items={[
        { label: "Components", href: "#components" },
        { label: "Characters", href: "#characters" },
        { label: "Docs", href: "#docs" },
      ]}
      action={
        <a
          href="#studio"
          className="ml-2 rounded-sm bg-blue-400 px-3 py-2 text-sm font-bold text-slate-950"
        >
          Studio
        </a>
      }
    />
  );
}
