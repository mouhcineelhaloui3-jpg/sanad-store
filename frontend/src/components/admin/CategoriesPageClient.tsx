"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { FolderTree } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { PrimaryButton, TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
};

type PaginatedCategories = {
  items: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const emptyForm = { name: "", slug: "", description: "" };

export function CategoriesPageClient() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => adminFetch<PaginatedCategories>("/api/admin/categories?limit=100"),
    retry: 2
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || undefined,
        description: form.description.trim() || undefined
      };
      if (editingId) {
        return adminFetch<Category>(`/api/admin/categories/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      }
      return adminFetch<Category>("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify(payload)
      });
    },
    onSuccess: () => {
      toast.success(editingId ? "Category updated" : "Category created");
      setForm(emptyForm);
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
    onError: () => toast.error("Failed to save category")
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      adminFetch<void>(`/api/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Category deleted");
      if (editingId) {
        setEditingId(null);
        setForm(emptyForm);
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
    onError: () => toast.error("Failed to delete category")
  });

  const categories = data?.items ?? [];
  const isEmpty = !isLoading && !isError && categories.length === 0;

  function startEdit(category: Category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? ""
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <>
      <AdminPageHeader title="Categories Management" description="Create, edit, and delete product categories." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <AdminCard title={editingId ? "Edit Category" : "Create Category"}>
          <div className="space-y-4">
            <TextField label="Category name" placeholder="Body Comfort" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
            <TextField label="Slug" placeholder="body-comfort" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} />
            <TextField label="Description" placeholder="Optional description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
            <div className="flex gap-3">
              <PrimaryButton disabled={!form.name.trim() || saveMutation.isPending} onClick={() => saveMutation.mutate()}>
                {editingId ? "Update category" : "Create category"}
              </PrimaryButton>
              {editingId ? (
                <button type="button" className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black dark:border-slate-700" onClick={cancelEdit}>
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </AdminCard>
        <AdminCard title="All Categories">
          <AdminListStates
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            emptyTitle="No categories yet"
            emptyDescription="Create your first product category to organize the catalog."
            icon={FolderTree}
            onRetry={() => refetch()}
          >
            <AdminTable
              rows={categories}
              columns={[
                { header: "Name", cell: (row) => <span className="font-black">{row.name}</span> },
                { header: "Slug", cell: (row) => row.slug },
                { header: "Products", cell: (row) => row.productCount },
                { header: "Status", cell: (row) => <StatusBadge status={row.isActive ? "active" : "pending"} /> },
                {
                  header: "Actions",
                  cell: (row) => (
                    <div className="flex gap-2">
                      <button type="button" className="font-bold text-sand-700 dark:text-cyan-400" onClick={() => startEdit(row)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-bold text-red-600"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (confirm(`Delete category "${row.name}"?`)) deleteMutation.mutate(row.id);
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
      </div>
    </>
  );
}
