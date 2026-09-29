import { getImageProps } from "next/image";
import type { BeforeAfterPair, Service, ServicePhoto } from "@/data/services";

/** `sizes` of gallery photos — shared by the modal and the preloader so both request the same URL. */
export const GALLERY_SIZES = "(max-width: 900px) 100vw, 900px";
/** `sizes` of before/after slider photos (portrait stage, at most ~480 px wide). */
export const BEFORE_AFTER_SIZES = "(max-width: 640px) 100vw, 480px";

const preloaded = new Set<string>();

function preload(src: string, sizes: string, natural?: { width: number; height: number }) {
  if (typeof window === "undefined" || preloaded.has(src)) return;
  preloaded.add(src);

  const { props } = natural
    ? getImageProps({ src, alt: "", ...natural })
    : getImageProps({ src, alt: "", fill: true, sizes });

  const img = new window.Image();
  img.decoding = "async";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

/** Warms the browser cache with exactly the variant the gallery modal will request. */
export function preloadGalleryPhoto(photo: ServicePhoto | undefined) {
  if (photo) preload(photo.src, GALLERY_SIZES, photo.natural);
}

/** Preloads both photos of a before/after pair. */
export function preloadBeforeAfter(pair: BeforeAfterPair | undefined) {
  if (!pair) return;
  preload(pair.before, BEFORE_AFTER_SIZES);
  preload(pair.after, BEFORE_AFTER_SIZES);
}

/** Preloads what a service's gallery shows first. */
export function preloadServiceGallery(service: Service) {
  if (service.beforeAfter?.length) preloadBeforeAfter(service.beforeAfter[0]);
  else preloadGalleryPhoto(service.photos[0]);
}
