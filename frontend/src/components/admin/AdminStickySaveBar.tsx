"use client";

import { Loader2, Save } from "lucide-react";
import { PrimaryButton } from "@/components/admin/AdminForm";

export function AdminStickySaveBar({
  label,
  savingLabel = "Saving…",
  onSave,
  disabled,
  saving,
  hint
}: {
  label: string;
  savingLabel?: string;
  onSave: () => void;
  disabled?: boolean;
  saving?: boolean;
  hint?: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:pl-72">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {hint ?? "Changes are saved to the database and published to the live website."}
        </p>
        <PrimaryButton onClick={onSave} disabled={disabled || saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {savingLabel}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {label}
            </>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
}
