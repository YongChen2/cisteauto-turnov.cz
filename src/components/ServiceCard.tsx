import Image from "next/image";
import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  onOpen: () => void;
};

export default function ServiceCard({ service, onOpen }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-[var(--accent)]/50 hover:bg-white/[0.06] cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <Image
          src={service.cover.src}
          alt={service.name}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-white">{service.name}</h3>
        <p className="text-sm leading-relaxed text-white/60">{service.shortDescription}</p>
        <span className="mt-auto pt-3 text-sm font-medium text-[var(--accent-text)]">{service.price}</span>
      </div>
    </button>
  );
}
