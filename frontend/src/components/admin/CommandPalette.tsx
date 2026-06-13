"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Users
} from "lucide-react";
import { adminFetch } from "@/lib/admin/fetch-client";
import { adminNav } from "@/lib/admin/data";

type SearchResponse = {
  results: {
    id: string;
    entityType: string;
    entityId: string;
    title: string;
    subtitle: string | null;
    href: string;
  }[];
};

const QUICK_ACTIONS = [
  { label: "Add product", href: "/admin/products/new", icon: Plus },
  { label: "View CRM", href: "/admin/crm", icon: Users },
  { label: "View orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

const TYPE_ICONS: Record<string, typeof Package> = {
  product: ShoppingBag,
  order: ClipboardList,
  lead: Users,
  route: LayoutDashboard
};

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["admin", "search", query],
    queryFn: () => adminFetch<SearchResponse>(`/api/admin/search?q=${encodeURIComponent(query)}`),
    enabled: query.trim().length > 0
  });

  const navigate = useCallback(
    (href: string) => {
      onClose();
      setQuery("");
      router.push(href);
    },
    [onClose, router]
  );

  const results = data?.results ?? [];
  const routeResults = query.trim()
    ? adminNav.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : adminNav.slice(0, 6);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/50 p-4 pt-[12vh]">
      <button type="button" className="absolute inset-0" aria-label="Close command palette" onClick={onClose} />
      <Command
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        label="Global admin search"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-500" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search routes, products, orders, leads…"
            className="h-14 w-full bg-transparent text-sm outline-none"
            autoFocus
          />
          <kbd className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800">Ctrl K</kbd>
        </div>

        <Command.List className="max-h-[420px] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-8 text-center text-sm text-slate-500">
            {isFetching ? "Searching…" : "No results found."}
          </Command.Empty>

          <Command.Group heading="Quick actions" className="px-2 py-2 text-xs font-black uppercase text-slate-400">
            {QUICK_ACTIONS.map((action) => (
              <Command.Item
                key={action.href}
                value={action.label}
                onSelect={() => navigate(action.href)}
                className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm font-bold aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Command.Item>
            ))}
          </Command.Group>

          {routeResults.length > 0 ? (
            <Command.Group heading="Routes" className="px-2 py-2 text-xs font-black uppercase text-slate-400">
              {routeResults.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`route ${item.label}`}
                  onSelect={() => navigate(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm font-bold aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ) : null}

          {results.length > 0 ? (
            <Command.Group heading="Index" className="px-2 py-2 text-xs font-black uppercase text-slate-400">
              {results.map((result) => {
                const Icon = TYPE_ICONS[result.entityType] ?? Package;
                return (
                  <Command.Item
                    key={result.id}
                    value={`${result.entityType} ${result.title} ${result.subtitle ?? ""}`}
                    onSelect={() => navigate(result.href)}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <div>
                      <p className="font-bold">{result.title}</p>
                      {result.subtitle ? <p className="text-xs text-slate-500">{result.subtitle}</p> : null}
                    </div>
                  </Command.Item>
                );
              })}
            </Command.Group>
          ) : null}
        </Command.List>
      </Command>
    </div>
  );
}
