"use client";

import dynamic from "next/dynamic";

const OrderModal = dynamic(
  () => import("@/components/iptv/OrderModal").then((m) => m.OrderModal),
  { ssr: false }
);
const TrialModal = dynamic(
  () => import("@/components/iptv/TrialModal").then((m) => m.TrialModal),
  { ssr: false }
);

export function LazySiteModals() {
  return (
    <>
      <OrderModal />
      <TrialModal />
    </>
  );
}
