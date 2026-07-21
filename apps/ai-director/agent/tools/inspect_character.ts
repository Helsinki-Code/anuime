import { defineTool } from "eve/tools";
import { z } from "zod";

import { characterDefinitions, characters } from "../lib/domain.js";

export default defineTool({
  description: "Inspect one approved original AnUIme character system.",
  inputSchema: z.object({ character: z.enum(characters) }),
  execute({ character }) {
    return { character, ...characterDefinitions[character] };
  },
});
