import type { AdminApp } from "./admin-app";

export type ExtensionHooks = {
  onInstall?: () => void | Promise<void>;
  onEnable?: () => void | Promise<void>;
  onDisable?: () => void | Promise<void>;
};

export interface Extension {
  name: string;
  version: string;
  enabled: boolean;
  description?: string;
  register(app: AdminApp): void;
  hooks?: ExtensionHooks;
}

export type ExtensionState = {
  name: string;
  enabled: boolean;
  installedAt: string;
  updatedAt: string;
};
