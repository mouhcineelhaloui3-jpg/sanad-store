import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { reviews } from "@/lib/admin/data";

export default function ReviewsPage() {
  return (
    <>
      <AdminPageHeader title="Reviews Management" description="View, approve, reject, and delete product reviews." />
      <AdminCard>
        <AdminTable
          rows={reviews}
          columns={[
            { header: "Review", cell: (row) => <div><p className="font-bold">{row.customer}</p><p className="max-w-md text-slate-500">{row.text}</p></div> },
            { header: "Product", cell: (row) => row.product },
            { header: "Rating", cell: (row) => "★".repeat(row.rating) },
            { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
            { header: "Actions", cell: () => <div className="flex gap-2"><button className="font-bold text-emerald-600">Approve</button><button className="font-bold text-amber-600">Reject</button><button className="font-bold text-red-600">Delete</button></div> }
          ]}
        />
      </AdminCard>
    </>
  );
}
