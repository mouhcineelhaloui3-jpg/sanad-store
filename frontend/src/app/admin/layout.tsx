import type { Metadata } from "next";
import { AdminRootLayout } from "@/components/admin/AdminRootLayout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SANAD Admin Dashboard",
  description: "Production-ready SaaS admin dashboard",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.theme='dark';document.documentElement.dataset.admin='true';document.documentElement.style.colorScheme='dark';`
        }}
      />
      <AdminRootLayout>{children}</AdminRootLayout>
    </>
  );
}
