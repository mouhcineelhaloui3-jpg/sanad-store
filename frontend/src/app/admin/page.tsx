import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { dashboardStats, orders, products } from "@/lib/admin/data";

export default function AdminDashboardPage() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard Overview"
        description="Track revenue, orders, products, customers, alerts, and operational performance."
        action={<Link href="/admin/products/new" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">Add product</Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <AdminCard title="Revenue Analytics">
          <div className="mb-4 flex flex-wrap gap-3 text-xs font-black">
            <span className="rounded-full bg-sand-100 px-3 py-1 text-sand-900">Daily</span>
            <span className="rounded-full bg-sage-100 px-3 py-1 text-sage-700">Weekly</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Monthly</span>
          </div>
          <RevenueChart />
        </AdminCard>

        <AdminCard title="Best Selling Products">
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <div>
                  <p className="font-black">{product.name}</p>
                  <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-black">{product.sales}</p>
                  <p className="text-xs text-slate-500">sales</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="Recent Orders">
          <AdminTable
            rows={orders}
            columns={[
              { header: "Order", cell: (row) => <Link className="font-black text-sand-700" href={`/admin/orders/${row.id}`}>{row.id}</Link> },
              { header: "Customer", cell: (row) => row.customer },
              { header: "Total", cell: (row) => `${row.total} د.م.` },
              { header: "Payment", cell: (row) => <StatusBadge status={row.payment} /> },
              { header: "Shipping", cell: (row) => <StatusBadge status={row.shipping} /> },
              { header: "Date", cell: (row) => row.date }
            ]}
          />
        </AdminCard>
      </div>
    </>
  );
}
