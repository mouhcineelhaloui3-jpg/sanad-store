import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getSubscriptionOrders } from "@/lib/admin/orders-server";

export default async function OrdersPage() {
  const orders = await getSubscriptionOrders();

  return (
    <>
      <AdminPageHeader
        title="Subscription Orders"
        description="Live IPTV subscription leads saved from the storefront."
      />
      <AdminCard>
        {orders.length === 0 ? (
          <p className="text-sm text-slate-500">No subscription orders saved yet.</p>
        ) : (
          <AdminTable
            rows={orders}
            columns={[
              {
                header: "Order",
                cell: (row) => (
                  <Link href={`/admin/orders/${row.id}`} className="font-black text-sand-700">
                    {row.id.slice(0, 8)}…
                  </Link>
                )
              },
              {
                header: "Customer",
                cell: (row) => (
                  <div>
                    <p className="font-bold">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.phone}</p>
                  </div>
                )
              },
              { header: "Plan", cell: (row) => row.planSlug },
              { header: "Total", cell: (row) => `${row.total} د.م.` },
              { header: "Device", cell: (row) => row.device },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleString("ar-MA") }
            ]}
          />
        )}
      </AdminCard>
    </>
  );
}
