"use client";

import { create } from "zustand";
import { trackModalOpen } from "@/lib/analytics/track";

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
  openOrder: (planSlug) => {
    trackModalOpen("order", planSlug ?? null);
    set({ modal: "order", selectedPlanSlug: planSlug ?? null });
  },
  openTrial: () => {
    trackModalOpen("trial");
    set({ modal: "trial", selectedPlanSlug: null });
  },
  close: () => set({ modal: null, selectedPlanSlug: null })
}));
