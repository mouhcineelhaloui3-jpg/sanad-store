export type AdPlatform = "meta" | "google" | "tiktok";

export type AdIntegration = {
  id: string;
  platform: AdPlatform;
  label: string;
  pixelId?: string;
  apiKeyEncrypted?: string;
  oauthConnected: boolean;
  enabled: boolean;
  campaignTag?: string;
  updatedAt: string;
};

export type ConversionEvent = {
  id: string;
  platform: AdPlatform;
  event: string;
  productId?: string;
  source?: string;
  timestamp: string;
};
