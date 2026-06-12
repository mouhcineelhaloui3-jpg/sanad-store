"use client";

import { createContext, useContext } from "react";
import type { StoreContent } from "@/lib/cms/types";

const StoreContentContext = createContext<StoreContent | null>(null);

export function StoreContentProvider({
  content,
  children
}: {
  content: StoreContent;
  children: React.ReactNode;
}) {
  return <StoreContentContext.Provider value={content}>{children}</StoreContentContext.Provider>;
}

export function useStoreContent() {
  const ctx = useContext(StoreContentContext);
  if (!ctx) throw new Error("useStoreContent must be used within StoreContentProvider");
  return ctx;
}
