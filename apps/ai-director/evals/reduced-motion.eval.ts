import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Reduced-motion briefs produce a still recipe.",
  tags: ["gate", "accessibility"],
  async test(t) {
    await t.send("Make a welcoming onboarding card. Reduced motion is required.");
    t.succeeded();
    t.calledTool("propose_recipe");
    t.check((t.reply ?? "").toLowerCase(), includes("still"));
  },
});
