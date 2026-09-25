import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-white/50 sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <p>
          © {year} {site.name} — {site.owner}
        </p>
        <p>
          <a href={site.phoneHref} className="hover:text-[var(--accent-text)]">
            {site.phone}
          </a>{" "}
          ·{" "}
          <a href={site.emailHref} className="hover:text-[var(--accent-text)]">
            {site.email}
          </a>{" "}
          ·{" "}
          <a href="/ochrana-osobnich-udaju" className="hover:text-[var(--accent-text)]">
            Ochrana osobních údajů
          </a>
        </p>
      </div>
    </footer>
  );
}
