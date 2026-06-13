import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { StatCard } from "@/components/admin/StatCard";
import { products } from "@/lib/admin/data";
import { getAnalyticsSummary } from "@/lib/analytics/server";
import { ChartNoAxesCombined, ClipboardList, Users, Boxes } from "lucide-react";

export default async function AdminDashboardPage() {
  const summary = await getAnalyticsSummary();

  const dashboardStats = [
    { label: "Page Views", value: String(summary.pageViews), change: "7 days", icon: ChartNoAxesCombined },
    { label: "Subscription Orders", value: String(summary.subscriptionOrders), change: "saved", icon: ClipboardList },
    { label: "Trial Requests", value: String(summary.trialRequests), change: "saved", icon: Users },
    { label: "Active Plans", value: "3", change: "IPTV", icon: Boxes }
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard Overview"
        description="Live storefront metrics from analytics, orders, and trial requests."
        action={
          <Link href="/admin/analytics" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">
            Full analytics
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AdminCard title="Page Views (Last 7 Days)">
          <RevenueChart series={summary.dailyPageViews} />
        </AdminCard>

        <AdminCard title="Best Selling Plans">
          <div className="space-y-4">
            {(summary.planBreakdown.length ? summary.planBreakdown : products.map((p) => ({ planSlug: p.id, count: p.sales }))).map(
              (item) => {
                const product = products.find((p) => p.id === item.planSlug || p.name.includes(item.planSlug));
                return (
                  <div key={item.planSlug} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <div>
                      <p className="font-black">{product?.name ?? item.planSlug}</p>
                      <p className="text-sm text-slate-500">{product?.category ?? "IPTV"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black">{item.count}</p>
                      <p className="text-xs text-slate-500">orders</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="Recent Orders">
          {summary.recentOrders.length === 0 ? (
            <p className="text-sm text-slate-500">No subscription orders saved yet.</p>
          ) : (
            <AdminTable
              rows={summary.recentOrders}
              columns={[
                {
                  header: "Order",
                  cell: (row) => (
                    <Link className="font-black text-sand-700" href={`/admin/orders/${row.id}`}>
                      {row.id}
                    </Link>
                  )
                },
                { header: "Plan", cell: (row) => row.planSlug },
                { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleString("ar-MA") }
              ]}
            />
          )}
        </AdminCard>
      </div>
    </>
  );
}
