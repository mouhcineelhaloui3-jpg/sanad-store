import type { Prisma } from "@/generated/prisma/client";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";

export type SeoSettingsDto = {
  siteTitle: string;
  siteDescription: string;
  defaultOgImage: string;
  robotsIndex: boolean;
  canonicalBase: string;
  programmaticEnabled: boolean;
  blogEnabled: boolean;
};

const DEFAULT_SEO: SeoSettingsDto = {
  siteTitle: "SANAD IPTV — Premium IPTV Worldwide",
  siteDescription: "Premium IPTV subscription for customers worldwide. Sports, movies, series in HD/4K.",
  defaultOgImage: "/opengraph-image",
  robotsIndex: true,
  canonicalBase: "https://sanadiptv.com",
  programmaticEnabled: true,
  blogEnabled: true
};

export async function getSeoSettings(): Promise<SeoSettingsDto> {
  const row = await prisma.seoSettings.findUnique({ where: { id: "default" } });
  if (!row) return DEFAULT_SEO;
  return { ...DEFAULT_SEO, ...(row.config as SeoSettingsDto) };
}

export async function saveSeoSettings(settings: SeoSettingsDto, audit?: { userId: string; ip?: string | null }) {
  const row = await prisma.seoSettings.upsert({
    where: { id: "default" },
    create: { id: "default", config: settings as Prisma.InputJsonValue },
    update: { config: settings as Prisma.InputJsonValue }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "seo.update",
      module: "seo",
      ip: audit.ip ?? null
    });
  }
  return { ...DEFAULT_SEO, ...(row.config as SeoSettingsDto) };
}
