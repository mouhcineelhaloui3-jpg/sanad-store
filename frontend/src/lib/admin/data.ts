import {
  Activity,
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  FolderTree,
  Home,
  Megaphone,
  Percent,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Users
} from "lucide-react";
import type { AdminPermission } from "./rbac";

export type AdminStatus = "paid" | "pending" | "failed" | "delivered" | "shipped" | "confirmed" | "low" | "active";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  permission?: AdminPermission;
  section?: "core" | "commerce" | "system" | "future";
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: Home, permission: "dashboard:read", section: "core" },
  { label: "Storefront CMS", href: "/admin/storefront", icon: Megaphone, permission: "cms:read", section: "core" },
  { label: "Settings", href: "/admin/settings", icon: Settings, permission: "settings:read", section: "core" },
  { label: "Users", href: "/admin/users", icon: Users, permission: "users:read", section: "core" },
  { label: "Activity Logs", href: "/admin/activity-logs", icon: Activity, permission: "logs:read", section: "core" },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, permission: "analytics:read", section: "system" },
  { label: "Billing", href: "/admin/billing", icon: CreditCard, permission: "billing:read", section: "future" },
  { label: "Products", href: "/admin/products", icon: ShoppingBag, permission: "dashboard:read", section: "commerce" },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList, permission: "dashboard:read", section: "commerce" },
  { label: "Customers", href: "/admin/customers", icon: Users, permission: "dashboard:read", section: "commerce" },
  { label: "Categories", href: "/admin/categories", icon: FolderTree, permission: "dashboard:read", section: "commerce" },
  { label: "Coupons", href: "/admin/coupons", icon: Percent, permission: "dashboard:read", section: "commerce" },
  { label: "Reviews", href: "/admin/reviews", icon: Star, permission: "dashboard:read", section: "commerce" },
  { label: "SEO", href: "/admin/seo", icon: ChartNoAxesCombined, permission: "dashboard:read", section: "system" },
  { label: "Blog", href: "/admin/blog", icon: Megaphone, permission: "cms:read", section: "system" },
  { label: "Integrations", href: "/admin/integrations", icon: Activity, permission: "settings:read", section: "system" },
  { label: "Notifications", href: "/admin/notifications", icon: Megaphone, permission: "settings:read", section: "system" },
  { label: "Roles", href: "/admin/roles", icon: ShieldCheck, permission: "users:read", section: "system" }
];

export const dashboardStats = [
  { label: "Total Sales", value: "0 د.م.", change: "0%", icon: ChartNoAxesCombined },
  { label: "Subscription Orders", value: "0", change: "0%", icon: ClipboardList },
  { label: "Trial Requests", value: "0", change: "0%", icon: Users },
  { label: "Active Plans", value: "3", change: "IPTV", icon: Boxes }
];

export const salesSeries = [
  { label: "Mon", daily: 0, weekly: 0, monthly: 0 },
  { label: "Tue", daily: 0, weekly: 0, monthly: 0 },
  { label: "Wed", daily: 0, weekly: 0, monthly: 0 },
  { label: "Thu", daily: 0, weekly: 0, monthly: 0 },
  { label: "Fri", daily: 0, weekly: 0, monthly: 0 },
  { label: "Sat", daily: 0, weekly: 0, monthly: 0 },
  { label: "Sun", daily: 0, weekly: 0, monthly: 0 }
];

export const products = [
  { id: "PLN-001", name: "باقة 3 أشهر", category: "IPTV", price: 150, stock: 999, sales: 0, status: "active" },
  { id: "PLN-002", name: "باقة 6 أشهر", category: "IPTV", price: 250, stock: 999, sales: 0, status: "active" },
  { id: "PLN-003", name: "باقة سنة كاملة", category: "IPTV", price: 400, stock: 999, sales: 0, status: "active" }
];

export const orders: Array<{
  id: string;
  customer: string;
  phone: string;
  total: number;
  payment: string;
  shipping: string;
  status: string;
  date: string;
}> = [];

export const customers: Array<{
  id: string;
  name: string;
  phone: string;
  city: string;
  orders: number;
  spent: number;
  activity: string;
  date: string;
}> = [];

export const activityLogs: Array<{
  id: string;
  event: string;
  actor: string;
  target: string;
  time: string;
}> = [];

export const notifications: Array<{
  title: string;
  description: string;
  icon: typeof Home;
}> = [];

export const categories: Array<{
  id: string;
  name: string;
  slug: string;
  products: number;
  status: string;
}> = [];

export const coupons: Array<{
  id: string;
  code: string;
  type: string;
  value: number;
  expiry: string;
  uses: number;
  limit: number;
  status: string;
}> = [];

export const reviews: Array<{
  id: string;
  customer: string;
  product: string;
  rating: number;
  text: string;
  status: string;
  date: string;
}> = [];

export const roles: Array<{
  id: string;
  role: string;
  permissions: string;
  users: number;
  status: string;
}> = [];
