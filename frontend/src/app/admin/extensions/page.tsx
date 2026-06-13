"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ExtensionToggleCard } from "@/components/admin/ExtensionToggleCard";
import { adminFetch } from "@/lib/admin/fetch-client";
import { extensionManifest } from "@/lib/extensions/manifest";

type ExtensionState = { name: string; enabled: boolean; installedAt: string; updatedAt: string };

export default function ExtensionsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "extensions"],
    queryFn: () => adminFetch<ExtensionState[]>("/api/admin/extensions")
  });

  const toggle = useMutation({
    mutationFn: async ({ name, enabled }: { name: string; enabled: boolean }) => {
      await adminFetch(`/api/admin/extensions/${name}`, {
        method: "PUT",
        body: JSON.stringify({ enabled })
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "extensions"] })
  });

  const states = new Map((data ?? []).map((s) => [s.name, s.enabled]));

  return (
    <>
      <AdminPageHeader
        title="Extensions"
        description="Enable or disable modular SANAD IPTV plugins. Each extension registers its own API routes and admin navigation."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {extensionManifest.map((ext) => (
          <ExtensionToggleCard
            key={ext.name}
            name={ext.name}
            version={ext.version}
            description={ext.description}
            enabled={states.get(ext.name) ?? true}
            busy={isLoading || toggle.isPending}
            onToggle={(enabled) => toggle.mutate({ name: ext.name, enabled })}
          />
        ))}
      </div>
      <AdminCard className="mt-6" title="Architecture">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Extensions live in <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">/extensions</code> and register
          through the core engine in <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">/core</code>. Sales are
          WhatsApp-only — no payment checkout module is loaded.
        </p>
      </AdminCard>
    </>
  );
}
