"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({
  className,
  children = "Nastavení cookies",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
