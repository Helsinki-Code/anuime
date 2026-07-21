import { z } from "zod";

export const characters = ["kira", "mochi", "atlas"] as const;
export const componentIds = [
  "button",
  "input",
  "checkbox",
  "card",
  "tabs",
  "dialog",
  "select",
  "toast",
  "navigation-menu",
  "command-palette",
  "data-table",
  "auth-panel",
  "textarea",
  "switch",
  "radio-group",
  "tooltip",
  "popover",
  "combobox",
  "accordion",
  "progress",
  "skeleton",
  "pagination",
  "date-control",
] as const;

export const recipeSchema = z.object({
  version: z.literal(2),
  colorSystem: z.enum(characters),
  shapeSystem: z.enum(characters),
  structureSystem: z.enum(characters),
  motionSystem: z.enum(characters),
  density: z.enum(["compact", "comfortable", "spacious"]),
  motionLevel: z.enum(["still", "calm", "expressive"]),
  mode: z.enum(["light", "dark", "system"]),
});

export const briefSchema = z.object({
  intent: z.string().min(3).max(500),
  componentIds: z.array(z.enum(componentIds)).min(1).max(componentIds.length),
  constraints: z
    .object({
      mode: z.enum(["light", "dark"]).optional(),
      reducedMotion: z.boolean().optional(),
      density: z.enum(["compact", "comfortable", "spacious"]).optional(),
    })
    .default({}),
  currentRecipe: recipeSchema.optional(),
});

export type DirectorBrief = z.infer<typeof briefSchema>;
export type AnuimeRecipeV2 = z.infer<typeof recipeSchema>;

export const characterDefinitions = {
  kira: {
    role: "Neon Ronin",
    specialty: "Signal Cut",
    behavior: "Isolate one decisive action through keyboard-first focus and fast transitions.",
    bestFor: ["developer tools", "gaming", "launches"],
  },
  mochi: {
    role: "Dream Familiar",
    specialty: "Dream Cache",
    behavior: "Reveal contextual help, recovery, and optional micro-rewards beside the task.",
    bestFor: ["communities", "creator tools", "onboarding"],
  },
  atlas: {
    role: "Mecha Architect",
    specialty: "Gridforge",
    behavior: "Expose complex hierarchy as modular, inspectable, predictable structure.",
    bestFor: ["dashboards", "productivity", "data"],
  },
} as const;

export function proposeRecipe(brief: DirectorBrief) {
  const text = brief.intent.toLowerCase();
  const base = text.match(/friendly|warm|creator|community|onboard|playful/u)
    ? "mochi"
    : text.match(/data|dashboard|structured|productivity|enterprise|precise/u)
      ? "atlas"
      : "kira";
  const recipe: AnuimeRecipeV2 = {
    version: 2,
    colorSystem: base,
    shapeSystem: base,
    structureSystem: base,
    motionSystem: base,
    density: brief.constraints.density ?? (base === "atlas" ? "compact" : "comfortable"),
    motionLevel: brief.constraints.reducedMotion
      ? "still"
      : base === "kira"
        ? "expressive"
        : "calm",
    mode: brief.constraints.mode ?? "system",
  };
  return {
    recipe,
    rationale: [
      `${characterDefinitions[base].role} best matches the requested product mood.`,
      `${characterDefinitions[base].specialty} supports the interaction behavior: ${characterDefinitions[base].behavior}`,
      `Density and motion remain within the approved AnUIme design vocabulary.`,
    ],
    warnings: [],
  };
}
