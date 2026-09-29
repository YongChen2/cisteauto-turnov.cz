"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/nav";

/** Hamburger navigation for phones; closes on link tap, outside tap and Esc. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <nav
        id={panelId}
        aria-label="Hlavní navigace"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-white/10 bg-neutral-950/95 backdrop-blur"
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-white/5 text-base font-medium text-white/85 transition last:border-0 hover:text-accent-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
