/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — produces a plain HTML/CSS/JS site in ./out that any
  // static host (Hostinger, S3, GitHub Pages) can serve without a Node runtime.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
