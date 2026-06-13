"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Package, Trash2 } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { DangerButton } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";
import type { ProductDto } from "@/lib/db/products";

export function ProductsPageClient() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => adminFetch<ProductDto[]>("/api/admin/products"),
    retry: 1
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminFetch(`/api/admin/products/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product");
    }
  });

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  }

  const products = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="IPTV Products"
        description="Manage subscription plans stored in PostgreSQL — create, edit, and delete with full persistence."
        action={
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-cyan-500 dark:text-slate-950"
          >
            Add product
          </Link>
        }
      />

      <AdminCard className="p-6">
        <AdminListStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && !isError && products.length === 0}
          emptyTitle="No products yet"
          emptyDescription="Create your first IPTV plan to show on the storefront."
          icon={Package}
          onRetry={() => refetch()}
        >
          <AdminTable
            rows={products}
            columns={[
              {
                header: "Product",
                cell: (row) => (
                  <Link href={`/admin/products/${row.id}`} className="font-semibold text-cyan-700 dark:text-cyan-400">
                    {row.name}
                  </Link>
                )
              },
              { header: "Duration", cell: (row) => row.duration },
              { header: "Category", cell: (row) => row.category },
              { header: "Quality", cell: (row) => row.quality },
              { header: "Price", cell: (row) => `${row.price} MAD` },
              { header: "Devices", cell: (row) => row.deviceLimit },
              { header: "Status", cell: (row) => <StatusBadge status={row.isActive ? "active" : "inactive"} /> },
              {
                header: "",
                cell: (row) => (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${row.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Edit
                    </Link>
                    <DangerButton
                      disabled={deleteMutation.isPending}
                      onClick={() => handleDelete(row.id, row.name)}
                    >
                      <Trash2 className="mr-1 inline h-3.5 w-3.5" />
                      Delete
                    </DangerButton>
                  </div>
                )
              }
            ]}
          />
        </AdminListStates>
      </AdminCard>
    </>
  );
}
