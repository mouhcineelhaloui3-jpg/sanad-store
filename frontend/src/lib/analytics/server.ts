import type { AnalyticsEventRecord } from "./types";
import { defaultPlans } from "@/lib/plans";
import {
  appendAnalyticsEventToDb,
  getOrderCountFromDb,
  getPlanBreakdownFromDb,
  getRecentOrdersFromDb,
  getRecentTrialsFromDb,
  getRevenueFromDb,
  getTrialCountFromDb,
  readAnalyticsEventsFromDb
} from "@/lib/db/analytics-events";

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
  orderConversionRate: number;
  revenueMAD: number;
  topPages: { path: string; count: number }[];
  topClicks: { label: string; count: number }[];
  planBreakdown: { planSlug: string; count: number }[];
  dailyPageViews: { label: string; count: number }[];
  recentEvents: AnalyticsEventRecord[];
  recentOrders: { id: string; planSlug: string; createdAt: string; ip?: string | null }[];
  recentTrials: { id: string; createdAt: string; ip?: string | null }[];
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function weekdayLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short" });
}

export async function readAnalyticsEvents(): Promise<AnalyticsEventRecord[]> {
  return readAnalyticsEventsFromDb();
}

export async function appendAnalyticsEvent(event: AnalyticsEventRecord) {
  await appendAnalyticsEventToDb(event);
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const [events, orderCount, trialCount, planBreakdown, recentOrders, recentTrials, revenueMAD] =
    await Promise.all([
      readAnalyticsEventsFromDb(),
      getOrderCountFromDb(),
      getTrialCountFromDb(),
      getPlanBreakdownFromDb(),
      getRecentOrdersFromDb(),
      getRecentTrialsFromDb(),
      getRevenueFromDb()
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
  const orderConversionRate = pageViews > 0 ? Math.round((orderCount / pageViews) * 1000) / 10 : 0;

  return {
    pageViews,
    uniqueSessions: sessions.size,
    uniqueIps: ips.size,
    clicks,
    modalOpens,
    leads,
    trials: trialSubmits,
    whatsappClicks,
    subscriptionOrders: orderCount,
    trialRequests: trialCount,
    conversionRate,
    orderConversionRate,
    revenueMAD: revenueMAD || planBreakdown.reduce((sum, item) => {
      const price = defaultPlans.find((p) => p.slug === item.planSlug)?.price ?? 0;
      return sum + price * item.count;
    }, 0),
    topPages: [...pageCounts.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    topClicks: [...clickCounts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
    planBreakdown,
    dailyPageViews,
    recentEvents: events.slice(0, 20),
    recentOrders: recentOrders.map((o) => ({
      id: o.id,
      planSlug: o.planSlug,
      createdAt: o.createdAt.toISOString(),
      ip: o.ip
    })),
    recentTrials: recentTrials.map((t) => ({
      id: t.id,
      createdAt: t.createdAt.toISOString()
    }))
  };
}
