"use client";

import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminSkeleton } from "@/components/admin/AdminSkeleton";
import type { LucideIcon } from "lucide-react";

export function AdminListStates({
  isLoading,
  isError,
  isEmpty,
  emptyTitle,
  emptyDescription,
  icon,
  onRetry,
  children
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
  onRetry?: () => void;
  children: React.ReactNode;
}) {
  if (isLoading) return <AdminSkeleton rows={6} />;
  if (isError) {
    return (
      <AdminEmptyState
        title="Failed to load data"
        description="Check your database connection and try again."
        icon={icon}
        action={
          onRetry ? (
            <button type="button" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white" onClick={onRetry}>
              Retry
            </button>
          ) : undefined
        }
      />
    );
  }
  if (isEmpty) {
    return <AdminEmptyState title={emptyTitle} description={emptyDescription} icon={icon} />;
  }
  return children;
}

export function AdminPagination({
  page,
  totalPages,
  onPageChange
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <button
        type="button"
        disabled={page <= 1}
        className="rounded-xl border border-slate-200 px-4 py-2 font-bold disabled:opacity-40 dark:border-slate-700"
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="text-slate-500">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        className="rounded-xl border border-slate-200 px-4 py-2 font-bold disabled:opacity-40 dark:border-slate-700"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
