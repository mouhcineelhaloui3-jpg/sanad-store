import { AdminCard } from "@/components/admin/AdminCard";
import { SelectField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { orders, products } from "@/lib/admin/data";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <>
        <AdminPageHeader title={`Order ${id}`} description="This order does not exist yet. Real orders will appear after checkout API submissions." />
        <AdminCard>
          <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
            <p className="font-black">No order found</p>
            <p className="mt-2 text-sm text-slate-500">Connect the live orders API to manage real COD submissions here.</p>
          </div>
        </AdminCard>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader title={`Order ${order.id}`} description="View order details, update status, shipping, payment, and generate invoice." />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard title="Order Summary">
          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="Customer" value={order.customer} />
            <Info label="Phone" value={order.phone} />
            <Info label="Total" value={`${order.total} د.م.`} />
            <Info label="Date" value={order.date} />
          </div>
          <div className="mt-6 space-y-3">
            {products.slice(0, 2).map((product) => (
              <div key={product.id} className="flex justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <span className="font-bold">{product.name}</span>
                <span>{product.price} د.م.</span>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Status Management">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={order.status} />
              <StatusBadge status={order.payment} />
              <StatusBadge status={order.shipping} />
            </div>
            <SelectField label="Order status" options={["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"]} />
            <SelectField label="Payment status" options={["pending", "paid", "failed", "refunded"]} />
            <SelectField label="Shipping status" options={["pending", "confirmed", "shipped", "delivered", "returned"]} />
            <button className="w-full rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">Save status</button>
            <button className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black">Generate invoice PDF</button>
          </div>
        </AdminCard>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
