import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Type checking for API routes - disabling this can fix the build issue
    typedRoutes: false,
  },
  output: 'standalone', // Enable standalone output for Cloudflare Workers
};

export default nextConfig;
