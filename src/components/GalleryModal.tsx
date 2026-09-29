"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BeforeAfterPair, Service } from "@/data/services";
import { site } from "@/data/site";
import { blurProps } from "@/lib/image-meta";
import { GALLERY_SIZES, preloadBeforeAfter } from "@/lib/gallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type GalleryModalProps = {
  service: Service;
  onClose: () => void;
};

const NO_PAIRS: BeforeAfterPair[] = [];
const SWIPE_DISTANCE = 40;
/** Movement after which a touch is locked to one axis; only horizontal swipes switch photos. */
const DIRECTION_LOCK = 10;

export default function GalleryModal({ service, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number; axis: "x" | "y" | null } | null>(null);
  const onCloseRef = useRef(onClose);
  const afterCloseRef = useRef<(() => void) | null>(null);
  const photos = service.photos;
  // Services with before/after pairs show a comparison slider instead of plain photos.
  const pairs = service.beforeAfter ?? NO_PAIRS;
  const isPairs = pairs.length > 0;
  const count = isPairs ? pairs.length : photos.length;
  const hasMultiple = count > 1;
  const itemLabel = isPairs ? "porovnání" : "fotografie";

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const goPrev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Closing is always immediate and idempotent; the history entry is tidied up on unmount.
  const requestClose = useCallback(() => onCloseRef.current(), []);

  // Current pair plus its neighbours are always ready (the first one was warmed on card hover).
  useEffect(() => {
    if (!isPairs) return;
    preloadBeforeAfter(pairs[index]);
    preloadBeforeAfter(pairs[(index + 1) % count]);
    preloadBeforeAfter(pairs[(index - 1 + count) % count]);
  }, [isPairs, pairs, index, count]);

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

    // Own history entry so the phone's back button/gesture closes the gallery.
    window.history.pushState({ galleryModal: service.slug }, "");
    const handlePopState = () => onCloseRef.current();
    window.addEventListener("popstate", handlePopState);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }
      // Arrow keys on the before/after range input move the slider, not the gallery.
      const onRange = e.target instanceof HTMLInputElement && e.target.type === "range";
      if (hasMultiple && !onRange && e.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (hasMultiple && !onRange && e.key === "ArrowRight") {
        goNext();
        return;
      }
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, input, [href], [tabindex]:not([tabindex="-1"])'
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
      // Closed by the UI (not by Back): drop our history entry; the listener is already gone.
      if (window.history.state?.galleryModal) window.history.back();
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
      previouslyFocused?.focus({ preventScroll: true });
      afterCloseRef.current?.();
    };
  }, [service.slug, hasMultiple, goPrev, goNext, requestClose]);

  // Gestures only read coordinates (no drag transform), so an interrupted swipe leaves no state behind.
  const handleTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, axis: null };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const t = touch.current;
    if (!t || t.axis) return;
    const dx = Math.abs(e.touches[0].clientX - t.x);
    const dy = Math.abs(e.touches[0].clientY - t.y);
    if (dx > DIRECTION_LOCK || dy > DIRECTION_LOCK) t.axis = dx > dy ? "x" : "y";
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const t = touch.current;
    touch.current = null;
    if (!t || t.axis !== "x" || !hasMultiple) return;
    const dx = e.changedTouches[0].clientX - t.x;
    if (Math.abs(dx) > SWIPE_DISTANCE) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const handleTouchCancel = () => {
    touch.current = null;
  };

  const photoAlt = (i: number) =>
    photos[i].alt ?? `${service.name} — fotografie ${i + 1} z ${count}`;

  // Portal to <body>: no ancestor transform/opacity/stacking context can offset or clip the modal.
  return createPortal(
    <div
      className="fixed inset-0 z-(--z-modal) flex h-[100dvh] items-stretch justify-center bg-neutral-950 sm:items-center sm:bg-black/90 sm:px-4 sm:py-8"
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
        className="relative flex h-full w-full max-w-4xl flex-col overflow-y-auto overscroll-contain outline-none sm:h-auto sm:max-h-[calc(100dvh-4rem)]"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
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
        {/* Swipe gestures live on the photo only, so the text below can still scroll normally.
            Before/after pairs have no swipe: dragging the slider handle must never switch pairs. */}
        <div
          className={
            isPairs
              ? "relative mx-auto aspect-[3/4] w-full max-w-[min(100%,calc(62dvh*0.75))] flex-none overflow-hidden bg-neutral-900 sm:rounded-xl"
              : "relative aspect-[4/3] max-h-[55dvh] w-full flex-none overflow-hidden bg-neutral-900 sm:rounded-xl"
          }
          {...(isPairs
            ? {}
            : {
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
                onTouchCancel: handleTouchCancel,
              })}
        >
          {isPairs && <BeforeAfterSlider key={index} pair={pairs[index]} />}
          {!isPairs && photos.map((photo, i) => {
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

          {!isPairs && !loaded.has(index) && (
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
                aria-label={`Předchozí ${itemLabel}`}
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-accent"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={`Další ${itemLabel}`}
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
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Zobrazit ${itemLabel} ${i + 1} z ${count}`}
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

        <div className="px-4 pt-2 sm:px-0">
          {service.priceVariants ? (
            <dl className="divide-y divide-white/10 rounded-xl border border-white/10 text-sm">
              {service.priceVariants.map((v) => (
                <div key={v.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 px-4 py-2.5">
                  <dt className="text-white/85">{v.label}</dt>
                  <dd className="whitespace-nowrap font-semibold text-accent-text">{v.price}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-base font-semibold text-accent-text">{service.price}</p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-white/70">{service.description}</p>
          {service.highlights && (
            <ul className="mt-3 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
              {service.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-text"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 px-4 pb-4 pt-4 sm:px-0 sm:pb-0">
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
    </div>,
    document.body
  );
}
