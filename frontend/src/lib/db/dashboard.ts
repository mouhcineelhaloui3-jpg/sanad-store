import { defaultPlans } from "@/lib/plans";
import { listRecentActivity } from "./audit";
import { prisma } from "./prisma";

export type DashboardOverview = {
  revenueToday: number;
  revenueThisMonth: number;
  leadsToday: number;
  leadsThisWeek: number;
  leadsThisMonth: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  whatsappConversions: number;
  topProducts: { id: string; name: string; orderCount: number; revenue: number }[];
  recentActivity: {
    id: string;
    action: string;
    resource: string;
    actorName: string | null;
    createdAt: string;
  }[];
  recentOrders: {
    id: string;
    name: string;
    planSlug: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
};

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date: Date) {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const [
    todayOrders,
    monthOrders,
    leadsToday,
    leadsThisWeek,
    leadsThisMonth,
    activeSubscriptions,
    expiredSubscriptions,
    whatsappConversions,
    topProductGroups,
    recentActivity,
    recentOrders
  ] = await Promise.all([
    prisma.order.findMany({
      where: { createdAt: { gte: todayStart }, paymentStatus: { in: ["paid", "pending"] } },
      select: { total: true }
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: monthStart } },
      select: { total: true }
    }),
    prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.lead.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.subscription.count({ where: { status: "active", expiresAt: { gt: now } } }),
    prisma.subscription.count({
      where: { OR: [{ status: "expired" }, { status: "active", expiresAt: { lte: now } }] }
    }),
    prisma.lead.count({ where: { whatsappClickedAt: { gte: monthStart } } }),
    prisma.order.groupBy({
      by: ["planSlug"],
      _count: { _all: true },
      _sum: { total: true },
      orderBy: { _count: { planSlug: "desc" } },
      take: 5
    }),
    listRecentActivity(8),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, name: true, planSlug: true, total: true, status: true, createdAt: true }
    })
  ]);

  const planNameBySlug = new Map(defaultPlans.map((p) => [p.slug, p.name.en]));

  const topProducts = topProductGroups.map((group) => ({
    id: group.planSlug,
    name: planNameBySlug.get(group.planSlug) ?? group.planSlug,
    orderCount: group._count._all,
    revenue: Number(group._sum.total ?? 0)
  }));

  return {
    revenueToday: todayOrders.reduce((sum, o) => sum + Number(o.total), 0),
    revenueThisMonth: monthOrders.reduce((sum, o) => sum + Number(o.total), 0),
    leadsToday,
    leadsThisWeek,
    leadsThisMonth,
    activeSubscriptions,
    expiredSubscriptions,
    whatsappConversions,
    topProducts,
    recentActivity: recentActivity.map((item) => ({
      id: item.id,
      action: item.action,
      resource: item.resource,
      actorName: item.actor?.name ?? null,
      createdAt: item.createdAt.toISOString()
    })),
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      name: order.name,
      planSlug: order.planSlug,
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt.toISOString()
    }))
  };
}
