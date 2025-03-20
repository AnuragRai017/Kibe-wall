import { fetchFromNextjs } from '@cloudflare/next-on-pages';

const worker = {
  async fetch(request, env) {
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

export default worker;