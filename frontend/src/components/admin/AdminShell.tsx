"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LockKeyhole, LogOut, Menu, MessageSquare, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { adminNav, notifications } from "@/lib/admin/data";

const ADMIN_ACCESS_CODE = "M2o3u1h1@";
const ADMIN_ACCESS_STORAGE_KEY = "sanad-admin-access";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    setHasAccess(window.localStorage.getItem(ADMIN_ACCESS_STORAGE_KEY) === "granted");
    setAccessChecked(true);
  }, []);

  function submitAccess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code === ADMIN_ACCESS_CODE) {
      window.localStorage.setItem(ADMIN_ACCESS_STORAGE_KEY, "granted");
      setHasAccess(true);
      setError("");
      return;
    }
    setError("Code incorrect");
  }

  function logout() {
    window.localStorage.removeItem(ADMIN_ACCESS_STORAGE_KEY);
    setHasAccess(false);
    setCode("");
  }

  if (!accessChecked) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white" dir="ltr">
        <form
          onSubmit={submitAccess}
          className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-900">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-center text-2xl font-black">Admin Access</h1>
          <p className="mt-2 text-center text-sm text-white/60">Enter admin code</p>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            type="password"
            autoFocus
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-center font-latin text-slate-950 outline-none focus:border-sand-500"
            placeholder="••••••••"
          />
          {error ? <p className="mt-3 text-center text-sm font-bold text-red-300">{error}</p> : null}
          <button className="mt-5 w-full rounded-2xl bg-sand-900 px-5 py-3 font-black text-white" type="submit">
            Enter Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white" dir="ltr">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sand-900 font-black text-white">N</span>
            <span>
              <span className="block text-lg font-black">SANAD Admin</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Commerce OS</span>
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {adminNav.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-sand-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2 text-slate-500 dark:bg-slate-900 md:flex">
              <Search className="h-4 w-4" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                placeholder="Search orders, products, customers..."
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900"
                onClick={() => setDark((value) => !value)}
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="relative rounded-2xl bg-slate-100 p-3 dark:bg-slate-900" aria-label="Messages">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="relative rounded-2xl bg-slate-100 p-3 dark:bg-slate-900" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <button
                className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-900"
                onClick={logout}
                aria-label="Logout"
                type="button"
              >
                <LogOut className="h-5 w-5" />
              </button>
              <div className="hidden items-center gap-3 rounded-2xl bg-slate-100 px-3 py-2 dark:bg-slate-900 sm:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sand-900 text-sm font-black text-white">AD</span>
                <span>
                  <span className="block text-sm font-black">Admin</span>
                  <span className="block text-xs text-slate-500">Super Admin</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>

        {notifications.length > 0 ? (
          <div className="fixed bottom-4 right-4 hidden w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:block">
            <p className="text-sm font-black">Live notifications</p>
            <div className="mt-3 space-y-3">
              {notifications.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                  <Icon className="h-5 w-5 text-sand-700" />
                  <div>
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
