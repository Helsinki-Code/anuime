import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createGallerySession } from "@/lib/anuime/gallery-auth.server";
import { ensureGalleryUser } from "@/lib/anuime/gallery-repository.server";

export const Route = createFileRoute("/api/gallery/session")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = createGallerySession();
        try {
          const body = z.object({ displayName: z.string().optional() }).parse(await request.json());
          const user = ensureGalleryUser(session.userId, body.displayName ?? "");
          return Response.json(
            { user },
            { status: 201, headers: { "set-cookie": session.cookie, "cache-control": "no-store" } },
          );
        } catch {
          return Response.json({ error: "Invalid display name" }, { status: 422 });
        }
      },
    },
  },
});
