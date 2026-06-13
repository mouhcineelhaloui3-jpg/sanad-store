import { unstable_cache } from "next/cache";
import { cache } from "react";
import { defaultStoreContent } from "./defaults";
import type { StoreContent } from "./types";
import { getCmsContentFromDb, saveCmsContentToDb } from "@/lib/db/site-content";

const loadStoreContentFromDb = unstable_cache(
  async (): Promise<StoreContent> => getCmsContentFromDb(),
  ["store-content-db"],
  { revalidate: 60, tags: ["cms"] }
);

export const getStoreContent = cache(async function getStoreContent(): Promise<StoreContent> {
  try {
    return await loadStoreContentFromDb();
  } catch (error) {
    console.warn("[cms] database unavailable, using defaults", error);
    return defaultStoreContent();
  }
});

export async function saveStoreContent(content: StoreContent): Promise<StoreContent> {
  return saveCmsContentToDb(content);
}
