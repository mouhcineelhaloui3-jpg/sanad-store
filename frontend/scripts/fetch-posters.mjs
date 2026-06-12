import { mkdir, writeFile } from "fs/promises";
import path from "path";

const items = [
  { id: 1061474, type: "movie", slug: "superman" },
  { id: 575265, type: "movie", slug: "mission-impossible" },
  { id: 911430, type: "movie", slug: "f1" },
  { id: 83533, type: "movie", slug: "avatar-fire-and-ash" },
  { id: 950387, type: "movie", slug: "minecraft" },
  { id: 822119, type: "movie", slug: "captain-america" },
  { id: 986056, type: "movie", slug: "thunderbolts" },
  { id: 1234821, type: "movie", slug: "jurassic-world-rebirth" },
  { id: 1086052, type: "movie", slug: "how-to-train-your-dragon" },
  { id: 119051, type: "tv", slug: "wednesday" },
  { id: 93405, type: "tv", slug: "squid-game" },
  { id: 100088, type: "tv", slug: "last-of-us" }
];

const sports = [
  {
    slug: "champions-league",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80"
  },
  {
    slug: "la-liga",
    url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80"
  },
  {
    slug: "premier-league",
    url: "https://images.unsplash.com/photo-1459865274687-595fd653d1d3?w=800&q=80"
  },
  {
    slug: "botola",
    url: "https://images.unsplash.com/photo-1489944440615-453fc1735556?w=800&q=80"
  },
  {
    slug: "afcon",
    url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80"
  },
  {
    slug: "formula-1",
    url: "https://images.unsplash.com/photo-1551958219-ac56c7d68982?w=800&q=80"
  }
];

const posterDir = path.join(process.cwd(), "public", "posters");
const sportsDir = path.join(process.cwd(), "public", "sports");
await mkdir(posterDir, { recursive: true });
await mkdir(sportsDir, { recursive: true });

const manifest = { movies: {}, sports: {} };

for (const item of items) {
  const pageUrl =
    item.type === "movie"
      ? `https://www.themoviedb.org/movie/${item.id}`
      : `https://www.themoviedb.org/tv/${item.id}`;
  const res = await fetch(pageUrl);
  const html = await res.text();
  const match = html.match(/"image":"(https:\/\/image\.tmdb\.org\/t\/p\/w500\/[^"]+)"/);
  if (!match) {
    console.warn(`No poster for ${item.slug}`);
    continue;
  }
  const imageUrl = match[1];
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    console.warn(`Failed download ${item.slug}: ${imgRes.status}`);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const file = `${item.slug}.jpg`;
  await writeFile(path.join(posterDir, file), buf);
  manifest.movies[item.slug] = `/posters/${file}`;
  console.log(`OK ${item.slug}`);
}

for (const sport of sports) {
  const imgRes = await fetch(sport.url);
  if (!imgRes.ok) {
    console.warn(`Failed sport ${sport.slug}`);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const file = `${sport.slug}.jpg`;
  await writeFile(path.join(sportsDir, file), buf);
  manifest.sports[sport.slug] = `/sports/${file}`;
  console.log(`OK sport ${sport.slug}`);
}

await writeFile(
  path.join(process.cwd(), "public", "media-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("Done", manifest);
