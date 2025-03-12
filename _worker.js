// Cloudflare Worker entry point for Next.js

export default {
  async fetch(request, env, ctx) {
    try {
      // You can customize request handling here
      const nextApp = await import('./.next/server/chunks/entry.js');
      
      // Call the Next.js request handler
      return await nextApp.default(request, env, ctx);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
}; 