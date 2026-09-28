"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_SETTINGS_EVENT, saveConsent, useConsent } from "@/lib/consent";

const BANNER_HEIGHT_VAR = "--cookie-banner-height";

export default function CookieConsent() {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [externalMedia, setExternalMedia] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // `null` = visitor has not decided yet (or consent expired); `undefined`
  // = still hydrating, so nothing renders on the server.
  const showBanner = consent === null;

  useEffect(() => {
    const handleOpen = () => {
      setExternalMedia(consent?.externalMedia ?? false);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpen);
  }, [consent]);

  // Native <dialog>.showModal() makes the rest of the page inert (focus stays
  // inside), closes on Esc and returns focus to the opener when closed.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (settingsOpen && !dialog.open) dialog.showModal();
    if (!settingsOpen && dialog.open) dialog.close();
  }, [settingsOpen]);

  // Expose the banner height so the fixed mobile call button can sit above it.
  useEffect(() => {
    const banner = bannerRef.current;
    const root = document.documentElement;
    if (!showBanner || !banner) {
      root.style.removeProperty(BANNER_HEIGHT_VAR);
      return;
    }
    const observer = new ResizeObserver(() => {
      root.style.setProperty(BANNER_HEIGHT_VAR, `${banner.offsetHeight}px`);
    });
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty(BANNER_HEIGHT_VAR);
    };
  }, [showBanner]);

  const openSettings = () => {
    setExternalMedia(consent?.externalMedia ?? false);
    setSettingsOpen(true);
  };

  const decide = (value: boolean) => {
    saveConsent({ externalMedia: value });
    setSettingsOpen(false);
  };

  return (
    <>
      {showBanner && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Souhlas s cookies"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-neutral-900/95 backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p className="text-sm leading-relaxed text-white/75">
              Web používá nezbytné úložiště pro zapamatování vaší volby. Mapu Google načteme jen
              s vaším souhlasem.{" "}
              <a href="/cookies" className="underline hover:text-accent-text">
                Zásady cookies
              </a>
            </p>
            <div className="grid flex-shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <button type="button" onClick={() => decide(true)} className={primaryButton}>
                Přijmout vše
              </button>
              <button type="button" onClick={() => decide(false)} className={primaryButton}>
                Odmítnout
              </button>
              <button
                type="button"
                onClick={openSettings}
                className={`${secondaryButton} col-span-2 sm:col-span-1`}
              >
                Nastavení
              </button>
            </div>
          </div>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
        onClose={() => setSettingsOpen(false)}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-white/15 bg-neutral-900 p-0 text-white backdrop:bg-black/70"
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-settings-title" className="text-lg font-semibold">
              Nastavení cookies
            </h2>
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              aria-label="Zavřít nastavení cookies"
              className="-m-2 flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p id="cookie-settings-description" className="text-sm leading-relaxed text-white/65">
            Vyberte, které kategorie smíme používat. Volbu můžete kdykoli změnit v patičce webu.
          </p>

          <ConsentToggle
            id="consent-necessary"
            title="Nezbytné"
            description="Uložení vaší volby souhlasu. Bez nich web nemůže správně fungovat."
            checked
            disabled
          />
          <ConsentToggle
            id="consent-external-media"
            title="Externí obsah – mapy"
            description="Načtení mapy Google v sekci Kontakt. Google při tom může ukládat cookies a zpracovávat vaši IP adresu."
            checked={externalMedia}
            onChange={setExternalMedia}
          />

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => decide(externalMedia)} className={primaryButton}>
              Uložit nastavení
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ConsentToggle({
  id,
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-white">
          {title}
          {disabled && <span className="ml-2 text-xs font-normal text-white/50">vždy zapnuto</span>}
        </label>
        <p id={`${id}-description`} className="mt-1 text-sm leading-relaxed text-white/60">
          {description}
        </p>
      </div>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        aria-describedby={`${id}-description`}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-6 w-11 flex-shrink-0 cursor-pointer appearance-none rounded-full bg-white/20 transition before:block before:h-5 before:w-5 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-white before:transition checked:bg-accent checked:before:translate-x-[1.375rem] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

const primaryButton =
  "min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover";
const secondaryButton =
  "min-h-11 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";
