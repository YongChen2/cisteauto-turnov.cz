import Link from "next/link";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#top" className="text-base font-bold tracking-tight text-white sm:text-lg">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 sm:flex">
          <Link href="/#sluzby" className="transition hover:text-white">
            Služby
          </Link>
          <Link href="/#kontakt" className="transition hover:text-white">
            Kontakt
          </Link>
        </nav>

        <a
          href={site.phoneHref}
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:px-5"
        >
          Zavolat
        </a>
      </div>
    </header>
  );
}
