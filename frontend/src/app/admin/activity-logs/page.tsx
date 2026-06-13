"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminFetch } from "@/lib/admin/fetch-client";
import type { AuditLogEntry } from "@/lib/admin/audit";
import { Activity } from "lucide-react";

export default function ActivityLogsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "logs"],
    queryFn: () => adminFetch<{ logs: AuditLogEntry[] }>("/api/admin/logs"),
    retry: 2
  });

  return (
    <>
      <AdminPageHeader title="Activity Logs" description="Audit trail for admin authentication and configuration changes." />

      {isLoading ? (
        <AdminSkeleton rows={6} />
      ) : isError || !data?.logs.length ? (
        <AdminEmptyState
          title="No activity yet"
          description="Admin actions will appear here as audit events."
          icon={Activity}
          action={
            <button type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white" onClick={() => refetch()}>
              Refresh
            </button>
          }
        />
      ) : (
        <AdminCard title="Recent events">
          <AdminTable
            rows={data.logs}
            columns={[
              { header: "Action", cell: (row) => row.action },
              { header: "Resource", cell: (row) => row.resource },
              { header: "Actor", cell: (row) => row.actorEmail },
              { header: "Time", cell: (row) => new Date(row.createdAt).toLocaleString() }
            ]}
          />
        </AdminCard>
      )}
    </>
  );
}
