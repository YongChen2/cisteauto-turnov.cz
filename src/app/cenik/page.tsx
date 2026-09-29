import type { Metadata } from "next";
import { site } from "@/data/site";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Ceník — ${site.name}`,
  description:
    "Ceník čištění interiéru, příplatků, čištění exteriéru, voskování a čištění klimatizace ozónem. JR Detailing – Čisté auto Turnov, Přepeře.",
  alternates: { canonical: "/cenik" },
};

type PriceItem = { name: string; note?: string; price: string };

// Texty převzaté doslova z ceníku klienta (původní web /cenik/), upravené jen
// překlepy a formátování cen. Položky v sekci "Exteriér a další služby" doplněny
// na přání klienta.
const interior: PriceItem[] = [
  { name: "Osobní, kombi", note: "dle velikosti vozu", price: "od 2 000 Kč do 2 500 Kč" },
  { name: "MPV-SUV", price: "od 2 500 Kč" },
  { name: "Multivany a podobné velikosti", price: "od 3 000 Kč" },
];

const surcharges: PriceItem[] = [
  { name: "Impregnace kožených sedadel", price: "+200 Kč" },
  { name: "Kombinace kůže - látka, alkantara", note: "za 5 sedadel", price: "+100 Kč" },
  { name: "Příplatek za silné znečištění", price: "20 %" },
  { name: "Čištění stropu", note: "volitelná položka", price: "+300–500 Kč" },
  { name: "Odstranění psích chlupů", note: "dle rozsahu znečištění", price: "od 300 Kč" },
];

const ceramic: PriceItem[] = [
  { name: "Keramická ochrana laku", price: "5 000 Kč" },
  { name: "Keramická ochrana laku — MPV/SUV", price: "6 000 Kč" },
  { name: "Aplikace keramické ochrany 5 let, včetně rozleštění laku", price: "15 000 Kč" },
];

const ppf: PriceItem[] = [
  { name: "Kapota", price: "od 8 000 Kč" },
  { name: "Kapota, světla, zrcátka", price: "10 000 Kč" },
  {
    name: "Celý předek",
    note: "kapota, světla, zrcátka, nárazník, blatníky",
    price: "od 30 000 Kč",
  },
];

const other: PriceItem[] = [
  { name: "Čištění exteriéru včetně vosku", price: "od 800 Kč" },
  { name: "Voskování tvrdým (ročním) voskem", price: "od 2 000 Kč" },
  { name: "Čištění klimatizace ozónem", price: "300 Kč" },
];

const paymentMethods = [
  {
    label: "Hotově",
    icon: (
      <>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9.5v.01M18 14.5v.01" />
      </>
    ),
  },
  {
    label: "Kartou",
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="M2.5 10h19M6.5 15h3" />
      </>
    ),
  },
  {
    label: "QR kód",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
        <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
        <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
        <path d="M14.5 14.5h2.5v2.5M20.5 14.5v.01M14.5 20.5h.01M17.5 20.5h3v-3" />
      </>
    ),
  },
];

export default function PriceListPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="heading-accent text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ceník
        </h1>

        <div className="mt-12 flex flex-col gap-12">
          <PriceSection title="Kompletní čištění interiéru" items={interior}>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-white/70">
              <p className="font-semibold text-white">Kompletní čištění zahrnuje:</p>
              <p className="mt-2">
                Vysátí koberců, zavazadlového prostoru, tepování koberců, tepování sedadel, výplní
                dveří. Vyčištění veškerých plastů, ošetření veškerých plastů speciálním
                antistatickým oživujícím mlékem s přísadou karnaubského vosku. Mytí oken. Očista od
                stropu po podlahu…
              </p>
            </div>
          </PriceSection>

          <PriceSection title="Příplatky" items={surcharges} />

          <PriceSection title="Keramická ochrana laku" items={ceramic} />

          <PriceSection title="Aplikace ochranné PPF fólie" items={ppf} />

          <PriceSection title="Exteriér a další služby" items={other} />
        </div>

        <p className="mt-12 text-sm leading-relaxed text-white/60">
          Uvedené ceny jsou orientační. Konečná cena se může lišit podle stavu a velikosti vozu —
          přesnou cenu vám rádi upřesníme po telefonu.
        </p>

        <ul
          aria-label="Způsoby platby"
          className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70"
        >
          {paymentMethods.map((method) => (
            <li key={method.label} className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-accent-text"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {method.icon}
              </svg>
              {method.label}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={site.phoneHref}
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Zavolat {site.phone}
          </a>
          <Link
            href="/#kontakt"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Poptávkový formulář
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PriceSection({
  title,
  items,
  children,
}: {
  title: string;
  items: PriceItem[];
  children?: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <dl className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4"
          >
            <dt className="text-white">
              {item.name}
              {item.note && <span className="block text-sm text-white/50">{item.note}</span>}
            </dt>
            <dd className="font-semibold whitespace-nowrap text-accent-text">{item.price}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  );
}
