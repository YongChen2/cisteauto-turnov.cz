import { memo } from "react";
import Image from "next/image";
import type { Service } from "@/data/services";
import { blurProps } from "@/lib/image-meta";
import { preloadServiceGallery } from "@/lib/gallery";

type ServiceCardProps = {
  service: Service;
  onOpen: (slug: string) => void;
};

function ServiceCard({ service, onOpen }: ServiceCardProps) {
  // Intent to open (hover, keyboard focus, touch) warms the gallery's first photo.
  const warmUp = () => preloadServiceGallery(service);

  return (
    <button
      type="button"
      data-gallery={service.slug}
      onClick={() => onOpen(service.slug)}
      onPointerEnter={warmUp}
      onFocus={warmUp}
      onTouchStart={warmUp}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-accent/60 hover:bg-white/[0.06] hover:shadow-accent-glow focus-visible:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <Image
          src={service.cover.src}
          alt={service.cover.alt ?? service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={service.cover.quality}
          {...blurProps(service.cover.src)}
          className="object-cover transition duration-500 group-hover:scale-105"
          style={service.cover.objectPosition ? { objectPosition: service.cover.objectPosition } : undefined}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-white">{service.name}</h3>
        <p className="text-sm leading-relaxed text-white/60">{service.shortDescription}</p>
        <span className="mt-auto pt-3 text-sm font-medium text-accent-text">{service.price}</span>
      </div>
    </button>
  );
}

export default memo(ServiceCard);
