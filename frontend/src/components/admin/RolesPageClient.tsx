"use client";

import { useQuery } from "@tanstack/react-query";
import { Shield } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminFetch } from "@/lib/admin/fetch-client";

type Role = {
  id: string;
  name: string;
  label: string;
  userCount: number;
  permissions: string[];
};

export function RolesPageClient() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "roles"],
    queryFn: () => adminFetch<Role[]>("/api/admin/roles"),
    retry: 2
  });

  const roles = data ?? [];
  const isEmpty = !isLoading && !isError && roles.length === 0;

  return (
    <>
      <AdminPageHeader title="User & Admin Roles" description="View roles and their assigned permissions from the database." />
      <AdminCard title="Role Permissions">
        <AdminListStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          emptyTitle="No roles found"
          emptyDescription="Roles are seeded during database setup."
          icon={Shield}
          onRetry={() => refetch()}
        >
          <AdminTable
            rows={roles}
            columns={[
              { header: "Role", cell: (row) => <span className="font-black">{row.label}</span> },
              { header: "Key", cell: (row) => row.name },
              { header: "Users", cell: (row) => row.userCount },
              {
                header: "Permissions",
                cell: (row) => (
                  <div className="flex max-w-lg flex-wrap gap-1">
                    {row.permissions.map((perm) => (
                      <span key={perm} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {perm}
                      </span>
                    ))}
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
