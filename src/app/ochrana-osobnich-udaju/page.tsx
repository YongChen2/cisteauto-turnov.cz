import type { Metadata } from "next";
import { site } from "@/data/site";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Ochrana osobních údajů — ${site.name}`,
  description: "Informace o zpracování osobních údajů návštěvníků a zákazníků webu Čisté auto Turnov.",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

export default function PrivacyPage() {
  return (
    <>
    <main className="mx-auto max-w-3xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Ochrana osobních údajů
      </h1>

      <div className="mt-8 flex flex-col gap-8 text-white/70">
        <section>
          <h2 className="text-lg font-semibold text-white">Správce osobních údajů</h2>
          <p className="mt-2 leading-relaxed">
            Správcem osobních údajů zpracovávaných prostřednictvím tohoto webu je {site.owner}, se
            sídlem {site.address}, IČO: [DOPLNIT IČO] (dále jen „správce“). Správce lze kontaktovat
            telefonicky na čísle {site.phone} nebo e-mailem na {site.email}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Jaké údaje zpracováváme</h2>
          <p className="mt-2 leading-relaxed">
            V souvislosti s vyplněním poptávkového formuláře na tomto webu zpracováváme následující
            údaje: jméno a příjmení, telefonní číslo, e-mailová adresa (pokud ji vyplníte), vybraná
            služba, značka a model vozidla, preferovaný termín a text zprávy — v rozsahu, v jakém je
            do formuláře vyplníte.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Účel zpracování</h2>
          <p className="mt-2 leading-relaxed">
            Uvedené údaje zpracováváme výhradně za účelem vyřízení vaší poptávky — abychom vás mohli
            kontaktovat, domluvit termín a rozsah objednaných služeb.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Doba uchování</h2>
          <p className="mt-2 leading-relaxed">
            Údaje z poptávkového formuláře uchováváme po dobu nezbytnou k vyřízení poptávky a
            případné navazující komunikaci, nejdéle však po dobu 2 let od odeslání formuláře, pokud
            mezi námi nevznikne smluvní vztah vyžadující delší uchování (např. z důvodu účetních nebo
            právních povinností).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Vaše práva</h2>
          <p className="mt-2 leading-relaxed">
            V souladu s nařízením GDPR máte právo na přístup ke svým osobním údajům, jejich opravu
            nebo výmaz, omezení zpracování, přenositelnost údajů a právo vznést námitku proti
            zpracování. Rovněž máte právo podat stížnost u Úřadu pro ochranu osobních údajů. Svá práva
            můžete uplatnit kontaktováním správce na uvedeném telefonu nebo e-mailu.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Kontakt</h2>
          <p className="mt-2 leading-relaxed">
            {site.owner}, {site.address}
            <br />
            Telefon: {site.phone}
            <br />
            E-mail: {site.email}
          </p>
        </section>
      </div>
    </main>
    <Footer />
    </>
  );
}
