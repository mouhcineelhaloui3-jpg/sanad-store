import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const integrations = [
  "Meta Pixel / Conversions API",
  "TikTok Pixel",
  "Google Analytics",
  "Microsoft Clarity",
  "Plausible Analytics",
  "WhatsApp provider",
  "Email SMTP",
  "Custom webhook"
];

export default function IntegrationsPage() {
  return (
    <>
      <AdminPageHeader
        title="Integrations"
        description="Analytics pixels and third-party tools are configured in Website Editor and Settings — then saved to the live site."
      />

      <div className="mb-6 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-950 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-100">
        <p className="font-semibold">Where to save integrations</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            <Link href="/admin/storefront" className="font-bold underline">
              Website Editor → SEO &amp; API tab
            </Link>
            — GA, Meta Pixel, TikTok, Plausible, Clarity
          </li>
          <li>
            <Link href="/admin/settings" className="font-bold underline">
              Settings
            </Link>
            — site-wide configuration
          </li>
          <li>
            <Link href="/admin/ads" className="font-bold underline">
              Ads &amp; Marketing
            </Link>
            — ad platform keys
          </li>
        </ul>
      </div>

      <AdminCard title="Available integrations">
        <div className="space-y-3">
          {integrations.map((item) => (
            <div
              key={item}
              className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-black">{item}</p>
                <p className="text-sm text-slate-500">Configure and save via Website Editor or Settings.</p>
              </div>
              <Link
                href="/admin/storefront"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white dark:bg-cyan-500 dark:text-slate-950"
              >
                Open Website Editor
              </Link>
            </div>
          ))}
        </div>
      </AdminCard>
    </>
  );
}
