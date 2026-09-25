import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0b0c 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            color: "#e11d2e",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Turnov &amp; okolí
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "rgba(255,255,255,0.7)", marginTop: 20 }}>
          {site.claim}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 36,
            fontWeight: 600,
            color: "#e11d2e",
          }}
        >
          {site.phone}
        </div>
      </div>
    ),
    { ...size }
  );
}
