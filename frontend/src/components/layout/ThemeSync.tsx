"use client";

import { useEffect } from "react";
import { applySiteTheme, useThemeStore } from "@/store/themeStore";

export function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    applySiteTheme(theme);
  }, [theme]);

  return null;
}
