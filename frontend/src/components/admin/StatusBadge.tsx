import type { AdminStatus } from "@/lib/admin/data";

const statusClasses: Record<string, string> = {
  new: "bg-slate-100 text-slate-700",
  contacted: "bg-blue-100 text-blue-700",
  interested: "bg-cyan-100 text-cyan-700",
  negotiation: "bg-indigo-100 text-indigo-700",
  paid: "bg-emerald-100 text-emerald-700",
  delivered: "bg-emerald-100 text-emerald-700",
  renewal_due: "bg-amber-100 text-amber-700",
  expired: "bg-red-100 text-red-700",
  lost: "bg-red-100 text-red-700",
  active: "bg-emerald-100 text-emerald-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  inactive: "bg-slate-100 text-slate-600",
  pending: "bg-amber-100 text-amber-700",
  low: "bg-red-100 text-red-700",
  failed: "bg-red-100 text-red-700",
  approved: "bg-emerald-100 text-emerald-700"
};

export function StatusBadge({ status }: { status: AdminStatus | string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${statusClasses[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
