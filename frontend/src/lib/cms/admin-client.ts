import type { StoreContent } from "./types";

const ADMIN_KEY =
  typeof window !== "undefined"
    ? (localStorage.getItem("sanad-admin-api-key") ?? "sanad-admin-dev")
    : "sanad-admin-dev";

export async function fetchStoreContent(): Promise<StoreContent> {
  const response = await fetch("/api/admin/cms", {
    headers: { "x-admin-key": ADMIN_KEY }
  });
  if (!response.ok) throw new Error("Failed to load CMS content");
  return response.json();
}

export async function saveStoreContent(content: StoreContent): Promise<StoreContent> {
  const response = await fetch("/api/admin/cms", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": ADMIN_KEY
    },
    body: JSON.stringify(content)
  });
  if (!response.ok) throw new Error("Failed to save CMS content");
  return response.json();
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "x-admin-key": ADMIN_KEY },
    body: form
  });
  if (!response.ok) throw new Error("Failed to upload image");
  const data = (await response.json()) as { url: string };
  return data.url;
}
