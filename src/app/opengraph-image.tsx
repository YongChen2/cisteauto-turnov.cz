import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/data/site";
import { theme } from "@/lib/theme";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

const logoData = await readFile(join(process.cwd(), "public", site.logo.light), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;
const logoWidth = 640;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          backgroundColor: theme.background,
          backgroundImage: `radial-gradient(ellipse 60% 55% at 50% 38%, ${theme.accent}4d, transparent 70%), linear-gradient(135deg, ${theme.background} 0%, ${theme.surfaceRaised} 100%)`,
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={logoSrc}
          width={logoWidth}
          height={Math.round((logoWidth * site.logo.height) / site.logo.width)}
        />
        <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,0.8)", marginTop: 36 }}>
          {site.claim}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            padding: "14px 40px",
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
