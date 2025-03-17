import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Type checking for API routes - disabling this can fix the build issue
    typedRoutes: false,
  },
  output: 'standalone', // Enable standalone output for Cloudflare Workers
  
  // Configure headers to avoid CORS issues with API routes
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Be more restrictive in production
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // Optimize for Cloudflare Workers environment
  images: {
    // Cloudflare doesn't support the default Next.js Image Optimization
    unoptimized: true,
  },
};

export default nextConfig;
