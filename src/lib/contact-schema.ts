import { z } from "zod";
import { services } from "@/data/services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "jine", label: "Jiné / více služeb" },
];

const allowedServiceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Zadejte prosím jméno a příjmení")
    .max(100, "Jméno je příliš dlouhé"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .regex(/^(\+420)?\d{9}$/, "Zadejte platné telefonní číslo, např. 702 383 702")
    ),
  email: z
    .union([z.literal(""), z.string().trim().email("Zadejte platný e-mail")])
    .optional()
    .default(""),
  service: z.enum(allowedServiceValues, { message: "Vyberte prosím službu" }),
  carModel: z.string().trim().max(100, "Příliš dlouhý text").optional().default(""),
  preferredDate: z.string().trim().max(200, "Příliš dlouhý text").optional().default(""),
  message: z.string().trim().max(1000, "Zpráva může mít max. 1000 znaků").optional().default(""),
  consent: z.string().refine((v) => v === "on", {
    message: "Je nutné souhlasit se zpracováním osobních údajů",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  carModel: string;
  preferredDate: string;
  message: string;
  consent: string;
};

export function parseContactFormData(formData: FormData): ContactFormValues {
  return {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    service: String(formData.get("service") ?? ""),
    carModel: String(formData.get("carModel") ?? ""),
    preferredDate: String(formData.get("preferredDate") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: String(formData.get("consent") ?? ""),
  };
}
