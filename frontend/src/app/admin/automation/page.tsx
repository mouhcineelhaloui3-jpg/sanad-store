"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { adminFetch } from "@/lib/admin/fetch-client";

type AutomationJob = {
  id: string;
  name: string;
  schedule: string;
  description: string;
  enabled: boolean;
  lastRunAt: string | null;
};

type AutomationRunLog = {
  id: string;
  jobId: string;
  status: string;
  message: string;
  timestamp: string;
};

export default function AutomationPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "automation"],
    queryFn: () =>
      adminFetch<{ jobs: AutomationJob[]; logs: AutomationRunLog[] }>("/api/admin/automation")
  });

  const toggle = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      await adminFetch(`/api/admin/automation/${id}`, {
        method: "PUT",
        body: JSON.stringify({ enabled })
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "automation"] })
  });

  const run = useMutation({
    mutationFn: async (id: string) => {
      await adminFetch(`/api/admin/automation/${id}/run`, { method: "POST" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "automation"] })
  });

  return (
    <>
      <AdminPageHeader
        title="Automation"
        description="Cron-style jobs for subscription expiry, renewals, and campaign triggers."
      />
      <AdminCard title="Jobs">
        <AdminTable
          rows={data?.jobs ?? []}
          columns={[
            { header: "Job", cell: (row) => <span className="font-black">{row.name}</span> },
            { header: "Schedule", cell: (row) => <code>{row.schedule}</code> },
            { header: "Status", cell: (row) => (row.enabled ? "Enabled" : "Disabled") },
            {
              header: "Actions",
              cell: (row) => (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="font-bold text-cyan-600"
                    onClick={() => toggle.mutate({ id: row.id, enabled: !row.enabled })}
                  >
                    {row.enabled ? "Disable" : "Enable"}
                  </button>
                  <button type="button" className="font-bold text-slate-700" onClick={() => run.mutate(row.id)}>
                    Run now
                  </button>
                </div>
              )
            }
          ]}
        />
      </AdminCard>
      <AdminCard className="mt-6" title="Recent runs">
        <AdminTable
          rows={data?.logs ?? []}
          columns={[
            { header: "Job", cell: (row) => row.jobId },
            { header: "Status", cell: (row) => row.status },
            { header: "Message", cell: (row) => row.message },
            { header: "Time", cell: (row) => new Date(row.timestamp).toLocaleString() }
          ]}
        />
      </AdminCard>
    </>
  );
}
