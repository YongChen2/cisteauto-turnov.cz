import type { Metadata } from "next";
import { site } from "@/data/site";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Ceník — ${site.name}`,
  description:
    "Ceník čištění interiéru, příplatků, čištění exteriéru, voskování a čištění klimatizace ozónem. Čisté auto Turnov, Přepeře.",
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

const other: PriceItem[] = [
  { name: "Čištění exteriéru včetně vosku", price: "od 800 Kč" },
  { name: "Voskování tvrdým (ročním) voskem", price: "od 2 000 Kč" },
  { name: "Čištění klimatizace ozónem", price: "300 Kč" },
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

          <PriceSection title="Exteriér a další služby" items={other} />
        </div>

        <p className="mt-12 text-sm leading-relaxed text-white/60">
          Uvedené ceny jsou orientační. Konečná cena se může lišit podle stavu a velikosti vozu —
          přesnou cenu vám rádi upřesníme po telefonu.
        </p>

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
