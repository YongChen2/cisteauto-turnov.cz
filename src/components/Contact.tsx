import { site } from "@/data/site";
import ContactForm from "@/components/ContactForm";
import ConsentMap from "@/components/ConsentMap";

export default function Contact() {
  return (
    <section id="kontakt" className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Kontakt</h2>
          <p className="mt-3 text-white/60">Domluvte si termín telefonicky, e-mailem nebo přes formulář.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/40">Provozovna</p>
                <p className="mt-1 text-lg text-white">{site.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/40">Telefon</p>
                <a href={site.phoneHref} className="mt-1 block text-lg text-white hover:text-[var(--accent-text)]">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-white/40">E-mail</p>
                <a href={site.emailHref} className="mt-1 block text-lg text-white hover:text-[var(--accent-text)]">
                  {site.email}
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={site.phoneHref}
                  className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Zavolat
                </a>
                <a
                  href={site.emailHref}
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Napsat e-mail
                </a>
              </div>
            </div>

            <ConsentMap />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/80">
            Hledáte dárek? Nabízíme i dárkové poukazy na naše služby — vhodné k narozeninám i svátku.
          </p>
          <a
            href={`${site.emailHref}?subject=${encodeURIComponent("Dárkový poukaz")}`}
            className="whitespace-nowrap rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Mám zájem o poukaz
          </a>
        </div>
      </div>
    </section>
  );
}
