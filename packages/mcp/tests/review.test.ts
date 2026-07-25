import { describe, expect, it } from "vitest";

import { reviewCode } from "../src/review.js";
import type { CharacterId } from "../src/schema.js";

const violationCases: {
  character: CharacterId;
  code: string;
  ruleId: string;
}[] = [
  {
    character: "kira",
    code: '<button className="px-6 rounded-full">Run</button>',
    ruleId: "kira.no-pills",
  },
  {
    character: "kira",
    code: ".sweep { background: linear-gradient(90deg, transparent, var(--anuime-accent)); }",
    ruleId: "kira.directional-angle",
  },
  {
    character: "kira",
    code: '<section className="bg-cyan-500">Panel</section>',
    ruleId: "kira.light-in-lines",
  },
  {
    character: "kira",
    code: ".node { color: #00ffff; }",
    ruleId: "global.token-only-color",
  },
  {
    character: "kira",
    code: ".blade { animation: slash 1s ease infinite; }",
    ruleId: "global.reduced-motion",
  },
  {
    character: "mochi",
    code: '<section className="bg-black">Salon</section>',
    ruleId: "mochi.dark-not-black",
  },
  {
    character: "mochi",
    code: '<button className="bg-pink-500">Sweet</button>',
    ruleId: "mochi.gracious-never-sweet",
  },
  {
    character: "mochi",
    code: ".veil { animation: shimmer 1s linear infinite; }",
    ruleId: "mochi.motion-never-brisk",
  },
  {
    character: "mochi",
    code: ".card { background: radial-gradient(circle, rose, transparent); }",
    ruleId: "mochi.warmth-as-feedback",
  },
  {
    character: "mochi",
    code: "<Sparkle /><Star /><Sparkles />",
    ruleId: "mochi.excess-ornament",
  },
  {
    character: "atlas",
    code: ".beam { background: linear-gradient(45deg, transparent, var(--anuime-accent)); }",
    ruleId: "atlas.beam-angle",
  },
  {
    character: "atlas",
    code: '<button className="focus-visible:ring-2">Dock</button>',
    ruleId: "atlas.selection-structural",
  },
  {
    character: "atlas",
    code: '<section className="bg-blue-500">Panel</section>',
    ruleId: "atlas.dark-emitted-data",
  },
  {
    character: "atlas",
    code: "<SparkleDecoration />",
    ruleId: "atlas.load-bearing",
  },
  {
    character: "atlas",
    code: '<div className="hud-glow">Metric</div>',
    ruleId: "atlas.hud-tier",
  },
];

describe("anuime_review", () => {
  it.each(violationCases)(
    "detects $ruleId for $character with a structured fix",
    ({ character, code, ruleId }) => {
      const result = reviewCode(character, code);
      const violation = result.violations.find((candidate) => candidate.ruleId === ruleId);

      expect(result.compliant).toBe(false);
      expect(violation).toMatchObject({
        ruleId,
        severity: "error",
        line: expect.any(Number),
        column: expect.any(Number),
        fix: expect.any(String),
      });
    },
  );

  it.each([
    ["kira", '<button className="rounded-[5px] border border-[var(--border)]">Run</button>'],
    ["mochi", '<button className="rounded-[10px] bg-[var(--surface)]">Save</button>'],
    ["atlas", "<button className=\"before:content-[''] after:content-['']\">Dock</button>"],
  ] as const)("accepts a tokenized static %s workhorse", (character, code) => {
    expect(reviewCode(character, code)).toMatchObject({
      compliant: true,
      violationCount: 0,
      violations: [],
    });
  });

  it("allows expressive animation when a reduced-motion fallback is present", () => {
    const code = `
      .loader { animation: orbit 1.15s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .loader { animation: none !important; }
      }
    `;

    expect(reviewCode("mochi", code, "expressive").compliant).toBe(true);
  });
});
