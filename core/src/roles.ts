export type SaasRole = "SUPER_ADMIN" | "ADMIN" | "MARKETING_MANAGER";

export const SAAS_ROLE_PERMISSIONS: Record<SaasRole, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [
    "dashboard:read",
    "products:*",
    "analytics:read",
    "ads:read",
    "ads:write",
    "automation:read",
    "extensions:*",
    "cms:*",
    "settings:*",
    "users:read",
    "logs:read"
  ],
  MARKETING_MANAGER: [
    "dashboard:read",
    "analytics:read",
    "ads:*",
    "automation:read",
    "extensions:read"
  ]
};

export function roleHasPermission(role: SaasRole, permission: string): boolean {
  const perms = SAAS_ROLE_PERMISSIONS[role] ?? [];
  if (perms.includes("*")) return true;
  if (perms.includes(permission)) return true;
  const [ns] = permission.split(":");
  return perms.includes(`${ns}:*`);
}
