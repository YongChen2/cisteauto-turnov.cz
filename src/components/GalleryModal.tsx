"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/data/services";
import { site } from "@/data/site";

type GalleryModalProps = {
  service: Service;
  onClose: () => void;
};

export default function GalleryModal({ service, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const photos = service.photos;
  const hasMultiple = photos.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMultiple, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40 && hasMultiple) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Fotogalerie: ${service.name}`}
        tabIndex={-1}
        className="relative flex w-full max-w-3xl flex-col outline-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-lg font-semibold text-white">{service.name}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zavřít galerii"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
          {photos[index].natural ? (
            <Image
              src={photos[index].src}
              alt={photos[index].alt ?? `${service.name} — fotografie ${index + 1} z ${photos.length}`}
              width={photos[index].natural.width}
              height={photos[index].natural.height}
              className="max-w-none"
            />
          ) : (
            <Image
              src={photos[index].src}
              alt={photos[index].alt ?? `${service.name} — fotografie ${index + 1} z ${photos.length}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority
            />
          )}

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Předchozí fotografie"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-accent cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Další fotografie"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-accent cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Zobrazit fotografii ${i + 1}`}
                aria-current={i === index}
                className={`h-2 w-2 rounded-full transition cursor-pointer ${
                  i === index ? "bg-accent" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("contact:prefill", { detail: service.slug }));
              onClose();
            }}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover cursor-pointer"
          >
            Objednat / zeptat se
          </button>
          <a
            href={site.phoneHref}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Rovnou zavolat
          </a>
        </div>
      </div>
    </div>
  );
}
