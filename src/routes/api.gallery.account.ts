import { createFileRoute } from "@tanstack/react-router";

import { clearGallerySessionCookie, readGallerySession } from "@/lib/anuime/gallery-auth.server";
import { deleteGalleryAccount, exportGalleryAccount } from "@/lib/anuime/gallery-repository.server";

export const Route = createFileRoute("/api/gallery/account")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const userId = readGallerySession(request);
        return userId
          ? Response.json(exportGalleryAccount(userId), {
              headers: { "cache-control": "no-store" },
            })
          : Response.json({ error: "Unauthorized" }, { status: 401 });
      },
      DELETE: ({ request }) => {
        const userId = readGallerySession(request);
        if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
        deleteGalleryAccount(userId);
        return new Response(null, {
          status: 204,
          headers: { "set-cookie": clearGallerySessionCookie() },
        });
      },
    },
  },
});
