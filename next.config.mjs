/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["gsap", "motion", "lenis", "lucide-react"]
  }
};

export default nextConfig;
