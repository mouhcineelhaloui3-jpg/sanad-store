"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type CustomerOrder = {
  id: string;
  planSlug: string;
  total: number;
  status: string;
  createdAt: string;
};

type CustomerDetail = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  country: string | null;
  segment: string;
  notes: string | null;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
  orders: CustomerOrder[];
};

export function CustomerDetailClient({ customerId }: { customerId: string }) {
  const { data: customer, isLoading, isError } = useQuery({
    queryKey: ["admin", "customer", customerId],
    queryFn: () => adminFetch<CustomerDetail>(`/api/admin/customers/${customerId}`),
    retry: 2
  });

  if (isLoading) return <AdminSkeleton rows={4} />;

  if (isError || !customer) {
    return (
      <AdminEmptyState
        title="No customer found"
        description="This customer does not exist or could not be loaded."
        icon={User}
        action={
          <Link href="/admin/customers" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
            Back to customers
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <AdminCard title="Profile">
        <div className="space-y-4">
          <Info label="Customer ID" value={customer.id} />
          <Info label="Phone" value={customer.phone} />
          <Info label="Email" value={customer.email ?? "—"} />
          <Info label="City" value={customer.city ?? "—"} />
          <Info label="Country" value={customer.country ?? "—"} />
          <Info label="Segment" value={customer.segment} />
          <Info label="Total orders" value={`${customer.totalOrders}`} />
          <Info label="Lifetime spend" value={`${customer.totalSpent} د.م.`} />
          {customer.notes ? <Info label="Notes" value={customer.notes} /> : null}
          <Info label="Member since" value={new Date(customer.createdAt).toLocaleDateString("ar-MA")} />
        </div>
      </AdminCard>
      <AdminCard title="Purchase History">
        {customer.orders.length === 0 ? (
          <p className="text-sm text-slate-500">No orders yet for this customer.</p>
        ) : (
          <AdminTable
            rows={customer.orders}
            columns={[
              {
                header: "Order",
                cell: (row) => (
                  <Link href={`/admin/orders/${row.id}`} className="font-bold text-cyan-700 dark:text-cyan-400">
                    {row.id.slice(0, 8)}…
                  </Link>
                )
              },
              { header: "Plan", cell: (row) => row.planSlug },
              { header: "Total", cell: (row) => `${row.total} د.م.` },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              { header: "Date", cell: (row) => new Date(row.createdAt).toLocaleDateString("ar-MA") }
            ]}
          />
        )}
      </AdminCard>
    </div>
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
