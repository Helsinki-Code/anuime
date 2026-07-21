import type { ReactNode } from "react";

import {
  resolveAnuimeRecipe,
  type AnuimeCharacter,
  type AnuimeRecipeV2,
} from "@/lib/anuime-recipe";

export type AnuimeSidebarItem = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
};
export type AnuimeSidebarProps = {
  character?: AnuimeCharacter;
  recipe?: AnuimeRecipeV2;
  title?: ReactNode;
  items?: AnuimeSidebarItem[];
  footer?: ReactNode;
  collapsed?: boolean;
};

export function AnuimeSidebar({
  character = "kira",
  recipe,
  title = "AnUIme",
  items = [
    { id: "overview", label: "Overview", href: "#", active: true },
    { id: "components", label: "Components", href: "#" },
    { id: "studio", label: "Studio", href: "#" },
  ],
  footer,
  collapsed = false,
}: AnuimeSidebarProps) {
  const styles = resolveAnuimeRecipe(recipe, character);
  return (
    <aside
      aria-label="Application sidebar"
      className={`${styles.surface} ${styles.surfacePadding} flex min-h-80 ${collapsed ? "w-20" : "w-64"} flex-col`}
    >
      <div className={`${styles.accent} font-bold`}>{collapsed ? "A" : title}</div>
      <nav className={`mt-6 grid ${styles.gap}`}>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            className={`${styles.shapeControl} flex items-center gap-3 px-3 py-2 text-sm font-medium ${item.active ? styles.secondary : "hover:bg-white/10"}`}
          >
            {item.icon}
            {collapsed ? <span className="sr-only">{item.label}</span> : item.label}
          </a>
        ))}
      </nav>
      {footer ? <div className="mt-auto pt-6">{footer}</div> : null}
    </aside>
  );
}
