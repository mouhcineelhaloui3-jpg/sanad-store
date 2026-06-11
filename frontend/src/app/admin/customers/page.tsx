import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { customers } from "@/lib/admin/data";

export default function CustomersPage() {
  return (
    <>
      <AdminPageHeader title="Customers Management" description="Customer list, profiles, purchase history, and activity tracking." />
      <AdminCard>
        <AdminTable
          rows={customers}
          columns={[
            { header: "Customer", cell: (row) => <Link className="font-black text-sand-700" href={`/admin/customers/${row.id}`}>{row.name}</Link> },
            { header: "City", cell: (row) => row.city },
            { header: "Orders", cell: (row) => row.orders },
            { header: "Spent", cell: (row) => `${row.spent} د.م.` },
            { header: "Activity", cell: (row) => row.activity }
          ]}
        />
      </AdminCard>
    </>
  );
}
