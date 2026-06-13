"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates, AdminPagination } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  country: string | null;
  segment: string;
  totalOrders: number;
  totalSpent: number;
  updatedAt: string;
};

type PaginatedCustomers = {
  items: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function CustomersPageClient() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "customers", page, search],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      return adminFetch<PaginatedCustomers>(`/api/admin/customers?${params}`);
    },
    retry: 2
  });

  const customers = data?.items ?? [];
  const isEmpty = !isLoading && !isError && customers.length === 0;

  return (
    <>
      <AdminPageHeader
        title="Customers Management"
        description="Customer list, profiles, purchase history, and activity tracking."
      />
      <AdminCard>
        <div className="mb-4 max-w-md">
          <TextField
            label="Search customers"
            placeholder="Name, phone, or email"
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>
        <AdminListStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          emptyTitle="No customers yet"
          emptyDescription="Customers are created automatically from subscription orders."
          icon={Users}
          onRetry={() => refetch()}
        >
          <AdminTable
            rows={customers}
            columns={[
              {
                header: "Customer",
                cell: (row) => (
                  <Link href={`/admin/customers/${row.id}`} className="font-black text-sand-700 dark:text-cyan-400">
                    {row.name}
                  </Link>
                )
              },
              { header: "Phone", cell: (row) => row.phone },
              { header: "City", cell: (row) => row.city ?? "—" },
              { header: "Orders", cell: (row) => row.totalOrders },
              { header: "Spent", cell: (row) => `${row.totalSpent} د.م.` },
              { header: "Segment", cell: (row) => <StatusBadge status={row.segment} /> }
            ]}
          />
          <AdminPagination page={data?.page ?? page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
        </AdminListStates>
      </AdminCard>
    </>
  );
}
