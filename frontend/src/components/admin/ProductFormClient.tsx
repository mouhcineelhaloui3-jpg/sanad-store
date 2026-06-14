"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ExternalLink, ImageIcon, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import {
  DangerButton,
  PrimaryButton,
  SecondaryButton,
  SelectField,
  TextAreaField,
  TextField
} from "@/components/admin/AdminForm";
import { adminFetch } from "@/lib/admin/fetch-client";
import {
  planConfigForSlug,
  planSlugForProduct,
  type StorefrontPlanSlug
} from "@/lib/admin/product-plan-map";
import { defaultPlans } from "@/lib/plans";
import { FALLBACK_CATEGORIES, PRODUCT_DURATIONS, PRODUCT_QUALITIES } from "@/lib/products/constants";
import { productFormSchema, type ProductFormValues } from "@/lib/products/schema";
import type { ProductDto } from "@/lib/db/products";

type CategoryOption = { slug: string; name: string };

const planOptions: { value: StorefrontPlanSlug; label: string }[] = [
  { value: "plan-3-months", label: "Starter — 3 months" },
  { value: "plan-6-months", label: "Confort — 6 months (Most popular)" },
  { value: "plan-12-months", label: "Premium — 12 months" },
  { value: "plan-2-screens", label: "Pack 2 Screens — 12 months" }
];

const emptyValues: ProductFormValues = {
  name: "",
  description: "",
  price: 80,
  duration: "3m",
  category: "premium",
  quality: "FHD",
  deviceLimit: 1,
  isActive: true,
  visibleFrom: "",
  visibleTo: ""
};

function toFormValues(product: ProductDto): ProductFormValues {
  return {
    name: product.name,
    description: product.description ?? "",
    price: product.price,
    duration: product.duration,
    category: product.category,
    quality: product.quality,
    deviceLimit: product.deviceLimit,
    isActive: product.isActive,
    visibleFrom: product.visibleFrom ? product.visibleFrom.slice(0, 10) : "",
    visibleTo: product.visibleTo ? product.visibleTo.slice(0, 10) : ""
  };
}

export function ProductFormClient({ productId }: { productId?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEdit = Boolean(productId);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: emptyValues
  });

  const { handleSubmit, reset, watch, setValue, formState } = form;
  const { errors, isSubmitting } = formState;

  const productQuery = useQuery({
    queryKey: ["admin", "product", productId],
    enabled: isEdit,
    queryFn: () => adminFetch<ProductDto>(`/api/admin/products/${productId}`),
    retry: 1
  });

  const categoriesQuery = useQuery({
    queryKey: ["admin", "categories", "options"],
    queryFn: () => adminFetch<{ items: CategoryOption[] }>("/api/admin/categories?limit=100")
  });

  useEffect(() => {
    if (productQuery.data) {
      reset(toFormValues(productQuery.data));
    }
  }, [productQuery.data, reset]);

  const category = watch("category");
  const duration = watch("duration");
  const quality = watch("quality");
  const deviceLimit = watch("deviceLimit");

  const linkedPlanSlug = useMemo(
    () => planSlugForProduct({ duration, deviceLimit }),
    [duration, deviceLimit]
  );

  const linkedPlanLabel = defaultPlans.find((p) => p.slug === linkedPlanSlug)?.name.en ?? linkedPlanSlug;

  const categoryOptions = useMemo(() => {
    const fromApi = categoriesQuery.data?.items ?? [];
    const slugs = new Set<string>([...FALLBACK_CATEGORIES]);
    fromApi.forEach((item) => slugs.add(item.slug));
    if (category) slugs.add(category);

    return [...slugs].map((slug) => {
      const match = fromApi.find((item) => item.slug === slug);
      return { value: slug, label: match?.name ?? slug };
    });
  }, [categoriesQuery.data, category]);

  const durationOptions = useMemo(() => {
    const values = new Set<string>([...PRODUCT_DURATIONS]);
    if (duration) values.add(duration);
    return [...values];
  }, [duration]);

  const qualityOptions = useMemo(() => {
    const values = new Set<string>([...PRODUCT_QUALITIES]);
    if (quality) values.add(quality);
    return [...values];
  }, [quality]);

  const saveMutation = useMutation({
    mutationFn: (values: ProductFormValues) => {
      const payload = {
        ...values,
        description: values.description ?? "",
        visibleFrom: values.visibleFrom || undefined,
        visibleTo: values.visibleTo || undefined
      };

      if (isEdit && productId) {
        return adminFetch<ProductDto>(`/api/admin/products/${productId}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      }

      return adminFetch<ProductDto>("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(payload)
      });
    },
    onSuccess: (product) => {
      const slug = planSlugForProduct(product);
      toast.success(
        slug
          ? `Saved — live website plan updated (${slug.replace("plan-", "").replace(/-/g, " ")})`
          : isEdit
            ? "Product updated"
            : "Product created"
      );
      reset(toFormValues(product));
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "cms"] });
      queryClient.setQueryData(["admin", "product", product.id], product);

      if (!isEdit) {
        router.push(`/admin/products/${product.id}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to save product");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => adminFetch(`/api/admin/products/${productId}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Product deleted — linked plan hidden on website");
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "cms"] });
      router.push("/admin/products");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product");
    }
  });

  const saving = isSubmitting || saveMutation.isPending;
  const statusValue = watch("isActive") ? "active" : "inactive";

  function handleDelete() {
    if (!productId) return;
    if (!window.confirm("Delete this product permanently? The linked plan will be hidden on the website.")) return;
    deleteMutation.mutate();
  }

  function handlePlanLinkChange(slug: string) {
    const config = planConfigForSlug(slug as StorefrontPlanSlug);
    setValue("duration", config.duration, { shouldDirty: true, shouldValidate: true });
    setValue("deviceLimit", config.deviceLimit, { shouldDirty: true, shouldValidate: true });
  }

  const onSubmit = handleSubmit((values) => saveMutation.mutate(values));

  if (isEdit && productQuery.isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
        <p className="text-sm text-slate-500">Loading product…</p>
      </div>
    );
  }

  if (isEdit && productQuery.isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p className="font-semibold text-red-700 dark:text-red-400">Failed to load product</p>
        <button
          type="button"
          className="mt-3 text-sm font-semibold text-red-600 underline"
          onClick={() => productQuery.refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-24">
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-950 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-100">
        <p className="font-semibold">This controls the live website</p>
        <p className="mt-1 text-cyan-900/80 dark:text-cyan-200/80">
          Click <strong>Save</strong> to update prices and plan visibility on the homepage and pricing page immediately.
          For hero text, movies, and SEO, use{" "}
          <Link href="/admin/storefront" className="font-bold underline">
            Website Editor
          </Link>
          .
        </p>
      </div>

      <div className="sticky top-0 z-20 -mx-1 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
            <Package className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {isEdit ? "Edit subscription plan" : "New subscription plan"}
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              {watch("name") || (isEdit ? "Untitled plan" : "Create IPTV plan")}
            </p>
            {linkedPlanSlug ? (
              <p className="text-xs text-cyan-700 dark:text-cyan-400">Live site: {linkedPlanLabel}</p>
            ) : (
              <p className="text-xs text-amber-700 dark:text-amber-400">Choose a storefront plan below (3m, 6m, or 12m)</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View site
          </Link>
          {isEdit ? (
            <DangerButton onClick={handleDelete} disabled={deleteMutation.isPending || saving}>
              Delete
            </DangerButton>
          ) : null}
          <SecondaryButton type="button" onClick={() => router.push("/admin/products")}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : isEdit ? (
              "Save changes"
            ) : (
              "Save plan"
            )}
          </PrimaryButton>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AdminCard title="Plan details" className="p-6">
          <div className="grid gap-4">
            <SelectField
              label="Storefront plan (homepage & pricing)"
              options={planOptions}
              value={linkedPlanSlug ?? "plan-3-months"}
              onChange={handlePlanLinkChange}
            />

            <TextField
              label="Plan name (shown on website)"
              placeholder="Starter / بداية"
              autoDirection
              value={watch("name")}
              onChange={(value) => setValue("name", value, { shouldDirty: true, shouldValidate: true })}
              error={errors.name?.message}
            />

            <TextAreaField
              label="Internal description"
              placeholder="Notes for admins only"
              autoDirection
              value={watch("description") ?? ""}
              onChange={(value) => setValue("description", value, { shouldDirty: true })}
              error={errors.description?.message}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Price (MAD)"
                type="number"
                placeholder="80"
                value={String(watch("price") ?? "")}
                onChange={(value) => setValue("price", Number(value) || 0, { shouldDirty: true, shouldValidate: true })}
                error={errors.price?.message}
              />
              <SelectField
                label="Duration"
                options={durationOptions}
                value={watch("duration")}
                onChange={(value) => setValue("duration", value, { shouldDirty: true, shouldValidate: true })}
                error={errors.duration?.message}
              />
              <SelectField
                label="Category"
                options={categoryOptions}
                value={watch("category")}
                onChange={(value) => setValue("category", value, { shouldDirty: true, shouldValidate: true })}
                error={errors.category?.message}
              />
              <SelectField
                label="Status on website"
                options={[
                  { value: "active", label: "Active — visible on site" },
                  { value: "inactive", label: "Hidden — not shown on site" }
                ]}
                value={statusValue}
                onChange={(value) => setValue("isActive", value === "active", { shouldDirty: true })}
                error={errors.isActive?.message}
              />
            </div>
          </div>
        </AdminCard>

        <div className="space-y-6">
          <AdminCard title="Stream settings" className="p-6">
            <div className="grid gap-4">
              <SelectField
                label="Stream quality"
                options={qualityOptions}
                value={watch("quality")}
                onChange={(value) => setValue("quality", value, { shouldDirty: true, shouldValidate: true })}
                error={errors.quality?.message}
              />
              <TextField
                label="Device limit"
                type="number"
                placeholder="1"
                value={String(watch("deviceLimit") ?? "")}
                onChange={(value) =>
                  setValue("deviceLimit", Number(value) || 1, { shouldDirty: true, shouldValidate: true })
                }
                error={errors.deviceLimit?.message}
              />
              <TextField
                label="Visible from"
                type="date"
                value={watch("visibleFrom") ?? ""}
                onChange={(value) => setValue("visibleFrom", value, { shouldDirty: true })}
              />
              <TextField
                label="Visible until"
                type="date"
                value={watch("visibleTo") ?? ""}
                onChange={(value) => setValue("visibleTo", value, { shouldDirty: true })}
              />
            </div>
          </AdminCard>

          <AdminCard title="Media" className="p-6">
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center dark:border-slate-700 dark:bg-slate-800/50">
              <ImageIcon className="mb-3 h-8 w-8 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Plan media</p>
              <p className="mt-1 max-w-xs text-xs text-slate-500">Image uploads coming soon. Price and status save to the live site now.</p>
            </div>
          </AdminCard>
        </div>
      </div>
    </form>
  );
}
