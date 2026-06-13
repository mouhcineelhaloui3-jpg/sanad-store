import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getDashboardOverview } from "@/lib/db/dashboard";
import {
  ChartNoAxesCombined,
  MessageCircle,
  Package,
  TrendingUp,
  Users,
  AlertTriangle,
  Activity
} from "lucide-react";

export default async function AdminDashboardPage() {
  const overview = await getDashboardOverview();

  const stats = [
    { label: "Revenue Today", value: `${overview.revenueToday.toLocaleString("fr-MA")} د.م.`, change: "MAD", icon: TrendingUp },
    { label: "Revenue This Month", value: `${overview.revenueThisMonth.toLocaleString("fr-MA")} د.م.`, change: "MAD", icon: ChartNoAxesCombined },
    { label: "Leads Today", value: String(overview.leadsToday), change: "new captures", icon: Users },
    { label: "Leads This Week", value: String(overview.leadsThisWeek), change: "Mon–Sun", icon: Users },
    { label: "Leads This Month", value: String(overview.leadsThisMonth), change: "pipeline", icon: Users },
    { label: "Active Subscriptions", value: String(overview.activeSubscriptions), change: "live", icon: Package },
    { label: "Expired Subscriptions", value: String(overview.expiredSubscriptions), change: "needs renewal", icon: AlertTriangle },
    { label: "WhatsApp Conversions", value: String(overview.whatsappConversions), change: "this month", icon: MessageCircle }
  ];

  return (
    <>
      <AdminPageHeader
        title="Overview Dashboard"
        description="Live metrics from PostgreSQL — revenue, leads, subscriptions, and activity."
        action={
          <Link href="/admin/analytics" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">
            Full analytics
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title="Top Products">
          {overview.topProducts.length === 0 ? (
            <p className="text-sm text-slate-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {overview.topProducts.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.orderCount} orders</p>
                  </div>
                  <p className="font-black">{item.revenue.toLocaleString("fr-MA")} د.م.</p>
                </div>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminCard title="Recent Activity">
          {overview.recentActivity.length === 0 ? (
            <p className="text-sm text-slate-500">No activity logged yet.</p>
          ) : (
            <div className="space-y-3">
              {overview.recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <Activity className="mt-0.5 h-4 w-4 text-sand-700" />
                  <div>
                    <p className="text-sm font-bold">{item.action}</p>
                    <p className="text-xs text-slate-500">
                      {item.actorName ?? "System"} · {item.resource}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString("ar-MA")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="Recent Orders">
          {overview.recentOrders.length === 0 ? (
            <p className="text-sm text-slate-500">No subscription orders saved yet.</p>
          ) : (
            <AdminTable
              rows={overview.recentOrders}
              columns={[
                {
                  header: "Order",
                  cell: (row) => (
                    <Link className="font-black text-sand-700" href={`/admin/orders/${row.id}`}>
                      {row.id.slice(0, 8)}…
                    </Link>
                  )
                },
                { header: "Customer", cell: (row) => row.name },
                { header: "Plan", cell: (row) => row.planSlug },
                { header: "Total", cell: (row) => `${row.total} د.م.` },
                { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
                { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleString("ar-MA") }
              ]}
            />
          )}
        </AdminCard>
      </div>
    </>
  );
}
