export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: string;
  photos: string[];
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
    photos: [
      "/images/cisteni-interieru/01.jpg",
      "/images/cisteni-interieru/02.jpg",
      "/images/cisteni-interieru/03.jpg",
      "/images/cisteni-interieru/04.jpg",
      "/images/cisteni-interieru/05.jpg",
      "/images/cisteni-interieru/06.jpg",
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
    photos: ["/images/placeholder.svg"],
  },
  {
    slug: "keramicka-ochrana-laku",
    name: "Keramická ochrana laku",
    shortDescription:
      "Dlouhodobá ochrana laku před UV zářením, ptačím trusem a drobnými nečistotami na 12 měsíců.",
    description:
      "Nanokeramická vrstva chrání lak před povětrnostními vlivy, UV zářením a chemickým znečištěním, usnadňuje mytí a prodlužuje lesk laku. Před aplikací lak vždy připravíme leštěním. Ochrana vydrží po dobu 12 měsíců.",
    price: "5 000 Kč (MPV/SUV 6 000 Kč)",
    photos: ["/images/placeholder.svg"],
  },
  {
    slug: "ppf-folie",
    name: "Ochranné PPF fólie",
    shortDescription:
      "Neviditelná fólie proti odletujícím kamínkům a mechanickému poškození laku.",
    description:
      "Samohojící polyuretanová fólie chrání nejnamáhanější místa karoserie (přední náraz, kapota, zpětná zrcátka, prahy) před odřením a poškozením od kamínků, aniž by změnila vzhled vozu. Řešíme jak dílčí ochranu, tak celý vůz.",
    price: "Cena na dotaz",
    photos: ["/images/placeholder.svg"],
  },
  {
    slug: "dekarbonizace-motoru",
    name: "Dekarbonizace motoru vodíkem",
    shortDescription:
      "Vyčištění motoru od karbonových usazenin vodíkem — bez demontáže, do hodiny.",
    description:
      "Vodík přivedený do sání zvýší teplotu spalování a spálí usazený karbon v motoru, na ventilech, katalyzátoru i DPF filtru. Proces trvá zhruba hodinu, bez demontáže dílů a bez nutnosti výměny oleje. Výsledkem je obnovený výkon, nižší spotřeba a tišší chod motoru.",
    price: "2 499 Kč (do 2 500 cm³), 2 999 Kč (2 500–4 000 cm³)",
    photos: ["/images/placeholder.svg"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
