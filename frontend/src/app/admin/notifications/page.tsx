import { AdminCard } from "@/components/admin/AdminCard";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NotificationsSettingsPage() {
  return (
    <>
      <AdminPageHeader
        title="Notifications Settings"
        description="Control real-time alerts, cache behavior, low-stock alerts, and notification channels."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Real-Time Notifications">
          <div className="space-y-4">
            <SelectField label="Real-time notifications" options={["Enabled", "Disabled"]} />
            <SelectField label="Provider" options={["Polling", "WebSocket", "Server-Sent Events"]} />
            <TextField label="Polling interval seconds" placeholder="15" type="number" />
            <SelectField label="Show live popup widget" options={["Enabled", "Disabled"]} />
            <PrimaryButton>Save real-time settings</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Cache Control">
          <div className="space-y-4">
            <SelectField label="Cache notifications" options={["Disabled", "Enabled"]} />
            <TextField label="Cache TTL seconds" placeholder="0" type="number" />
            <SelectField label="Clear cache on new order" options={["Yes", "No"]} />
            <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black dark:border-slate-700">
              Clear notifications cache
            </button>
            <PrimaryButton>Save cache settings</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Alert Rules">
          <div className="space-y-4">
            <SelectField label="New order alerts" options={["Enabled", "Disabled"]} />
            <SelectField label="Low stock alerts" options={["Enabled", "Disabled"]} />
            <TextField label="Low stock threshold" placeholder="10" type="number" />
            <SelectField label="Review approval alerts" options={["Enabled", "Disabled"]} />
            <PrimaryButton>Save alert rules</PrimaryButton>
          </div>
        </AdminCard>

        <AdminCard title="Channels">
          <div className="space-y-4">
            <SelectField label="Dashboard bell" options={["Enabled", "Disabled"]} />
            <SelectField label="Email alerts" options={["Enabled", "Disabled"]} />
            <SelectField label="WhatsApp admin alerts" options={["Enabled", "Disabled"]} />
            <TextField label="Admin WhatsApp number" placeholder="+212600000000" />
            <PrimaryButton>Save channels</PrimaryButton>
          </div>
        </AdminCard>
      </div>
    </>
  );
}
