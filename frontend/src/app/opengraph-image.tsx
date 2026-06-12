import { ImageResponse } from "next/og";

export const alt = "SANAD Store";
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
          background: "linear-gradient(135deg, #1F1812 0%, #3D4F3F 55%, #51715E 100%)",
          color: "#F8F4EE",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>Morocco · Cash on Delivery</div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>SANAD</div>
        <div style={{ fontSize: 34, marginTop: 24, lineHeight: 1.4, maxWidth: 820, opacity: 0.95 }}>
          Smart daily support for back, neck, and shoulders.
        </div>
        <div style={{ marginTop: 48, fontSize: 24, opacity: 0.8 }}>sanad.ma</div>
      </div>
    ),
    { ...size }
  );
}
