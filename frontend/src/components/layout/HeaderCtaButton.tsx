"use client";

import { useSubscribeLabel } from "@/components/layout/LanguageSwitcher";

type HeaderCtaButtonProps = {
  onClick: () => void;
  className?: string;
};

export function HeaderCtaButton({ onClick, className = "" }: HeaderCtaButtonProps) {
  const subscribeLabel = useSubscribeLabel();

  return (
    <button type="button" onClick={onClick} className={`header-cta-glow ${className}`.trim()}>
      <span className="header-cta-inner">{subscribeLabel}</span>
    </button>
  );
}
