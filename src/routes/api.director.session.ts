import { createFileRoute } from "@tanstack/react-router";

import { createDirectorSession } from "@/lib/anuime/director-auth.server";

export const Route = createFileRoute("/api/director/session")({
  server: {
    handlers: {
      GET: () => {
        if (process.env.ANUIME_AI_DIRECTOR_ENABLED !== "true") {
          return Response.json({ error: "Director unavailable" }, { status: 404 });
        }
        const session = createDirectorSession();
        return Response.json(
          { csrfToken: session.csrfToken, expiresIn: 1800 },
          { headers: { "cache-control": "no-store", "set-cookie": session.cookie } },
        );
      },
    },
  },
});
