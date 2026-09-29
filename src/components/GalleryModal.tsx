"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Service } from "@/data/services";
import { site } from "@/data/site";
import { blurProps } from "@/lib/image-meta";
import { GALLERY_SIZES } from "@/lib/gallery";

type GalleryModalProps = {
  service: Service;
  onClose: () => void;
};

const SWIPE_DISTANCE = 40;
const CLOSE_SWIPE_DISTANCE = 90;

export default function GalleryModal({ service, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onCloseRef = useRef(onClose);
  const afterCloseRef = useRef<(() => void) | null>(null);
  const photos = service.photos;
  const count = photos.length;
  const hasMultiple = count > 1;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const goPrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Closing goes through history so the phone's back button/gesture also closes the gallery.
  const requestClose = useCallback(() => window.history.back(), []);

  const markLoaded = useCallback((i: number) => {
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);

  useEffect(() => {
    // Scroll lock that also holds on iOS Safari: pin the body at the current offset.
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
    };
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      overflow: "hidden",
    });

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    window.history.pushState({ gallery: service.slug }, "");
    const handlePopState = () => onCloseRef.current();
    window.addEventListener("popstate", handlePopState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      if (hasMultiple && e.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (hasMultiple && e.key === "ArrowRight") {
        goNext();
        return;
      }
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
      previouslyFocused?.focus({ preventScroll: true });
      afterCloseRef.current?.();
    };
  }, [service.slug, hasMultiple, goPrev, goNext, requestClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) > CLOSE_SWIPE_DISTANCE) requestClose();
      return;
    }
    if (hasMultiple && Math.abs(dx) > SWIPE_DISTANCE) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const photoAlt = (i: number) =>
    photos[i].alt ?? `${service.name} — fotografie ${i + 1} z ${count}`;

  return (
    <div
      className="fixed inset-0 z-50 flex h-[100dvh] items-stretch justify-center bg-black/90 sm:items-center sm:px-4 sm:py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Fotogalerie: ${service.name}`}
        tabIndex={-1}
        className="relative flex h-full w-full max-w-4xl flex-col overscroll-contain outline-none sm:h-auto"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-0 sm:pb-3 sm:pt-0">
          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Zavřít galerii"
            className="-mr-2 flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Fixed-size stage: every photo is stacked and cross-faded, so switching never shifts layout. */}
        <div className="relative min-h-0 w-full flex-1 overflow-hidden bg-neutral-900 sm:aspect-[4/3] sm:flex-none sm:rounded-xl">
          {photos.map((photo, i) => {
            const active = i === index;
            return (
              <div
                key={photo.src + i}
                aria-hidden={!active}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out will-change-[opacity] ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {photo.natural ? (
                  <Image
                    src={photo.src}
                    alt={photoAlt(i)}
                    width={photo.natural.width}
                    height={photo.natural.height}
                    loading="eager"
                    fetchPriority={active ? "high" : "low"}
                    onLoad={() => markLoaded(i)}
                    {...blurProps(photo.src)}
                    className="max-w-full"
                  />
                ) : (
                  <Image
                    src={photo.src}
                    alt={photoAlt(i)}
                    fill
                    sizes={GALLERY_SIZES}
                    loading="eager"
                    fetchPriority={active ? "high" : "low"}
                    onLoad={() => markLoaded(i)}
                    {...blurProps(photo.src)}
                    className="object-contain"
                  />
                )}
              </div>
            );
          })}

          {!loaded.has(index) && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" role="status">
              <span className="sr-only">Načítání fotografie…</span>
              <svg viewBox="0 0 24 24" className="h-8 w-8 animate-spin text-white/70" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Předchozí fotografie"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-accent"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Další fotografie"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-accent"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="mt-1 flex items-center justify-center">
            {photos.map((photo, i) => (
              <button
                key={photo.src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Zobrazit fotografii ${i + 1}`}
                aria-current={i === index}
                className="group flex h-11 w-7 cursor-pointer items-center justify-center"
              >
                <span
                  className={`h-2 w-2 rounded-full transition ${
                    i === index ? "bg-accent" : "bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 px-4 pb-4 pt-2 sm:px-0 sm:pb-0 sm:pt-3">
          <button
            type="button"
            onClick={() => {
              // Scroll to the form only after the page scroll position has been restored.
              afterCloseRef.current = () =>
                window.dispatchEvent(new CustomEvent("contact:prefill", { detail: service.slug }));
              requestClose();
            }}
            className="min-h-11 cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Objednat / zeptat se
          </button>
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Rovnou zavolat
          </a>
        </div>
      </div>
    </div>
  );
}
