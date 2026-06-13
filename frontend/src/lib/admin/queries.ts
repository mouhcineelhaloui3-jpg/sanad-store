"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetch } from "./fetch-client";
import type { AdminRole } from "./rbac";
import type { SiteSettings } from "@/lib/settings/schema";
import type { StoreContent } from "@/lib/cms/types";
import { defaultSiteSettings } from "@/lib/settings/schema";
import { defaultStoreContent } from "@/lib/cms/defaults";

export type AdminSessionUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  roleLabel: string;
};

export type AdminSessionResponse = {
  authenticated: boolean;
  user: AdminSessionUser | null;
};

export function useAdminSession() {
  return useQuery({
    queryKey: ["admin", "session"],
    queryFn: () => adminFetch<AdminSessionResponse>("/api/admin/auth/session"),
    staleTime: 60_000,
    retry: 2
  });
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      try {
        return await adminFetch<SiteSettings>("/api/admin/settings");
      } catch {
        return defaultSiteSettings();
      }
    },
    staleTime: 30_000,
    retry: 3
  });
}

export function useSaveAdminSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: SiteSettings) =>
      adminFetch<SiteSettings>("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin", "settings"], data);
    }
  });
}

export function useAdminCms() {
  return useQuery({
    queryKey: ["admin", "cms"],
    queryFn: async () => {
      try {
        return await adminFetch<StoreContent>("/api/admin/cms");
      } catch {
        return defaultStoreContent();
      }
    },
    staleTime: 30_000,
    retry: 3
  });
}

export function useSaveAdminCms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: StoreContent) =>
      adminFetch<StoreContent>("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["admin", "cms"], data);
    }
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => adminFetch<{ users: Array<Omit<AdminSessionUser, "roleLabel"> & { active: boolean }>; tenantId: string }>("/api/admin/users"),
    retry: 2
  });
}
