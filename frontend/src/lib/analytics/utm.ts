export type UtmPayload = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  ttclid: string | null;
  first_seen_at: string;
};

const STORAGE_KEY = "sanad_utm";

export function captureUtmFromUrl(url: URL) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(STORAGE_KEY)) return;

  const params = url.searchParams;
  const hasUtm =
    params.has("utm_source") ||
    params.has("utm_medium") ||
    params.has("utm_campaign") ||
    params.has("fbclid") ||
    params.has("ttclid");

  if (!hasUtm) return;

  const payload: UtmPayload = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    fbclid: params.get("fbclid"),
    ttclid: params.get("ttclid"),
    first_seen_at: new Date().toISOString()
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getStoredUtm(): UtmPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UtmPayload;
  } catch {
    return null;
  }
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  const key = "sanad_session_id";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID();
  window.sessionStorage.setItem(key, id);
  return id;
}
