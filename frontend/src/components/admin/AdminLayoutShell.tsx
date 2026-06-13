"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, AdminTopbar } from "@/components/admin/AdminShell";
import { AdminPageSkeleton } from "@/components/admin/AdminSkeleton";
import { CommandPalette } from "@/components/admin/CommandPalette";
import { useAdminSession } from "@/lib/admin/queries";
import { adminFetch } from "@/lib/admin/fetch-client";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = useAdminSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  async function logout() {
    try {
      await adminFetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/admin/login");
    router.refresh();
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
        <AdminPageSkeleton />
      </div>
    );
  }

  if (!data.authenticated || !data.user) {
    router.replace("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white" dir="ltr">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} role={data.user.role} />

      <div className="lg:pl-72">
        <AdminTopbar
          user={data.user}
          dark={dark}
          onToggleTheme={() => setDark((value) => !value)}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenSearch={() => setCommandOpen(true)}
          onLogout={logout}
        />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {commandOpen ? <CommandPalette onClose={() => setCommandOpen(false)} /> : null}
    </div>
  );
}
