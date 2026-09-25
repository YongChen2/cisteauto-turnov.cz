export type ServicePhoto = {
  src: string;
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
      "Důkladné vysátí koberců i zavazadlového prostoru, tepování sedadel, dveřních výplní a koberců, omytí veškerých plastů a jejich ošetření antistatickým přípravkem, mytí oken zevnitř. Na přání doplníme o ozonové čištění klimatizace a interiéru (O3), které pomáhá odstranit pachy a zátěžové mikroorganismy. Příplatky za kůži, kombinaci látka/alcantara, silné znečištění nebo srst zvířat řešíme individuálně na místě.",
    price: "od 2 000 Kč",
    // Dočasná titulní fotka, Unsplash, photo-1654522659761-b6ad370e0bb3 (autor: Vladyslav Lytvyshchenko),
    // https://unsplash.com/photos/A2etZFKGXA0 — nahradit kvalitní fotkou vlastní práce klienta.
    cover: { src: "/images/cisteni-interieru/00-cover.webp", temporary: true },
    // Reálné fotky z realizací klienta (nízké rozlišení 282×212 px z původního webu) — zobrazovat
    // v přirozené velikosti, nezvětšovat.
    photos: [
      { src: "/images/cisteni-interieru/01.jpg", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/02.jpg", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/03.jpg", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/04.jpg", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/05.jpg", natural: { width: 282, height: 212 } },
      { src: "/images/cisteni-interieru/06.jpg", natural: { width: 282, height: 212 } },
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
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), nahradit fotkami z vlastní dílny:
    // 1) photo-1708805282706-f44730b7e527 — https://unsplash.com/photos/CsZjHjFN3N8
    // 2) photo-1527581849771-416a9d62308e — https://unsplash.com/photos/s99-JP8P3Hg
    // 3) photo-1632823469850-2f77dd9c7f93 — https://unsplash.com/photos/dlJelFmdpOc
    // 4) photo-1699078042053-ecd9166d3f26 — https://unsplash.com/photos/OiD0c02faH8
    cover: { src: "/images/lesteni-laku/01.webp", temporary: true },
    photos: [
      { src: "/images/lesteni-laku/01.webp", temporary: true },
      { src: "/images/lesteni-laku/02.webp", temporary: true },
      { src: "/images/lesteni-laku/03.webp", temporary: true },
      { src: "/images/lesteni-laku/04.webp", temporary: true },
    ],
  },
  {
    slug: "keramicka-ochrana-laku",
    name: "Keramická ochrana laku",
    shortDescription:
      "Dlouhodobá ochrana laku před UV zářením, ptačím trusem a drobnými nečistotami na 12 měsíců.",
    description:
      "Nanokeramická vrstva chrání lak před povětrnostními vlivy, UV zářením a chemickým znečištěním, usnadňuje mytí a prodlužuje lesk laku. Před aplikací lak vždy připravíme leštěním. Ochrana vydrží po dobu 12 měsíců.",
    price: "5 000 Kč (MPV/SUV 6 000 Kč)",
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), nahradit fotkami z vlastní dílny:
    // 1) photo-1632605166776-7128669886e7 — https://unsplash.com/photos/rsaYn6mq2qo
    // 2) photo-1780586585338-c56fe47b49f4 (autor: Vitalii Abakumov) — https://unsplash.com/photos/tbHzrVqZzbA
    // 3) photo-1788581171198-64553b09c8cf (autor: Rana Singh) — https://unsplash.com/photos/blJD_KPBna8
    // 4) photo-1761934658331-2e00b20dc6c6 — https://unsplash.com/photos/bDBiGYkr3h8
    cover: { src: "/images/keramicka-ochrana-laku/01.webp", temporary: true },
    photos: [
      { src: "/images/keramicka-ochrana-laku/01.webp", temporary: true },
      { src: "/images/keramicka-ochrana-laku/02.webp", temporary: true },
      { src: "/images/keramicka-ochrana-laku/03.webp", temporary: true },
      { src: "/images/keramicka-ochrana-laku/04.webp", temporary: true },
    ],
  },
  {
    slug: "ppf-folie",
    name: "Ochranné PPF fólie",
    shortDescription:
      "Neviditelná fólie proti odletujícím kamínkům a mechanickému poškození laku.",
    description:
      "Samohojící polyuretanová fólie chrání nejnamáhanější místa karoserie (přední náraz, kapota, zpětná zrcátka, prahy) před odřením a poškozením od kamínků, aniž by změnila vzhled vozu. Řešíme jak dílčí ochranu, tak celý vůz.",
    price: "Cena na dotaz",
    // Dočasné fotky, Unsplash (licence umožňuje komerční použití), nahradit fotkami z vlastní dílny:
    // 1) photo-1551150441-649e0b074fe4 — https://unsplash.com/photos/YWl9W8iBiUk
    // 2) photo-1666846865636-264959b2b7fa — https://unsplash.com/photos/slub3qIbGBE
    // 3) photo-1669625334154-24a0bba7d217 — https://unsplash.com/photos/JzmR7QLVS_8
    // 4) photo-1514316454349-750a7fd3da3a — https://unsplash.com/photos/YApS6TjKJ9c
    cover: { src: "/images/ppf-folie/01.webp", temporary: true },
    photos: [
      { src: "/images/ppf-folie/01.webp", temporary: true },
      { src: "/images/ppf-folie/02.webp", temporary: true },
      { src: "/images/ppf-folie/03.webp", temporary: true },
      { src: "/images/ppf-folie/04.webp", temporary: true },
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
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
