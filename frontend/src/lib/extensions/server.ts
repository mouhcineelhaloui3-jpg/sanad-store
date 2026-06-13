import {
  bootstrapExtensions,
  getExtensionRegistry,
  matchRoute,
  type HttpMethod
} from "@sanad/core";
import { allExtensions } from "@sanad/extensions";
import type { ApiContext } from "@sanad/core";

let ready: Promise<void> | null = null;

export async function ensureExtensionsLoaded() {
  if (!ready) {
    ready = bootstrapExtensions(allExtensions).then(() => undefined);
  }
  await ready;
}

export async function dispatchExtensionApi(method: HttpMethod, pathname: string, ctx: Omit<ApiContext, "params"> & { params?: Record<string, string> }) {
  await ensureExtensionsLoaded();
  const route = matchRoute(method, pathname);
  if (!route) return null;
  return route.handler({
    params: { ...route.params, ...(ctx.params ?? {}) },
    query: ctx.query ?? {},
    body: ctx.body,
    userId: ctx.userId,
    userRole: ctx.userRole
  });
}

export async function getExtensionNavItems() {
  await ensureExtensionsLoaded();
  return getExtensionRegistry().navItems;
}

export async function getLoadedExtensions() {
  await ensureExtensionsLoaded();
  return [...getExtensionRegistry().extensions.values()];
}
