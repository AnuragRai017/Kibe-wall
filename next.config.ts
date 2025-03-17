import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Type checking for API routes - disabling this can fix the build issue
    typedRoutes: false,
    serverComponentsExternalPackages: [], // Packages to be bundled in the server build
  },
  output: 'standalone', // Enable standalone output for Cloudflare Workers
  
  // This enables compatibility with Cloudflare Workers
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
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
    domains: ['wallhaven.cc'], // Add domains you want to allow for images
  },
};

// For Next.js on Cloudflare integration
if (process.env.NODE_ENV === 'production' && process.env.CF_PAGES === '1') {
  // Apply cloudflare-specific configuration
}

export default nextConfig;
