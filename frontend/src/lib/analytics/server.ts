import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { AnalyticsEventRecord } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "analytics-events.json");
const ORDERS_FILE = path.join(DATA_DIR, "subscription-orders.json");
const TRIALS_FILE = path.join(DATA_DIR, "trial-requests.json");
const MAX_EVENTS = 5000;

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function readAnalyticsEvents(): Promise<AnalyticsEventRecord[]> {
  return readJson<AnalyticsEventRecord[]>(EVENTS_FILE, []);
}

export async function appendAnalyticsEvent(event: AnalyticsEventRecord) {
  await mkdir(DATA_DIR, { recursive: true });
  const events = await readAnalyticsEvents();
  events.unshift(event);
  if (events.length > MAX_EVENTS) events.length = MAX_EVENTS;
  await writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");
}

type SubscriptionOrder = {
  id: string;
  planSlug: string;
  createdAt: string;
  ip?: string | null;
};

type TrialRequest = {
  id: string;
  createdAt: string;
  ip?: string | null;
};

export type AnalyticsSummary = {
  pageViews: number;
  uniqueSessions: number;
  uniqueIps: number;
  clicks: number;
  modalOpens: number;
  leads: number;
  trials: number;
  whatsappClicks: number;
  subscriptionOrders: number;
  trialRequests: number;
  conversionRate: number;
  topPages: { path: string; count: number }[];
  topClicks: { label: string; count: number }[];
  planBreakdown: { planSlug: string; count: number }[];
  dailyPageViews: { label: string; count: number }[];
  recentEvents: AnalyticsEventRecord[];
  recentOrders: SubscriptionOrder[];
  recentTrials: TrialRequest[];
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function weekdayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const [events, orders, trials] = await Promise.all([
    readAnalyticsEvents(),
    readJson<SubscriptionOrder[]>(ORDERS_FILE, []),
    readJson<TrialRequest[]>(TRIALS_FILE, [])
  ]);

  const pageViews = events.filter((e) => e.name === "page_view").length;
  const clicks = events.filter((e) => e.name === "click").length;
  const modalOpens = events.filter((e) => e.name === "modal_open").length;
  const leads = events.filter((e) => e.name === "lead").length;
  const trialSubmits = events.filter((e) => e.name === "trial_submit").length;
  const whatsappClicks = events.filter((e) => e.name === "whatsapp_click").length;

  const sessions = new Set(events.map((e) => e.sessionId).filter(Boolean));
  const ips = new Set(events.map((e) => e.ip).filter(Boolean));

  const pageCounts = new Map<string, number>();
  const clickCounts = new Map<string, number>();
  const dayCounts = new Map<string, number>();

  for (const event of events) {
    if (event.name === "page_view") {
      pageCounts.set(event.path, (pageCounts.get(event.path) ?? 0) + 1);
      const key = dayKey(event.createdAt);
      dayCounts.set(key, (dayCounts.get(key) ?? 0) + 1);
    }
    if (event.name === "click") {
      const label = String(event.properties.label ?? "unknown");
      clickCounts.set(label, (clickCounts.get(label) ?? 0) + 1);
    }
  }

  const planCounts = new Map<string, number>();
  for (const order of orders) {
    planCounts.set(order.planSlug, (planCounts.get(order.planSlug) ?? 0) + 1);
  }

  const last7Days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });

  const dailyPageViews = last7Days.map((key) => ({
    label: weekdayLabel(`${key}T12:00:00.000Z`),
    count: dayCounts.get(key) ?? 0
  }));

  const conversionRate = pageViews > 0 ? Math.round((leads / pageViews) * 1000) / 10 : 0;

  return {
    pageViews,
    uniqueSessions: sessions.size,
    uniqueIps: ips.size,
    clicks,
    modalOpens,
    leads,
    trials: trialSubmits,
    whatsappClicks,
    subscriptionOrders: orders.length,
    trialRequests: trials.length,
    conversionRate,
    topPages: [...pageCounts.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    topClicks: [...clickCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    planBreakdown: [...planCounts.entries()]
      .map(([planSlug, count]) => ({ planSlug, count }))
      .sort((a, b) => b.count - a.count),
    dailyPageViews,
    recentEvents: events.slice(0, 20),
    recentOrders: orders.slice(0, 10),
    recentTrials: trials.slice(0, 10)
  };
}
