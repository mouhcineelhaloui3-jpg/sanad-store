import type { AdminApp, AdminNavItem, ApiHandler, CronJob, HttpMethod } from "../types/admin-app";
import type { Extension, ExtensionState } from "../types/extension";
import { dataPath, readJsonStore, writeJsonStore } from "../storage/json-store";

export type RegisteredRoute = {
  method: HttpMethod;
  path: string;
  handler: ApiHandler;
  extension: string;
};

const STATE_FILE = () => dataPath("extension-state.json");

class ExtensionRegistry implements AdminApp {
  routes: RegisteredRoute[] = [];
  navItems: AdminNavItem[] = [];
  cronJobs: CronJob[] = [];
  permissions = new Set<string>();
  extensions = new Map<string, Extension>();

  registerRoute(method: HttpMethod, path: string, handler: ApiHandler): void {
    this.routes.push({ method, path, handler, extension: "unknown" });
  }

  registerNav(item: AdminNavItem): void {
    this.navItems.push(item);
  }

  registerCron(job: CronJob): void {
    this.cronJobs.push(job);
  }

  registerPermission(permission: string): void {
    this.permissions.add(permission);
  }

  attachExtension(extension: Extension) {
    this.extensions.set(extension.name, extension);
    if (!extension.enabled) return;

    const routeStart = this.routes.length;
    extension.register(this);
    for (let i = routeStart; i < this.routes.length; i += 1) {
      this.routes[i]!.extension = extension.name;
    }
  }
}

const registry = new ExtensionRegistry();

export async function loadExtensionState(): Promise<ExtensionState[]> {
  return readJsonStore<ExtensionState[]>(STATE_FILE(), []);
}

export async function saveExtensionState(states: ExtensionState[]): Promise<void> {
  await writeJsonStore(STATE_FILE(), states);
}

export async function bootstrapExtensions(extensions: Extension[]): Promise<ExtensionRegistry> {
  const states = await loadExtensionState();
  const stateMap = new Map(states.map((s) => [s.name, s]));

  for (const ext of extensions) {
    const saved = stateMap.get(ext.name);
    ext.enabled = saved?.enabled ?? ext.enabled;
    registry.attachExtension(ext);
  }

  return registry;
}

export function getExtensionRegistry() {
  return registry;
}

export async function setExtensionEnabled(name: string, enabled: boolean, extensions: Extension[]) {
  const states = await loadExtensionState();
  const now = new Date().toISOString();
  const idx = states.findIndex((s) => s.name === name);
  if (idx >= 0) {
    states[idx]!.enabled = enabled;
    states[idx]!.updatedAt = now;
  } else {
    states.push({ name, enabled, installedAt: now, updatedAt: now });
  }
  await saveExtensionState(states);

  const ext = extensions.find((e) => e.name === name);
  if (ext) {
    if (enabled) await ext.hooks?.onEnable?.();
    else await ext.hooks?.onDisable?.();
  }
}

export async function installExtension(name: string, extensions: Extension[]) {
  const states = await loadExtensionState();
  const now = new Date().toISOString();
  if (!states.some((s) => s.name === name)) {
    states.push({ name, enabled: true, installedAt: now, updatedAt: now });
    await saveExtensionState(states);
  }
  const ext = extensions.find((e) => e.name === name);
  await ext?.hooks?.onInstall?.();
}

export function matchRoute(method: HttpMethod, pathname: string) {
  for (const route of registry.routes) {
    if (route.method !== method) continue;
    const patternParts = route.path.split("/");
    const pathParts = pathname.split("/");
    if (patternParts.length !== pathParts.length) continue;
    const params: Record<string, string> = {};
    let matched = true;
    for (let i = 0; i < patternParts.length; i += 1) {
      const part = patternParts[i]!;
      const value = pathParts[i]!;
      if (part.startsWith(":")) {
        params[part.slice(1)] = value;
      } else if (part !== value) {
        matched = false;
        break;
      }
    }
    if (matched) {
      return { ...route, params };
    }
  }
  return null;
}
