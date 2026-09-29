export type ServicePhoto = {
  src: string;
  /** popisný alt text (česky); bez něj se použije "Služba — fotografie X z Y" */
  alt?: string;
  /** kvalita next/image (musí být v images.qualities v next.config.ts), jinak výchozí 75 */
  quality?: number;
  /** CSS object-position ořezu v kartě, např. "50% 40%" (výchozí střed) */
  objectPosition?: string;
  /** true = dočasná fotka (Unsplash), nahradit reálnou fotkou klienta */
  temporary?: boolean;
  /** nastaveno jen u malých reálných fotek, které se nesmí roztahovat na výšku kontejneru */
  natural?: { width: number; height: number };
};

/** Dvojice fotek stejného místa před a po úpravě (zobrazí se jako porovnávací posuvník). */
export type BeforeAfterPair = {
  before: string;
  after: string;
  /** co je na fotce, bez "před/po" — např. "palubní deska s větrákem" */
  alt: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  /** krátké body výhod zobrazené v modalu pod galerií */
  highlights?: string[];
  /** cenové varianty vypsané v modalu (musí odpovídat ceníku /cenik) */
  priceVariants?: { label: string; price: string }[];
  /** náhled na kartě služby; může být samostatná fotka mimo galerii */
  cover: ServicePhoto;
  /** fotky v modal galerii (u služby s páry před/po zůstává prázdné) */
  photos: ServicePhoto[];
  /** páry před/po — když jsou vyplněné, galerie místo fotek zobrazí porovnávací posuvník */
  beforeAfter?: BeforeAfterPair[];
};

export const services: Service[] = [
  {
    slug: "cisteni-interieru",
    name: "Čištění interiéru",
    shortDescription:
      "Kompletní vysátí, tepování sedadel a koberců a ošetření plastů — interiér jako z autosalonu.",
    description:
      "Důkladné vysátí koberců i zavazadlového prostoru, tepování sedadel, dveřních výplní a koberců, omytí veškerých plastů a jejich ošetření antistatickým přípravkem, mytí oken zevnitř. Příplatky za kůži, kombinaci látka/alcantara, silné znečištění nebo srst zvířat řešíme individuálně na místě.",
    price: "od 2 000 Kč",
    // Reálné fotky klienta před a po čištění, páry oříznuté na stejný výřez.
    cover: {
      src: "/images/cisteni-interieru/cover-pred-po.webp",
      alt: "Rádio a ovládání klimatizace před a po čištění interiéru",
    },
    photos: [],
    beforeAfter: [
      {
        before: "/images/cisteni-interieru/radio-pred.webp",
        after: "/images/cisteni-interieru/radio-po.webp",
        alt: "rádio Panasonic a ovládání klimatizace",
      },
      {
        before: "/images/cisteni-interieru/palubni-deska-pred.webp",
        after: "/images/cisteni-interieru/palubni-deska-po.webp",
        alt: "palubní deska s větrákem a budíky",
      },
      {
        before: "/images/cisteni-interieru/tunel-pred.webp",
        after: "/images/cisteni-interieru/tunel-po.webp",
        alt: "středový tunel s řadicí pákou a ruční brzdou",
      },
      {
        before: "/images/cisteni-interieru/sedadlo-pred.webp",
        after: "/images/cisteni-interieru/sedadlo-po.webp",
        alt: "látkové sedadlo řidiče",
      },
      {
        before: "/images/cisteni-interieru/dvere-pred.webp",
        after: "/images/cisteni-interieru/dvere-po.webp",
        alt: "výplň dveří s ovladačem zrcátek",
      },
      {
        before: "/images/cisteni-interieru/koberec-pred.webp",
        after: "/images/cisteni-interieru/koberec-po.webp",
        alt: "koberec u pedálů",
      },
      {
        before: "/images/cisteni-interieru/packa-sedadla-pred.webp",
        after: "/images/cisteni-interieru/packa-sedadla-po.webp",
        alt: "páčka nastavení sedadla u prahu",
      },
      {
        before: "/images/cisteni-interieru/kufr-uchyty-pred.webp",
        after: "/images/cisteni-interieru/kufr-uchyty-po.webp",
        alt: "úchyty zadních sedadel v kufru",
      },
      {
        before: "/images/cisteni-interieru/kufr-bocnice-pred.webp",
        after: "/images/cisteni-interieru/kufr-bocnice-po.webp",
        alt: "bočnice kufru a zadní sedadlo",
      },
    ],
  },
  {
    slug: "lesteni-laku",
    name: "Leštění laku",
    shortDescription:
      "Odstranění holografů, jemných škrábanců a matného vzhledu — lak s hloubkovým leskem.",
    description:
      "Strojní leštění karoserie odstraní drobné škrábance, hologramy a oxidovanou vrstvu laku. Výsledkem je hluboký lesk a hladký povrch připravený na voskovou nebo keramickou ochranu. Rozsah leštění vždy přizpůsobíme aktuálnímu stavu laku.",
    price: "Cena na dotaz",
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), bez obličejů, nahradit fotkami
    // z vlastní dílny:
    // 1) photo-1658244500543-47f32dc51dc2 (autor: Vitali Adutskevich) — https://unsplash.com/photos/B7hVEFTFUWs
    // 2) photo-1620584898989-d39f7f9ed1b7 (autor: Neelabh Raj, ořez na 4:3) — https://unsplash.com/photos/cw1914zDHUs
    // 3) photo-1527581849771-416a9d62308e — https://unsplash.com/photos/s99-JP8P3Hg
    // 4) photo-1683791738119-5ab14dbaf79c (autor: Eyosias G) — https://unsplash.com/photos/MN3_noM5mCo
    cover: {
      src: "/images/lesteni-laku/01.webp",
      alt: "Strojní leštění laku u světlometu černého vozu",
      temporary: true,
    },
    photos: [
      {
        src: "/images/lesteni-laku/01.webp",
        alt: "Strojní leštění laku u světlometu černého vozu",
        temporary: true,
      },
      {
        src: "/images/lesteni-laku/02.webp",
        alt: "Detail leštičky na laku s oblepenou hranou karoserie",
        temporary: true,
      },
      {
        src: "/images/lesteni-laku/03.webp",
        alt: "Ruční doleštění kapoty mikrovláknovou utěrkou",
        temporary: true,
      },
      {
        src: "/images/lesteni-laku/04.webp",
        alt: "Hluboký lesk a odrazy na kapotě vyleštěného vozu",
        temporary: true,
      },
    ],
  },
  {
    slug: "keramicka-ochrana-laku",
    name: "Keramická ochrana laku",
    shortDescription:
      "Keramická ochrana dodá laku hluboký lesk a vytvoří odolnou vrstvu proti nečistotám, UV záření a chemii. Při správné údržbě vydrží až 5 let.",
    description:
      "Nanokeramická vrstva se pevně spojí s lakem a chrání ho před povětrnostními vlivy, UV zářením a chemickým znečištěním. Před aplikací lak vždy důkladně umyjeme, odmastíme a vyleštíme, aby ochrana držela co nejdéle. Keramickou ochranu aplikujeme na osobní auta, SUV, luxusní vozy, veterány i motocykly.",
    price: "od 5 000 Kč",
    priceVariants: [
      { label: "Keramická ochrana laku", price: "5 000 Kč" },
      { label: "MPV/SUV", price: "6 000 Kč" },
      { label: "5 let včetně rozleštění laku", price: "15 000 Kč" },
    ],
    highlights: [
      "Hluboký lesk laku",
      "Voda a nečistoty stékají — snadnější mytí",
      "Ochrana proti UV záření a chemii",
      "Vydrží až 5 let při správné údržbě",
    ],
    // Náhled karty: samostatná fotka ve vysoké kvalitě (není v galerii).
    cover: {
      src: "/images/keramicka-ochrana-laku/keramika-karta.webp",
      alt: "Aplikace keramické ochrany: přípravek stéká na aplikační houbičku nad červeným lakem",
      quality: 90,
    },
    // Galerie: reálné fotky klienta (SPZ a odrazy osob rozmazané).
    photos: [
      {
        src: "/images/keramicka-ochrana-laku/02.webp",
        alt: "Černý VW Tiguan s lesklým lakem po keramické ochraně",
      },
      {
        src: "/images/keramicka-ochrana-laku/03.webp",
        alt: "Černý VW Tiguan v dílně s odrazy hexagonálních světel v laku",
      },
      {
        src: "/images/keramicka-ochrana-laku/04.webp",
        alt: "Bílá Škoda Yeti zepředu s odrazem hexagonálních světel na blatníku",
      },
      {
        src: "/images/keramicka-ochrana-laku/05.webp",
        alt: "Zrcadlově lesklé černé dveře s odrazy dílny",
      },
      {
        src: "/images/keramicka-ochrana-laku/06.webp",
        alt: "Černý RAM 1500 s hlubokým leskem laku",
      },
      {
        src: "/images/keramicka-ochrana-laku/07.webp",
        alt: "Bílá Škoda Yeti zezadu s odrazy hexagonálních světel",
      },
      {
        src: "/images/keramicka-ochrana-laku/08.webp",
        alt: "Černá Škoda Superb s lesklým lakem a odrazy oblohy",
      },
    ],
  },
  {
    slug: "ppf-folie",
    name: "Ochranné PPF fólie",
    shortDescription:
      "Čirá (transparentní) fólie chrání lak před odlétajícími kamínky a škrábanci — barvu vozu nemění.",
    description:
      "Aplikujeme výhradně čirou (transparentní) samohojící polyuretanovou fólii. Chrání nejnamáhanější místa karoserie (přední nárazník, kapota, zpětná zrcátka, prahy) před odlétajícími kamínky, škrábanci a odřením, přitom zůstává téměř neviditelná a nemění barvu ani vzhled vozu. Řešíme jak dílčí ochranu, tak celý vůz.",
    price: "od 8 000 Kč",
    priceVariants: [
      { label: "Kapota", price: "od 8 000 Kč" },
      { label: "Kapota, světla, zrcátka", price: "10 000 Kč" },
      { label: "Celý předek (kapota, světla, zrcátka, nárazník, blatníky)", price: "od 30 000 Kč" },
    ],
    // Dočasné fotky (licence umožňuje komerční použití), jen čirá fólie, bez obličejů, nahradit
    // fotkami z vlastní dílny:
    // 1) Pexels 36021355 (autor: Tejas JR, ořez na 4:3) —
    //    https://www.pexels.com/photo/applying-paint-protection-film-on-a-car-door-36021355/
    // 2) Pexels 20051468 (autor: WAVYVISUALS, ořez na kapotu a ruce) —
    //    https://www.pexels.com/photo/bearded-man-applying-foil-on-sports-car-hood-20051468/
    // 3) Unsplash photo-1632823642656-f62dbc9b4818 (autor: Deniz Demirci, ořez na nárazník a světlo) —
    //    https://unsplash.com/photos/TZlf3VLG20Y
    // 4) Unsplash photo-1748847613527-7d0bba714fed (autor: Theo Lonic) — https://unsplash.com/photos/bp_hQILiM5Q
    cover: {
      src: "/images/ppf-folie/01.webp",
      alt: "Aplikace čiré ochranné PPF fólie stěrkou na dveře vozu",
      temporary: true,
    },
    photos: [
      {
        src: "/images/ppf-folie/01.webp",
        alt: "Aplikace čiré ochranné PPF fólie stěrkou na dveře vozu",
        temporary: true,
      },
      {
        src: "/images/ppf-folie/02.webp",
        alt: "Pokládání čiré PPF fólie na kapotu metodou na mokro",
        temporary: true,
      },
      {
        src: "/images/ppf-folie/03.webp",
        alt: "Instalace ochranné fólie na přední nárazník u světlometu",
        temporary: true,
      },
      {
        src: "/images/ppf-folie/04.webp",
        alt: "Lesklý lak kapoty a světlomet v původní barvě vozu",
        temporary: true,
      },
    ],
  },
  {
    slug: "dekarbonizace-motoru",
    name: "Dekarbonizace motoru vodíkem",
    shortDescription:
      "Vyčištění motoru od karbonových usazenin vodíkem — bez demontáže, do hodiny.",
    description:
      "Vodík přivedený do sání zvýší teplotu spalování a spálí usazený karbon v motoru, na ventilech, katalyzátoru i DPF filtru. Proces trvá zhruba hodinu, bez demontáže dílů a bez nutnosti výměny oleje. Výsledkem je obnovený výkon, nižší spotřeba a tišší chod motoru.",
    price: "2 499 Kč (do 2 500 cm³), 2 999 Kč (2 500–4 000 cm³)",
    // Reálná fotka klienta (SPZ rozmazaná).
    cover: {
      src: "/images/dekarbonizace-motoru/01.webp",
      alt: "Přístroj DECA SS 4000 připojený k vozu Škoda s otevřenou kapotou v dílně",
    },
    photos: [
      {
        src: "/images/dekarbonizace-motoru/01.webp",
        alt: "Přístroj DECA SS 4000 připojený k vozu Škoda s otevřenou kapotou v dílně",
      },
    ],
  },
  {
    slug: "cisteni-klimatizace-ozonem",
    name: "Čištění klimatizace ozónem",
    shortDescription:
      "Ozón odstraní bakterie, plísně a nepříjemný zápach z klimatizace i celého interiéru.",
    description:
      "Ozónový generátor (O3) umístěný v uzavřeném voze prostoupí celý interiér i rozvody klimatizace. Ozón zničí bakterie, plísně a roztoče a odstraní zápach z kouření, zvířat nebo zatuchlé klimatizace — nejen ho překryje. Ošetření lze objednat samostatně nebo ke kompletnímu čištění interiéru.",
    price: "300 Kč",
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), nahradit fotkami z vlastní dílny:
    // 1) photo-1542399204-b8dd4af5113d (autor: Olav Tvedt) — https://unsplash.com/photos/JJBxXvgnh5s
    // 2) photo-1625723760245-9c712bd0e174 (autor: Matthias Speicher) — https://unsplash.com/photos/avD5j2iQcrA
    // 3) photo-1752552055661-fbb9ef5398fe (autor: Obi, ořez na 3:2) — https://unsplash.com/photos/zEiv0-LGpRM
    cover: { src: "/images/cisteni-klimatizace-ozonem/01.webp", temporary: true },
    photos: [
      { src: "/images/cisteni-klimatizace-ozonem/01.webp", temporary: true },
      { src: "/images/cisteni-klimatizace-ozonem/02.webp", temporary: true },
      { src: "/images/cisteni-klimatizace-ozonem/03.webp", temporary: true },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
