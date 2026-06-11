import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { coupons } from "@/lib/admin/data";

export default function CouponsPage() {
  return (
    <>
      <AdminPageHeader title="Coupons & Discounts" description="Create coupons, expiration dates, usage limits, and discount rules." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Create Coupon">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Coupon code" placeholder="SANAD10" />
            <SelectField label="Discount type" options={["Percentage", "Fixed amount"]} />
            <TextField label="Value" placeholder="10" />
            <TextField label="Expiration date" type="date" />
            <TextField label="Usage limit" placeholder="200" type="number" />
            <SelectField label="Status" options={["active", "inactive"]} />
          </div>
          <div className="mt-5"><PrimaryButton>Create coupon</PrimaryButton></div>
        </AdminCard>
        <AdminCard title="Active Coupons">
          <AdminTable
            rows={coupons}
            columns={[
              { header: "Code", cell: (row) => <span className="font-black">{row.code}</span> },
              { header: "Type", cell: (row) => row.type },
              { header: "Value", cell: (row) => row.value },
              { header: "Expires", cell: (row) => row.expires },
              { header: "Usage", cell: (row) => row.usage },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
            ]}
          />
        </AdminCard>
      </div>
    </>
  );
}
