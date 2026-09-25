import { site } from "@/data/site";

const steps = [
  {
    step: "1",
    title: "Zavoláte",
    text: `Ozvěte se na ${site.phone} nebo napište na ${site.email} a popíšete, co vůz potřebuje.`,
  },
  {
    step: "2",
    title: "Domluvíme termín",
    text: "Společně vybereme termín v provozovně v Turnově-Přepeřích, který vám bude vyhovovat.",
  },
  {
    step: "3",
    title: "Předáme čisté auto",
    text: "Vůz ošetříme podle domluveného rozsahu a předáme ho zpět čisté a připravené na cestu.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Jak to probíhá</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center sm:text-left">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/15 text-sm font-bold text-[var(--accent-text)] sm:mx-0">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
