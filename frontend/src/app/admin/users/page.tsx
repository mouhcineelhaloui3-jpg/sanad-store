"use client";

import { AdminCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import { AdminTable } from "@/components/admin/AdminTable";
import { useAdminUsers } from "@/lib/admin/queries";
import { roleLabel } from "@/lib/admin/rbac";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  const { data, isLoading, isError, refetch } = useAdminUsers();

  return (
    <>
      <AdminPageHeader title="Users" description="RBAC-managed admin users (multi-tenant ready)." />

      {isLoading ? (
        <AdminSkeleton rows={5} />
      ) : isError || !data ? (
        <AdminEmptyState
          title="Unable to load users"
          description="Retry to fetch the current admin roster."
          icon={Users}
          action={
            <button type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white" onClick={() => refetch()}>
              Retry
            </button>
          }
        />
      ) : (
        <AdminCard title={`Tenant: ${data.tenantId}`}>
          <AdminTable
            rows={data.users}
            columns={[
              { header: "Name", cell: (row) => row.name },
              { header: "Email", cell: (row) => row.email },
              { header: "Role", cell: (row) => roleLabel(row.role) },
              { header: "Status", cell: (row) => (row.active ? "Active" : "Disabled") }
            ]}
          />
        </AdminCard>
      )}
    </>
  );
}
