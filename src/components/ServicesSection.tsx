"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import GalleryModal from "@/components/GalleryModal";

declare global {
  interface Window {
    __galleryReady?: boolean;
    __pendingGallery?: string;
  }
}

export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openService = services.find((s) => s.slug === openSlug) ?? null;
  const handleOpen = useCallback((slug: string) => setOpenSlug(slug), []);
  const handleClose = useCallback(() => setOpenSlug(null), []);

  // A card tapped before hydration is recorded by the inline script in the root layout;
  // open that gallery as soon as React is ready.
  useEffect(() => {
    window.__galleryReady = true;
    const pending = window.__pendingGallery;
    delete window.__pendingGallery;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pending && services.some((s) => s.slug === pending)) setOpenSlug(pending);
  }, []);

  return (
    <section id="sluzby" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl heading-accent">Naše služby</h2>
        <p className="mt-3 text-white/60">
          Od pravidelného čištění po dlouhodobou ochranu laku. Klikněte na kartu a prohlédněte si fotografie.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} onOpen={handleOpen} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/cenik"
          className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent-muted"
        >
          Kompletní ceník
        </Link>
      </div>

      {openService && <GalleryModal service={openService} onClose={handleClose} />}
    </section>
  );
}
