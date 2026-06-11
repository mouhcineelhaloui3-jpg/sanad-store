import {
  Activity,
  BarChart3,
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
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

export type AdminStatus = "paid" | "pending" | "failed" | "delivered" | "shipped" | "confirmed" | "low" | "active";

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Storefront CMS", href: "/admin/storefront", icon: Home },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Coupons", href: "/admin/coupons", icon: Percent },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Integrations", href: "/admin/integrations", icon: Activity },
  { label: "Notifications", href: "/admin/notifications", icon: Megaphone },
  { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
  { label: "Activity Logs", href: "/admin/activity-logs", icon: Activity },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export const dashboardStats = [
  { label: "Total Sales", value: "0 د.م.", change: "0%", icon: ChartNoAxesCombined },
  { label: "Total Orders", value: "0", change: "0%", icon: ClipboardList },
  { label: "Total Customers", value: "0", change: "0%", icon: Users },
  { label: "Total Products", value: "3", change: "seed", icon: Boxes }
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
  { id: "PRD-001", name: "سَنَد ألاين", category: "Posture", price: 249, stock: 64, sales: 428, status: "active" },
  { id: "PRD-002", name: "سَنَد هيت", category: "Neck Relief", price: 299, stock: 21, sales: 612, status: "active" },
  { id: "PRD-003", name: "سَنَد لومبو", category: "Back Support", price: 249, stock: 8, sales: 351, status: "low" }
];

export const orders: Array<{
  id: string; customer: string; phone: string;
  total: number; payment: string; shipping: string; status: string; date: string;
}> = [];

export const customers: Array<{
  id: string; name: string; phone: string; city: string;
  orders: number; spent: number; activity: string; date: string;
}> = [];

export const activityLogs: Array<{
  id: string; event: string; actor: string; target: string; time: string;
}> = [];

export const notifications: Array<{
  title: string; description: string; icon: typeof Home;
}> = [];

export const categories: Array<{
  id: string; name: string; slug: string; products: number; status: string;
}> = [];

export const coupons: Array<{
  id: string; code: string; type: string; value: number;
  expiry: string; uses: number; limit: number; status: string;
}> = [];

export const reviews: Array<{
  id: string; customer: string; product: string;
  rating: number; text: string; status: string; date: string;
}> = [];

export const roles: Array<{
  id: string; role: string; permissions: string; users: number; status: string;
}> = [];
