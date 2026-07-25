import { createFileRoute } from "@tanstack/react-router";

import { handleMcpRequest } from "../../packages/mcp/src/http";
import { configureAnuimeRepository } from "../../packages/mcp/src/repository";
import { productionMcpRepository } from "../lib/anuime/mcp-repository.server";

configureAnuimeRepository(productionMcpRepository);

const mcpHandler = ({ request }: { request: Request }) => handleMcpRequest(request);

export const Route = createFileRoute("/mcp")({
  server: {
    handlers: {
      GET: mcpHandler,
      POST: mcpHandler,
      DELETE: mcpHandler,
    },
  },
});
