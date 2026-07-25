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
  {
    id: "night-shift",
    title: "Night Shift",
    description:
      "An Atlas operations surface with Mochi-calibrated motion for long, low-light sessions.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: {
      ...createAnuimeRecipe("atlas"),
      motionSystem: "mochi",
      density: "compact",
      motionLevel: "calm",
      mode: "dark",
    },
    componentIds: ["progress", "badge", "toolbar", "table"],
    tags: ["operations", "mixed-cast", "dark"],
    moderationStatus: "approved",
    remixOf: null,
  },
  {
    id: "creator-release",
    title: "Creator Release",
    description:
      "A gracious release workflow for publishing, audience controls, and calm feedback.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: { ...createAnuimeRecipe("mochi"), density: "comfortable", mode: "light" },
    componentIds: ["card", "input", "switch", "button"],
    tags: ["publishing", "creator", "workflow"],
    moderationStatus: "approved",
    remixOf: null,
  },
  {
    id: "signal-review",
    title: "Signal Review",
    description: "A high-signal Kira review queue for fast approvals and unambiguous status.",
    author: { id: "anuime-team", displayName: "AnUIme Team" },
    recipe: { ...createAnuimeRecipe("kira"), density: "compact", mode: "dark" },
    componentIds: ["alert", "avatar", "button-group", "badge"],
    tags: ["review", "collaboration", "decisive"],
    moderationStatus: "approved",
    remixOf: null,
  },
];
