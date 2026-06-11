import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { orders } from "@/lib/admin/data";

export default function OrdersPage() {
  return (
    <>
      <AdminPageHeader title="Orders Management" description="Manage COD order confirmation, payment status, shipping status, and invoices." />
      <AdminCard>
        <AdminTable
          rows={orders}
          columns={[
            { header: "Order", cell: (row) => <Link href={`/admin/orders/${row.id}`} className="font-black text-sand-700">{row.id}</Link> },
            { header: "Customer", cell: (row) => <div><p className="font-bold">{row.customer}</p><p className="text-xs text-slate-500">{row.phone}</p></div> },
            { header: "Total", cell: (row) => `${row.total} د.م.` },
            { header: "Payment", cell: (row) => <StatusBadge status={row.payment} /> },
            { header: "Shipping", cell: (row) => <StatusBadge status={row.shipping} /> },
            { header: "Order status", cell: (row) => <StatusBadge status={row.status} /> },
            { header: "Invoice", cell: () => <button className="font-bold text-sand-700">Generate</button> }
          ]}
        />
      </AdminCard>
    </>
  );
}
