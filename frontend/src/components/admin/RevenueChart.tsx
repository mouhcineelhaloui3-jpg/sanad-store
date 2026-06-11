import { salesSeries } from "@/lib/admin/data";

export function RevenueChart() {
  return (
    <div className="h-72">
      <div className="flex h-full items-end gap-3">
        {salesSeries.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-56 w-full items-end gap-1 rounded-t-2xl bg-slate-100 p-1 dark:bg-slate-800">
              <span className="w-1/3 rounded-t-xl bg-sand-500" style={{ height: `${item.daily}%` }} title="Daily" />
              <span className="w-1/3 rounded-t-xl bg-sage-700" style={{ height: `${item.weekly}%` }} title="Weekly" />
              <span className="w-1/3 rounded-t-xl bg-sand-900" style={{ height: `${item.monthly}%` }} title="Monthly" />
            </div>
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
