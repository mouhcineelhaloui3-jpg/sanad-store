import type { ExtensionPackage } from "@sanad/core";
import { loadExtensionState } from "@sanad/core";

export const MARKETPLACE_CATALOG: ExtensionPackage[] = [
  {
    id: "products-extension",
    name: "IPTV Products",
    version: "1.0.0",
    description: "Full CRUD for IPTV subscription products",
    downloadUrl: "/extensions/products-extension",
    installed: true,
    category: "core",
    author: "SANAD"
  },
  {
    id: "ads-extension",
    name: "Ads & Marketing",
    version: "1.0.0",
    description: "Meta, Google, TikTok pixel and campaign tracking",
    downloadUrl: "/extensions/ads-extension",
    installed: true,
    category: "marketing",
    author: "SANAD"
  },
  {
    id: "analytics-extension",
    name: "WhatsApp Analytics",
    version: "1.0.0",
    description: "WhatsApp click and lead conversion metrics",
    downloadUrl: "/extensions/analytics-extension",
    installed: true,
    category: "sales",
    author: "SANAD"
  },
  {
    id: "automation-extension",
    name: "Automation Engine",
    version: "1.0.0",
    description: "Cron jobs for renewals, expiry, and campaigns",
    downloadUrl: "/extensions/automation-extension",
    installed: true,
    category: "automation",
    author: "SANAD"
  },
  {
    id: "affiliate-extension",
    name: "Affiliate Program",
    version: "1.0.0",
    description: "Partner codes and WhatsApp lead attribution",
    downloadUrl: "/extensions/affiliate-extension",
    installed: false,
    category: "sales",
    author: "SANAD"
  },
  {
    id: "marketplace-extension",
    name: "Extension Marketplace",
    version: "1.0.0",
    description: "Install, update, and remove admin plugins",
    downloadUrl: "/extensions/marketplace-extension",
    installed: true,
    category: "core",
    author: "SANAD"
  }
];

export async function getMarketplaceCatalog(): Promise<ExtensionPackage[]> {
  const states = await loadExtensionState();
  const installed = new Set(states.filter((s) => s.enabled !== false).map((s) => s.name));
  return MARKETPLACE_CATALOG.map((pkg) => ({
    ...pkg,
    installed: installed.has(pkg.id) || pkg.installed
  }));
}
