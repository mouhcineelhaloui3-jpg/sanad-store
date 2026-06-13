import type { Extension } from "@sanad/core";
import { appendAuditLog } from "@sanad/core";
import { listAdIntegrationsPublic, upsertAdIntegration } from "./store";
import type { AdPlatform } from "./types";

export const adsExtension: Extension = {
  name: "ads-extension",
  version: "1.0.0",
  enabled: true,
  description: "Meta, Google, TikTok ads integrations",
  register(app) {
    app.registerPermission("ads:read");
    app.registerPermission("ads:write");
    app.registerNav({
      label: "Ads & Marketing",
      href: "/admin/ads",
      section: "system",
      permission: "ads:read"
    });

    app.registerRoute("GET", "/api/admin/ads", async () => ({
      status: 200,
      body: { ok: true, data: await listAdIntegrationsPublic() }
    }));

    app.registerRoute("PUT", "/api/admin/ads/:platform", async ({ params, body, userId }) => {
      const platform = (params.platform ?? "") as AdPlatform;
      const data = await upsertAdIntegration(platform, body as Parameters<typeof upsertAdIntegration>[1]);
      await appendAuditLog({
        userId: userId ?? "system",
        action: "ADS_UPDATE",
        module: "ads-extension",
        metadata: { platform }
      });
      const { apiKeyEncrypted: _key, ...safe } = data;
      return { status: 200, body: { ok: true, data: safe } };
    });
  }
};

export * from "./types";
export * from "./store";
