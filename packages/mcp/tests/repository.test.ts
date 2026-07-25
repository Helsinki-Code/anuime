import { describe, expect, it } from "vitest";

import { getInstallCommand, getRegistryItem, listComponentItems } from "../src/repository.js";

describe("AnUIme MCP registry access", () => {
  it("exposes all 51 workhorses and 12 Expressive Moments", () => {
    const components = listComponentItems();
    const expressive = components.filter((item) =>
      /^anuime-(?:kira|mochi|atlas)-(?:loader|text-reveal|success|empty-state)$/u.test(item.name),
    );

    expect(components).toHaveLength(63);
    expect(expressive).toHaveLength(12);
  });

  it("returns exact authored source for a registry component", () => {
    const item = getRegistryItem("anuime-checkbox");

    expect(item?.type).toBe("registry:ui");
    expect(item?.files.some((file) => file.path === "anuime-checkbox.tsx")).toBe(true);
    expect(item?.files[0]?.content).toContain("AnuimeCheckbox");
  });

  it("builds one canonical shadcn command for multiple items", () => {
    expect(getInstallCommand(["anuime-theme-kira", "anuime-checkbox"])).toBe(
      "npx shadcn@latest add https://anuime.vercel.app/r/anuime-theme-kira.json https://anuime.vercel.app/r/anuime-checkbox.json",
    );
  });
});
