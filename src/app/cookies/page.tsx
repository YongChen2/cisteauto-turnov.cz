import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage, { LegalSection, legalLinkClass } from "@/components/LegalPage";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-config";

export const metadata: Metadata = {
  title: `Zásady cookies — ${site.name}`,
  description:
    "Jaké cookies a podobné technologie web JR Detailing – Čisté auto Turnov používá, k čemu slouží a jak můžete svůj souhlas kdykoli změnit.",
  alternates: { canonical: "/cookies" },
};

const rows = [
  {
    name: CONSENT_STORAGE_KEY,
    category: "Nezbytné",
    provider: `${site.name} (tento web)`,
    purpose:
      "Uložení vaší volby souhlasu s cookies (kategorie, datum a verze souhlasu). Ukládá se do localStorage vašeho prohlížeče, na server se neodesílá.",
    duration: "12 měsíců, poté se vás web zeptá znovu",
  },
  {
    name: "Cookies Google (např. NID)",
    category: "Externí obsah",
    provider: "Google (Google Ireland Ltd. / Google LLC)",
    purpose:
      "Zobrazení mapy Google Maps v sekci Kontakt. Načte se jen po vašem souhlasu s externím obsahem.",
    duration: "Dle zásad společnosti Google",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage title="Zásady cookies">
      <LegalSection title="Co jsou cookies">
        <p>
          Cookies jsou malé textové soubory, které si web ukládá do vašeho prohlížeče. Podobně
          funguje i úložiště localStorage. Slouží například k zapamatování vašich voleb nebo
          k zobrazení obsahu třetích stran.
        </p>
      </LegalSection>

      <LegalSection title="Jaké cookies používáme">
        <p>
          Tento web nepoužívá analytické ani marketingové cookies. Používáme pouze tyto kategorie:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-white">Nezbytné</strong> — uložení vaší volby souhlasu. Bez nich
            by se vás web ptal při každé návštěvě. Nelze je vypnout.
          </li>
          <li>
            <strong className="text-white">Externí obsah</strong> — mapa Google v sekci Kontakt.
            Google při jejím načtení může ukládat vlastní cookies a zpracovávat vaši IP adresu.
            Ve výchozím stavu je vypnuto a mapa se načte až po vašem souhlasu.
          </li>
        </ul>

        <div
          className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          role="region"
          aria-label="Tabulka cookies (posouvejte vodorovně)"
          tabIndex={0}
        >
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Přehled cookies a úložišť používaných na webu</caption>
            <thead>
              <tr className="border-b border-white/15 text-white">
                <th scope="col" className="py-2 pr-4 font-semibold">Název</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Kategorie</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Poskytovatel</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Účel</th>
                <th scope="col" className="py-2 font-semibold">Doba uložení</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-white/10 align-top">
                  <td className="py-3 pr-4 font-mono text-sm text-white">{row.name}</td>
                  <td className="py-3 pr-4">{row.category}</td>
                  <td className="py-3 pr-4">{row.provider}</td>
                  <td className="py-3 pr-4">{row.purpose}</td>
                  <td className="py-3">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Podrobnosti o cookies společnosti Google najdete v jejích{" "}
          <a
            href="https://policies.google.com/technologies/cookies?hl=cs"
            target="_blank"
            rel="noopener"
            className={legalLinkClass}
          >
            zásadách používání cookies
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Jak souhlas změnit">
        <p>
          Svůj souhlas můžete kdykoli změnit nebo odvolat v nastavení cookies. Odkaz „Nastavení
          cookies“ najdete také v patičce každé stránky.
        </p>
        <div>
          <CookieSettingsButton className="min-h-11 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover" />
        </div>
      </LegalSection>

      <LegalSection title="Jak cookies smazat v prohlížeči">
        <p>
          Uložené cookies a data webů můžete kdykoli smazat v nastavení svého prohlížeče, obvykle
          v sekci Soukromí / Ochrana soukromí → Vymazat údaje o prohlížení (cookies a data webů).
          Návod najdete v nápovědě svého prohlížeče:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <a href="https://support.google.com/chrome/answer/95647?hl=cs" target="_blank" rel="noopener" className={legalLinkClass}>
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/cs/kb/vymazani-cookies-a-dat-webu-firefox" target="_blank" rel="noopener" className={legalLinkClass}>
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/cs-cz/guide/safari/sfri11471/mac" target="_blank" rel="noopener" className={legalLinkClass}>
              Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/cs-cz/microsoft-edge/odstran%C4%9Bn%C3%AD-soubor%C5%AF-cookie-v-aplikaci-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener" className={legalLinkClass}>
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Po smazání dat se vás web při další návštěvě znovu zeptá na souhlas.
        </p>
      </LegalSection>

      <LegalSection title="Osobní údaje">
        <p>
          Více o tom, jak zpracováváme osobní údaje, najdete na stránce{" "}
          <a href="/ochrana-osobnich-udaju" className={legalLinkClass}>
            Ochrana osobních údajů
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
