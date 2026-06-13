import type { Prisma } from "@/generated/prisma/client";
import type { AnalyticsEventRecord } from "@/lib/analytics/types";
import { defaultPlans } from "@/lib/plans";
import { prisma } from "./prisma";

const MAX_EVENTS = 10000;

export async function readAnalyticsEventsFromDb(limit = MAX_EVENTS): Promise<AnalyticsEventRecord[]> {
  const rows = await prisma.analyticsEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: limit
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.name as AnalyticsEventRecord["name"],
    path: row.path,
    properties: (row.properties as Record<string, string | number | boolean | null>) ?? {},
    ip: row.ip,
    userAgent: row.userAgent,
    utm: row.utm as AnalyticsEventRecord["utm"],
    sessionId: row.sessionId,
    createdAt: row.createdAt.toISOString()
  }));
}

export async function appendAnalyticsEventToDb(event: AnalyticsEventRecord) {
  await prisma.analyticsEvent.create({
    data: {
      id: event.id,
      name: event.name,
      path: event.path,
      properties: event.properties as Prisma.InputJsonValue,
      ip: event.ip,
      userAgent: event.userAgent,
      utm: event.utm as Prisma.InputJsonValue,
      sessionId: event.sessionId,
      createdAt: new Date(event.createdAt)
    }
  });

  const count = await prisma.analyticsEvent.count();
  if (count > MAX_EVENTS) {
    const oldest = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "asc" },
      take: count - MAX_EVENTS,
      select: { id: true }
    });
    if (oldest.length) {
      await prisma.analyticsEvent.deleteMany({ where: { id: { in: oldest.map((r) => r.id) } } });
    }
  }
}

export async function getOrderCountFromDb() {
  return prisma.order.count();
}

export async function getTrialCountFromDb() {
  return prisma.lead.count({ where: { source: "trial-request" } });
}

export async function getRecentOrdersFromDb(limit = 10) {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, planSlug: true, createdAt: true, ip: true }
  });
}

export async function getRecentTrialsFromDb(limit = 10) {
  return prisma.lead.findMany({
    where: { source: "trial-request" },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, createdAt: true }
  });
}

export async function getRevenueFromDb() {
  const agg = await prisma.order.aggregate({ _sum: { total: true } });
  return Number(agg._sum.total ?? 0);
}

export async function getPlanBreakdownFromDb() {
  const groups = await prisma.order.groupBy({
    by: ["planSlug"],
    _count: { _all: true },
    orderBy: { _count: { planSlug: "desc" } }
  });
  return groups.map((g) => ({ planSlug: g.planSlug, count: g._count._all }));
}

export function planPricesMap() {
  return new Map(defaultPlans.map((plan) => [plan.slug, plan.price]));
}
