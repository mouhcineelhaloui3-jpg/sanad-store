import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const integrations = [
  "Meta Pixel / Conversions API",
  "TikTok Pixel",
  "Google Sheets webhook",
  "WhatsApp provider",
  "Delivery company API",
  "Email SMTP",
  "Custom tool / webhook"
];

export default function IntegrationsPage() {
  return (
    <>
      <AdminPageHeader
        title="Integrations & API Tools"
        description="Manage all external tools, pixels, webhooks, delivery APIs, WhatsApp, and custom scripts from one place."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Add API / Tool">
          <div className="space-y-4">
            <SelectField label="Tool type" options={integrations} />
            <TextField label="Integration name" placeholder="Meta CAPI Production" />
            <TextField label="Base URL / Endpoint" placeholder="https://..." />
            <TextField label="API key / token env name" placeholder="META_CAPI_TOKEN" />
            <TextAreaField label="Headers / payload mapping" placeholder='{"Authorization": "Bearer ..."}' />
            <SelectField label="Status" options={["Enabled", "Disabled", "Test mode"]} />
            <PrimaryButton>Save integration</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Configured Tools">
          <div className="space-y-3">
            {integrations.map((item) => (
              <div key={item} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black">{item}</p>
                  <p className="text-sm text-slate-500">Not connected yet. Add keys and endpoint to activate.</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold dark:border-slate-700">Test</button>
                  <button className="rounded-xl bg-sand-900 px-3 py-2 text-sm font-bold text-white">Configure</button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
