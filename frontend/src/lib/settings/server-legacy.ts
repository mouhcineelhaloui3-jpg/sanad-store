import type { StoreContent } from "@/lib/cms/types";
import { getStoreContent } from "@/lib/cms/server";
import { defaultSiteSettings, siteSettingsSchema, type SiteSettings } from "./schema";

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

export async function getSiteSettingsFromCmsFallback(): Promise<SiteSettings> {
  const content = await getStoreContent();
  return mapStoreContentToSiteSettings(content);
}
