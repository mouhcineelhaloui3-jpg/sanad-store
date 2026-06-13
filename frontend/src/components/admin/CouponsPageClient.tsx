"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Ticket } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { PrimaryButton, SelectField, TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Coupon = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  expiresAt: string | null;
  usageLimit: number;
  usageCount: number;
  status: string;
};

type PaginatedCoupons = {
  items: Coupon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const emptyForm = {
  code: "",
  type: "percentage",
  value: "",
  expiresAt: "",
  usageLimit: "100",
  status: "active"
};

export function CouponsPageClient() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: () => adminFetch<PaginatedCoupons>("/api/admin/coupons?limit=100"),
    retry: 2
  });

  const createMutation = useMutation({
    mutationFn: () =>
      adminFetch<Coupon>("/api/admin/coupons", {
        method: "POST",
        body: JSON.stringify({
          code: form.code.trim(),
          type: form.type,
          value: Number(form.value),
          expiresAt: form.expiresAt || null,
          usageLimit: Number(form.usageLimit) || 100,
          status: form.status
        })
      }),
    onSuccess: () => {
      toast.success("Coupon created");
      setForm(emptyForm);
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: () => toast.error("Failed to create coupon")
  });

  const bulkDeactivateMutation = useMutation({
    mutationFn: (ids: string[]) =>
      adminFetch<void>("/api/admin/coupons/bulk", {
        method: "POST",
        body: JSON.stringify({ ids, action: "deactivate" })
      }),
    onSuccess: () => {
      toast.success("Coupons deactivated");
      setSelected(new Set());
      queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
    },
    onError: () => toast.error("Failed to deactivate coupons")
  });

  const coupons = data?.items ?? [];
  const isEmpty = !isLoading && !isError && coupons.length === 0;
  const allSelected = coupons.length > 0 && selected.size === coupons.length;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(coupons.map((c) => c.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <AdminPageHeader title="Coupons & Discounts" description="Create coupons, expiration dates, usage limits, and discount rules." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title="Create Coupon">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Coupon code" placeholder="SANAD10" value={form.code} onChange={(v) => setForm((f) => ({ ...f, code: v }))} />
            <SelectField label="Discount type" options={["percentage", "fixed"]} value={form.type} onChange={(v) => setForm((f) => ({ ...f, type: v }))} />
            <TextField label="Value" placeholder="10" type="number" value={form.value} onChange={(v) => setForm((f) => ({ ...f, value: v }))} />
            <TextField label="Expiration date" type="date" value={form.expiresAt} onChange={(v) => setForm((f) => ({ ...f, expiresAt: v }))} />
            <TextField label="Usage limit" placeholder="200" type="number" value={form.usageLimit} onChange={(v) => setForm((f) => ({ ...f, usageLimit: v }))} />
            <SelectField label="Status" options={["active", "inactive"]} value={form.status} onChange={(v) => setForm((f) => ({ ...f, status: v }))} />
          </div>
          <div className="mt-5">
            <PrimaryButton disabled={!form.code.trim() || !form.value || createMutation.isPending} onClick={() => createMutation.mutate()}>
              Create coupon
            </PrimaryButton>
          </div>
        </AdminCard>
        <AdminCard title="Active Coupons">
          {selected.size > 0 ? (
            <div className="mb-4">
              <PrimaryButton disabled={bulkDeactivateMutation.isPending} onClick={() => bulkDeactivateMutation.mutate([...selected])}>
                Deactivate selected ({selected.size})
              </PrimaryButton>
            </div>
          ) : null}
          <AdminListStates
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            emptyTitle="No coupons yet"
            emptyDescription="Create discount codes to offer promotions to customers."
            icon={Ticket}
            onRetry={() => refetch()}
          >
            {coupons.length > 0 ? (
              <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-600">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                Select all
              </label>
            ) : null}
            <AdminTable
              rows={coupons}
              columns={[
                {
                  header: "",
                  cell: (row) => (
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} aria-label={`Select ${row.code}`} />
                  )
                },
                { header: "Code", cell: (row) => <span className="font-black">{row.code}</span> },
                { header: "Type", cell: (row) => row.type },
                { header: "Value", cell: (row) => (row.type === "percentage" ? `${row.value}%` : `${row.value} د.م.`) },
                {
                  header: "Expires",
                  cell: (row) => (row.expiresAt ? new Date(row.expiresAt).toLocaleDateString("ar-MA") : "—")
                },
                { header: "Usage", cell: (row) => `${row.usageCount}/${row.usageLimit}` },
                { header: "Status", cell: (row) => <StatusBadge status={row.status} /> }
              ]}
            />
          </AdminListStates>
        </AdminCard>
      </div>
    </>
  );
}
