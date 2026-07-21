import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.4-mini",
  reasoning: "low",
  limits: {
    maxInputTokensPerSession: 60_000,
    maxOutputTokensPerSession: 8_000,
  },
  compaction: { thresholdPercent: 0.75 },
});
