import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="kontakt" className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Kontakt</h2>
          <p className="mt-3 text-white/60">Domluvte si termín telefonicky nebo e-mailem.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-white/40">Provozovna</p>
              <p className="mt-1 text-lg text-white">{site.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-white/40">Telefon</p>
              <a href={site.phoneHref} className="mt-1 block text-lg text-white hover:text-[var(--accent)]">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-white/40">E-mail</p>
              <a href={site.emailHref} className="mt-1 block text-lg text-white hover:text-[var(--accent)]">
                {site.email}
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
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

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Mapa — Čisté auto Turnov"
              src="https://www.google.com/maps?q=Přepeře+227,+511+01+Turnov&output=embed"
              className="h-80 w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
