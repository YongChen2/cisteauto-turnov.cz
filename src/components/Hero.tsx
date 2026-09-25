import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 60%), radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--accent) 15%, transparent), transparent 55%)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Turnov &amp; okolí
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          {site.claim}. Interiér, lak i motor v rukou zkušeného detailera —{" "}
          {site.owner}.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={site.phoneHref}
            className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Zavolat {site.phone}
          </a>
          <a
            href="#sluzby"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Služby
          </a>
        </div>
      </div>
    </section>
  );
}
