import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { customers, orders } from "@/lib/admin/data";

export default async function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = customers.find((item) => item.id === id);

  if (!customer) {
    return (
      <>
        <AdminPageHeader title={`Customer ${id}`} description="This customer does not exist yet. Customer profiles are created from real orders." />
        <AdminCard>
          <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
            <p className="font-black">No customer found</p>
            <p className="mt-2 text-sm text-slate-500">Connect the live customer/order API to populate purchase history.</p>
          </div>
        </AdminCard>
      </>
    );
  }

  return (
    <>
      <AdminPageHeader title={customer.name} description="Customer profile, purchase history, activity, and lifetime value." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Profile">
          <div className="space-y-4">
            <Info label="Customer ID" value={customer.id} />
            <Info label="City" value={customer.city} />
            <Info label="Total orders" value={`${customer.orders}`} />
            <Info label="Lifetime spend" value={`${customer.spent} د.م.`} />
            <Info label="Latest activity" value={customer.activity} />
          </div>
        </AdminCard>
        <AdminCard title="Purchase History">
          <AdminTable
            rows={orders.slice(0, 3)}
            columns={[
              { header: "Order", cell: (row) => row.id },
              { header: "Total", cell: (row) => `${row.total} د.م.` },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              { header: "Date", cell: (row) => row.date }
            ]}
          />
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
