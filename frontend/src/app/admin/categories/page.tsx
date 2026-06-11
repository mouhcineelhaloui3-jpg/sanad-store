import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { categories } from "@/lib/admin/data";

export default function CategoriesPage() {
  return (
    <>
      <AdminPageHeader title="Categories Management" description="Create, edit, and delete product categories." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Create Category">
          <div className="space-y-4">
            <TextField label="Category name" placeholder="Body Comfort" />
            <TextField label="Slug" placeholder="body-comfort" />
            <PrimaryButton>Create category</PrimaryButton>
          </div>
        </AdminCard>
        <AdminCard title="All Categories">
          <AdminTable
            rows={categories}
            columns={[
              { header: "Name", cell: (row) => <span className="font-black">{row.name}</span> },
              { header: "Products", cell: (row) => row.products },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              { header: "Actions", cell: () => <div className="flex gap-2"><button className="font-bold text-sand-700">Edit</button><button className="font-bold text-red-600">Delete</button></div> }
            ]}
          />
        </AdminCard>
      </div>
    </>
  );
}
