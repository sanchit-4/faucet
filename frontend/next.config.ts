import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. Ignore TypeScript errors (like type mismatches) during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
