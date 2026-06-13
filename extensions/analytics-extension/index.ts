import type { Extension } from "@sanad/core";
import { getWhatsAppMetrics } from "./aggregator";

export const analyticsExtension: Extension = {
  name: "analytics-extension",
  version: "1.0.0",
  enabled: true,
  description: "WhatsApp lead analytics (no payment tracking)",
  register(app) {
    app.registerPermission("analytics:read");
    app.registerNav({
      label: "Analytics",
      href: "/admin/analytics",
      section: "system",
      permission: "analytics:read"
    });

    app.registerRoute("GET", "/api/admin/analytics", async () => ({
      status: 200,
      body: { ok: true, data: await getWhatsAppMetrics() }
    }));
  }
};

export * from "./types";
export * from "./aggregator";
