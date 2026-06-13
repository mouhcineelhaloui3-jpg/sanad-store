"use client";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-slate-600 dark:focus:ring-slate-800";

export function textDirection(value: string): "rtl" | "ltr" {
  return /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
}

type FieldProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  autoDirection?: boolean;
};

export function TextField({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  error,
  autoDirection = false
}: FieldProps) {
  const dir = autoDirection ? textDirection(value) : undefined;

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      <input
        className={`${inputClass} mt-2 ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
        placeholder={placeholder}
        type={type}
        value={value}
        dir={dir}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}

export function SelectField({
  label,
  options,
  value = "",
  onChange,
  error
}: {
  label: string;
  options: { value: string; label: string }[] | string[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}) {
  const normalized = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      <select
        className={`${inputClass} mt-2 ${error ? "border-red-300" : ""}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  placeholder,
  value = "",
  onChange,
  error,
  autoDirection = false
}: FieldProps) {
  const dir = autoDirection ? textDirection(value) : undefined;

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      <textarea
        className={`${inputClass} mt-2 min-h-32 ${error ? "border-red-300" : ""}`}
        placeholder={placeholder}
        value={value}
        dir={dir}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error ? <p className="mt-1 text-xs font-medium text-red-600">{error}</p> : null}
    </label>
  );
}

export function CheckboxField({
  label,
  checked = false,
  onChange
}: {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  type = "button"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  onClick,
  disabled
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
    >
      {children}
    </button>
  );
}
