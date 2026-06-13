import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { StoreContent } from "@/lib/cms/types";
import { getStoreContent } from "@/lib/cms/server";
import { defaultSiteSettings, siteSettingsSchema, type SiteSettings } from "./schema";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");

export function mapStoreContentToSiteSettings(content: StoreContent): SiteSettings {
  const parsed = siteSettingsSchema.safeParse({
    site_name: content.branding?.brandName ?? "SANAD IPTV",
    logo: content.branding?.logoUrl ?? "/logo/sanad-iptv-logo.png",
    theme: "light",
    currency: process.env.NEXT_PUBLIC_CURRENCY ?? "MAD",
    contact_email: content.footer?.supportEmail ?? "support@sanadiptv.com",
    maintenance_mode: false
  });

  return parsed.success ? parsed.data : defaultSiteSettings();
}

async function readSettingsFile(): Promise<SiteSettings | null> {
  try {
    const raw = await readFile(SETTINGS_FILE, "utf-8");
    const parsed = siteSettingsSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const fromFile = await readSettingsFile();
    if (fromFile) return fromFile;

    const content = await getStoreContent();
    return mapStoreContentToSiteSettings(content);
  } catch (error) {
    console.error("[settings] getSiteSettings failed, using defaults", error);
    return defaultSiteSettings();
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const parsed = siteSettingsSchema.parse(settings);
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(SETTINGS_FILE, JSON.stringify(parsed, null, 2), "utf-8");
  return parsed;
}
