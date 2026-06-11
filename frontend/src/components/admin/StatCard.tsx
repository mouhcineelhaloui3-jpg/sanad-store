import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  change,
  icon: Icon
}: {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span>
        <span className="rounded-2xl bg-sand-100 p-3 text-sand-900">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-5 text-2xl font-black">{value}</p>
      <p className="mt-2 text-sm font-bold text-emerald-600">{change} vs last period</p>
    </div>
  );
}
