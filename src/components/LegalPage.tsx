import Footer from "@/components/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        {updated && <p className="mt-3 text-sm text-white/50">{updated}</p>}
        <div className="mt-8 flex flex-col gap-8 text-white/70">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-2 flex flex-col gap-3 leading-relaxed">{children}</div>
    </section>
  );
}

/** Visible placeholder for information the owner still has to fill in. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded bg-amber-300/20 px-1 font-semibold text-amber-200">
      [DOPLNIT {children}]
    </mark>
  );
}

export const legalLinkClass = "text-white underline hover:text-accent-text";
