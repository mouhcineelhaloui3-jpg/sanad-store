"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, LayoutDashboard, Menu, Moon, Search, Settings, Sun } from "lucide-react";
import { hasPermission, type AdminRole } from "@/lib/admin/rbac";
import { adminNav } from "@/lib/admin/data";
import type { AdminSessionUser } from "@/lib/admin/queries";

const LOGO_SRC = "/logo/sanad-iptv-logo.png";

export function AdminSidebar({
  open,
  onClose,
  role
}: {
  open: boolean;
  onClose: () => void;
  role: AdminRole;
}) {
  const pathname = usePathname();
  const coreNav = adminNav.filter(
    (item) => item.section === "core" && (!item.permission || hasPermission(role, item.permission))
  );

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-slate-200 px-5 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <Image src={LOGO_SRC} alt="SANAD IPTV" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" />
            <span>
              <span className="block text-lg font-black">SANAD Admin</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Dashboard</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="px-3 pb-2 text-xs font-black uppercase tracking-wider text-slate-400">Workspace</p>
          {coreNav.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
            <Image src={LOGO_SRC} alt="SANAD" width={32} height={32} className="h-8 w-8 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-black">SANAD IPTV</p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function AdminTopbar({
  user,
  dark,
  onToggleTheme,
  onOpenSidebar,
  onLogout
}: {
  user: AdminSessionUser;
  dark: boolean;
  onToggleTheme: () => void;
  onOpenSidebar: () => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button className="rounded-2xl p-2 lg:hidden" type="button" onClick={onOpenSidebar} aria-label="Open sidebar">
          <Menu className="h-6 w-6" />
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <LayoutDashboard className="h-5 w-5 text-slate-500" />
          <span className="text-sm font-black">Dashboard</span>
        </div>

        <div className="hidden flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2 text-slate-500 dark:bg-slate-900 md:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            placeholder="Search dashboard, CMS, settings..."
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button type="button" className="relative rounded-2xl bg-slate-100 p-3 dark:bg-slate-900" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="group relative">
            <button type="button" className="flex items-center gap-3 rounded-2xl bg-slate-100 px-3 py-2 dark:bg-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white dark:bg-cyan-500 dark:text-slate-950">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-black">{user.name}</span>
                <span className="block text-xs text-slate-500">{user.roleLabel}</span>
              </span>
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:border-slate-700 dark:bg-slate-900">
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
