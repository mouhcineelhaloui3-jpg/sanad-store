"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard } from "@/components/admin/AdminCard";
import { CheckboxField, PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import { useAdminSession, useAdminSettings, useSaveAdminSettings } from "@/lib/admin/queries";
import { hasPermission } from "@/lib/admin/rbac";
import { defaultSiteSettings, SETTINGS_KEYS, type SiteSettings } from "@/lib/settings/schema";

export default function SettingsPage() {
  const session = useAdminSession();
  const { data, isLoading, isError, refetch, isFetching } = useAdminSettings();
  const saveMutation = useSaveAdminSettings();
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings());
  const canWrite = session.data?.user ? hasPermission(session.data.user.role, "settings:write") : false;

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const save = async () => {
    if (!canWrite) {
      toast.error("You do not have permission to save settings");
      return;
    }

    try {
      const saved = await saveMutation.mutateAsync(settings);
      setSettings(saved);
      toast.success("Settings saved");
    } catch {
      toast.error("Unable to save settings");
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Settings"
        description="Key-value site configuration validated with Zod and persisted safely."
        action={
          <PrimaryButton onClick={save} disabled={isLoading || saveMutation.isPending || !canWrite}>
            {saveMutation.isPending ? "Saving..." : "Save settings"}
          </PrimaryButton>
        }
      />

      {isError || (data && JSON.stringify(data) === JSON.stringify(defaultSiteSettings()) && isFetching) ? (
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
          <p>Using fallback settings. Retry to sync with the server.</p>
          <button type="button" className="mt-3 rounded-xl bg-amber-600 px-4 py-2 font-bold text-white" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <AdminSkeleton rows={6} />
      ) : (
        <AdminCard title="Site configuration">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left dark:border-slate-700">
                  <th className="px-3 py-3 font-black">Key</th>
                  <th className="px-3 py-3 font-black">Value</th>
                </tr>
              </thead>
              <tbody>
                {SETTINGS_KEYS.map(({ key, label, type }) => (
                  <tr key={key} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-4 align-top font-bold text-slate-600 dark:text-slate-300">
                      <code>{key}</code>
                      <p className="mt-1 text-xs font-normal text-slate-500">{label}</p>
                    </td>
                    <td className="px-3 py-4">
                      {type === "boolean" ? (
                        <CheckboxField
                          label={label}
                          checked={settings[key] as boolean}
                          onChange={(checked) => setSettings((current) => ({ ...current, [key]: checked }))}
                        />
                      ) : type === "select" ? (
                        <SelectField
                          label={label}
                          value={settings[key] as string}
                          options={["light", "dark", "system"]}
                          onChange={(value) =>
                            setSettings((current) => ({
                              ...current,
                              [key]: value as SiteSettings["theme"]
                            }))
                          }
                        />
                      ) : (
                        <TextField
                          label={label}
                          type={type === "email" ? "email" : "text"}
                          value={settings[key] as string}
                          onChange={(value) => setSettings((current) => ({ ...current, [key]: value }))}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}
    </>
  );
}
