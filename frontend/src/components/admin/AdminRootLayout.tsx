"use client";

import { usePathname } from "next/navigation";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export function AdminLayoutGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}

export function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminLayoutGate>{children}</AdminLayoutGate>
    </AdminProviders>
  );
}
