import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export function AdminDbUnavailable({ detail }: { detail?: string }) {
  return (
    <>
      <AdminPageHeader
        title="Database Not Connected"
        description="The admin dashboard requires PostgreSQL. Configure DATABASE_URL on Vercel to enable live metrics."
      />
      <AdminCard title="Setup Required">
        <ol className="list-decimal space-y-2 ps-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Add a PostgreSQL database (Neon, Supabase, or Vercel Postgres).</li>
          <li>Set <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">DATABASE_URL</code> in Vercel project settings.</li>
          <li>Run <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">npx prisma migrate deploy</code> and seed if needed.</li>
          <li>Redeploy the application.</li>
        </ol>
        {detail ? (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-mono text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {detail}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/storefront" className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white">
            CMS (no DB required)
          </Link>
          <Link href="/" className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold dark:border-slate-700">
            View storefront
          </Link>
        </div>
      </AdminCard>
    </>
  );
}
