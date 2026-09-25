import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/data/site";
import Header from "@/components/Header";
import MobileCallButton from "@/components/MobileCallButton";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — profesionální detailing vozidel`,
  description:
    "Čištění interiéru, leštění a keramická ochrana laku, PPF fólie a dekarbonizace motoru vodíkem. Detailing v Turnově a okolí — Jiří Rejmont.",
  keywords: [
    "detailing Turnov",
    "čištění interiéru auta",
    "leštění laku",
    "keramická ochrana laku",
    "PPF fólie",
    "dekarbonizace motoru vodíkem",
    "čisté auto Turnov",
  ],
  authors: [{ name: site.owner }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — profesionální detailing vozidel`,
    description:
      "Čištění interiéru, leštění a keramická ochrana laku, PPF fólie a dekarbonizace motoru vodíkem v Turnově.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: site.name,
    image: `${site.url}/images/cisteni-interieru/00-cover.webp`,
    telephone: site.phone,
    email: site.email,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Přepeře 227",
      addressLocality: "Turnov-Přepeře",
      postalCode: "511 01",
      addressCountry: "CZ",
    },
    priceRange: "$$",
  };

  return (
    <html lang="cs" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-neutral-950 pb-16 sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <MobileCallButton />
      </body>
    </html>
  );
}
