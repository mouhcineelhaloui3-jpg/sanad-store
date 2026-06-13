import type { MoviesSection } from "./types";

export const defaultMoviesSection = (): MoviesSection => ({
  title: { ar: "🎬 +120,000 فيلم ومسلسل", en: "🎬 120,000+ Movies & Series" },
  subtitle: {
    ar: "أحدث إصدارات 2025 و 2026 — عالمي، عربي، تركي، Netflix — محدث يومياً بجودة 4K",
    en: "Latest 2025 & 2026 releases — global, Arabic, Turkish, Netflix — updated daily in 4K"
  },
  totalCount: 120000,
  ctaLabel: { ar: "🍿 بدا التفرج دابا", en: "🍿 Start Watching Now" },
  genres: [
    { ar: "أكشن", en: "Action" },
    { ar: "Sci-Fi", en: "Sci-Fi" },
    { ar: "مسلسلات", en: "Series" },
    { ar: "Netflix", en: "Netflix" },
    { ar: "Marvel", en: "Marvel" },
    { ar: "عائلي", en: "Family" },
    { ar: "2025", en: "2025" },
    { ar: "2026", en: "2026" }
  ],
  marqueeTitles: [
    { ar: "Superman", en: "Superman" },
    { ar: "F1: The Movie", en: "F1: The Movie" },
    { ar: "Avatar: Fire and Ash", en: "Avatar: Fire and Ash" },
    { ar: "Mission: Impossible 8", en: "Mission: Impossible — Final Reckoning" },
    { ar: "Squid Game S3", en: "Squid Game Season 3" },
    { ar: "Wednesday S2", en: "Wednesday Season 2" },
    { ar: "The Last of Us S2", en: "The Last of Us Season 2" },
    { ar: "Jurassic World Rebirth", en: "Jurassic World Rebirth" },
    { ar: "A Minecraft Movie", en: "A Minecraft Movie" },
    { ar: "Thunderbolts*", en: "Thunderbolts*" },
    { ar: "Captain America", en: "Captain America: Brave New World" },
    { ar: "How to Train Your Dragon", en: "How to Train Your Dragon" }
  ],
  items: [
    {
      id: "m1",
      title: { ar: "Superman", en: "Superman" },
      genre: { ar: "Sci-Fi", en: "Sci-Fi" },
      year: "2025",
      quality: { ar: "4K HDR", en: "4K HDR" },
      rating: 8.4,
      posterGradient: "from-blue-700 via-red-900 to-stone-950",
      posterUrl: "/posters/superman.jpg",
      featured: true
    },
    {
      id: "m2",
      title: { ar: "Mission: Impossible — Final Reckoning", en: "Mission: Impossible — Final Reckoning" },
      genre: { ar: "أكشن", en: "Action" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 8.7,
      posterGradient: "from-slate-700 via-slate-900 to-black",
      posterUrl: "/posters/mission-impossible.jpg",
      featured: true
    },
    {
      id: "m3",
      title: { ar: "F1: The Movie", en: "F1: The Movie" },
      genre: { ar: "دراما", en: "Drama" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 8.2,
      posterGradient: "from-red-700 via-neutral-900 to-black",
      posterUrl: "/posters/f1.jpg",
      featured: true
    },
    {
      id: "m4",
      title: { ar: "Avatar: Fire and Ash", en: "Avatar: Fire and Ash" },
      genre: { ar: "Sci-Fi", en: "Sci-Fi" },
      year: "2025",
      quality: { ar: "4K HDR", en: "4K HDR" },
      rating: 8.5,
      posterGradient: "from-orange-700 via-red-950 to-black",
      posterUrl: "/posters/avatar-fire-and-ash.jpg",
      featured: true
    },
    {
      id: "m5",
      title: { ar: "Squid Game — الموسم 3", en: "Squid Game Season 3" },
      genre: { ar: "إثارة", en: "Thriller" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 8.6,
      posterGradient: "from-pink-700 via-rose-900 to-black",
      posterUrl: "/posters/squid-game.jpg",
      featured: true
    },
    {
      id: "m6",
      title: { ar: "Wednesday — الموسم 2", en: "Wednesday Season 2" },
      genre: { ar: "مسلسل", en: "Series" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 8.8,
      posterGradient: "from-neutral-800 via-black to-black",
      posterUrl: "/posters/wednesday.jpg",
      featured: true
    },
    {
      id: "m7",
      title: { ar: "The Last of Us — الموسم 2", en: "The Last of Us Season 2" },
      genre: { ar: "دراما", en: "Drama" },
      year: "2025",
      quality: { ar: "4K HDR", en: "4K HDR" },
      rating: 9.0,
      posterGradient: "from-green-900 via-emerald-950 to-black",
      posterUrl: "/posters/last-of-us.jpg",
      featured: true
    },
    {
      id: "m8",
      title: { ar: "Jurassic World Rebirth", en: "Jurassic World Rebirth" },
      genre: { ar: "أكشن", en: "Action" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 7.9,
      posterGradient: "from-lime-800 via-green-950 to-black",
      posterUrl: "/posters/jurassic-world-rebirth.jpg",
      featured: true
    },
    {
      id: "m9",
      title: { ar: "A Minecraft Movie", en: "A Minecraft Movie" },
      genre: { ar: "عائلي", en: "Family" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 7.5,
      posterGradient: "from-green-600 via-emerald-900 to-black",
      posterUrl: "/posters/minecraft.jpg",
      featured: true
    },
    {
      id: "m10",
      title: { ar: "Captain America: Brave New World", en: "Captain America: Brave New World" },
      genre: { ar: "Marvel", en: "Marvel" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 7.8,
      posterGradient: "from-red-700 via-blue-950 to-black",
      posterUrl: "/posters/captain-america.jpg",
      featured: true
    },
    {
      id: "m11",
      title: { ar: "Thunderbolts*", en: "Thunderbolts*" },
      genre: { ar: "Marvel", en: "Marvel" },
      year: "2025",
      quality: { ar: "4K HDR", en: "4K HDR" },
      rating: 8.1,
      posterGradient: "from-purple-700 via-violet-950 to-black",
      posterUrl: "/posters/thunderbolts.jpg",
      featured: true
    },
    {
      id: "m12",
      title: { ar: "How to Train Your Dragon", en: "How to Train Your Dragon" },
      genre: { ar: "فانتازيا", en: "Fantasy" },
      year: "2025",
      quality: { ar: "4K", en: "4K" },
      rating: 8.3,
      posterGradient: "from-sky-700 via-indigo-950 to-black",
      posterUrl: "/posters/how-to-train-your-dragon.jpg",
      featured: true
    }
  ]
});
