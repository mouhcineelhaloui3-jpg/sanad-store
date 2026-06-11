import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { activityLogs } from "@/lib/admin/data";

export default function ActivityLogsPage() {
  return (
    <>
      <AdminPageHeader title="Activity & Audit Logs" description="Security events, admin actions, and system audit trail." />
      <AdminCard>
        <AdminTable
          rows={activityLogs}
          columns={[
            { header: "Event", cell: (row) => <span className="font-black">{row.event}</span> },
            { header: "Actor", cell: (row) => row.actor },
            { header: "Target", cell: (row) => row.target },
            { header: "Time", cell: (row) => row.time }
          ]}
        />
      </AdminCard>
    </>
  );
}
