"use client";

import { create } from "zustand";

type ModalType = "order" | "trial" | null;

type IptvModalState = {
  modal: ModalType;
  selectedPlanSlug: string | null;
  openOrder: (planSlug?: string) => void;
  openTrial: () => void;
  close: () => void;
};

export const useIptvModalStore = create<IptvModalState>((set) => ({
  modal: null,
  selectedPlanSlug: null,
  openOrder: (planSlug) => set({ modal: "order", selectedPlanSlug: planSlug ?? null }),
  openTrial: () => set({ modal: "trial", selectedPlanSlug: null }),
  close: () => set({ modal: null, selectedPlanSlug: null })
}));
