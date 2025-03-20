import { fetchFromNextjs } from '@cloudflare/next-on-pages';

export default {
  async fetch(request, env, ctx) {
    // Forward the request to the Next.js server
    try {
      return await fetchFromNextjs(request, {
        buildOutput: env.ASSETS,
        rootPath: '/',
      });
    } catch (error) {
      return new Response(`Next.js Server Error: ${error.message || 'Unknown error'}`, { 
        status: 500, 
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};