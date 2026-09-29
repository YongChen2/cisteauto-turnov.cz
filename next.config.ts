import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Source photos are at most 1600 px wide, so larger variants would only duplicate them.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [96, 128, 256, 384, 480],
    // 75 for photos, 90 for hand-picked card thumbnails (ServicePhoto.quality).
    qualities: [75, 90],
    // Optimized variants are immutable per source file; keep them cached for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
