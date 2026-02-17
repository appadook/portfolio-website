import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.convex.site',
      },
    ],
  },
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@way/auth-sdk"],
};

export default nextConfig;
