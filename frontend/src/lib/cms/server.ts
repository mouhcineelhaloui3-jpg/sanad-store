import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { defaultStoreContent } from "./defaults";
import type { StoreContent } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "store-content.json");

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

const loadStoreContentFromDisk = unstable_cache(
  async (): Promise<StoreContent> => {
    try {
      const raw = await readFile(CONTENT_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoreContent;
      return deepMerge(defaultStoreContent(), parsed);
    } catch (error) {
      console.warn("[cms] store-content.json unavailable, using defaults", error);
      return defaultStoreContent();
    }
  },
  ["store-content"],
  { revalidate: 60, tags: ["cms"] }
);

export const getStoreContent = cache(async function getStoreContent(): Promise<StoreContent> {
  return loadStoreContentFromDisk();
});

export async function saveStoreContent(content: StoreContent): Promise<StoreContent> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const payload: StoreContent = {
      ...deepMerge(defaultStoreContent(), content),
      updatedAt: new Date().toISOString()
    };
    await writeFile(CONTENT_FILE, JSON.stringify(payload, null, 2), "utf-8");
    return payload;
  } catch (error) {
    console.error("[cms] saveStoreContent failed", error);
    throw error;
  }
}
