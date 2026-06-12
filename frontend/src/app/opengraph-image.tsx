import { ImageResponse } from "next/og";

export const alt = "SANAD IPTV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0A0A0A 0%, #0D2137 50%, #003333 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ fontSize: 28, color: "#00E5FF", marginBottom: 16 }}>🔥 IPTV Subscriptions</div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>SANAD IPTV</div>
        <div style={{ fontSize: 34, marginTop: 24, lineHeight: 1.4, maxWidth: 820, opacity: 0.95 }}>
          Watch without limits — 100,000+ channels in HD, FHD & 4K
        </div>
        <div style={{ marginTop: 48, fontSize: 24, color: "#00FF95" }}>Free trial available</div>
      </div>
    ),
    { ...size }
  );
}
