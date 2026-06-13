export function AdminSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
  );
}

export function AdminPageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 w-64 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
      <div className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
