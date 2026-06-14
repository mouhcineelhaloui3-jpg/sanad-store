"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Film,
  Globe,
  Laptop,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Smartphone,
  Star,
  Tablet,
  Trophy,
  Tv,
  Wifi,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const SCENES = [
  { id: "tv", duration: 8000 },
  { id: "content", duration: 8000 },
  { id: "devices", duration: 8000 },
  { id: "quality", duration: 8000 },
  { id: "reviews", duration: 8000 },
  { id: "finale", duration: 9000 }
] as const;

const TOTAL_MS = SCENES.reduce((s, sc) => s + sc.duration, 0);

const contentTiles = [
  { label: "Live Football", icon: Trophy, hue: "from-emerald-500/30 to-cyan-500/20" },
  { label: "Blockbuster Movies", icon: Film, hue: "from-violet-500/30 to-blue-500/20" },
  { label: "TV Series", icon: Tv, hue: "from-rose-500/30 to-orange-500/20" },
  { label: "Sports Channels", icon: Zap, hue: "from-amber-500/30 to-yellow-500/20" },
  { label: "Kids Content", icon: Star, hue: "from-pink-500/30 to-fuchsia-500/20" },
  { label: "International", icon: Globe, hue: "from-sky-500/30 to-indigo-500/20" }
];

const devices = [
  { label: "Smart TV", icon: Tv },
  { label: "Android TV", icon: Tv },
  { label: "iPhone", icon: Smartphone },
  { label: "Android", icon: Smartphone },
  { label: "Tablet", icon: Tablet },
  { label: "Laptop", icon: Laptop }
];

const reviews = [
  { name: "Youssef M.", city: "Casablanca", text: "Best IPTV in Morocco — zero buffering during Botola!" },
  { name: "Sarah L.", city: "Rabat", text: "4K quality is incredible. Setup took 5 minutes." },
  { name: "Karim B.", city: "Marrakech", text: "WhatsApp support replied in minutes. Highly recommend." },
  { name: "Amine T.", city: "Tangier", text: "115K channels — everything my family watches in one place." }
];

function SceneShell({ children, keyId }: { children: React.ReactNode; keyId: string }) {
  return (
    <motion.div
      key={keyId}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="promo-scene absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      {children}
    </motion.div>
  );
}

function SceneTv() {
  return (
    <SceneShell keyId="tv">
      <div className="promo-vignette pointer-events-none absolute inset-0" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl"
      >
        <div className="promo-tv-glow absolute -inset-8 rounded-3xl bg-cyan-500/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-black shadow-[0_0_80px_rgba(0,229,255,0.35)]">
          <div className="relative aspect-video w-full">
            <Image
              src="/promo/promo-scene1-tv.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-cyan-900/20" />
            <div className="promo-channel-grid absolute inset-4 grid grid-cols-8 gap-1 opacity-90 sm:inset-6 sm:grid-cols-10 sm:gap-1.5">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="aspect-video rounded-sm bg-gradient-to-br from-cyan-500/40 to-blue-600/30 ring-1 ring-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 space-y-2 text-center"
      >
        <p className="promo-headline text-2xl font-black text-white sm:text-4xl">120,000+ Movies &amp; Series</p>
        <p className="promo-headline text-xl font-bold text-cyan-300 sm:text-3xl">25,000+ Live Channels</p>
      </motion.div>
    </SceneShell>
  );
}

function SceneContent() {
  return (
    <SceneShell keyId="content">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="promo-headline mb-8 max-w-3xl text-center text-2xl font-black text-white sm:text-4xl"
      >
        Everything You Love In One Subscription
      </motion.p>
      <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {contentTiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            className={`promo-tile flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${tile.hue} p-5 backdrop-blur-sm sm:p-6`}
          >
            <tile.icon className="mb-3 h-8 w-8 text-cyan-300 sm:h-10 sm:w-10" />
            <span className="text-center text-sm font-bold text-white sm:text-base">{tile.label}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

function SceneDevices() {
  return (
    <SceneShell keyId="devices">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="promo-headline mb-10 text-center text-2xl font-black text-white sm:text-4xl"
      >
        Works On All Your Devices
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {devices.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            className="promo-device-card flex w-28 flex-col items-center rounded-2xl border border-cyan-400/25 bg-white/5 p-4 backdrop-blur-md sm:w-32"
          >
            <d.icon className="h-10 w-10 text-cyan-400" />
            <span className="mt-2 text-xs font-bold text-white/90">{d.label}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

function SceneQuality() {
  return (
    <SceneShell keyId="quality">
      <div className="relative w-full max-w-lg">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="rounded-2xl border border-cyan-400/30 bg-black/60 p-6 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-cyan-300">ULTRA HD STREAM</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-black text-emerald-400">LIVE</span>
          </div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-900 to-cyan-950 ring-1 ring-cyan-500/30" />
          <div className="mt-4 space-y-2">
            {["4K", "FHD", "HD"].map((q, i) => (
              <div key={q} className="flex items-center gap-3">
                <span className="w-8 text-xs font-black text-cyan-400">{q}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${95 - i * 8}%` }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-emerald-400">
            <Wifi className="h-4 w-4" />
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-sm font-bold"
            >
              99.9% Stability — Zero Buffer
            </motion.span>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
        <p className="text-2xl font-black text-white sm:text-3xl">4K • FHD • HD</p>
        <p className="mt-1 text-xl font-bold text-cyan-300">99.9% Stability</p>
      </motion.div>
    </SceneShell>
  );
}

function SceneReviews() {
  return (
    <SceneShell keyId="reviews">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="promo-headline mb-8 text-center text-2xl font-black text-white sm:text-3xl"
      >
        Trusted By Thousands Of Customers
      </motion.p>
      <div className="relative h-64 w-full max-w-3xl sm:h-72">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 8, -8, 0][i] * 20,
              y: [0, -12, 10, -6][i]
            }}
            transition={{
              opacity: { delay: i * 0.15 },
              scale: { delay: i * 0.15 },
              x: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 3.5 + i, ease: "easeInOut" }
            }}
            className="promo-review-card absolute w-56 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg sm:w-64"
            style={{
              left: `${10 + (i % 2) * 42}%`,
              top: `${8 + Math.floor(i / 2) * 38}%`
            }}
          >
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs leading-relaxed text-white/85">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-2 text-[11px] font-bold text-cyan-400">
              {r.name} · {r.city}
            </p>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

function SceneFinale() {
  return (
    <SceneShell keyId="finale">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        className="relative text-center"
      >
        <div className="promo-logo-burst absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/25 blur-3xl" />
        <motion.h1
          animate={{ textShadow: ["0 0 20px rgba(0,229,255,0.5)", "0 0 60px rgba(0,229,255,0.9)", "0 0 20px rgba(0,229,255,0.5)"] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="relative text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          SANAD IPTV
        </motion.h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 space-y-3 text-center"
      >
        <p className="text-xl font-black text-cyan-300 sm:text-2xl">Start Your Free Trial Today</p>
        <p className="text-lg font-bold text-white/80">24/7 Support</p>
        <Link
          href="/trial"
          className="promo-cta-btn mt-4 inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-black text-white shadow-[0_0_40px_rgba(0,229,255,0.4)]"
        >
          Get Started
        </Link>
      </motion.div>
    </SceneShell>
  );
}

function sceneAt(elapsed: number) {
  let acc = 0;
  for (const sc of SCENES) {
    acc += sc.duration;
    if (elapsed < acc) return sc.id;
  }
  return SCENES[SCENES.length - 1].id;
}

export function SanadPromoVideo() {
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [scene, setScene] = useState<(typeof SCENES)[number]["id"]>("tv");
  const pausedAtRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - pausedAtRef.current;
    let raf = 0;
    const tick = (now: number) => {
      const e = (now - start) % TOTAL_MS;
      setElapsed(e);
      setScene(sceneAt(e));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const restart = useCallback(() => {
    pausedAtRef.current = 0;
    setElapsed(0);
    setScene("tv");
    setPlaying(true);
  }, []);

  const toggle = () => {
    if (playing) pausedAtRef.current = elapsed;
    setPlaying((p) => !p);
  };

  const progress = (elapsed / TOTAL_MS) * 100;

  return (
    <div className="promo-video-root relative min-h-screen overflow-hidden bg-[#030508]">
      <div className="promo-aurora pointer-events-none absolute inset-0" />
      <div className="promo-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

      <AnimatePresence mode="wait">
        {scene === "tv" && <SceneTv />}
        {scene === "content" && <SceneContent />}
        {scene === "devices" && <SceneDevices />}
        {scene === "quality" && <SceneQuality />}
        {scene === "reviews" && <SceneReviews />}
        {scene === "finale" && <SceneFinale />}
      </AnimatePresence>

      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/5 bg-black/40 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-white/15 p-2 text-white transition hover:border-cyan-400/50"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={restart}
            className="rounded-full border border-white/15 p-2 text-white transition hover:border-cyan-400/50"
            aria-label="Restart"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <button
            type="button"
            onClick={() => document.documentElement.requestFullscreen?.()}
            className="rounded-full border border-white/15 p-2 text-white transition hover:border-cyan-400/50"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
