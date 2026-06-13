"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bell } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Notification = {
  id: string;
  title: string;
  body: string;
  channel: string;
  status: string;
  createdAt: string;
};

type PaginatedNotifications = {
  items: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type NotificationSettings = {
  realtimeEnabled: boolean;
  provider: "polling" | "websocket" | "sse";
  pollingIntervalSeconds: number;
  showLivePopup: boolean;
  cacheEnabled: boolean;
  cacheTtlSeconds: number;
  clearCacheOnOrder: boolean;
  newOrderAlerts: boolean;
  lowStockAlerts: boolean;
  lowStockThreshold: number;
  reviewApprovalAlerts: boolean;
  dashboardBell: boolean;
  emailAlerts: boolean;
  whatsappAlerts: boolean;
  adminWhatsappNumber: string;
};

function boolSelect(value: boolean) {
  return value ? "Enabled" : "Disabled";
}

function parseBool(value: string) {
  return value === "Enabled";
}

export function NotificationsPageClient() {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  const { data: inbox, isLoading: inboxLoading, isError: inboxError, refetch: refetchInbox } = useQuery({
    queryKey: ["admin", "notifications"],
    queryFn: () => adminFetch<PaginatedNotifications>("/api/admin/notifications?limit=50"),
    retry: 2
  });

  const { data: settingsData, isLoading: settingsLoading } = useQuery({
    queryKey: ["admin", "notifications", "settings"],
    queryFn: () => adminFetch<NotificationSettings>("/api/admin/notifications/settings"),
    retry: 2
  });

  useEffect(() => {
    if (settingsData) setSettings(settingsData);
  }, [settingsData]);

  const markReadMutation = useMutation({
    mutationFn: (id: string) =>
      adminFetch<Notification>(`/api/admin/notifications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "read" })
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "notifications"] })
  });

  const saveSettingsMutation = useMutation({
    mutationFn: (payload: NotificationSettings) =>
      adminFetch<NotificationSettings>("/api/admin/notifications/settings", {
        method: "PUT",
        body: JSON.stringify(payload)
      }),
    onSuccess: (data) => {
      toast.success("Settings saved");
      setSettings(data);
      queryClient.setQueryData(["admin", "notifications", "settings"], data);
    },
    onError: () => toast.error("Failed to save settings")
  });

  const notifications = inbox?.items ?? [];
  const isEmpty = !inboxLoading && !inboxError && notifications.length === 0;

  function updateSettings(patch: Partial<NotificationSettings>) {
    setSettings((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function saveSettings() {
    if (settings) saveSettingsMutation.mutate(settings);
  }

  return (
    <>
      <AdminPageHeader
        title="Notifications Settings"
        description="Control real-time alerts, cache behavior, low-stock alerts, and notification channels."
      />

      <AdminCard title="Notification Inbox" className="mb-6">
        <AdminListStates
          isLoading={inboxLoading}
          isError={inboxError}
          isEmpty={isEmpty}
          emptyTitle="No notifications"
          emptyDescription="Admin alerts and system notifications will appear here."
          icon={Bell}
          onRetry={() => refetchInbox()}
        >
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-black">{n.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{n.body}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {n.channel} · {new Date(n.createdAt).toLocaleString("ar-MA")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={n.status} />
                  {n.status !== "read" ? (
                    <button
                      type="button"
                      className="text-xs font-bold text-cyan-700 dark:text-cyan-400"
                      onClick={() => markReadMutation.mutate(n.id)}
                    >
                      Mark read
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </AdminListStates>
      </AdminCard>

      {settingsLoading || !settings ? (
        <p className="text-sm text-slate-500">Loading settings…</p>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <AdminCard title="Real-Time Notifications">
            <div className="space-y-4">
              <SelectField
                label="Real-time notifications"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.realtimeEnabled)}
                onChange={(v) => updateSettings({ realtimeEnabled: parseBool(v) })}
              />
              <SelectField
                label="Provider"
                options={["polling", "websocket", "sse"]}
                value={settings.provider}
                onChange={(v) => updateSettings({ provider: v as NotificationSettings["provider"] })}
              />
              <TextField
                label="Polling interval seconds"
                type="number"
                value={String(settings.pollingIntervalSeconds)}
                onChange={(v) => updateSettings({ pollingIntervalSeconds: Number(v) || 15 })}
              />
              <SelectField
                label="Show live popup widget"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.showLivePopup)}
                onChange={(v) => updateSettings({ showLivePopup: parseBool(v) })}
              />
              <PrimaryButton disabled={saveSettingsMutation.isPending} onClick={saveSettings}>
                Save real-time settings
              </PrimaryButton>
            </div>
          </AdminCard>

          <AdminCard title="Cache Control">
            <div className="space-y-4">
              <SelectField
                label="Cache notifications"
                options={["Disabled", "Enabled"]}
                value={settings.cacheEnabled ? "Enabled" : "Disabled"}
                onChange={(v) => updateSettings({ cacheEnabled: v === "Enabled" })}
              />
              <TextField
                label="Cache TTL seconds"
                type="number"
                value={String(settings.cacheTtlSeconds)}
                onChange={(v) => updateSettings({ cacheTtlSeconds: Number(v) || 0 })}
              />
              <SelectField
                label="Clear cache on new order"
                options={["Yes", "No"]}
                value={settings.clearCacheOnOrder ? "Yes" : "No"}
                onChange={(v) => updateSettings({ clearCacheOnOrder: v === "Yes" })}
              />
              <PrimaryButton disabled={saveSettingsMutation.isPending} onClick={saveSettings}>
                Save cache settings
              </PrimaryButton>
            </div>
          </AdminCard>

          <AdminCard title="Alert Rules">
            <div className="space-y-4">
              <SelectField
                label="New order alerts"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.newOrderAlerts)}
                onChange={(v) => updateSettings({ newOrderAlerts: parseBool(v) })}
              />
              <SelectField
                label="Low stock alerts"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.lowStockAlerts)}
                onChange={(v) => updateSettings({ lowStockAlerts: parseBool(v) })}
              />
              <TextField
                label="Low stock threshold"
                type="number"
                value={String(settings.lowStockThreshold)}
                onChange={(v) => updateSettings({ lowStockThreshold: Number(v) || 10 })}
              />
              <SelectField
                label="Review approval alerts"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.reviewApprovalAlerts)}
                onChange={(v) => updateSettings({ reviewApprovalAlerts: parseBool(v) })}
              />
              <PrimaryButton disabled={saveSettingsMutation.isPending} onClick={saveSettings}>
                Save alert rules
              </PrimaryButton>
            </div>
          </AdminCard>

          <AdminCard title="Channels">
            <div className="space-y-4">
              <SelectField
                label="Dashboard bell"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.dashboardBell)}
                onChange={(v) => updateSettings({ dashboardBell: parseBool(v) })}
              />
              <SelectField
                label="Email alerts"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.emailAlerts)}
                onChange={(v) => updateSettings({ emailAlerts: parseBool(v) })}
              />
              <SelectField
                label="WhatsApp admin alerts"
                options={["Enabled", "Disabled"]}
                value={boolSelect(settings.whatsappAlerts)}
                onChange={(v) => updateSettings({ whatsappAlerts: parseBool(v) })}
              />
              <TextField
                label="Admin WhatsApp number"
                placeholder="+212600000000"
                value={settings.adminWhatsappNumber}
                onChange={(v) => updateSettings({ adminWhatsappNumber: v })}
              />
              <PrimaryButton disabled={saveSettingsMutation.isPending} onClick={saveSettings}>
                Save channels
              </PrimaryButton>
            </div>
          </AdminCard>
        </div>
      )}
    </>
  );
}
