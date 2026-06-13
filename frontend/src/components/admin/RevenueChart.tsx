type ChartPoint = { label: string; count: number };

export function RevenueChart({ series }: { series: ChartPoint[] }) {
  const max = Math.max(1, ...series.map((item) => item.count));

  return (
    <div className="h-72">
      <div className="flex h-full items-end gap-3">
        {series.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-56 w-full items-end rounded-t-2xl bg-slate-100 p-1 dark:bg-slate-800">
              <span
                className="w-full rounded-t-xl bg-sand-700 transition-all"
                style={{ height: `${Math.max(8, (item.count / max) * 100)}%` }}
                title={`${item.count} views`}
              />
            </div>
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
