import { encryptSecret } from "@sanad/core";
import { dataPath, readJsonStore, writeJsonStore } from "@sanad/core";
import type { AdIntegration, AdPlatform } from "./types";

const FILE = () => dataPath("ads-integrations.json");

const DEFAULT: AdIntegration[] = [
  {
    id: "ads_meta",
    platform: "meta",
    label: "Meta (Facebook / Instagram)",
    oauthConnected: false,
    enabled: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: "ads_google",
    platform: "google",
    label: "Google Ads",
    oauthConnected: false,
    enabled: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: "ads_tiktok",
    platform: "tiktok",
    label: "TikTok Ads",
    oauthConnected: false,
    enabled: false,
    updatedAt: new Date().toISOString()
  }
];

export async function listAdIntegrations(): Promise<AdIntegration[]> {
  return readJsonStore<AdIntegration[]>(FILE(), DEFAULT);
}

export async function upsertAdIntegration(
  platform: AdPlatform,
  patch: Partial<Pick<AdIntegration, "pixelId" | "campaignTag" | "enabled" | "oauthConnected">> & {
    apiKey?: string;
  }
): Promise<AdIntegration> {
  const items = await listAdIntegrations();
  const idx = items.findIndex((i) => i.platform === platform);
  if (idx < 0) throw new Error("Unknown platform");
  const current = items[idx]!;
  items[idx] = {
    ...current,
    ...patch,
    apiKeyEncrypted: patch.apiKey ? encryptSecret(patch.apiKey) : current.apiKeyEncrypted,
    updatedAt: new Date().toISOString()
  };
  await writeJsonStore(FILE(), items);
  return items[idx]!;
}

export async function listAdIntegrationsPublic() {
  const items = await listAdIntegrations();
  return items.map(({ apiKeyEncrypted: _key, ...rest }) => rest);
}
