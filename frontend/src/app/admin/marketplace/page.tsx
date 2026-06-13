"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
type ExtensionPackage = {
  id: string;
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
  installed: boolean;
  category?: string;
  author?: string;
};
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { adminFetch } from "@/lib/admin/fetch-client";

export default function MarketplacePage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "marketplace"],
    queryFn: () => adminFetch<ExtensionPackage[]>("/api/admin/marketplace")
  });

  const install = useMutation({
    mutationFn: async (id: string) => {
      await adminFetch(`/api/admin/marketplace/${id}/install`, { method: "POST" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "marketplace"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "extensions"] });
    }
  });

  return (
    <>
      <AdminPageHeader
        title="Extension Marketplace"
        description="Install, update, and remove internal plugins for SANAD IPTV Admin."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).map((pkg) => (
          <AdminCard key={pkg.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">{pkg.category ?? "plugin"}</p>
                <h3 className="mt-1 text-xl font-black">{pkg.name}</h3>
                <p className="mt-1 text-xs text-slate-500">v{pkg.version} · {pkg.author ?? "SANAD"}</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{pkg.description}</p>
              </div>
              {pkg.installed ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Installed
                </span>
              ) : (
                <button
                  type="button"
                  disabled={isLoading || install.isPending}
                  onClick={() => install.mutate(pkg.id)}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white dark:bg-cyan-500 dark:text-slate-950"
                >
                  Install
                </button>
              )}
            </div>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
