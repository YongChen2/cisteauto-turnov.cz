import { getImageProps } from "next/image";
import type { ServicePhoto } from "@/data/services";

/** `sizes` of gallery photos — shared by the modal and the preloader so both request the same URL. */
export const GALLERY_SIZES = "(max-width: 900px) 100vw, 900px";

const preloaded = new Set<string>();

/** Warms the browser cache with exactly the variant the gallery modal will request. */
export function preloadGalleryPhoto(photo: ServicePhoto | undefined) {
  if (!photo || typeof window === "undefined" || preloaded.has(photo.src)) return;
  preloaded.add(photo.src);

  const { props } = photo.natural
    ? getImageProps({ src: photo.src, alt: "", ...photo.natural })
    : getImageProps({ src: photo.src, alt: "", fill: true, sizes: GALLERY_SIZES });

  const img = new window.Image();
  img.decoding = "async";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}
