import type { Prisma } from "@/generated/prisma/client";
import { defaultStoreContent } from "@/lib/cms/defaults";
import type { StoreContent } from "@/lib/cms/types";
import { appendAuditLog } from "./audit";
import { prisma } from "./prisma";

function deepMerge<T extends Record<string, unknown>>(base: T, patch: Partial<T>): T {
  const out = { ...base };
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const value = patch[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge(
        (base[key] as Record<string, unknown>) ?? {},
        value as Record<string, unknown>
      ) as T[keyof T];
    } else if (value !== undefined) {
      out[key] = value as T[keyof T];
    }
  }
  return out;
}

export async function getCmsContentFromDb(): Promise<StoreContent> {
  const row = await prisma.cmsContent.findUnique({ where: { id: "storefront" } });
  if (!row) return defaultStoreContent();
  return deepMerge(defaultStoreContent(), row.content as StoreContent);
}

export async function saveCmsContentToDb(content: StoreContent, audit?: { userId: string; ip?: string | null }) {
  const payload: StoreContent = {
    ...deepMerge(defaultStoreContent(), content),
    updatedAt: new Date().toISOString()
  };
  await prisma.cmsContent.upsert({
    where: { id: "storefront" },
    create: { id: "storefront", content: payload as Prisma.InputJsonValue },
    update: { content: payload as Prisma.InputJsonValue }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "cms.update",
      module: "cms",
      ip: audit.ip ?? null
    });
  }
  return payload;
}

export async function getSiteSettingsFromDb<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  return row.value as T;
}

export async function saveSiteSettingsToDb<T>(key: string, value: T, audit?: { userId: string; ip?: string | null }) {
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value: value as Prisma.InputJsonValue },
    update: { value: value as Prisma.InputJsonValue }
  });
  if (audit) {
    await appendAuditLog({
      userId: audit.userId,
      action: "settings.update",
      module: "settings",
      metadata: { key },
      ip: audit.ip ?? null
    });
  }
  return value;
}
