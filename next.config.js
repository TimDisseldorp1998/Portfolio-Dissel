const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — produces a plain HTML/CSS/JS site in ./out that Hostinger
  // can serve directly (no Node runtime needed).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Dev-only routes: een bestand als `page.dev.tsx` telt alleen mee tijdens
  // `next dev`. Bij `next build` valt de extensie buiten deze lijst, dus de
  // route bestaat niet in de statische export en staat niet publiek online.
  // Zo blijft /aurora-demo/ lokaal bruikbaar zonder mee te liften naar live.
  pageExtensions: isDev
    ? ["tsx", "ts", "jsx", "js", "dev.tsx"]
    : ["tsx", "ts", "jsx", "js"],
};

module.exports = nextConfig;
