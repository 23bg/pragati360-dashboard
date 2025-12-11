import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "example.com",       // your demo data
      "cloudflare-ipfs.com",
      "pub-xxxxxxxxxx.r2.dev",
      "your-custom-cdn.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
