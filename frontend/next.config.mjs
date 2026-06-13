/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
];

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "sonner"]
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
        source: "/sports/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }]
      }
    ];
  }
};

export default nextConfig;
