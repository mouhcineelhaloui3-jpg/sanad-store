"use client";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sand-700 dark:border-slate-800 dark:bg-slate-950";

type FieldProps = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
};

export function TextField({ label, placeholder, type = "text", value = "", onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <input
        className={`${inputClass} mt-2`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </label>
  );
}

export function SelectField({
  label,
  options,
  value = "",
  onChange
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <select className={`${inputClass} mt-2`} value={value} onChange={(e) => onChange?.(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({ label, placeholder, value = "", onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <textarea
        className={`${inputClass} mt-2 min-h-32`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
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
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}

export function PrimaryButton({
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
      className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white transition hover:bg-sand-950 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
