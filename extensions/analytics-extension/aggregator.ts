import { dataPath, readJsonStore } from "@sanad/core";
import type { AnalyticsMetrics, WhatsAppAnalyticsEvent } from "./types";

const EVENTS_FILE = () => dataPath("analytics-events.json");

type RawEvent = {
  name: string;
  path?: string;
  label?: string;
  planSlug?: string;
  source?: string;
  sessionId?: string;
  createdAt: string;
};

function mapEvent(raw: RawEvent): WhatsAppAnalyticsEvent | null {
  const timestamp = raw.createdAt;
  if (raw.name === "whatsapp_click") {
    return { event: "WHATSAPP_CLICK", productId: raw.planSlug, source: raw.source, timestamp, path: raw.path, sessionId: raw.sessionId };
  }
  if (raw.name === "lead") {
    return { event: "LEAD", productId: raw.planSlug, source: raw.source, timestamp, path: raw.path, sessionId: raw.sessionId };
  }
  if (raw.name === "trial_submit") {
    return { event: "TRIAL_SUBMIT", source: raw.source, timestamp, path: raw.path, sessionId: raw.sessionId };
  }
  if (raw.name === "page_view") {
    return { event: "PAGE_VIEW", source: raw.source, timestamp, path: raw.path, sessionId: raw.sessionId };
  }
  return null;
}

export async function getWhatsAppMetrics(): Promise<AnalyticsMetrics> {
  const raw = await readJsonStore<RawEvent[]>(EVENTS_FILE(), []);
  const mapped = raw.map(mapEvent).filter(Boolean) as WhatsAppAnalyticsEvent[];

  const whatsappClicks = mapped.filter((e) => e.event === "WHATSAPP_CLICK").length;
  const leads = mapped.filter((e) => e.event === "LEAD").length;
  const trials = mapped.filter((e) => e.event === "TRIAL_SUBMIT").length;
  const pageViews = mapped.filter((e) => e.event === "PAGE_VIEW").length;

  const productMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();

  for (const event of mapped) {
    if (event.productId) {
      productMap.set(event.productId, (productMap.get(event.productId) ?? 0) + 1);
    }
    const source = event.source ?? "direct";
    sourceMap.set(source, (sourceMap.get(source) ?? 0) + 1);
  }

  return {
    whatsappClicks,
    leads,
    trials,
    pageViews,
    conversionRate: pageViews > 0 ? Number(((whatsappClicks / pageViews) * 100).toFixed(2)) : 0,
    productInterest: [...productMap.entries()]
      .map(([productId, count]) => ({ productId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    trafficSources: [...sourceMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
    recentEvents: mapped.slice(0, 30)
  };
}
