export function AdminPageHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
