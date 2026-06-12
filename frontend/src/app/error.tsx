"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void fetch("/api/report-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "react-error-boundary",
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href
      })
    });
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-black text-sage-700">خطأ</p>
      <h1 className="mt-3 text-3xl font-black text-sand-950">وقع مشكل فالصفحة</h1>
      <p className="mt-4 leading-8 text-sand-700">
        عفاك جرّب مرة أخرى. إلا بقا المشكل، تواصل معنا على واتساب.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          جرّب مرة أخرى
        </button>
        <Link href="/" className="btn-secondary">
          الرئيسية
        </Link>
      </div>
    </div>
  );
}
