import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AnalyticsTrendChart } from "@/components/admin/AnalyticsTrendChart";
import { getAnalyticsSummary } from "@/lib/analytics/server";

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary();

  const stats = [
    { label: "Page Views", value: String(summary.pageViews) },
    { label: "Unique Sessions", value: String(summary.uniqueSessions) },
    { label: "Unique IPs", value: String(summary.uniqueIps) },
    { label: "Clicks Tracked", value: String(summary.clicks) },
    { label: "Modal Opens", value: String(summary.modalOpens) },
    { label: "Leads", value: String(summary.leads) },
    { label: "Trial Submits", value: String(summary.trials) },
    { label: "WhatsApp Clicks", value: String(summary.whatsappClicks) },
    { label: "Orders Saved", value: String(summary.subscriptionOrders) },
    { label: "Conversion Rate", value: `${summary.conversionRate}%` }
  ];

  return (
    <>
      <AdminPageHeader
        title="Analytics & Reports"
        description="Real visitor behavior: pages, clicks, IPs, funnel events, and orders."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <AdminCard title="Page Views (Last 7 Days)">
          <AnalyticsTrendChart series={summary.dailyPageViews} />
        </AdminCard>

        <AdminCard title="Funnel Snapshot">
          <div className="space-y-4">
            {[
              ["Visitors / Page Views", summary.pageViews],
              ["Opened Order/Trial Modal", summary.modalOpens],
              ["Submitted Lead", summary.leads],
              ["Saved Orders", summary.subscriptionOrders]
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Top Pages">
          <div className="space-y-3">
            {summary.topPages.length === 0 ? (
              <p className="text-sm text-slate-500">No page views yet.</p>
            ) : (
              summary.topPages.map((item) => (
                <div key={item.path} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <span className="font-semibold">{item.path}</span>
                  <span className="font-black">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard title="Top Clicks">
          <div className="space-y-3">
            {summary.topClicks.length === 0 ? (
              <p className="text-sm text-slate-500">No clicks tracked yet.</p>
            ) : (
              summary.topClicks.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <span className="truncate font-semibold">{item.label}</span>
                  <span className="font-black">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Recent Events">
          <div className="space-y-3">
            {summary.recentEvents.length === 0 ? (
              <p className="text-sm text-slate-500">No events yet.</p>
            ) : (
              summary.recentEvents.map((event) => (
                <div key={event.id} className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black">{event.name}</span>
                    <span className="text-xs text-slate-500">{new Date(event.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">{event.path}</p>
                  <p className="mt-1 text-xs text-slate-500">IP: {event.ip ?? "unknown"}</p>
                </div>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard title="Plan Breakdown">
          <div className="space-y-3">
            {summary.planBreakdown.length === 0 ? (
              <p className="text-sm text-slate-500">No orders yet.</p>
            ) : (
              summary.planBreakdown.map((item) => (
                <div key={item.planSlug} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <span className="font-semibold">{item.planSlug}</span>
                  <span className="font-black">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
