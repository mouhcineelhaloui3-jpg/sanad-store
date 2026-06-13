"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnalyticsTracker = dynamic(
  () => import("@/components/analytics/AnalyticsTracker").then((m) => ({ default: m.AnalyticsTracker })),
  { ssr: false }
);

const ErrorReporter = dynamic(
  () => import("@/components/analytics/ErrorReporter").then((m) => ({ default: m.ErrorReporter })),
  { ssr: false }
);

export function DeferredAnalytics() {
  return (
    <>
      <ErrorReporter />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
