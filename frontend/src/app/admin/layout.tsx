import type { Metadata } from "next";
import { AdminRootLayout } from "@/components/admin/AdminRootLayout";

export const metadata: Metadata = {
  title: "SANAD Admin Dashboard",
  description: "Production-ready SaaS admin dashboard",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
