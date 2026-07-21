import { defineTool } from "eve/tools";

import { briefSchema, proposeRecipe } from "../lib/domain.js";

export default defineTool({
  description:
    "Create one deterministic, schema-valid recipe proposal from a bounded product brief.",
  inputSchema: briefSchema,
  execute(brief) {
    return proposeRecipe(brief);
  },
});
