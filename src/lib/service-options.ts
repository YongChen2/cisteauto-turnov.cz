import { services } from "@/data/services";

/** Options of the "Služba" select; kept free of zod so the form can render without it. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "jine", label: "Jiné / více služeb" },
];
