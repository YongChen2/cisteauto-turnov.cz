import Image from "next/image";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-text">
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
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-hover"
          >
            Zavolat {site.phone}
          </a>
          <a
            href="#sluzby"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/5"
          >
            Služby
          </a>
        </div>
      </div>
    </section>
  );
}
