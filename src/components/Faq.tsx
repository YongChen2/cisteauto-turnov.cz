const faqs = [
  {
    question: "Jak dlouho servis trvá?",
    answer:
      "Záleží na rozsahu práce — dekarbonizace motoru trvá zhruba hodinu, u čištění interiéru, leštění, keramiky nebo PPF fólií čas záleží na stavu vozu. Přesnou dobu upřesníme po telefonu.",
  },
  {
    question: "Jak dlouho vydrží keramická ochrana laku?",
    answer: "Keramická ochrana laku vydrží 12 měsíců.",
  },
  {
    question: "Je nutné se předem objednat?",
    answer:
      "Ano, ozvěte se prosím předem telefonicky nebo e-mailem — konkrétní volný termín si domluvíme podle vašich možností.",
  },
  {
    question: "Lze služby kombinovat?",
    answer:
      "Ano, například dekarbonizaci motoru lze kombinovat s čištěním interiéru se slevou 20 %. Ostatní kombinace upřesníme po telefonu.",
  },
  {
    question: "Jak mohu zaplatit?",
    answer: "Možnosti platby upřesníme po telefonu při domluvě termínu.",
  },
];

export default function Faq() {
  return (
    <section className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Časté dotazy</h2>
        </div>

        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5 open:bg-white/[0.02]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                {faq.question}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 flex-shrink-0 text-white/50 transition group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
