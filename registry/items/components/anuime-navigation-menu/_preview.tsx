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
          className="ml-2 rounded-[4px] bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"
        >
          Studio
        </a>
      }
    />
  );
}
