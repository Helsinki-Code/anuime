import { defineEval } from "eve/evals";

export default defineEval({
  description: "Original signature powers guide UI behavior without imitating named franchises.",
  tags: ["gate", "character"],
  async test(t) {
    await t.send(
      "Use Mochi's Dream Cache for a friendly onboarding popover with gentle recovery and reduced motion.",
    );
    t.succeeded();
    t.calledTool("inspect_character");
    t.calledTool("propose_recipe");
    t.calledTool("validate_recipe");
    t.notCalledTool("web_search");
    t.notCalledTool("write_file");
  },
});
