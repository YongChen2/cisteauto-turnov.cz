import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage, { LegalSection, legalLinkClass } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: `Obchodní podmínky — ${site.name}`,
  description:
    "Obchodní podmínky pro objednávku a poskytování služeb autodetailingu JR Detailing – Čisté auto Turnov — objednávka, cena, platba, převzetí vozu a reklamace.",
  alternates: { canonical: "/obchodni-podminky" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Obchodní podmínky"
      updated={
        <>
          Účinné od 1. 10. 2026
        </>
      }
    >
      <LegalSection title="1. Úvodní ustanovení">
        <p>
          Tyto obchodní podmínky upravují vztah mezi poskytovatelem služeb a zákazníkem při
          poskytování služeb autodetailingu, zejména čištění interiéru, leštění laku, keramické
          ochrany laku, aplikace ochranné PPF fólie a dekarbonizace motoru.
        </p>
        <p>
          Poskytovatelem je {site.owner}, se sídlem {site.registeredAddress}, provozovna{" "}
          {site.address}, IČO: {site.ico}, telefon{" "}
          {site.phone}, e-mail {site.email} (dále jen „poskytovatel“).
        </p>
        <p>
          Zákazníkem je fyzická nebo právnická osoba, která si u poskytovatele objedná službu (dále
          jen „zákazník“). Vztahy neupravené těmito podmínkami se řídí zákonem č. 89/2012 Sb.,
          občanský zákoník, a u spotřebitelů též zákonem č. 634/1992 Sb., o ochraně spotřebitele.
        </p>
      </LegalSection>

      <LegalSection title="2. Objednávka služby">
        <p>
          Službu lze objednat telefonicky na čísle {site.phone}, e-mailem na {site.email} nebo
          prostřednictvím poptávkového formuláře na tomto webu.
        </p>
        <p>
          Odeslání poptávky je nezávazné. Smlouva o poskytnutí služby vzniká okamžikem, kdy
          poskytovatel zákazníkovi potvrdí konkrétní termín (telefonicky, e-mailem nebo zprávou).
        </p>
      </LegalSection>

      <LegalSection title="3. Cena služby">
        <p>
          Cena služeb se řídí aktuální nabídkou poskytovatele. Ceny uvedené na webu mají orientační
          charakter, protože výsledná náročnost práce závisí na velikosti a stavu konkrétního vozu.
        </p>
        <p>
          Konečná cena se upřesní po prohlídce vozu a poskytovatel ji zákazníkovi sdělí před
          zahájením prací. Pokud se během práce ukáže potřeba dalších úkonů, které by cenu
          navýšily, poskytovatel je provede jen se souhlasem zákazníka.
        </p>
      </LegalSection>

      <LegalSection title="4. Platba">
        <p>
          Způsob a termín platby: Cenu služby lze uhradit při převzetí vozu v hotovosti, platební kartou nebo převodem pomocí QR kódu.
        </p>
      </LegalSection>

      <LegalSection title="5. Zrušení termínu">
        <p>
          Zrušení nebo změnu termínu prosím oznamte co nejdříve telefonicky na čísle {site.phone}{" "}
          nebo e-mailem na {site.email}.
        </p>
      </LegalSection>

      <LegalSection title="6. Převzetí a předání vozu">
        <p>
          Před předáním vozu zákazník vyjme z vozu osobní věci a cennosti. Poskytovatel
          neodpovídá za věci, které ve voze zůstaly a nebyly mu výslovně předány.
        </p>
        <p>
          Stav vozu se kontroluje při jeho převzetí; zjištěná poškození (např. škrábance, praskliny,
          vady laku) poskytovatel se zákazníkem projde a případně zdokumentuje. Po dokončení služby
          si zákazník vůz při předání zkontroluje.
        </p>
      </LegalSection>

      <LegalSection title="7. Odpovědnost">
        <p>
          Poskytovatel provádí služby s odbornou péčí a odpovídá za škodu, kterou na voze způsobí
          při poskytování služby, v rozsahu stanoveném právními předpisy.
        </p>
        <p>
          Poskytovatel neodpovídá za vady a poškození, které na voze existovaly již před jeho
          převzetím, ani za následky skrytých vad vozu, o nichž nevěděl a vědět nemohl.
        </p>
      </LegalSection>

      <LegalSection title="8. Reklamace">
        <p>
          Práva z vadného plnění se řídí příslušnými ustanoveními občanského zákoníku. Vadu
          provedené služby je třeba uplatnit u poskytovatele bez zbytečného odkladu poté, co ji
          zákazník zjistil, a to telefonicky na čísle {site.phone} nebo e-mailem na {site.email}.
        </p>
        <p>
          Poskytovatel reklamaci posoudí, informuje zákazníka o způsobu jejího vyřízení a vyřídí ji
          ve lhůtě stanovené právními předpisy.
        </p>
      </LegalSection>

      <LegalSection title="9. Mimosoudní řešení sporů">
        <p>
          Spotřebitel má právo na mimosoudní řešení spotřebitelského sporu. Příslušným subjektem je
          Česká obchodní inspekce, Štěpánská 567/15, 120 00 Praha 2,{" "}
          <a href="https://www.coi.cz" target="_blank" rel="noopener" className={legalLinkClass}>
            www.coi.cz
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="10. Ochrana osobních údajů">
        <p>
          Informace o zpracování osobních údajů najdete na stránce{" "}
          <a href="/ochrana-osobnich-udaju" className={legalLinkClass}>
            Ochrana osobních údajů
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="11. Závěrečná ustanovení">
        <p>
          Tyto obchodní podmínky jsou platné a účinné od 1. 10. 2026. Poskytovatel je
          oprávněn podmínky měnit; pro konkrétní objednávku platí znění účinné v den potvrzení
          termínu.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
