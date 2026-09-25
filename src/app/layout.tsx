import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    image: `${site.url}/images/cisteni-interieru/01.jpg`,
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
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
