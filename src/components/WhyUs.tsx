const points = [
  {
    title: "Zkušenosti od roku 2013",
    text: "Autodetailingu se věnujeme dlouhodobě a za tu dobu jsme na svých rukou vyleštili stovky vozů.",
  },
  {
    title: "Individuální přístup",
    text: "Každé auto má jiný stav laku i interiéru — rozsah práce vždy přizpůsobíme konkrétnímu vozu.",
  },
  {
    title: "Profesionální přípravky",
    text: "Pracujeme s osvědčenou profesionální chemií a technikou určenou přímo pro autodetailing.",
  },
  {
    title: "Turnov-Přepeře",
    text: "Provozovnu najdete přímo v Přepeřích u Turnova, snadno dostupnou z celého okolí.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Proč k nám</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title}>
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
