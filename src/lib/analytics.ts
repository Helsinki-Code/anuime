export const productEventNames = [
  "studio_entered",
  "component_selected",
  "recipe_shared",
  "install_copied",
  "docs_opened",
  "preview_exported",
  "gallery_remixed",
] as const;

export type ProductEventName = (typeof productEventNames)[number];
export type ProductEvent = {
  name: ProductEventName;
  componentId?: string;
  character?: "kira" | "mochi" | "atlas";
};

export function trackProductEvent(event: ProductEvent) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
  const body = JSON.stringify(event);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

export function parseProductEvent(value: unknown): ProductEvent | null {
  if (!value || typeof value !== "object") return null;
  if (!("name" in value)) return null;
  const name = productEventNames.find((item) => item === value.name);
  if (!name) return null;
  const componentId = "componentId" in value ? value.componentId : undefined;
  const character = "character" in value ? value.character : undefined;
  if (componentId !== undefined && typeof componentId !== "string") return null;
  if (
    character !== undefined &&
    character !== "kira" &&
    character !== "mochi" &&
    character !== "atlas"
  )
    return null;
  return {
    name,
    componentId,
    character,
  };
}
