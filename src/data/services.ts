export type ServicePhoto = {
  src: string;
  /** popisný alt text (česky); bez něj se použije "Služba — fotografie X z Y" */
  alt?: string;
  /** true = dočasná fotka (Unsplash), nahradit reálnou fotkou klienta */
  temporary?: boolean;
  /** nastaveno jen u malých reálných fotek, které se nesmí roztahovat na výšku kontejneru */
  natural?: { width: number; height: number };
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  /** krátké body výhod zobrazené v modalu pod galerií */
  highlights?: string[];
  /** fotka na kartě služby */
  cover: ServicePhoto;
  /** fotky v modal galerii */
  photos: ServicePhoto[];
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
    // Dočasná titulní fotka, Unsplash, photo-1654522659761-b6ad370e0bb3 (autor: Vladyslav Lytvyshchenko),
    // https://unsplash.com/photos/A2etZFKGXA0 — nahradit kvalitní fotkou vlastní práce klienta.
    cover: { src: "/images/cisteni-interieru/00-cover.webp", temporary: true },
    // Reálné fotky z realizací klienta (nízké rozlišení 282×212 px z původního webu) — zobrazovat
    // v přirozené velikosti, nezvětšovat.
    photos: [
      { src: "/images/cisteni-interieru/01.webp", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/02.webp", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/03.webp", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/04.webp", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/05.webp", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/06.webp", natural: { width: 282, height: 212 } },
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
      "Nanokeramická vrstva se pevně spojí s lakem a chrání ho před povětrnostními vlivy, UV zářením a chemickým znečištěním. Před aplikací lak vždy důkladně umyjeme, odmastíme a vyleštíme, aby ochrana držela co nejdéle.",
    price: "5 000 Kč, MPV/SUV 6 000 Kč",
    highlights: [
      "Hluboký lesk laku",
      "Voda a nečistoty stékají — snadnější mytí",
      "Ochrana proti UV záření a chemii",
      "Vydrží až 5 let při správné údržbě",
    ],
    // Dočasné fotky (licence umožňuje komerční použití), bez obličejů a log, nahradit fotkami
    // z vlastní dílny:
    // 1) Unsplash photo-1652898072202-5084dc85b850 (autor: Vladyslav Lytvyshchenko, ořez na 4:3) —
    //    https://unsplash.com/photos/9-muyFk7RC4
    // 2) Pexels 14615260 (autor: Dextar Studio) — https://www.pexels.com/photo/14615260/
    // 3) Unsplash photo-1780586585338-c56fe47b49f4 (autor: Vitalii Abakumov) — https://unsplash.com/photos/tbHzrVqZzbA
    // 4) Unsplash photo-1773236321529-fe13541e95f2 (autor: atelierbyvineeth) — https://unsplash.com/photos/lFDWY0SbTSA
    cover: {
      src: "/images/keramicka-ochrana-laku/01.webp",
      alt: "Aplikace keramické ochrany laku aplikační houbičkou",
      temporary: true,
    },
    photos: [
      {
        src: "/images/keramicka-ochrana-laku/01.webp",
        alt: "Aplikace keramické ochrany laku aplikační houbičkou",
        temporary: true,
      },
      {
        src: "/images/keramicka-ochrana-laku/02.webp",
        alt: "Stírání a doleštění laku mikrovláknovým hadříkem po aplikaci",
        temporary: true,
      },
      {
        src: "/images/keramicka-ochrana-laku/03.webp",
        alt: "Voda perlí na laku ošetřeném keramickou ochranou",
        temporary: true,
      },
      {
        src: "/images/keramicka-ochrana-laku/04.webp",
        alt: "Hluboký lesk a odraz světla na kapotě vozu",
        temporary: true,
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
    price: "Cena na dotaz",
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
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), nahradit fotkami z vlastní dílny:
    // 1) photo-1768929571671-4e58e2d9e72f (autor: Laura Oliveira) — https://unsplash.com/photos/k0HQnRcyEW0
    // 2) photo-1672717892960-cb54e0a0486b (autor: Ben Duke) — https://unsplash.com/photos/xXmAAf5tmSY
    // 3) photo-1707414902345-4697ba724477 (autor: Blayne Spires) — https://unsplash.com/photos/d9PeiNr58FM
    // 4) photo-1527383418406-f85a3b146499 — https://unsplash.com/photos/VurHDpO4VYI
    cover: { src: "/images/dekarbonizace-motoru/01.webp", temporary: true },
    photos: [
      { src: "/images/dekarbonizace-motoru/01.webp", temporary: true },
      { src: "/images/dekarbonizace-motoru/02.webp", temporary: true },
      { src: "/images/dekarbonizace-motoru/03.webp", temporary: true },
      { src: "/images/dekarbonizace-motoru/04.webp", temporary: true },
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
