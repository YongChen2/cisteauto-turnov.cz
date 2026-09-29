"use client";

import { useEffect, useRef, useState } from "react";
import type { ContactFormValues } from "@/lib/contact-schema";
import { serviceOptions } from "@/lib/service-options";
import { site } from "@/data/site";

const loadSchema = () => import("@/lib/contact-schema");

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;
const MIN_FILL_TIME_MS = 3000;
const SUCCESS_MESSAGE = "Děkujeme, ozveme se vám co nejdříve.";
const ERROR_MESSAGE = `Odeslání se nezdařilo, zavolejte nám prosím na ${site.phone}.`;
const ACTIVATION_MESSAGE = `Formulář čeká na aktivaci, zavolejte nám prosím na ${site.phone}.`;

type FormSubmitResponse = { success?: boolean | string; message?: string };

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formKey, setFormKey] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isPending = status === "submitting";

  // Anti-spam timer: must sync with the real (client) clock, which only
  // exists after mount — a legitimate external-system effect.
  const startedAtRef = useRef(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
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

  const succeed = () => {
    // Remount the (uncontrolled) form to clear it and re-arm the timer.
    setFormKey((k) => k + 1);
    setSelectedService("");
    setErrors({});
    setStatus("success");
    setStatusMessage(SUCCESS_MESSAGE);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const honeypot = String(formData.get("_honey") ?? "");
    const elapsed = Date.now() - startedAtRef.current;

    // zod is loaded on demand (warmed on first focus) to keep it out of the initial page JS.
    const { contactSchema, parseContactFormData } = await loadSchema();
    const result = contactSchema.safeParse(parseContactFormData(formData));
    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof FieldErrors] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Zkontrolujte prosím vyplněná pole.");
      return;
    }
    setErrors({});

    if (honeypot.trim() !== "" || !startedAtRef.current || elapsed < MIN_FILL_TIME_MS) {
      // Pretend success so bots don't learn anything from the response.
      succeed();
      return;
    }

    const data = result.data;
    const serviceLabel =
      serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;

    const payload: Record<string, string> = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      sluzba: serviceLabel,
      vuz: data.carModel,
      termin: data.preferredDate,
      message: data.message,
      _subject: `Poptávka z webu – ${serviceLabel} – ${data.name}`,
      _template: "table",
      _captcha: "false",
      _honey: honeypot,
    };
    if (data.email) payload._replyto = data.email;

    setStatus("submitting");
    setStatusMessage("");
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.text();
      let json: FormSubmitResponse | null = null;
      try {
        json = JSON.parse(body) as FormSubmitResponse;
      } catch {
        // non-JSON body (e.g. HTML error page) — logged below
      }

      if (response.ok && String(json?.success) === "true") {
        succeed();
        return;
      }

      setStatus("error");
      // FormSubmit answers success "false" until the owner clicks the
      // activation link it e-mails after the first submission.
      if (/activat/i.test(json?.message ?? "")) {
        console.warn("ContactForm: FormSubmit form is not activated yet", {
          status: response.status,
          body: json ?? body,
        });
        setStatusMessage(ACTIVATION_MESSAGE);
        return;
      }
      console.error("ContactForm: submission failed", { status: response.status, body });
      setStatusMessage(ERROR_MESSAGE);
    } catch (err) {
      console.error("ContactForm: submission failed (network error)", err);
      setStatus("error");
      setStatusMessage(ERROR_MESSAGE);
    }
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
        onSubmit={handleSubmit}
        onFocusCapture={() => void loadSchema()}
        noValidate
        className="mt-6 flex flex-col gap-1"
      >
        {/* Honeypot — hidden from real visitors, catches simple bots */}
        <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <label htmlFor="_honey">Nevyplňujte toto pole</label>
          <input type="text" id="_honey" name="_honey" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2">
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
              className={inputClass(Boolean(errors.service), "select")}
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
            className={inputClass(Boolean(errors.message), "textarea")}
          />
        </Field>

        <div className="mt-2">
          <label htmlFor="consent" className="flex min-h-11 items-start gap-3 text-sm text-white/70">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-white/30 bg-transparent accent-accent"
            />
            <span>
              Souhlasím se{" "}
              <a href="/ochrana-osobnich-udaju" className="underline hover:text-accent-text">
                zpracováním osobních údajů
              </a>{" "}
              za účelem vyřízení poptávky.
            </span>
          </label>
          <div className="mt-1 min-h-5">
            {errors.consent && <ErrorMessage id="consent-error">{errors.consent}</ErrorMessage>}
          </div>
        </div>

        <div className="min-h-6" aria-live="polite">
          {status === "success" && (
            <p className="text-sm font-medium text-emerald-400">{statusMessage}</p>
          )}
          {status === "error" && !Object.keys(errors).length && (
            <ErrorMessage className="font-medium">{statusMessage}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
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

const controlSize = {
  // identical fixed height for text inputs and the select
  input: "h-11 px-4",
  // native arrow removed so the select renders at the same height as inputs
  select:
    "select-chevron h-11 appearance-none pl-4 pr-10 [&>option]:bg-neutral-900",
  textarea: "min-h-28 px-4 py-2.5 resize-y",
};

function inputClass(hasError: boolean, kind: keyof typeof controlSize = "input") {
  return `block w-full rounded-xl border bg-white/[0.03] text-base text-white placeholder:text-white/50 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 ${
    controlSize[kind]
  } ${hasError ? "border-danger" : "border-white/15"}`;
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
    <div className="flex flex-col justify-end">
      <label htmlFor={htmlFor} className="mb-1.5 text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-accent-text"> *</span>}
      </label>
      {children}
      {/* fixed slot for one line of error text so fields don't jump */}
      <div className="mt-1 min-h-5">
        {error && <ErrorMessage id={`${htmlFor}-error`}>{error}</ErrorMessage>}
      </div>
    </div>
  );
}

// Errors use the separate "danger" token plus a warning icon, so they are
// distinguishable from the red accent without relying on color alone.
function ErrorMessage({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} className={`flex items-start gap-1.5 text-sm text-danger ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinejoin="round" d="M12 3.5 2.5 20h19L12 3.5Z" />
        <path strokeLinecap="round" d="M12 10v4.5M12 17.2v.1" />
      </svg>
      <span>
        <span className="sr-only">Chyba: </span>
        {children}
      </span>
    </p>
  );
}
