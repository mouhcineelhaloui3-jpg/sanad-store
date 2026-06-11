import { UploadCloud } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewProductPage() {
  return (
    <>
      <AdminPageHeader title="Add New Product" description="Create a product with pricing, inventory, category, media, and SEO content." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminCard title="Product Information">
          <AdminFormGrid />
        </AdminCard>
        <AdminCard title="Images & Inventory">
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
            <UploadCloud className="mx-auto h-10 w-10 text-sand-700" />
            <p className="mt-3 font-black">Upload product images</p>
            <p className="mt-1 text-sm text-slate-500">PNG, JPG, WebP up to 5MB each. API-ready upload zone.</p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextField label="SKU" placeholder="PRD-004" />
            <TextField label="Stock quantity" placeholder="100" type="number" />
            <TextField label="Low stock threshold" placeholder="10" type="number" />
            <SelectField label="Inventory status" options={["In stock", "Low stock", "Out of stock"]} />
          </div>
        </AdminCard>
      </div>
    </>
  );
}

function AdminFormGrid() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Product name" placeholder="Sanad Align" />
        <SelectField label="Category" options={["Posture Support", "Neck Comfort", "Back Support"]} />
        <TextField label="Regular price" placeholder="249" type="number" />
        <TextField label="Upsell price" placeholder="199" type="number" />
      </div>
      <TextAreaField label="Description" placeholder="Write conversion-focused product description..." />
      <TextAreaField label="Benefits" placeholder="One benefit per line..." />
      <div className="flex justify-end">
        <PrimaryButton>Create product</PrimaryButton>
      </div>
    </div>
  );
}
