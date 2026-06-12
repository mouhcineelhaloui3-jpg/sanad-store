import type { MoviesSection } from "./types";

export const defaultMoviesSection = (): MoviesSection => ({
  title: { ar: "🎬 +200,000 فيلم ومسلسل", en: "🎬 200,000+ Movies & Series" },
  subtitle: {
    ar: "أحدث الأفلام العالمية، العربية، التركية، الهندية — محدثة يومياً بجودة 4K",
    en: "Latest global, Arabic, Turkish & Indian films — updated daily in 4K"
  },
  totalCount: 200000,
  ctaLabel: { ar: "🍿 بدا التفرج دابا", en: "🍿 Start Watching Now" },
  genres: [
    { ar: "أكشن", en: "Action" },
    { ar: "دراما", en: "Drama" },
    { ar: "رعب", en: "Horror" },
    { ar: "كوميديا", en: "Comedy" },
    { ar: "عربي", en: "Arabic" },
    { ar: "تركي", en: "Turkish" },
    { ar: "Netflix", en: "Netflix" },
    { ar: "أنime", en: "Anime" }
  ],
  marqueeTitles: [
    { ar: "Dune: Part Two", en: "Dune: Part Two" },
    { ar: "Oppenheimer", en: "Oppenheimer" },
    { ar: "Barbie", en: "Barbie" },
    { ar: "Squid Game S2", en: "Squid Game S2" },
    { ar: "The Last of Us", en: "The Last of Us" },
    { ar: "Breaking Bad", en: "Breaking Bad" },
    { ar: "Game of Thrones", en: "Game of Thrones" },
    { ar: "Peaky Blinders", en: "Peaky Blinders" },
    { ar: "La Casa de Papel", en: "Money Heist" },
    { ar: "Ertugrul", en: "Diriliş: Ertuğrul" },
    { ar: "المتوحش", en: "Al-Motawash" },
    { ar: "Extraction 2", en: "Extraction 2" },
    { ar: "John Wick 4", en: "John Wick 4" },
    { ar: "Avatar 2", en: "Avatar: The Way of Water" },
    { ar: "Spider-Verse", en: "Spider-Man: Across the Spider-Verse" }
  ],
  items: [
    { id: "m1", title: { ar: "Dune: Part Two", en: "Dune: Part Two" }, genre: { ar: "Sci-Fi", en: "Sci-Fi" }, year: "2024", quality: { ar: "4K HDR", en: "4K HDR" }, rating: 8.8, posterGradient: "from-amber-700 via-orange-900 to-stone-950", featured: true },
    { id: "m2", title: { ar: "Oppenheimer", en: "Oppenheimer" }, genre: { ar: "دراما", en: "Drama" }, year: "2023", quality: { ar: "4K", en: "4K" }, rating: 8.9, posterGradient: "from-slate-700 via-slate-900 to-black", featured: true },
    { id: "m3", title: { ar: "Squid Game S2", en: "Squid Game S2" }, genre: { ar: "إثارة", en: "Thriller" }, year: "2024", quality: { ar: "4K", en: "4K" }, rating: 8.5, posterGradient: "from-pink-700 via-rose-900 to-black", featured: true },
    { id: "m4", title: { ar: "The Last of Us", en: "The Last of Us" }, genre: { ar: "مسلسل", en: "Series" }, year: "2023", quality: { ar: "FHD", en: "FHD" }, rating: 9.0, posterGradient: "from-green-900 via-emerald-950 to-black", featured: true },
    { id: "m5", title: { ar: "Breaking Bad", en: "Breaking Bad" }, genre: { ar: "جريمة", en: "Crime" }, year: "2013", quality: { ar: "4K", en: "4K" }, rating: 9.5, posterGradient: "from-yellow-700 via-amber-950 to-black", featured: true },
    { id: "m6", title: { ar: "Diriliş: Ertuğrul", en: "Diriliş: Ertuğrul" }, genre: { ar: "تركي", en: "Turkish" }, year: "2019", quality: { ar: "HD", en: "HD" }, rating: 8.7, posterGradient: "from-stone-600 via-stone-900 to-black", featured: true },
    { id: "m7", title: { ar: "John Wick 4", en: "John Wick 4" }, genre: { ar: "أكشن", en: "Action" }, year: "2023", quality: { ar: "4K", en: "4K" }, rating: 8.2, posterGradient: "from-red-800 via-red-950 to-black", featured: true },
    { id: "m8", title: { ar: "Avatar 2", en: "Avatar: The Way of Water" }, genre: { ar: "Sci-Fi", en: "Sci-Fi" }, year: "2022", quality: { ar: "4K HDR", en: "4K HDR" }, rating: 8.1, posterGradient: "from-cyan-700 via-blue-950 to-black", featured: true },
    { id: "m9", title: { ar: "Peaky Blinders", en: "Peaky Blinders" }, genre: { ar: "دراما", en: "Drama" }, year: "2022", quality: { ar: "FHD", en: "FHD" }, rating: 8.8, posterGradient: "from-neutral-700 via-neutral-950 to-black", featured: true },
    { id: "m10", title: { ar: "La Casa de Papel", en: "Money Heist" }, genre: { ar: "إثارة", en: "Thriller" }, year: "2021", quality: { ar: "4K", en: "4K" }, rating: 8.2, posterGradient: "from-red-600 via-rose-950 to-black", featured: true },
    { id: "m11", title: { ar: "Spider-Verse", en: "Spider-Man: Across the Spider-Verse" }, genre: { ar: "أنime", en: "Animation" }, year: "2023", quality: { ar: "4K", en: "4K" }, rating: 8.7, posterGradient: "from-indigo-600 via-purple-950 to-black", featured: true },
    { id: "m12", title: { ar: "Extraction 2", en: "Extraction 2" }, genre: { ar: "أكشن", en: "Action" }, year: "2023", quality: { ar: "4K", en: "4K" }, rating: 7.9, posterGradient: "from-orange-700 via-orange-950 to-black", featured: true }
  ]
});
