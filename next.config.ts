import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Type checking for API routes - disabling this can fix the build issue
    typedRoutes: false,
  }
};

export default nextConfig;
