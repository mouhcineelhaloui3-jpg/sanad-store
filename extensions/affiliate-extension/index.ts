import type { Extension } from "@sanad/core";
import { createAffiliate, listAffiliates } from "./store";

export const affiliateExtension: Extension = {
  name: "affiliate-extension",
  version: "1.0.0",
  enabled: false,
  description: "Affiliate tracking for WhatsApp leads",
  register(app) {
    app.registerPermission("affiliate:read");
    app.registerPermission("affiliate:write");
    app.registerNav({
      label: "Affiliates",
      href: "/admin/affiliates",
      section: "extensions",
      permission: "affiliate:read"
    });

    app.registerRoute("GET", "/api/admin/affiliates", async () => ({
      status: 200,
      body: { ok: true, data: await listAffiliates() }
    }));

    app.registerRoute("POST", "/api/admin/affiliates", async ({ body }) => ({
      status: 201,
      body: { ok: true, data: await createAffiliate(body as Parameters<typeof createAffiliate>[0]) }
    }));
  }
};

export * from "./types";
export * from "./store";
