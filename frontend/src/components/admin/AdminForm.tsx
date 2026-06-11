const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sand-700 dark:border-slate-800 dark:bg-slate-950";

export function TextField({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <input className={`${inputClass} mt-2`} placeholder={placeholder} type={type} />
    </label>
  );
}

export function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <select className={`${inputClass} mt-2`}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
      <textarea className={`${inputClass} mt-2 min-h-32`} placeholder={placeholder} />
    </label>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-2xl bg-sand-900 px-5 py-3 text-sm font-black text-white transition hover:bg-sand-950">
      {children}
    </button>
  );
}
