import { site } from "@/data/site";
import CookieSettingsButton from "@/components/CookieSettingsButton";

const linkClass = "transition hover:text-accent-text";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-white/50 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p>
            <a href={site.phoneHref} className={linkClass}>
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={site.emailHref} className={linkClass}>
              {site.email}
            </a>
          </p>
          <nav aria-label="Právní informace">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <li>
                <a href="/obchodni-podminky" className={linkClass}>
                  Obchodní podmínky
                </a>
              </li>
              <li>
                <a href="/ochrana-osobnich-udaju" className={linkClass}>
                  Ochrana osobních údajů
                </a>
              </li>
              <li>
                <a href="/cookies" className={linkClass}>
                  Cookies
                </a>
              </li>
              <li>
                <CookieSettingsButton className={`${linkClass} cursor-pointer`} />
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-1 border-t border-white/5 pt-6 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {site.name} — {site.owner}
          </p>
          <p>
            Created by{" "}
            <a
              href="https://topprofitdesign.cz/"
              target="_blank"
              rel="noopener"
              className={linkClass}
            >
              TopProfitDesign
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
