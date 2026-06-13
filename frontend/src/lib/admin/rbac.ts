export type AdminRole = "super_admin" | "admin" | "editor" | "support" | "marketing_manager";

export type AdminPermission =
  | "dashboard:read"
  | "cms:read"
  | "cms:write"
  | "settings:read"
  | "settings:write"
  | "users:read"
  | "logs:read"
  | "analytics:read"
  | "billing:read"
  | "products:read"
  | "products:write"
  | "ads:read"
  | "ads:write"
  | "automation:read"
  | "automation:write"
  | "extensions:read"
  | "extensions:write"
  | "affiliate:read"
  | "affiliate:write";

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
    "billing:read",
    "products:read",
    "products:write",
    "ads:read",
    "ads:write",
    "automation:read",
    "automation:write",
    "extensions:read",
    "extensions:write",
    "affiliate:read",
    "affiliate:write"
  ],
  admin: [
    "dashboard:read",
    "cms:read",
    "cms:write",
    "settings:read",
    "settings:write",
    "analytics:read",
    "products:read",
    "products:write",
    "ads:read",
    "automation:read",
    "extensions:read"
  ],
  marketing_manager: [
    "dashboard:read",
    "analytics:read",
    "ads:read",
    "ads:write",
    "automation:read",
    "extensions:read",
    "affiliate:read"
  ],
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
    case "marketing_manager":
      return "Marketing Manager";
    default:
      return role;
  }
}
