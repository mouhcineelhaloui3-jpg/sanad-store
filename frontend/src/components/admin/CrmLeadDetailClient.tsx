"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Tag, UserCircle } from "lucide-react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminListStates } from "@/components/admin/AdminListStates";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PrimaryButton, SelectField, TextAreaField, TextField } from "@/components/admin/AdminForm";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { adminFetch } from "@/lib/admin/fetch-client";
import { LEAD_PIPELINE } from "@/lib/crm/constants";
import type { LeadDetail } from "@/lib/crm/types";

type Agent = { id: string; name: string; email: string };

type LeadResponse = { lead: LeadDetail; agents: Agent[] };

export function CrmLeadDetailClient({ leadId }: { leadId: string }) {
  const queryClient = useQueryClient();
  const [note, setNote] = useState("");
  const [tagName, setTagName] = useState("");
  const [status, setStatus] = useState("");
  const [assignedToId, setAssignedToId] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin", "crm", "lead", leadId],
    queryFn: () => adminFetch<LeadResponse>(`/api/admin/leads/${leadId}`)
  });

  const lead = data?.lead;
  const agents = data?.agents ?? [];

  const saveMutation = useMutation({
    mutationFn: () =>
      adminFetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: status || lead?.status,
          assignedToId: assignedToId === "" ? null : assignedToId || lead?.assignedToId
        })
      }),
    onSuccess: () => {
      toast.success("Lead updated");
      queryClient.invalidateQueries({ queryKey: ["admin", "crm", "lead", leadId] });
      refetch();
    },
    onError: () => toast.error("Failed to update lead")
  });

  const noteMutation = useMutation({
    mutationFn: () =>
      adminFetch(`/api/admin/leads/${leadId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: note })
      }),
    onSuccess: () => {
      toast.success("Note added");
      setNote("");
      refetch();
    },
    onError: () => toast.error("Failed to add note")
  });

  const tagMutation = useMutation({
    mutationFn: () =>
      adminFetch(`/api/admin/leads/${leadId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagName })
      }),
    onSuccess: () => {
      toast.success("Tag added");
      setTagName("");
      refetch();
    },
    onError: () => toast.error("Failed to add tag")
  });

  if (isLoading) return <p className="text-sm text-slate-500">Loading lead…</p>;

  if (isError || !lead) {
    return (
      <AdminListStates
        isLoading={false}
        isError
        isEmpty={false}
        emptyTitle=""
        emptyDescription=""
        icon={UserCircle}
        onRetry={() => refetch()}
      >
        <span />
      </AdminListStates>
    );
  }

  return (
    <>
      <AdminPageHeader
        title={lead.name}
        description={`${lead.phone} · ${lead.planSlug ?? "No plan"}`}
        action={
          <Link href="/admin/crm" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold dark:border-slate-700">
            <ArrowLeft className="h-4 w-4" />
            Back to CRM
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <AdminCard title="Lead profile">
            <div className="grid gap-4 sm:grid-cols-2">
              <Info label="Status" value={<StatusBadge status={lead.status} />} />
              <Info label="Source" value={lead.source ?? "—"} />
              <Info label="Device" value={lead.device ?? "—"} />
              <Info label="Campaign" value={lead.utmCampaign ?? "—"} />
              <Info label="UTM Source" value={lead.utmSource ?? "—"} />
              <Info label="UTM Medium" value={lead.utmMedium ?? "—"} />
              <Info label="WhatsApp click" value={lead.whatsappClickedAt ? new Date(lead.whatsappClickedAt).toLocaleString("ar-MA") : "—"} />
              <Info label="Converted" value={lead.convertedAt ? new Date(lead.convertedAt).toLocaleString("ar-MA") : "—"} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {lead.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black text-white"
                  style={{ backgroundColor: tag.color }}
                >
                  <Tag className="h-3 w-3" />
                  {tag.name}
                </span>
              ))}
            </div>
          </AdminCard>

          <AdminCard title="Timeline">
            {lead.timeline.length === 0 ? (
              <p className="text-sm text-slate-500">No timeline events yet.</p>
            ) : (
              <div className="space-y-3">
                {lead.timeline.map((event) => (
                  <div key={event.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="font-bold">{event.title}</p>
                    <p className="text-xs text-slate-500">
                      {event.actorName ?? "System"} · {new Date(event.createdAt).toLocaleString("ar-MA")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        </div>

        <div className="space-y-6">
          <AdminCard title="Update lead">
            <div className="space-y-4">
              <SelectField
                label="Pipeline status"
                options={[...LEAD_PIPELINE]}
                value={status || lead.status}
                onChange={setStatus}
              />
              <label className="block">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Assigned agent</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sand-700 dark:border-slate-800 dark:bg-slate-950"
                  value={assignedToId || lead.assignedToId || ""}
                  onChange={(e) => setAssignedToId(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </label>
              <PrimaryButton onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                Save changes
              </PrimaryButton>
            </div>
          </AdminCard>

          <AdminCard title="Internal notes">
            <TextAreaField label="Add note" placeholder="Call summary, negotiation details…" value={note} onChange={setNote} />
            <div className="mt-3">
              <PrimaryButton onClick={() => noteMutation.mutate()} disabled={!note.trim() || noteMutation.isPending}>
                Add note
              </PrimaryButton>
            </div>
            <div className="mt-4 space-y-3">
              {lead.notes.map((n) => (
                <div key={n.id} className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
                  <p>{n.body}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {n.authorName ?? "System"} · {new Date(n.createdAt).toLocaleString("ar-MA")}
                  </p>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard title="Tags">
            <div className="flex gap-2">
              <TextField label="Tag name" placeholder="hot-lead" value={tagName} onChange={setTagName} />
            </div>
            <div className="mt-3">
              <PrimaryButton onClick={() => tagMutation.mutate()} disabled={!tagName.trim() || tagMutation.isPending}>
                Add tag
              </PrimaryButton>
            </div>
          </AdminCard>
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <div className="mt-1 font-black">{value}</div>
    </div>
  );
}
