"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { BeforeAfterPair } from "@/data/services";
import { blurProps } from "@/lib/image-meta";
import { BEFORE_AFTER_SIZES } from "@/lib/gallery";

type BeforeAfterSliderProps = {
  pair: BeforeAfterPair;
};

/**
 * "After" photo underneath, "before" photo on top clipped to the left of the divider.
 * Only the handle (or the visually hidden range input) moves the divider, so dragging it
 * never scrolls the page or switches gallery items. Remount (key) to reset to 50 %.
 */
export default function BeforeAfterSlider({ pair }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div ref={rootRef} className="relative h-full w-full select-none overflow-hidden">
      <Image
        src={pair.after}
        alt={`Po čištění: ${pair.alt}`}
        fill
        sizes={BEFORE_AFTER_SIZES}
        loading="eager"
        draggable={false}
        {...blurProps(pair.after)}
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={pair.before}
          alt={`Před čištěním: ${pair.alt}`}
          fill
          sizes={BEFORE_AFTER_SIZES}
          loading="eager"
          draggable={false}
          {...blurProps(pair.before)}
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold text-white">
        Před
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-sm font-semibold text-white">
        Po
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Porovnání před a po: ${pair.alt}`}
        aria-valuetext={`${Math.round(position)} % fotky před čištěním`}
        className="peer sr-only"
      />

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_6px_rgba(0,0,0,0.6)]" style={{ left: `${position}%` }} />
      <div
        role="presentation"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) moveTo(e.clientX);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => (dragging.current = false)}
        className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border-2 border-white bg-accent text-white shadow-lg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text"
        style={{ left: `${position}%` }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}
