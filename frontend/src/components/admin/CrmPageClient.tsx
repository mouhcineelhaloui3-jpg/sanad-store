"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Kanban, Users } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates, AdminPagination } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { SelectField, TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";
import type { LeadListItem } from "@/lib/crm/types";
import { LEAD_PIPELINE } from "@/lib/crm/constants";

type PaginatedLeads = {
  items: LeadListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function CrmPageClient() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const query = useQuery({
    queryKey: ["admin", "crm", "leads", page, search, status],
    queryFn: () => {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      return adminFetch<PaginatedLeads>(`/api/admin/leads?${params}`);
    }
  });

  return (
    <>
      <AdminPageHeader
        title="WhatsApp CRM"
        description="Lead pipeline — search, filter, and manage WhatsApp subscription leads."
      />

      <AdminCard>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_200px]">
          <TextField label="Search" placeholder="Name, phone, campaign…" value={searchInput} onChange={setSearchInput} />
          <SelectField
            label="Status"
            options={["", ...LEAD_PIPELINE]}
            value={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          />
        </div>

        <AdminListStates
          isLoading={query.isLoading}
          isError={query.isError}
          isEmpty={!query.data?.items.length}
          emptyTitle="No leads yet"
          emptyDescription="Leads appear when customers submit the order form or click WhatsApp."
          icon={Users}
          onRetry={() => query.refetch()}
        >
          <AdminTable
            rows={query.data?.items ?? []}
            columns={[
              {
                header: "Lead",
                cell: (row) => (
                  <Link href={`/admin/crm/${row.id}`} className="font-black text-cyan-700 dark:text-cyan-400">
                    {row.name}
                  </Link>
                )
              },
              { header: "Phone", cell: (row) => row.phone },
              { header: "Plan", cell: (row) => row.planSlug ?? "—" },
              { header: "Source", cell: (row) => row.source ?? "—" },
              { header: "Campaign", cell: (row) => row.utmCampaign ?? "—" },
              { header: "Agent", cell: (row) => row.assignedToName ?? "Unassigned" },
              { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
              {
                header: "Created",
                cell: (row) => new Date(row.createdAt).toLocaleString("ar-MA")
              }
            ]}
          />
          {query.data ? (
            <AdminPagination page={query.data.page} totalPages={query.data.totalPages} onPageChange={setPage} />
          ) : null}
        </AdminListStates>
      </AdminCard>

      <div className="mt-4 flex flex-wrap gap-2">
        {LEAD_PIPELINE.map((stage) => (
          <span
            key={stage}
            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800"
          >
            <Kanban className="h-3 w-3" />
            {stage.replace("_", " ")}
          </span>
        ))}
      </div>
    </>
  );
}
