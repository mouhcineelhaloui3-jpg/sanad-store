import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A"
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0D2137 0%, #003333 100%)",
            border: "2px solid #00E5FF",
            boxShadow: "0 0 8px rgba(0,229,255,0.45)"
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: 3,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "9px solid #00FF95"
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
