import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { products } from "@/lib/admin/data";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id) ?? products[0];

  return (
    <>
      <AdminPageHeader title={`Edit ${product.name}`} description="Manage product content, pricing, category, inventory, and images." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminCard title="Editable Product Fields">
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Product name" placeholder={product.name} />
              <SelectField label="Category" options={["Posture Support", "Neck Comfort", "Back Support"]} />
              <TextField label="Price" placeholder={`${product.price}`} type="number" />
              <TextField label="Stock" placeholder={`${product.stock}`} type="number" />
            </div>
            <TextAreaField label="Description" placeholder="Update product page copy..." />
            <TextAreaField label="SEO meta description" placeholder="Short SEO-friendly description..." />
            <div className="flex justify-end gap-3">
              <button className="rounded-2xl border border-red-200 px-5 py-3 text-sm font-black text-red-600">Delete product</button>
              <PrimaryButton>Save changes</PrimaryButton>
            </div>
          </div>
        </AdminCard>
        <AdminCard title="Inventory & Media">
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Current stock</p>
              <p className="mt-1 text-3xl font-black">{product.stock}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm text-slate-500">Product images upload</p>
              <p className="mt-1 font-bold">API-ready media uploader placeholder</p>
            </div>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
