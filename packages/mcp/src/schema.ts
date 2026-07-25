import { z } from "zod/v3";

export const CharacterIdSchema = z.enum(["kira", "mochi", "atlas"]);
export const ThemeIdSchema = z.enum(["light", "dark"]);

export const TokenLadderSchema = z.record(z.string(), z.string());

export const MotifLawSchema = z.object({
  id: z.string(),
  artifact: z.string(),
  geometry: z.string(),
  carriers: z.array(z.string()),
});

export const PersonaPackSchema = z.object({
  schemaVersion: z.literal("anuime.persona.v2"),
  specVersion: z.string(),
  character: CharacterIdSchema,
  adjective: z.string(),
  goldenDirective: z.literal(
    "Install what exists in the registry; hand-write only what doesn't, under these laws.",
  ),
  tokenLadders: z.object({
    light: TokenLadderSchema,
    dark: TokenLadderSchema,
  }),
  motifLaws: z.array(MotifLawSchema).length(7),
  forbidden: z.array(z.string()).min(1),
  layoutPhysics: z.object({
    controlHeightPx: z.number(),
    compactControlHeightPx: z.number(),
    radiusLadderPx: z.record(z.string(), z.number()),
    directionalAxisDeg: z.number().optional(),
    transitionStyle: z.string(),
    generalTransitionMs: z.number(),
    focusMechanism: z.string(),
  }),
  componentCli: z.object({
    commandTemplate: z.string(),
    themeItem: z.string(),
    workhorseItems: z.array(z.string()).length(51),
    expressiveItems: z.array(z.string()).length(4),
  }),
  expressiveMoments: z.object({
    allowedOnlyFor: z.array(z.string()),
    reducedMotionRule: z.string(),
    items: z.array(
      z.object({
        kind: z.enum(["loader", "text-reveal", "success", "empty-state"]),
        registryItem: z.string(),
        usage: z.string(),
      }),
    ),
  }),
  estimatedTokens: z.number().int().positive().max(1500),
});

export const ReviewViolationSchema = z.object({
  ruleId: z.string(),
  severity: z.enum(["error", "warning"]),
  message: z.string(),
  line: z.number().int().positive(),
  column: z.number().int().positive(),
  evidence: z.string(),
  fix: z.string(),
});

export const ReviewResultSchema = z.object({
  schemaVersion: z.literal("anuime.review.v1"),
  character: CharacterIdSchema,
  context: z.enum(["workhorse", "expressive"]),
  compliant: z.boolean(),
  violationCount: z.number().int().nonnegative(),
  violations: z.array(ReviewViolationSchema),
});

export type CharacterId = z.infer<typeof CharacterIdSchema>;
export type PersonaPack = z.infer<typeof PersonaPackSchema>;
export type ReviewResult = z.infer<typeof ReviewResultSchema>;
export type ReviewViolation = z.infer<typeof ReviewViolationSchema>;
