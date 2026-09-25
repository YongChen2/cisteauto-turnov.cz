"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactActionState } from "@/app/actions/contact";
import { contactSchema, parseContactFormData, serviceOptions } from "@/lib/contact-schema";

const initialState: ContactActionState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactActionState["errors"]>();
  const [formKey, setFormKey] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Anti-spam timer: must sync with the real (client) clock, which only
  // exists after mount — a legitimate external-system effect.
  const [startedAt, setStartedAt] = useState<number>(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartedAt(Date.now());
  }, [formKey]);

  // Deep-link prefill (?sluzba=slug) — read directly from the browser URL
  // (not next/navigation's useSearchParams) so this component keeps
  // rendering fully on the server instead of bailing out to a client-only
  // Suspense fallback.
  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("sluzba");
    if (fromQuery && serviceOptions.some((o) => o.value === fromQuery)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedService(fromQuery);
    }
  }, []);

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (serviceOptions.some((o) => o.value === slug)) {
        setSelectedService(slug);
      }
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => nameInputRef.current?.focus(), 400);
    };
    window.addEventListener("contact:prefill", handlePrefill);
    return () => window.removeEventListener("contact:prefill", handlePrefill);
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      // Remount the (uncontrolled) form to clear it and re-arm the timer —
      // a genuine reaction to the server action's result, not derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormKey((k) => k + 1);
      setSelectedService("");
      setClientErrors(undefined);
    }
  }, [state]);

  const errors = clientErrors ?? state.errors ?? {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const values = parseContactFormData(formData);
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      e.preventDefault();
      const nextErrors: ContactActionState["errors"] = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof typeof nextErrors] = issue.message;
        }
      }
      setClientErrors(nextErrors);
      return;
    }
    setClientErrors(undefined);
  };

  return (
    <div id="poptavka">
      <h3 className="text-xl font-semibold text-white">Napište nám / nezávazná poptávka</h3>
      <p className="mt-2 text-sm text-white/60">
        Vyplňte formulář a ozveme se vám zpět, obvykle do druhého pracovního dne.
      </p>

      <form
        ref={formRef}
        key={formKey}
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 flex flex-col gap-5"
      >
        {/* Honeypot — hidden from real visitors, catches simple bots */}
        <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="website">Nevyplňujte toto pole</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="startedAt" value={startedAt} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Jméno a příjmení" htmlFor="name" error={errors.name} required>
            <input
              ref={nameInputRef}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass(Boolean(errors.name))}
            />
          </Field>

          <Field label="Telefon" htmlFor="phone" error={errors.phone} required>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="702 383 702"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass(Boolean(errors.phone))}
            />
          </Field>

          <Field label="E-mail (nepovinné)" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>

          <Field label="Služba" htmlFor="service" error={errors.service} required>
            <select
              id="service"
              name="service"
              required
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={inputClass(Boolean(errors.service))}
            >
              <option value="" disabled>
                Vyberte službu
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Značka a model vozu (nepovinné)" htmlFor="carModel" error={errors.carModel}>
            <input
              id="carModel"
              name="carModel"
              type="text"
              autoComplete="off"
              aria-invalid={Boolean(errors.carModel)}
              aria-describedby={errors.carModel ? "carModel-error" : undefined}
              className={inputClass(Boolean(errors.carModel))}
            />
          </Field>

          <Field
            label="Preferovaný termín (nepovinné)"
            htmlFor="preferredDate"
            error={errors.preferredDate}
          >
            <input
              id="preferredDate"
              name="preferredDate"
              type="text"
              placeholder="např. příští týden odpoledne"
              autoComplete="off"
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
              className={inputClass(Boolean(errors.preferredDate))}
            />
          </Field>
        </div>

        <Field label="Zpráva (nepovinné)" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClass(Boolean(errors.message))}
          />
        </Field>

        <div>
          <label htmlFor="consent" className="flex min-h-11 items-start gap-3 text-sm text-white/70">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-white/30 bg-transparent accent-[var(--accent)]"
            />
            <span>
              Souhlasím se{" "}
              <a href="/ochrana-osobnich-udaju" className="underline hover:text-white">
                zpracováním osobních údajů
              </a>{" "}
              za účelem vyřízení poptávky.
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1 text-sm text-[var(--accent-text)]">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="min-h-6" aria-live="polite">
          {state.status === "success" && (
            <p className="text-sm font-medium text-emerald-400">{state.message}</p>
          )}
          {state.status === "error" && !Object.keys(errors).length && (
            <p className="text-sm font-medium text-[var(--accent-text)]">{state.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {isPending ? "Odesílání…" : "Odeslat poptávku"}
        </button>
      </form>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `min-h-11 w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] ${
    hasError ? "border-[var(--accent)]" : "border-white/15"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-[var(--accent-text)]"> *</span>}
      </label>
      {children}
      <div className="min-h-5">
        {error && (
          <p id={`${htmlFor}-error`} className="text-sm text-[var(--accent-text)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
