import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { products } from "@/lib/admin/data";

export default function AnalyticsPage() {
  return (
    <>
      <AdminPageHeader
        title="Analytics & Reports"
        description="Revenue reports, sales trends, product performance, customer growth, and exports."
        action={<div className="flex gap-2"><button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black">Export PDF</button><button className="rounded-2xl bg-sand-900 px-4 py-3 text-sm font-black text-white">Export Excel</button></div>}
      />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <AdminCard title="Sales Trends">
          <RevenueChart />
        </AdminCard>
        <AdminCard title="Customer Growth">
          <div className="space-y-5">
            {["New customers +18%", "Repeat orders +9%", "AOV 311 د.م.", "Upsell take rate 24%"].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 font-black dark:bg-slate-800">{item}</div>
            ))}
          </div>
        </AdminCard>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <AdminCard key={product.id} title={product.name}>
            <p className="text-3xl font-black">{product.sales}</p>
            <p className="mt-1 text-sm text-slate-500">units sold</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-2 rounded-full bg-sand-900" style={{ width: `${Math.min(100, product.sales / 7)}%` }} />
            </div>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
