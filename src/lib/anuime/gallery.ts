import { createAnuimeRecipe, type AnuimeRecipeV2 } from "./recipe";
import type { RegistryComponentId } from "./studio";

export type GalleryModerationStatus = "draft" | "pending" | "approved" | "rejected" | "removed";

export type GalleryEntry = {
  id: string;
  title: string;
  description: string;
  author: { id: string; displayName: string };
  recipe: AnuimeRecipeV2;
  componentIds: RegistryComponentId[];
  tags: string[];
  moderationStatus: GalleryModerationStatus;
  remixOf: string | null;
};

export const curatedGalleryEntries: GalleryEntry[] = [
  {
    id: "signal-launch",
    title: "Signal Launch",
    description: "A decisive Kira system for developer launches and high-signal actions.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: createAnuimeRecipe("kira"),
    componentIds: ["button", "card", "command-palette"],
    tags: ["developer-tools", "launch", "dark"],
    moderationStatus: "approved",
    remixOf: null,
  },
  {
    id: "soft-start",
    title: "Soft Start",
    description: "A warm onboarding direction with spacious density and gentle feedback.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: { ...createAnuimeRecipe("mochi"), density: "spacious", mode: "light" },
    componentIds: ["input", "select", "auth-panel"],
    tags: ["onboarding", "creator", "friendly"],
    moderationStatus: "approved",
    remixOf: null,
  },
  {
    id: "control-plane",
    title: "Control Plane",
    description: "Compact Atlas structure for operational data and reliable navigation.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: { ...createAnuimeRecipe("atlas"), density: "compact", motionLevel: "still" },
    componentIds: ["data-table", "navigation-menu", "tabs"],
    tags: ["dashboard", "data", "reduced-motion"],
    moderationStatus: "approved",
    remixOf: null,
  },
];
