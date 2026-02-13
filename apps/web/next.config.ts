import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@way/auth-sdk"],
};

export default nextConfig;
