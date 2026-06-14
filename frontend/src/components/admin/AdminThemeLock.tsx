"use client";

import { useEffect } from "react";
import { applySiteTheme, useThemeStore } from "@/store/themeStore";

/** Admin UI is always dark — storefront light theme must not override admin text/colors. */
export function AdminThemeLock() {
  const storefrontTheme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applySiteTheme("dark");
    return () => {
      applySiteTheme(storefrontTheme);
    };
  }, [storefrontTheme]);

  return null;
}
