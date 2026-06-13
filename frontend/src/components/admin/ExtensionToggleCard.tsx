"use client";

type ExtensionToggleCardProps = {
  name: string;
  version: string;
  description?: string;
  enabled: boolean;
  busy?: boolean;
  onToggle: (enabled: boolean) => void;
};

export function ExtensionToggleCard({
  name,
  version,
  description,
  enabled,
  busy,
  onToggle
}: ExtensionToggleCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Extension</p>
          <h3 className="mt-1 text-lg font-black">{name}</h3>
          <p className="mt-1 text-xs text-slate-500">v{version}</p>
          {description ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{description}</p> : null}
        </div>
        <button
          type="button"
          disabled={busy}
          onClick={() => onToggle(!enabled)}
          className={`relative h-8 w-14 rounded-full transition ${enabled ? "bg-cyan-500" : "bg-slate-300 dark:bg-slate-700"} disabled:opacity-50`}
          aria-pressed={enabled}
          aria-label={`${enabled ? "Disable" : "Enable"} ${name}`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${enabled ? "left-7" : "left-1"}`}
          />
        </button>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">
        {enabled ? "Enabled" : "Disabled"}
      </p>
    </article>
  );
}
