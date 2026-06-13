export type AdminRole = "super_admin" | "admin" | "manager" | "support" | "editor" | "marketing_manager";

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
  | "orders:read"
  | "orders:write"
  | "leads:view"
  | "leads:create"
  | "leads:update"
  | "leads:delete"
  | "customers:read"
  | "customers:write"
  | "categories:read"
  | "categories:write"
  | "coupons:read"
  | "coupons:write"
  | "reviews:read"
  | "reviews:write"
  | "notifications:read"
  | "notifications:write"
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
    "orders:read",
    "orders:write",
    "leads:view",
    "leads:create",
    "leads:update",
    "leads:delete",
    "customers:read",
    "customers:write",
    "categories:read",
    "categories:write",
    "coupons:read",
    "coupons:write",
    "reviews:read",
    "reviews:write",
    "notifications:read",
    "notifications:write",
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
    "orders:read",
    "orders:write",
    "leads:view",
    "leads:create",
    "leads:update",
    "leads:delete",
    "customers:read",
    "customers:write",
    "categories:read",
    "categories:write",
    "coupons:read",
    "coupons:write",
    "reviews:read",
    "reviews:write",
    "notifications:read",
    "notifications:write",
    "ads:read",
    "automation:read",
    "extensions:read",
    "affiliate:read",
    "affiliate:write"
  ],
  manager: [
    "dashboard:read",
    "analytics:read",
    "products:read",
    "products:write",
    "orders:read",
    "orders:write",
    "leads:view",
    "leads:create",
    "leads:update",
    "customers:read",
    "categories:read",
    "coupons:read",
    "reviews:read"
  ],
  marketing_manager: [
    "dashboard:read",
    "analytics:read",
    "ads:read",
    "ads:write",
    "automation:read",
    "extensions:read",
    "affiliate:read",
    "leads:view",
    "leads:create",
    "coupons:read"
  ],
  editor: ["dashboard:read", "cms:read", "cms:write"],
  support: [
    "dashboard:read",
    "cms:read",
    "analytics:read",
    "logs:read",
    "orders:read",
    "leads:view",
    "customers:read",
    "reviews:read",
    "notifications:read"
  ]
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
    case "manager":
      return "Manager";
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

export const ADMIN_ROUTE_PERMISSIONS: { prefix: string; permission: AdminPermission }[] = [
  { prefix: "/admin/crm", permission: "leads:view" },
  { prefix: "/admin/products", permission: "products:read" },
  { prefix: "/admin/orders", permission: "orders:read" },
  { prefix: "/admin/customers", permission: "customers:read" },
  { prefix: "/admin/categories", permission: "categories:read" },
  { prefix: "/admin/coupons", permission: "coupons:read" },
  { prefix: "/admin/reviews", permission: "reviews:read" },
  { prefix: "/admin/notifications", permission: "notifications:read" },
  { prefix: "/admin/settings", permission: "settings:read" },
  { prefix: "/admin/seo", permission: "settings:read" },
  { prefix: "/admin/users", permission: "users:read" },
  { prefix: "/admin/roles", permission: "users:read" },
  { prefix: "/admin/activity-logs", permission: "logs:read" },
  { prefix: "/admin/analytics", permission: "analytics:read" },
  { prefix: "/admin/storefront", permission: "cms:read" }
];

export function permissionForAdminPath(path: string): AdminPermission | null {
  if (path === "/admin" || path === "/admin/") return "dashboard:read";
  const match = ADMIN_ROUTE_PERMISSIONS.find((entry) => path === entry.prefix || path.startsWith(`${entry.prefix}/`));
  return match?.permission ?? null;
}
