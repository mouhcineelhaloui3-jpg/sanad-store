"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { PrimaryButton } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Review = {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  text: string;
  status: string;
  createdAt: string;
};

type PaginatedReviews = {
  items: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function ReviewsPageClient() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "reviews"],
    queryFn: () => adminFetch<PaginatedReviews>("/api/admin/reviews?limit=100"),
    retry: 2
  });

  const bulkMutation = useMutation({
    mutationFn: (payload: { ids: string[]; action: "approve" | "reject" | "delete" }) =>
      adminFetch<void>("/api/admin/reviews/bulk", {
        method: "POST",
        body: JSON.stringify(payload)
      }),
    onSuccess: () => {
      toast.success("Reviews updated");
      setSelected(new Set());
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
    onError: () => toast.error("Failed to update reviews")
  });

  const reviews = data?.items ?? [];
  const isEmpty = !isLoading && !isError && reviews.length === 0;
  const selectedIds = [...selected];
  const allSelected = reviews.length > 0 && selected.size === reviews.length;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(reviews.map((r) => r.id)));
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
      <AdminPageHeader title="Reviews Management" description="View, approve, reject, and delete product reviews." />
      <AdminCard>
        {selectedIds.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2">
            <PrimaryButton disabled={bulkMutation.isPending} onClick={() => bulkMutation.mutate({ ids: selectedIds, action: "approve" })}>
              Approve selected
            </PrimaryButton>
            <PrimaryButton disabled={bulkMutation.isPending} onClick={() => bulkMutation.mutate({ ids: selectedIds, action: "reject" })}>
              Reject selected
            </PrimaryButton>
            <PrimaryButton
              disabled={bulkMutation.isPending}
              onClick={() => {
                if (confirm(`Delete ${selectedIds.length} review(s)?`)) bulkMutation.mutate({ ids: selectedIds, action: "delete" });
              }}
            >
              Delete selected
            </PrimaryButton>
          </div>
        ) : null}
        <AdminListStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          emptyTitle="No reviews yet"
          emptyDescription="Customer reviews will appear here for moderation."
          icon={Star}
          onRetry={() => refetch()}
        >
          {reviews.length > 0 ? (
            <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-600">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              Select all
            </label>
          ) : null}
          <AdminTable
            rows={reviews}
            columns={[
              {
                header: "",
                cell: (row) => (
                  <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} aria-label={`Select review by ${row.customerName}`} />
                )
              },
              {
                header: "Review",
                cell: (row) => (
                  <div>
                    <p className="font-bold">{row.customerName}</p>
                    <p className="max-w-md text-slate-500">{row.text}</p>
                  </div>
                )
              },
              { header: "Product", cell: (row) => row.productName },
              { header: "Rating", cell: (row) => "★".repeat(row.rating) },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              {
                header: "Actions",
                cell: (row) => (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="font-bold text-emerald-600"
                      disabled={bulkMutation.isPending}
                      onClick={() => bulkMutation.mutate({ ids: [row.id], action: "approve" })}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="font-bold text-amber-600"
                      disabled={bulkMutation.isPending}
                      onClick={() => bulkMutation.mutate({ ids: [row.id], action: "reject" })}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="font-bold text-red-600"
                      disabled={bulkMutation.isPending}
                      onClick={() => {
                        if (confirm("Delete this review?")) bulkMutation.mutate({ ids: [row.id], action: "delete" });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )
              }
            ]}
          />
        </AdminListStates>
      </AdminCard>
    </>
  );
}
