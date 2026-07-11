/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — produces a plain HTML/CSS/JS site in ./out that Hostinger
  // can serve directly (no Node runtime needed).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
