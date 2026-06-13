"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ExitIntentModal = dynamic(() => import("./ExitIntentModal").then((m) => m.ExitIntentModal), { ssr: false });

export function CroEffects() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return <ExitIntentModal />;
}
