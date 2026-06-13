"use client";

import dynamic from "next/dynamic";

const ExitIntentModal = dynamic(() => import("./ExitIntentModal").then((m) => m.ExitIntentModal), { ssr: false });
const LiveVisitorCounter = dynamic(() => import("./LiveVisitorCounter").then((m) => m.LiveVisitorCounter), { ssr: false });
const UrgencyBanner = dynamic(() => import("./UrgencyBanner").then((m) => m.UrgencyBanner), { ssr: false });

export function CroEffects() {
  return (
    <>
      <UrgencyBanner />
      <LiveVisitorCounter />
      <ExitIntentModal />
    </>
  );
}
