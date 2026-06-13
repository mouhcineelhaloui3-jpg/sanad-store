import type { Extension } from "@sanad/core";
import { installExtension, loadExtensionState, setExtensionEnabled } from "@sanad/core";
import { getMarketplaceCatalog } from "./catalog";

export const marketplaceExtension: Extension = {
  name: "marketplace-extension",
  version: "1.0.0",
  enabled: true,
  description: "Internal plugin marketplace",
  register(app) {
    app.registerPermission("extensions:read");
    app.registerPermission("extensions:write");
    app.registerNav({
      label: "Marketplace",
      href: "/admin/marketplace",
      section: "extensions",
      permission: "extensions:read"
    });
    app.registerNav({
      label: "Extensions",
      href: "/admin/extensions",
      section: "extensions",
      permission: "extensions:read"
    });

    app.registerRoute("GET", "/api/admin/marketplace", async () => ({
      status: 200,
      body: { ok: true, data: await getMarketplaceCatalog() }
    }));

    app.registerRoute("GET", "/api/admin/extensions", async () => ({
      status: 200,
      body: { ok: true, data: await loadExtensionState() }
    }));

    app.registerRoute("POST", "/api/admin/marketplace/:id/install", async ({ params }) => {
      const { allExtensions } = await import("../registry");
      await installExtension(params.id ?? "", allExtensions);
      return { status: 200, body: { ok: true, data: { installed: params.id } } };
    });

    app.registerRoute("PUT", "/api/admin/extensions/:name", async ({ params, body }) => {
      const { enabled } = body as { enabled: boolean };
      const { allExtensions } = await import("../registry");
      await setExtensionEnabled(params.name ?? "", enabled, allExtensions);
      return { status: 200, body: { ok: true, data: { name: params.name, enabled } } };
    });
  }
};

export * from "./catalog";
