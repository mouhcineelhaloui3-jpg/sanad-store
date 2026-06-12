import { NextResponse } from "next/server";

type ErrorPayload = {
  type?: string;
  message?: string;
  stack?: string;
  url?: string;
  source?: string;
  line?: number;
  column?: number;
  userAgent?: string;
  digest?: string;
};

export async function POST(request: Request) {
  let payload: ErrorPayload = {};

  try {
    payload = (await request.json()) as ErrorPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.error("[client-error]", {
    ...payload,
    timestamp: new Date().toISOString()
  });

  const sentryDsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (sentryDsn) {
    try {
      const dsn = new URL(sentryDsn);
      const projectId = dsn.pathname.replace("/", "");
      const endpoint = `${dsn.protocol}//${dsn.host}/api/${projectId}/store/`;
      const key = dsn.username;

      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sentry-Auth": `Sentry sentry_version=7, sentry_key=${key}`
        },
        body: JSON.stringify({
          event_id: crypto.randomUUID().replace(/-/g, ""),
          timestamp: new Date().toISOString(),
          platform: "javascript",
          level: "error",
          message: payload.message ?? "Client error",
          exception: payload.stack
            ? { values: [{ type: payload.type ?? "Error", value: payload.message, stacktrace: { frames: [] } }] }
            : undefined,
          request: { url: payload.url, headers: { "User-Agent": payload.userAgent } },
          tags: { source: "sanad-store-frontend" }
        })
      });
    } catch {
      // Sentry forwarding is best-effort.
    }
  }

  return NextResponse.json({ ok: true });
}
