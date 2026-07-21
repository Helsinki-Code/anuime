import { z } from "zod";

import { registryComponentIds } from "./studio";

const characterSchema = z.enum(["kira", "mochi", "atlas"]);

export const directorRecipeSchema = z.object({
  version: z.literal(2),
  colorSystem: characterSchema,
  shapeSystem: characterSchema,
  structureSystem: characterSchema,
  motionSystem: characterSchema,
  density: z.enum(["compact", "comfortable", "spacious"]),
  motionLevel: z.enum(["still", "calm", "expressive"]),
  mode: z.enum(["light", "dark", "system"]),
});

export const directorBriefSchema = z.object({
  intent: z.string().trim().min(3).max(500),
  componentIds: z.array(z.enum(registryComponentIds)).min(1).max(registryComponentIds.length),
  constraints: z.object({
    mode: z.enum(["light", "dark"]).optional(),
    reducedMotion: z.boolean().optional(),
    density: z.enum(["compact", "comfortable", "spacious"]).optional(),
  }),
  currentRecipe: directorRecipeSchema.optional(),
});

export const directorProposalSchema = z.object({
  recipe: directorRecipeSchema,
  rationale: z.array(z.string().min(1).max(240)).min(1).max(5),
  warnings: z
    .array(
      z.object({
        code: z.string().min(1).max(80),
        severity: z.enum(["error", "warning"]),
        message: z.string().min(1).max(240),
      }),
    )
    .max(10),
});

export type DirectorBrief = z.infer<typeof directorBriefSchema>;
export type DirectorProposal = z.infer<typeof directorProposalSchema>;
