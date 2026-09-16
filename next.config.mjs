/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "media.giphy.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["motion", "lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*.mov",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
