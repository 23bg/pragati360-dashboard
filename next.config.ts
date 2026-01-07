import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
      },
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",   // R2 buckets often use pub-<id>.r2.dev
      },
      {
        protocol: "https",
        hostname: "your-custom-cdn.com",
      },
    ],
  },
};

export default nextConfig;
