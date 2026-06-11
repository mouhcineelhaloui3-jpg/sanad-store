export function AdminCard({
  title,
  children,
  className = ""
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
      {title ? <h2 className="mb-4 text-lg font-black">{title}</h2> : null}
      {children}
    </section>
  );
}
