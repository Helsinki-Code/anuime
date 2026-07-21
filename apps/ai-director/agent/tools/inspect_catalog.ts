import { defineTool } from "eve/tools";
import { z } from "zod";

import { componentIds } from "../lib/domain.js";

export default defineTool({
  description: "List the bounded component ids supported by AnUIme Component Lab.",
  inputSchema: z.object({}),
  execute() {
    return { componentIds };
  },
});
