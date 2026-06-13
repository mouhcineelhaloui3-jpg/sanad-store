import { defaultSiteSettings, SETTINGS_KEYS, type SiteSettings } from "@/lib/settings/schema";
import { adminFetch } from "@/lib/admin/fetch-client";

export async function fetchAdminSettings(): Promise<{ settings: SiteSettings; fromFallback: boolean }> {
  try {
    const settings = await adminFetch<SiteSettings>("/api/admin/settings");
    return { settings, fromFallback: false };
  } catch (error) {
    console.error("[settings/admin-client] fetch failed, using defaults", error);
    return { settings: defaultSiteSettings(), fromFallback: true };
  }
}

export async function saveAdminSettings(settings: SiteSettings): Promise<SiteSettings> {
  return adminFetch<SiteSettings>("/api/admin/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  });
}

export { SETTINGS_KEYS };
