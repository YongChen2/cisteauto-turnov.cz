"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-config";

export type ConsentState = {
  necessary: true;
  externalMedia: boolean;
  date: string;
  version: number;
};

const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const CHANGE_EVENT = "cookie-consent:change";
export const OPEN_SETTINGS_EVENT = "cookie-consent:open-settings";

// useSyncExternalStore needs a referentially stable snapshot, so the parsed
// value is cached per raw localStorage string.
let cachedRaw: string | null | undefined;
let cachedConsent: ConsentState | null = null;
// Fallback when localStorage is unavailable (blocked site data etc.) — the
// choice then lasts for the current page view only.
let memoryRaw: string | null = null;

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (value.version !== CONSENT_VERSION || typeof value.date !== "string") return null;
    const age = Date.now() - new Date(value.date).getTime();
    if (!Number.isFinite(age) || age > CONSENT_MAX_AGE_MS) return null;
    return {
      necessary: true,
      externalMedia: value.externalMedia === true,
      date: value.date,
      version: value.version,
    };
  } catch {
    return null;
  }
}

function readConsent(): ConsentState | null {
  let raw: string | null = memoryRaw;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? memoryRaw;
  } catch {
    // keep memoryRaw
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Current consent: `undefined` while rendering on the server / hydrating
 * (unknown), `null` when the visitor has not decided yet or consent expired.
 */
export function useConsent(): ConsentState | null | undefined {
  return useSyncExternalStore<ConsentState | null | undefined>(
    subscribe,
    readConsent,
    () => undefined
  );
}

export function saveConsent({ externalMedia }: { externalMedia: boolean }) {
  const value: ConsentState = {
    necessary: true,
    externalMedia,
    date: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  const raw = JSON.stringify(value);
  memoryRaw = raw;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw);
  } catch {
    // Storage blocked — memoryRaw keeps the choice for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
