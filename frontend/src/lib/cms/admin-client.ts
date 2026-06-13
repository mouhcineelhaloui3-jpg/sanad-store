import type { StoreContent } from "./types";
import { adminFetch } from "@/lib/admin/fetch-client";
import { defaultStoreContent } from "./defaults";

export async function fetchStoreContent(): Promise<{ content: StoreContent; fromFallback: boolean }> {
  try {
    const content = await adminFetch<StoreContent>("/api/admin/cms");
    return { content, fromFallback: false };
  } catch (error) {
    console.error("[cms/admin-client] fetchStoreContent failed, using defaults", error);
    return { content: defaultStoreContent(), fromFallback: true };
  }
}

export async function saveStoreContent(content: StoreContent): Promise<StoreContent> {
  return adminFetch<StoreContent>("/api/admin/cms", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  });
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const data = await adminFetch<{ url: string }>("/api/admin/upload", {
    method: "POST",
    body: form
  });
  return data.url;
}
