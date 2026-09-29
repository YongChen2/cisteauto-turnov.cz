import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { navLinks } from "@/data/nav";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#top" className="flex-shrink-0">
          <Image
            src={site.logo.light}
            alt={site.logo.alt}
            width={site.logo.width}
            height={site.logo.height}
            loading="eager"
            sizes="120px"
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Hlavní navigace" className="hidden items-center gap-8 text-sm font-medium text-white/70 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="py-3 transition hover:text-accent-text">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-hover sm:px-5"
          >
            Zavolat
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
