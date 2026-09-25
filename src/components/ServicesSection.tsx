"use client";

import { useState } from "react";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import GalleryModal from "@/components/GalleryModal";

export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openService = services.find((s) => s.slug === openSlug) ?? null;

  return (
    <section id="sluzby" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Naše služby</h2>
        <p className="mt-3 text-white/60">
          Od pravidelného čištění po dlouhodobou ochranu laku. Klikněte na kartu a prohlédněte si fotografie.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} onOpen={() => setOpenSlug(service.slug)} />
        ))}
      </div>

      {openService && <GalleryModal service={openService} onClose={() => setOpenSlug(null)} />}
    </section>
  );
}
