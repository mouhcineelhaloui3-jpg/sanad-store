type ChartPoint = {
  label: string;
  count: number;
};

export function AnalyticsTrendChart({ series }: { series: ChartPoint[] }) {
  const max = Math.max(...series.map((item) => item.count), 1);

  return (
    <div className="h-72">
      <div className="flex h-full items-end gap-3">
        {series.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-56 w-full items-end rounded-t-2xl bg-slate-100 p-1 dark:bg-slate-800">
              <span
                className="w-full rounded-t-xl bg-sand-900 transition-all"
                style={{ height: `${Math.max(8, (item.count / max) * 100)}%` }}
                title={`${item.count} views`}
              />
            </div>
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
