// Optimizes photos in public/images and writes src/data/image-meta.json
// (dimensions + tiny blur placeholders for next/image).
//
//   npm run images
//
// Re-run after adding or replacing any photo. Uses sharp, which ships with Next.js.
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative, extname } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const IMAGES = join(ROOT, "public", "images");
const META_FILE = join(ROOT, "src", "data", "image-meta.json");
const MAX_WIDTH = 1600;
const QUALITY = 78;
// Target size per photo; very detailed shots step the quality down until they fit.
const MAX_BYTES = 250 * 1024;
const FALLBACK_QUALITIES = [72, 66, 60];
// Client's original logo upload, kept only as a source file.
const SKIP = new Set(["logo.jpeg"]);
// Card thumbnails exported deliberately at high quality (q90) — never re-compress them.
const KEEP_QUALITY = /-karta\.webp$/;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(webp|png)$/i.test(entry.name) && !SKIP.has(entry.name)) out.push(full);
  }
  return out;
}

async function optimize(file) {
  const input = await readFile(file);
  if (KEEP_QUALITY.test(file)) return { before: input.length, after: input.length };
  // Already-optimized files are left alone, so re-running never re-compresses a photo twice.
  const info = await sharp(input).metadata();
  const hasMetadata = Boolean(info.exif || info.icc || info.xmp || info.iptc);
  if (input.length <= MAX_BYTES && info.width <= MAX_WIDTH && !hasMetadata) {
    return { before: input.length, after: input.length };
  }
  const pipeline = () => sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  let output;
  if (extname(file).toLowerCase() === ".png") {
    output = await pipeline().png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  } else {
    output = await pipeline().webp({ quality: QUALITY, effort: 6 }).toBuffer();
    for (const quality of FALLBACK_QUALITIES) {
      if (output.length <= MAX_BYTES) break;
      output = await pipeline().webp({ quality, effort: 6 }).toBuffer();
    }
  }
  // Keep the original when re-encoding would not make it meaningfully smaller.
  if (output.length < input.length * 0.97) {
    await writeFile(file, output);
    return { before: input.length, after: output.length };
  }
  return { before: input.length, after: input.length };
}

async function meta(file) {
  const image = sharp(file);
  const { width, height } = await image.metadata();
  const blur = await image.resize(16).webp({ quality: 40 }).toBuffer();
  return { width, height, blurDataURL: `data:image/webp;base64,${blur.toString("base64")}` };
}

const files = (await walk(IMAGES)).sort();
const rows = [];
const metaMap = {};
for (const file of files) {
  const { before, after } = await optimize(file);
  const src = "/" + relative(join(ROOT, "public"), file).split("\\").join("/");
  metaMap[src] = await meta(file);
  rows.push({ src, before, after });
}
await writeFile(META_FILE, JSON.stringify(metaMap, null, 2) + "\n");

const kb = (n) => `${(n / 1024).toFixed(0)} kB`;
let totalBefore = 0;
let totalAfter = 0;
for (const r of rows) {
  totalBefore += r.before;
  totalAfter += r.after;
  console.log(`${r.src.padEnd(52)} ${kb(r.before).padStart(8)} → ${kb(r.after).padStart(8)}`);
}
console.log(`${"TOTAL".padEnd(52)} ${kb(totalBefore).padStart(8)} → ${kb(totalAfter).padStart(8)}`);
console.log(`meta: ${relative(ROOT, META_FILE)} (${(await stat(META_FILE)).size} B)`);
