/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreRoot = path.join(__dirname, "./packages/core/src/index.ts");
const extensionsRoot = path.join(__dirname, "./packages/extensions/index.ts");

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https://connect.facebook.net https://analytics.tiktok.com https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://analytics.tiktok.com https://plausible.io https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  { key: "Content-Security-Policy", value: csp }
];

const nextConfig = {
  transpilePackages: ["@sanad/core", "@sanad/extensions"],
  turbopack: {
    resolveAlias: {
      "@sanad/core": "./packages/core/src/index.ts",
      "@sanad/extensions": "./packages/extensions/index.ts"
    }
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256]
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias["@sanad/core"] = coreRoot;
    config.resolve.alias["@sanad/extensions"] = extensionsRoot;
    config.resolve.alias["@sanad/extensions/analytics-extension/aggregator"] = path.join(
      __dirname,
      "./packages/extensions/analytics-extension/aggregator.ts"
    );
    if (!isServer) {
      config.resolve.alias["@sanad/core"] = false;
      config.resolve.alias["@sanad/extensions"] = false;
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "sonner"],
    externalDir: true
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      {
        source: "/(.*\\.(?:ico|png|jpg|jpeg|webp|avif|svg|woff2?))",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/((?!admin|api).*)",
        headers: [{ key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=300" }]
      },
      {
        source: "/sports/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }]
      }
    ];
  }
};

export default nextConfig;
