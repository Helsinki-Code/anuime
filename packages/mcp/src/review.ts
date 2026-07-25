import type { CharacterId, ReviewResult, ReviewViolation } from "./schema.js";
import { ReviewResultSchema } from "./schema.js";

type ReviewContext = "workhorse" | "expressive";

type Rule = {
  ruleId: string;
  severity?: ReviewViolation["severity"];
  pattern: RegExp;
  message: string;
  fix: string;
  when?: (code: string, match: RegExpExecArray, context: ReviewContext) => boolean;
};

const globalRules: Rule[] = [
  {
    ruleId: "global.token-only-color",
    pattern: /#[\da-f]{3,8}\b|(?:rgb|hsl)a?\s*\(/giu,
    message: "Raw color values bypass the approved character token ladder.",
    fix: "Replace the raw value with a canonical CSS variable such as var(--foreground), var(--anuime-accent), or var(--border).",
  },
  {
    ruleId: "global.reduced-motion",
    pattern: /@keyframes\b|animation(?:-name)?\s*:|animate-(?:spin|pulse|bounce)\b/giu,
    message: "Animated output has no reduced-motion guard with a recognizable static state.",
    fix: "Add @media (prefers-reduced-motion: reduce), set animation: none !important, and keep the final geometry visible.",
    when: (code) => !/prefers-reduced-motion\s*:\s*reduce/iu.test(code),
  },
  {
    ruleId: "global.two-tier",
    pattern: /@keyframes\b|animation(?:-name)?\s*:|animate-(?:spin|pulse|bounce)\b/giu,
    message: "Power animation is not allowed on a workhorse component.",
    fix: "Keep the workhorse static except for functional state transitions, or move this effect into an Expressive Moment item.",
    when: (_code, _match, context) => context === "workhorse",
  },
];

const characterRules: Record<CharacterId, Rule[]> = {
  kira: [
    {
      ruleId: "kira.no-pills",
      pattern: /rounded-full\b|border-radius\s*:\s*(?:9999?px|50%)/giu,
      message: "Elongated pill/capsule geometry contradicts Kira's buckle construction.",
      fix: "Use Kira's rectangular radius ladder; reserve true circles for circuit nodes and the collar ring.",
      when: (code, match) => {
        const nearby = code.slice(
          Math.max(0, match.index - 80),
          match.index + match[0].length + 80,
        );
        return !/(?:aspect-square|size-\d+|circuit|collar)/iu.test(nearby);
      },
    },
    {
      ruleId: "kira.directional-angle",
      pattern:
        /(?:linear-gradient|rotate|skew(?:x|y)?)\(\s*(-?\d+(?:\.\d+)?)deg|(?:rotate|skew-[xy])-\[\s*(-?\d+(?:\.\d+)?)deg\]/giu,
      message:
        "This directional angle is outside Kira's 114° axis and approved construction transforms.",
      fix: "Use 114° for directional systems; only kite 45°, shard −18°, and blade −24° are construction exceptions.",
      when: (_code, match) => {
        const angle = Number(match[1] ?? match[2]);
        return ![114, 45, -18, -24].includes(angle);
      },
    },
    {
      ruleId: "kira.light-in-lines",
      pattern:
        /\bbg-(?:cyan|sky|accent)(?:-\d+)?\b|background(?:-color)?\s*:\s*var\(--(?:anuime-)?accent\)/giu,
      message: "Kira's cyan/accent light is being used as a broad workhorse fill.",
      fix: "Withdraw cyan to a hairline, focus trace, state edge, or small motif; use foreground/surface mass for the carrier.",
      when: (_code, _match, context) => context === "workhorse",
    },
  ],
  mochi: [
    {
      ruleId: "mochi.dark-not-black",
      pattern: /\bbg-black\b|(?:background|background-color)\s*:\s*(?:black|#0{3,8})/giu,
      message: "Mochi dark surfaces must come from warm plum/mauve, never black.",
      fix: "Use the Mochi background, surface, or elevated token from the dark ladder.",
    },
    {
      ruleId: "mochi.gracious-never-sweet",
      pattern: /\b(?:bg|text|border)-(?:pink|fuchsia)-(?:300|400|500|600)\b|hotpink|deeppink/giu,
      message: "Candy saturation makes Mochi saccharine instead of gracious.",
      fix: "Use restrained rose for state, champagne gold for hairlines, and ivory/plum for mass.",
    },
    {
      ruleId: "mochi.motion-never-brisk",
      pattern: /animation\s*:[^;\n]*(\d+(?:\.\d+)?)(ms|s)[^;\n]*linear|animate-spin\b/giu,
      message: "Mochi motion is brisk or linear instead of settling like fabric.",
      fix: "Use a measured duration (2.6s for shimmer) with ease-in-out, then settle.",
      when: (_code, match) => {
        if (/animate-spin/iu.test(match[0])) return true;
        const duration = Number(match[1]);
        const milliseconds = match[2]?.toLowerCase() === "s" ? duration * 1000 : duration;
        return milliseconds < 2600 || /linear/iu.test(match[0]);
      },
    },
    {
      ruleId: "mochi.warmth-as-feedback",
      pattern:
        /(?:background|box-shadow)\s*:[^;\n]*(?:radial-gradient|rose|gold)|\bbg-(?:rose|amber|yellow)-\d+\b/giu,
      message: "A full-surface bloom uses warmth as decoration instead of localized feedback.",
      fix: "Localize the rose/gold veil at the interaction point, keep it restrained, and make it settle.",
      when: (_code, _match, context) => context === "workhorse",
    },
    {
      ruleId: "mochi.excess-ornament",
      pattern:
        /(?:sparkle|sparkles|star)[\s\S]*(?:sparkle|sparkles|star)[\s\S]*(?:sparkle|sparkles|star)/giu,
      message: "Repeated sparkle ornament exceeds Mochi's restrained artifact vocabulary.",
      fix: "Keep a single small star as a state marker or move bloom-magic into an Expressive Moment.",
    },
  ],
  atlas: [
    {
      ruleId: "atlas.beam-angle",
      pattern: /linear-gradient\(\s*(-?\d+(?:\.\d+)?)deg/giu,
      message: "Atlas beam geometry uses an angle other than its deliberate 76° pitch.",
      fix: "Set beam and shimmer direction to 76°; reserve 45° rotation for survey diamonds.",
      when: (_code, match) => Number(match[1]) !== 76,
    },
    {
      ruleId: "atlas.selection-structural",
      pattern: /focus(?:-visible)?:ring(?:-\d+)?\b|box-shadow\s*:[^;\n]*(?:blue|cobalt|accent)/giu,
      message: "A generic halo is standing in for Atlas's structural docking focus.",
      fix: "Add four panel brackets that converge and seat around the control in 180ms.",
      when: (code) => !/(?:bracket|data-(?:anuime-)?dock|anuime-dock|before:|after:)/iu.test(code),
    },
    {
      ruleId: "atlas.dark-emitted-data",
      pattern:
        /\bbg-(?:blue|cobalt|accent)(?:-\d+)?\b|background(?:-color)?\s*:\s*var\(--(?:anuime-)?accent\)/giu,
      message: "Cobalt is being used as a broad decorative surface.",
      fix: "Use cobalt as linework, survey state, a focus bracket, or a small emission from a structural carrier.",
      when: (_code, _match, context) => context === "workhorse",
    },
    {
      ruleId: "atlas.load-bearing",
      pattern: /(?:sparkle|ornament|decoration|floating-dot)/giu,
      message: "Atlas ornament has no visible structural function.",
      fix: "Attach the detail to a frame, segment, inset, survey grid, buckle, or docked carrier.",
      when: (code) => !/(?:frame|segment|inset|grid|buckle|dock|bracket)/iu.test(code),
    },
    {
      ruleId: "atlas.hud-tier",
      pattern: /(?:hologram|hud-glow|scanline)/giu,
      message: "HUD-power appears outside a waiting or transition-state Expressive Moment.",
      fix: "Remove the HUD-power decoration from the workhorse or move it to an Atlas loader, reveal, success, or empty state.",
      when: (_code, _match, context) => context === "workhorse",
    },
  ],
};

const positiveMotifPatterns: Record<CharacterId, RegExp> = {
  kira: /\bkira(?:[.\s_:/-]+)(?:hairpin|earring|circuit|strap|collar|fringe|shard)\b|\b(?:hairpin-chevron|circuit-node|collar-ring|light-shard|fringe-diagonal)\b/giu,
  mochi:
    /\bmochi(?:[.\s_:/-]+)(?:clasp|pearl|crescent|star|ribbon|drape|veil)\b|\b(?:gold-clasp|pearl-(?:thumb|bead|string)|crescent-moon|ribbon-rule|drape-curve|veil-scrim)\b/giu,
  atlas:
    /\batlas(?:[.\s_:/-]+)(?:buckle|strap|panel|grid|lens|beam|core)\b|\b(?:survey-diamond|panel-bracket|lens-bezel|strap-band|core-ring|light-beam)\b/giu,
};

export function reviewCode(
  character: CharacterId,
  code: string,
  context: ReviewContext = "workhorse",
  scopeCharacter?: CharacterId,
): ReviewResult {
  const scopedRules = scopeCharacter ? crossContaminationRules(scopeCharacter) : [];
  const violations = [...globalRules, ...characterRules[character], ...scopedRules]
    .flatMap((rule) => collectRuleViolations(rule, code, context))
    .filter(
      (violation, index, all) =>
        all.findIndex(
          (candidate) =>
            candidate.ruleId === violation.ruleId &&
            candidate.line === violation.line &&
            candidate.column === violation.column,
        ) === index,
    )
    .toSorted(
      (left, right) =>
        left.line - right.line ||
        left.column - right.column ||
        left.ruleId.localeCompare(right.ruleId),
    );

  return ReviewResultSchema.parse({
    schemaVersion: "anuime.review.v1",
    character,
    ...(scopeCharacter ? { scopeCharacter } : {}),
    context,
    compliant: violations.length === 0,
    violationCount: violations.length,
    violations,
  });
}

function crossContaminationRules(scopeCharacter: CharacterId): Rule[] {
  return (Object.keys(positiveMotifPatterns) as CharacterId[])
    .filter((motifCharacter) => motifCharacter !== scopeCharacter)
    .map((motifCharacter) => ({
      ruleId: `cross-contamination.${motifCharacter}-in-${scopeCharacter}`,
      severity: "cross-contamination" as const,
      pattern: positiveMotifPatterns[motifCharacter],
      message: `${capitalize(motifCharacter)} positive motif geometry appears inside a ${capitalize(scopeCharacter)}-owned scope.`,
      fix: `Remove the ${capitalize(motifCharacter)} motif, rebuild the detail under ${capitalize(scopeCharacter)}'s laws, or change this path's cast assignment before composing it.`,
    }));
}

function collectRuleViolations(
  rule: Rule,
  code: string,
  context: ReviewContext,
): ReviewViolation[] {
  const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
  const violations: ReviewViolation[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code))) {
    if (!rule.when || rule.when(code, match, context)) {
      const location = getLocation(code, match.index);
      violations.push({
        ruleId: rule.ruleId,
        severity: rule.severity ?? "error",
        message: rule.message,
        ...location,
        evidence: match[0].slice(0, 160),
        fix: rule.fix,
      });
    }

    if (match[0].length === 0) pattern.lastIndex += 1;
  }

  return violations;
}

function getLocation(code: string, index: number): { line: number; column: number } {
  const before = code.slice(0, index);
  const lines = before.split("\n");
  return {
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
  };
}

function capitalize(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}
