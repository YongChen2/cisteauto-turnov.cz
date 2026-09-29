"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function MobileCallButton() {
  const [contactVisible, setContactVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  // The contact section has its own call buttons and the form's submit button, so the bar
  // steps aside there — and while the on-screen keyboard is up for a form field.
  useEffect(() => {
    const contact = document.getElementById("kontakt");
    let observer: IntersectionObserver | undefined;
    if (contact) {
      observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), {
        rootMargin: "0px 0px -20% 0px",
      });
      observer.observe(contact);
    }
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select");
    const handleFocusIn = (e: FocusEvent) => setTyping(isField(e.target));
    const handleFocusOut = () => setTyping(false);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const hidden = contactVisible || typing;

  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`fixed inset-x-0 z-(--z-callbar) border-t border-white/10 bg-neutral-950/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        hidden ? "translate-y-[150%]" : "translate-y-0"
      }`}
      style={{
        // Sits above the cookie banner while it is shown (set by CookieConsent).
        bottom: "var(--cookie-banner-height, 0px)",
        paddingBottom:
          "max(0.75rem, calc(env(safe-area-inset-bottom, 0px) - var(--cookie-banner-height, 0px)))",
      }}
    >
      <a
        href={site.phoneHref}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-base font-semibold text-white transition active:bg-accent-hover"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
        Zavolat {site.phone}
      </a>
    </div>
  );
}
