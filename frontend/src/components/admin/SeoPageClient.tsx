"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CheckboxField, PrimaryButton, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { adminFetch } from "@/lib/admin/fetch-client";
import { blogPosts } from "@/lib/blog/posts";
import { t } from "@/lib/i18n/localized";
import { programmaticPages } from "@/lib/seo/programmatic-pages";
import { getAllPublicPaths } from "@/lib/seo/routes";

type SeoSettings = {
  siteTitle: string;
  siteDescription: string;
  defaultOgImage: string;
  robotsIndex: boolean;
  canonicalBase: string;
  programmaticEnabled: boolean;
  blogEnabled: boolean;
};

export function SeoPageClient() {
  const queryClient = useQueryClient();
  const indexedPaths = getAllPublicPaths();
  const [form, setForm] = useState<SeoSettings | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "seo"],
    queryFn: () => adminFetch<SeoSettings>("/api/admin/seo"),
    retry: 2
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: SeoSettings) =>
      adminFetch<SeoSettings>("/api/admin/seo", {
        method: "PUT",
        body: JSON.stringify(payload)
      }),
    onSuccess: (saved) => {
      toast.success("SEO settings saved");
      setForm(saved);
      queryClient.setQueryData(["admin", "seo"], saved);
    },
    onError: () => toast.error("Failed to save SEO settings")
  });

  return (
    <>
      <AdminPageHeader title="SEO Management" description="Indexed routes, programmatic landing pages, and editable meta defaults." />

      <AdminCard title="Global SEO Settings" className="mb-6">
        <AdminListStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={false}
          emptyTitle=""
          emptyDescription=""
          icon={Search}
          onRetry={() => refetch()}
        >
          {form ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <TextField label="Site title" value={form.siteTitle} onChange={(v) => setForm((f) => (f ? { ...f, siteTitle: v } : f))} />
              <TextField label="Canonical base URL" value={form.canonicalBase} onChange={(v) => setForm((f) => (f ? { ...f, canonicalBase: v } : f))} />
              <TextField label="Default OG image" value={form.defaultOgImage} onChange={(v) => setForm((f) => (f ? { ...f, defaultOgImage: v } : f))} />
              <div className="lg:col-span-2">
                <TextAreaField
                  label="Site description"
                  value={form.siteDescription}
                  onChange={(v) => setForm((f) => (f ? { ...f, siteDescription: v } : f))}
                />
              </div>
              <CheckboxField
                label="Allow search engine indexing (robots)"
                checked={form.robotsIndex}
                onChange={(v) => setForm((f) => (f ? { ...f, robotsIndex: v } : f))}
              />
              <CheckboxField
                label="Programmatic landing pages enabled"
                checked={form.programmaticEnabled}
                onChange={(v) => setForm((f) => (f ? { ...f, programmaticEnabled: v } : f))}
              />
              <CheckboxField
                label="Blog enabled"
                checked={form.blogEnabled}
                onChange={(v) => setForm((f) => (f ? { ...f, blogEnabled: v } : f))}
              />
              <div className="lg:col-span-2">
                <PrimaryButton disabled={saveMutation.isPending} onClick={() => form && saveMutation.mutate(form)}>
                  Save SEO settings
                </PrimaryButton>
              </div>
            </div>
          ) : null}
        </AdminListStates>
      </AdminCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title={`Sitemap Routes (${indexedPaths.length})`}>
          <ul className="max-h-80 space-y-2 overflow-y-auto text-sm">
            {indexedPaths.map((path) => (
              <li key={path} className="rounded-xl bg-slate-50 px-3 py-2 font-mono dark:bg-slate-800">
                {path}
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="Programmatic Landing Pages">
          <ul className="space-y-2 text-sm">
            {Object.values(programmaticPages).map((page) => (
              <li key={page.slug} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <p className="font-bold">{page.title}</p>
                <p className="text-xs text-slate-500">/iptv/{page.slug}</p>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard title="Blog Articles">
          <ul className="space-y-2 text-sm">
            {Object.values(blogPosts).map((post) => (
              <li key={post.slug} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span className="font-bold">{t(post.title, "ar-ma")}</span>
                <span className="text-xs text-slate-500">{post.category}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
