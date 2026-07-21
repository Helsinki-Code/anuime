import { createFileRoute } from "@tanstack/react-router";

import { verifyDirectorRequest } from "@/lib/anuime/director-auth.server";
import { requestDirectorProposal } from "@/lib/anuime/director.server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export const Route = createFileRoute("/api/director/propose")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (process.env.ANUIME_AI_DIRECTOR_ENABLED !== "true") {
          return Response.json({ error: "Director unavailable" }, { status: 404 });
        }
        const sessionId = verifyDirectorRequest(request);
        if (!sessionId) return Response.json({ error: "Unauthorized" }, { status: 401 });
        if (!consumeRateLimit(sessionId)) {
          return Response.json({ error: "Rate limit exceeded" }, { status: 429 });
        }
        const text = await request.text();
        if (text.length > 8_000)
          return Response.json({ error: "Payload too large" }, { status: 413 });
        try {
          const proposal = await requestDirectorProposal(JSON.parse(text));
          return Response.json({ proposal }, { headers: { "cache-control": "no-store" } });
        } catch (error) {
          const message =
            error instanceof Error && error.name === "ZodError"
              ? "Invalid Director brief"
              : "Director could not produce a proposal";
          return Response.json(
            { error: message },
            { status: 422, headers: { "cache-control": "no-store" } },
          );
        }
      },
    },
  },
});

function consumeRateLimit(id: string) {
  const now = Date.now();
  const current = buckets.get(id);
  if (!current || current.resetAt <= now) {
    buckets.set(id, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (current.count >= 6) return false;
  current.count += 1;
  return true;
}
