import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage, { LegalSection, legalLinkClass } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `Ochrana osobních údajů — ${site.name}`,
  description: "Informace o zpracování osobních údajů návštěvníků a zákazníků webu Čisté auto Turnov.",
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Ochrana osobních údajů">
      <LegalSection title="Správce osobních údajů">
        <p>
          Správcem osobních údajů zpracovávaných prostřednictvím tohoto webu je {site.owner}, se
          sídlem {site.registeredAddress}, provozovna {site.address}, IČO: {site.ico} (dále jen
          „správce“). Správce lze kontaktovat
          telefonicky na čísle {site.phone} nebo e-mailem na {site.email}.
        </p>
      </LegalSection>

      <LegalSection title="Jaké údaje zpracováváme">
        <p>
          V souvislosti s vyplněním poptávkového formuláře na tomto webu zpracováváme následující
          údaje: jméno a příjmení, telefonní číslo, e-mailová adresa (pokud ji vyplníte), vybraná
          služba, značka a model vozidla, preferovaný termín a text zprávy — v rozsahu, v jakém je
          do formuláře vyplníte.
        </p>
      </LegalSection>

      <LegalSection title="Účel zpracování">
        <p>
          Uvedené údaje zpracováváme výhradně za účelem vyřízení vaší poptávky — abychom vás mohli
          kontaktovat, domluvit termín a rozsah objednaných služeb.
        </p>
      </LegalSection>

      <LegalSection title="Zpracovatelé a příjemci údajů">
        <p>
          Při provozu webu využíváme tyto poskytovatele služeb, kteří mohou osobní údaje zpracovávat
          naším jménem:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-white">FormSubmit</strong> (USA) — doručení poptávkového
            formuláře na náš e-mail. Zpracovává údaje, které do formuláře vyplníte.
          </li>
          <li>
            <strong className="text-white">Vercel Inc.</strong> (USA) — hosting webu. Při návštěvě
            webu zpracovává technické údaje, jako je IP adresa a informace o prohlížeči.
          </li>
          <li>
            <strong className="text-white">Google</strong> (Google Ireland Ltd. / Google LLC, USA) —
            zobrazení mapy v sekci Kontakt. Mapa se načte pouze po vašem souhlasu s externím
            obsahem; Google při tom zpracovává zejména vaši IP adresu a může ukládat cookies.
          </li>
        </ul>
        <p>
          Protože tito poskytovatelé sídlí nebo údaje zpracovávají v USA, může docházet k předání
          osobních údajů mimo Evropskou unii. Předání probíhá na základě záruk podle kapitoly V
          nařízení GDPR, které poskytovatelé uvádějí ve svých podmínkách zpracování údajů.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Informace o cookies a o tom, jak můžete změnit svůj souhlas, najdete na stránce{" "}
          <a href="/cookies" className={legalLinkClass}>
            Zásady cookies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Doba uchování">
        <p>
          Údaje z poptávkového formuláře uchováváme po dobu nezbytnou k vyřízení poptávky a
          případné navazující komunikaci, nejdéle však po dobu 2 let od odeslání formuláře, pokud
          mezi námi nevznikne smluvní vztah vyžadující delší uchování (např. z důvodu účetních nebo
          právních povinností).
        </p>
      </LegalSection>

      <LegalSection title="Vaše práva">
        <p>
          V souladu s nařízením GDPR máte právo na přístup ke svým osobním údajům, jejich opravu
          nebo výmaz, omezení zpracování, přenositelnost údajů a právo vznést námitku proti
          zpracování. Rovněž máte právo podat stížnost u Úřadu pro ochranu osobních údajů. Svá práva
          můžete uplatnit kontaktováním správce na uvedeném telefonu nebo e-mailu.
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          {site.owner}, {site.address}
          <br />
          Telefon: {site.phone}
          <br />
          E-mail: {site.email}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
