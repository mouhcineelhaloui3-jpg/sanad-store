import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../public/blog");
fs.mkdirSync(dir, { recursive: true });

const covers = [
  ["best-iptv-maroc", "Meilleur IPTV Maroc", "#00E5FF", "🏆"],
  ["iptv-smart-tv", "Smart TV IPTV", "#00FF95", "📺"],
  ["iptv-android", "Android Fire Stick", "#3DDC84", "📱"],
  ["iptv-4k", "IPTV 4K", "#FFB800", "✨"],
  ["abonnement-internet-iptv-maroc", "Internet IPTV", "#00E5FF", "🌐"],
  ["iptv-smarters-ne-fonctionne-pas", "Smarters Fix", "#FF6B6B", "🔧"],
  ["iptv-ne-charge-pas-chaines", "Loading Fix", "#FF6B6B", "⏳"],
  ["erreur-xtream-codes-iptv", "Xtream Error", "#FF6B6B", "⚠️"],
  ["activer-iptv-smarters-pro", "Activation", "#00E5FF", "🔑"],
  ["iptv-pc-mac-windows", "PC Mac IPTV", "#7C9CFF", "💻"],
  ["iptv-chromecast-android-tv", "Chromecast", "#00FF95", "📡"],
  ["alternatives-iptv-smarters", "Alternatives", "#FFB800", "🔄"],
  ["iptv-smarters-gratuit", "Gratuit", "#00E5FF", "🎁"],
  ["iptv-smarters-introuvable", "Introuvable", "#FF6B6B", "❓"],
  ["comment-sabonner-iptv-maroc", "Abonnement", "#00FF95", "📝"],
  ["prix-abonnement-iptv-maroc", "Prix IPTV", "#FFB800", "💰"]
];

for (const [slug, title, accent, icon] of covers) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="180" fill="${accent}" opacity="0.12"/>
  <circle cx="200" cy="520" r="220" fill="${accent}" opacity="0.08"/>
  <text x="80" y="120" fill="${accent}" font-family="Arial,sans-serif" font-size="28" font-weight="700">SANAD IPTV</text>
  <text x="80" y="340" fill="#ffffff" font-family="Arial,sans-serif" font-size="64" font-weight="800">${icon}</text>
  <text x="80" y="430" fill="#ffffff" font-family="Arial,sans-serif" font-size="52" font-weight="700">${title}</text>
  <text x="80" y="500" fill="#94a3b8" font-family="Arial,sans-serif" font-size="28">115K+ channels - 120K+ VOD - Morocco</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${slug}.svg`), svg);
}

console.log(`Generated ${covers.length} blog covers`);
