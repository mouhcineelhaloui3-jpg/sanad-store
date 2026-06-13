export type AdminRole = "super_admin" | "admin" | "editor" | "support";

export type AdminPermission =
  | "dashboard:read"
  | "cms:read"
  | "cms:write"
  | "settings:read"
  | "settings:write"
  | "users:read"
  | "logs:read"
  | "analytics:read"
  | "billing:read";

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    "dashboard:read",
    "cms:read",
    "cms:write",
    "settings:read",
    "settings:write",
    "users:read",
    "logs:read",
    "analytics:read",
    "billing:read"
  ],
  admin: ["dashboard:read", "cms:read", "cms:write", "settings:read", "settings:write", "analytics:read"],
  editor: ["dashboard:read", "cms:read", "cms:write"],
  support: ["dashboard:read", "cms:read", "analytics:read", "logs:read"]
};

export function hasPermission(role: AdminRole, permission: AdminPermission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: AdminRole, permissions: AdminPermission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

export function roleLabel(role: AdminRole): string {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "editor":
      return "Editor";
    case "support":
      return "Support";
    default:
      return role;
  }
}
