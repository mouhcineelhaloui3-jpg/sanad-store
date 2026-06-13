"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-white transition hover:border-neon-cyan/40 hover:bg-neon-cyan/10"
      aria-label={isLight ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}
      aria-pressed={isLight}
      title={isLight ? "وضع داكن" : "وضع فاتح"}
    >
      {isLight ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
