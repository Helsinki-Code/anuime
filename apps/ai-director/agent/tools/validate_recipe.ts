import { defineTool } from "eve/tools";

import { recipeSchema } from "../lib/domain.js";

export default defineTool({
  description: "Validate that a candidate is a complete AnUIme recipe v2.",
  inputSchema: recipeSchema,
  execute(recipe) {
    return { valid: true, recipe, warnings: [] };
  },
});
