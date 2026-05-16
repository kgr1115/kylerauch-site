/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages deploy
  output: 'export',

  // Cloudflare Pages serves with trailing slashes by default
  trailingSlash: true,

  // Static export doesn't support next/image optimization
  images: {
    unoptimized: true,
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // React strict mode for catching issues early
  reactStrictMode: true,
};

export default nextConfig;
