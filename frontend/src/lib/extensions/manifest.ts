export const extensionManifest = [
  {
    name: "products-extension",
    version: "1.0.0",
    description: "IPTV product catalog CRUD"
  },
  {
    name: "ads-extension",
    version: "1.0.0",
    description: "Meta, Google, TikTok ads integrations"
  },
  {
    name: "analytics-extension",
    version: "1.0.0",
    description: "WhatsApp lead analytics (no payment tracking)"
  },
  {
    name: "automation-extension",
    version: "1.0.0",
    description: "Cron jobs for renewals, expiry, and campaigns"
  },
  {
    name: "affiliate-extension",
    version: "1.0.0",
    description: "Affiliate tracking for WhatsApp leads"
  },
  {
    name: "marketplace-extension",
    version: "1.0.0",
    description: "Internal plugin marketplace"
  }
] as const;

export type ExtensionManifestItem = (typeof extensionManifest)[number];
