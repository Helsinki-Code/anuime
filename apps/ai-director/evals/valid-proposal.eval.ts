import { defineEval } from "eve/evals";

export default defineEval({
  description: "A normal product brief uses the bounded proposal and validation tools.",
  tags: ["gate", "recipe"],
  async test(t) {
    await t.send("Design a calm structured data-table experience for an operations dashboard.");
    t.succeeded();
    t.calledTool("propose_recipe");
    t.calledTool("validate_recipe");
    t.notCalledTool("bash");
    t.notCalledTool("write_file");
  },
});
