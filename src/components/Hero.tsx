import Image from "next/image";
import { site } from "@/data/site";
import { blurProps } from "@/lib/image-meta";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.webp"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          {...blurProps("/images/hero/hero.webp")}
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
        <div className="hero-glow absolute inset-0" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative mb-10">
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -inset-y-6 rounded-full bg-accent/25 blur-3xl"
          />
          <Image
            src={site.logo.light}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            loading="eager"
            sizes="(max-width: 640px) 288px, 448px"
            className="relative h-auto w-72 sm:w-[28rem]"
          />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-text">
          Turnov &amp; okolí
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
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
