"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminFetch } from "@/lib/admin/fetch-client";

type AdIntegration = {
  id: string;
  platform: "meta" | "google" | "tiktok";
  label: string;
  pixelId?: string;
  oauthConnected: boolean;
  enabled: boolean;
  campaignTag?: string;
};

export default function AdsPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "ads"],
    queryFn: () => adminFetch<AdIntegration[]>("/api/admin/ads")
  });

  const save = useMutation({
    mutationFn: async (payload: { platform: string; body: Record<string, unknown> }) => {
      await adminFetch(`/api/admin/ads/${payload.platform}`, {
        method: "PUT",
        body: JSON.stringify(payload.body)
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "ads"] })
  });

  return (
    <>
      <AdminPageHeader
        title="Ads & Marketing"
        description="Meta, Google Ads, and TikTok integrations. API keys are AES-encrypted at rest. Conversions track WhatsApp clicks only."
      />
      <div className="space-y-4">
        {(data ?? []).map((item) => (
          <AdminCard key={item.id} title={item.label}>
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                save.mutate({
                  platform: item.platform,
                  body: {
                    pixelId: String(form.get("pixelId") ?? ""),
                    campaignTag: String(form.get("campaignTag") ?? ""),
                    apiKey: String(form.get("apiKey") ?? ""),
                    enabled: form.get("enabled") === "on",
                    oauthConnected: form.get("oauthConnected") === "on"
                  }
                });
              }}
            >
              <label className="block text-sm">
                <span className="font-bold">Pixel / Conversion ID</span>
                <input name="pixelId" defaultValue={item.pixelId ?? ""} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
              </label>
              <label className="block text-sm">
                <span className="font-bold">Campaign tag</span>
                <input name="campaignTag" defaultValue={item.campaignTag ?? ""} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="font-bold">API key (encrypted on save)</span>
                <input name="apiKey" type="password" placeholder="••••••••" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-950" />
              </label>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input name="enabled" type="checkbox" defaultChecked={item.enabled} />
                Enabled
              </label>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input name="oauthConnected" type="checkbox" defaultChecked={item.oauthConnected} />
                OAuth connected
              </label>
              <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white md:col-span-2 dark:bg-cyan-500 dark:text-slate-950">
                Save integration
              </button>
            </form>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
