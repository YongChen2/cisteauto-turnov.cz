"use client";

import { site } from "@/data/site";
import { saveConsent, useConsent } from "@/lib/consent";

const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export default function ConsentMap() {
  const consent = useConsent();

  // Both states share the same fixed height, so loading the map never shifts layout.
  if (consent?.externalMedia) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <iframe
          title="Mapa — Čisté auto Turnov"
          src={mapsEmbedUrl}
          className="h-80 w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="flex h-80 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 text-center">
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[var(--accent-text)]" fill="currentColor" aria-hidden="true">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      </svg>
      <p className="text-white">{site.address}</p>
      <p className="max-w-sm text-sm text-white/55">
        Mapa se načítá ze služby Google. Zobrazením souhlasíte s načtením externího obsahu.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => saveConsent({ externalMedia: true })}
          className="min-h-11 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Zobrazit mapu
        </button>
        <a
          href={mapsLinkUrl}
          target="_blank"
          rel="noopener"
          className="flex min-h-11 items-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        >
          Otevřít v Google Mapách
        </a>
      </div>
    </div>
  );
}
