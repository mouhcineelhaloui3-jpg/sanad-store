"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type IptvProduct = {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  quality: string;
  deviceLimit: number;
  isActive: boolean;
};

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => adminFetch<IptvProduct[]>("/api/admin/products")
  });

  return (
    <>
      <AdminPageHeader
        title="IPTV Products"
        description="Modular products-extension CRUD. Sales happen via WhatsApp only — no checkout module."
        action={
          <Link href="/admin/products/new" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white dark:bg-cyan-500 dark:text-slate-950">
            Add product
          </Link>
        }
      />
      <AdminCard>
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading products…</p>
        ) : (
          <AdminTable
            rows={data ?? []}
            columns={[
              { header: "Product", cell: (row) => <Link href={`/admin/products/${row.id}`} className="font-black text-cyan-700 dark:text-cyan-400">{row.name}</Link> },
              { header: "Duration", cell: (row) => row.duration },
              { header: "Category", cell: (row) => row.category },
              { header: "Quality", cell: (row) => row.quality },
              { header: "Price", cell: (row) => `${row.price} د.م.` },
              { header: "Devices", cell: (row) => row.deviceLimit },
              { header: "Status", cell: (row) => <StatusBadge status={row.isActive ? "active" : "pending"} /> }
            ]}
          />
        )}
      </AdminCard>
    </>
  );
}
