import { createFileRoute } from "@tanstack/react-router";

import { handleMcpRequest } from "../../packages/mcp/src/http";

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
