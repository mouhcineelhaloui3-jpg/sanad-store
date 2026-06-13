import type { StoreContent } from "@/lib/cms/types";
import { defaultSiteSettings, siteSettingsSchema, type SiteSettings } from "./schema";
import { getSiteSettingsFromDb, saveSiteSettingsToDb } from "@/lib/db/site-content";
import { mapStoreContentToSiteSettings } from "./server-legacy";

const SETTINGS_KEY = "site_settings";

export { mapStoreContentToSiteSettings };

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const fromDb = await getSiteSettingsFromDb<SiteSettings | null>(SETTINGS_KEY, null);
    if (fromDb) return siteSettingsSchema.parse(fromDb);
    return defaultSiteSettings();
  } catch (error) {
    console.error("[settings] getSiteSettings failed, using defaults", error);
    return defaultSiteSettings();
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const parsed = siteSettingsSchema.parse(settings);
  await saveSiteSettingsToDb(SETTINGS_KEY, parsed);
  return parsed;
}
