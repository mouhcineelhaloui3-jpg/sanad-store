import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { products } from "@/lib/admin/data";

export default function ProductsPage() {
  return (
    <>
      <AdminPageHeader
        title="Products Management"
        description="View, add, edit, delete products, track inventory, categories, and uploaded images."
        action={<Link href="/admin/products/new" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">Add new product</Link>}
      />
      <AdminCard>
        <AdminTable
          rows={products}
          columns={[
            { header: "Product", cell: (row) => <Link href={`/admin/products/${row.id}`} className="font-black text-sand-700">{row.name}</Link> },
            { header: "Category", cell: (row) => row.category },
            { header: "Price", cell: (row) => `${row.price} د.م.` },
            { header: "Stock", cell: (row) => <span className={row.stock < 10 ? "font-black text-red-600" : "font-bold"}>{row.stock}</span> },
            { header: "Sales", cell: (row) => row.sales },
            { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
            { header: "Actions", cell: (row) => <div className="flex gap-2"><Link className="font-bold text-sand-700" href={`/admin/products/${row.id}`}>Edit</Link><button className="font-bold text-red-600">Delete</button></div> }
          ]}
        />
      </AdminCard>
    </>
  );
}
