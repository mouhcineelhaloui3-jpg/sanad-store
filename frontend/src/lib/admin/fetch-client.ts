function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type AdminFetchError = Error & { status?: number; code?: string };

export async function adminFetch<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
  retries = 3
): Promise<T> {
  let lastError: AdminFetchError | null = null;
  const csrfToken = readCookie("sanad-admin-csrf");
  const method = (init.method ?? "GET").toUpperCase();
  const needsCsrf = !["GET", "HEAD", "OPTIONS"].includes(method);

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(input, {
        ...init,
        credentials: "include",
        headers: {
          ...(init.body && typeof init.body === "string" ? { "Content-Type": "application/json" } : {}),
          ...(needsCsrf && csrfToken ? { "x-csrf-token": csrfToken } : {}),
          ...(init.headers ?? {})
        }
      });

      const payload = await response.json().catch(() => null);

      if (response.ok) {
        if (payload && typeof payload === "object" && "ok" in payload && payload.ok === true) {
          return payload.data as T;
        }
        return payload as T;
      }

      const message =
        payload && typeof payload === "object" && "error" in payload && payload.error
          ? typeof payload.error === "string"
            ? payload.error
            : String((payload.error as { message?: string }).message ?? "Request failed")
          : `Request failed with status ${response.status}`;

      const error = new Error(message) as AdminFetchError;
      error.status = response.status;
      error.code =
        payload && typeof payload === "object" && "error" in payload
          ? String((payload.error as { code?: string }).code ?? "REQUEST_FAILED")
          : "REQUEST_FAILED";

      if (response.status === 401) throw error;
      if (response.status >= 500 && attempt < retries - 1) {
        await sleep(800 * (attempt + 1));
        continue;
      }

      throw error;
    } catch (error) {
      lastError = error as AdminFetchError;
      if (attempt < retries - 1) {
        await sleep(800 * (attempt + 1));
        continue;
      }
    }
  }

  throw lastError ?? new Error("Admin request failed");
}
