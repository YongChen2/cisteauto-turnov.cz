"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, parseContactFormData, serviceOptions } from "@/lib/contact-schema";
import { site } from "@/data/site";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ReturnType<typeof parseContactFormData>, string>>;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FILL_TIME_MS = 3000;

// In-memory, per server instance — resets on redeploy/cold start. Good enough
// to blunt naive spam bots without adding external infrastructure.
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const FALLBACK_ERROR: ContactActionState = {
  status: "error",
  message: `Odeslání se nezdařilo, zavolejte nám prosím na ${site.phone}.`,
};

export async function submitContact(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  // Honeypot — a real visitor never fills this field.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  const elapsed = Date.now() - startedAt;

  if (honeypot.trim() !== "" || !startedAt || elapsed < MIN_FILL_TIME_MS) {
    // Pretend success so bots don't learn anything from the response.
    return { status: "success", message: "Děkujeme, ozveme se vám co nejdříve." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Odesláno příliš mnoho poptávek. Zkuste to prosím za chvíli znovu.",
    };
  }

  const values = parseContactFormData(formData);
  const result = contactSchema.safeParse(values);

  if (!result.success) {
    const errors: ContactActionState["errors"] = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in errors)) {
        errors[field as keyof typeof errors] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Zkontrolujte prosím vyplněná pole.",
      errors,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("submitContact: RESEND_API_KEY is not configured");
    return FALLBACK_ERROR;
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) {
    console.error("submitContact: CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not configured");
    return FALLBACK_ERROR;
  }

  const data = result.data;
  const serviceLabel =
    serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;

  const textLines = [
    `Jméno: ${data.name}`,
    `Telefon: ${data.phone}`,
    data.email ? `E-mail: ${data.email}` : null,
    `Služba: ${serviceLabel}`,
    data.carModel ? `Vozidlo: ${data.carModel}` : null,
    data.preferredDate ? `Preferovaný termín: ${data.preferredDate}` : null,
    data.message ? `Zpráva:\n${data.message}` : null,
  ].filter(Boolean);

  const html = `
    <h2>Nová poptávka z webu</h2>
    <p><strong>Jméno:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>
    ${data.email ? `<p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>` : ""}
    <p><strong>Služba:</strong> ${escapeHtml(serviceLabel)}</p>
    ${data.carModel ? `<p><strong>Vozidlo:</strong> ${escapeHtml(data.carModel)}</p>` : ""}
    ${data.preferredDate ? `<p><strong>Preferovaný termín:</strong> ${escapeHtml(data.preferredDate)}</p>` : ""}
    ${data.message ? `<p><strong>Zpráva:</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>` : ""}
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Poptávka z webu – ${serviceLabel} – ${data.name}`,
      text: textLines.join("\n"),
      html,
    });

    if (error) {
      console.error("submitContact: Resend error", error);
      return FALLBACK_ERROR;
    }
  } catch (err) {
    console.error("submitContact: unexpected error", err);
    return FALLBACK_ERROR;
  }

  return { status: "success", message: "Děkujeme, ozveme se vám co nejdříve." };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
