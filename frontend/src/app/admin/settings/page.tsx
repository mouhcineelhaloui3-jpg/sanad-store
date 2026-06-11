import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const sections = [
  { title: "Store settings", fields: ["Store name", "Support email", "Support phone"] },
  { title: "Payment gateways", fields: ["COD enabled", "Stripe key", "CMI merchant ID"] },
  { title: "Shipping settings", fields: ["Default carrier", "Shipping zones", "Free delivery threshold"] },
  { title: "Tax settings", fields: ["Tax ID", "VAT rate", "Invoice prefix"] },
  { title: "Email settings", fields: ["SMTP host", "SMTP username", "From email"] },
  { title: "Security settings", fields: ["2FA required", "Session timeout", "Allowed IPs"] }
];

export default function SettingsPage() {
  return (
    <>
      <AdminPageHeader title="Settings" description="Store, payment, shipping, tax, email, and security settings." />
      <div className="grid gap-6 xl:grid-cols-2">
        {sections.map((section) => (
          <AdminCard key={section.title} title={section.title}>
            <div className="space-y-4">
              {section.fields.map((field) =>
                field.includes("enabled") || field.includes("required") ? (
                  <SelectField key={field} label={field} options={["Enabled", "Disabled"]} />
                ) : (
                  <TextField key={field} label={field} placeholder={field} />
                )
              )}
              <PrimaryButton>Save {section.title}</PrimaryButton>
            </div>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
