import {
  Activity,
  BarChart3,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  FolderTree,
  Home,
  Kanban,
  Megaphone,
  Percent,
  Puzzle,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Users,
  Workflow,
  Zap
} from "lucide-react";
import type { AdminPermission } from "./rbac";

export type AdminStatus =
  | "paid"
  | "pending"
  | "failed"
  | "delivered"
  | "shipped"
  | "confirmed"
  | "low"
  | "active"
  | "inactive"
  | "approved"
  | "rejected"
  | "expired";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  permission?: AdminPermission;
  section?: "core" | "commerce" | "system" | "extensions" | "future";
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: Home, permission: "dashboard:read", section: "core" },
  { label: "Website Editor", href: "/admin/storefront", icon: Megaphone, permission: "cms:read", section: "core" },
  { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings:read", section: "core" },
  { label: "Users", href: "/admin/users", icon: Users, permission: "users:read", section: "core" },
  { label: "Activity Logs", href: "/admin/activity-logs", icon: Activity, permission: "logs:read", section: "core" },
  { label: "Extensions", href: "/admin/extensions", icon: Puzzle, permission: "extensions:read", section: "extensions" },
  { label: "Marketplace", href: "/admin/marketplace", icon: Store, permission: "extensions:read", section: "extensions" },
  { label: "Automation", href: "/admin/automation", icon: Workflow, permission: "automation:read", section: "extensions" },
  { label: "Plans (Live Site)", href: "/admin/products", icon: ShoppingBag, permission: "products:read", section: "commerce" },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList, permission: "orders:read", section: "commerce" },
  { label: "CRM", href: "/admin/crm", icon: Kanban, permission: "leads:view", section: "commerce" },
  { label: "Customers", href: "/admin/customers", icon: Users, permission: "customers:read", section: "commerce" },
  { label: "Categories", href: "/admin/categories", icon: FolderTree, permission: "categories:read", section: "commerce" },
  { label: "Coupons", href: "/admin/coupons", icon: Percent, permission: "coupons:read", section: "commerce" },
  { label: "Reviews", href: "/admin/reviews", icon: Star, permission: "reviews:read", section: "commerce" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, permission: "analytics:read", section: "system" },
  { label: "Ads & Marketing", href: "/admin/ads", icon: Zap, permission: "ads:read", section: "system" },
  { label: "Billing", href: "/admin/billing", icon: CreditCard, permission: "billing:read", section: "future" },
  { label: "SEO", href: "/admin/seo", icon: ChartNoAxesCombined, permission: "settings:read", section: "system" },
  { label: "Blog", href: "/admin/blog", icon: Megaphone, permission: "cms:read", section: "system" },
  { label: "Integrations", href: "/admin/integrations", icon: Activity, permission: "settings:read", section: "system" },
  { label: "Notifications", href: "/admin/notifications", icon: Megaphone, permission: "notifications:read", section: "system" },
  { label: "Roles", href: "/admin/roles", icon: ShieldCheck, permission: "users:read", section: "system" }
];
