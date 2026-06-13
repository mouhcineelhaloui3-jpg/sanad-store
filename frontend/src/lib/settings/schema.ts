import { z } from "zod";

export const siteSettingsSchema = z.object({
  site_name: z.string().min(1).default("SANAD IPTV"),
  logo: z.string().default("/logo/sanad-iptv-logo.png"),
  theme: z.enum(["light", "dark", "system"]).default("light"),
  currency: z.string().min(1).default("MAD"),
  contact_email: z.string().email().default("support@sanadiptv.com"),
  maintenance_mode: z.boolean().default(false)
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;

export const SETTINGS_KEYS: Array<{ key: keyof SiteSettings; label: string; type: "text" | "email" | "select" | "boolean" }> =
  [
    { key: "site_name", label: "Site name", type: "text" },
    { key: "logo", label: "Logo URL", type: "text" },
    { key: "theme", label: "Theme", type: "select" },
    { key: "currency", label: "Currency", type: "text" },
    { key: "contact_email", label: "Contact email", type: "email" },
    { key: "maintenance_mode", label: "Maintenance mode", type: "boolean" }
  ];

export const defaultSiteSettings = (): SiteSettings => siteSettingsSchema.parse({});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

export const accessCodeSchema = z.object({
  password: z.string().min(4)
});
