"use client";

import { useEffect } from "react";
import { AdminDbUnavailable } from "@/components/admin/AdminDbUnavailable";

export default function AdminError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  const isDb = /DATABASE_URL|database|prisma|connect/i.test(error.message);

  if (isDb) {
    return <AdminDbUnavailable detail={error.message} />;
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
      <h2 className="text-lg font-black text-red-800 dark:text-red-200">Something went wrong</h2>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-xl bg-sand-900 px-4 py-2 text-sm font-bold text-white"
      >
        Try again
      </button>
    </div>
  );
}
