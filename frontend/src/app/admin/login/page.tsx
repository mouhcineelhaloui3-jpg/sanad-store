"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { adminFetch } from "@/lib/admin/fetch-client";

const LOGO_SRC = "/logo/sanad-iptv-logo.png";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await adminFetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      toast.success("Welcome back");
      router.push(searchParams.get("next") ?? "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
        <Image src={LOGO_SRC} alt="SANAD IPTV" width={64} height={64} className="h-16 w-16 object-cover" priority />
      </div>
      <h1 className="mt-5 text-center text-2xl font-black">SANAD Admin</h1>
      <p className="mt-2 text-center text-sm text-white/60">Dashboard · Mot de passe admin</p>

      <label className="mt-6 block text-sm font-bold text-white/80">
        Mot de passe
        <div className="relative mt-2">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
            autoFocus
            className="w-full rounded-2xl border border-white/10 bg-white py-3 pl-11 pr-4 text-slate-950 outline-none focus:border-cyan-400"
            placeholder="M2o3u1h1@"
          />
        </div>
      </label>

      {error ? <p className="mt-3 text-center text-sm font-bold text-red-300">{error}</p> : null}

      <button
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 font-black text-slate-950 disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? "Connexion..." : "Entrer au Dashboard"}
      </button>

      <p className="mt-6 text-center text-xs text-white/40">SANAD IPTV · Admin Panel</p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-white" dir="ltr">
      <Suspense fallback={<div className="text-white/70">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
