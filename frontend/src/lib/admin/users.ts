import type { AdminRole } from "./rbac";

export type AdminUserRecord = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  password: string;
  active: boolean;
};

function envPassword(key: string, fallback: string) {
  return process.env[key] ?? fallback;
}

export function getAdminUsers(): AdminUserRecord[] {
  return [
    {
      id: "usr_super",
      email: "super@sanad.iptv",
      name: "Super Admin",
      role: "super_admin",
      password: envPassword("ADMIN_ACCESS_CODE", "M2o3u1h1@"),
      active: true
    },
    {
      id: "usr_admin",
      email: "admin@sanad.iptv",
      name: "Store Admin",
      role: "admin",
      password: envPassword("ADMIN_STORE_CODE", "sanad-admin-store"),
      active: true
    },
    {
      id: "usr_editor",
      email: "editor@sanad.iptv",
      name: "Content Editor",
      role: "editor",
      password: envPassword("ADMIN_EDITOR_CODE", "sanad-editor"),
      active: true
    },
    {
      id: "usr_support",
      email: "support@sanad.iptv",
      name: "Support Agent",
      role: "support",
      password: envPassword("ADMIN_SUPPORT_CODE", "sanad-support"),
      active: true
    }
  ];
}

export function authenticateAdminUser(email: string, password: string): AdminUserRecord | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getAdminUsers().find(
    (entry) => entry.active && entry.email.toLowerCase() === normalizedEmail && entry.password === password
  );
  return user ?? null;
}

export function authenticateAdminAccessCode(password: string): AdminUserRecord | null {
  const code = password.trim();
  if (!code) return null;

  return getAdminUsers().find((entry) => entry.active && entry.password === code) ?? null;
}

export function getAdminUserById(id: string): AdminUserRecord | null {
  return getAdminUsers().find((entry) => entry.id === id) ?? null;
}

export function getPublicAdminUsers() {
  return getAdminUsers().map(({ password: _password, ...user }) => user);
}
