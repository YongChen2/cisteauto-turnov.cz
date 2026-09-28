import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { theme } from "@/lib/theme";

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
          backgroundColor: theme.background,
          backgroundImage: `radial-gradient(ellipse 70% 80% at 0% 40%, ${theme.accent}59, transparent 70%), linear-gradient(135deg, ${theme.background} 0%, ${theme.surfaceRaised} 100%)`,
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
            color: theme.accentText,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", width: 48, height: 4, borderRadius: 2, background: theme.accent }} />
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
            alignSelf: "flex-start",
            marginTop: 48,
            padding: "16px 40px",
            borderRadius: 999,
            fontSize: 36,
            fontWeight: 600,
            color: "#fff",
            background: theme.accent,
          }}
        >
          {site.phone}
        </div>
      </div>
    ),
    { ...size }
  );
}
