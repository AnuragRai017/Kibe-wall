// Cloudflare Worker entry point for Next.js

// This adapter is specifically designed for Cloudflare Workers
export default {
  async fetch(request) {
    try {
      // Get the URL from the request
      const url = new URL(request.url);
      
      // For favicon requests, return a 204 No Content
      if (url.pathname === '/favicon.ico') {
        return new Response(null, { status: 204 });
      }
      
      // For all other requests, show a useful error page
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Anime Wallpaper Finder</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charset="utf-8" />
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                line-height: 1.6;
              }
              h1 {
                color: #4f46e5;
                border-bottom: 2px solid #4f46e5;
                padding-bottom: 0.5rem;
              }
              .card {
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin: 1.5rem 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              .info {
                background-color: #eff6ff;
                border-left: 4px solid #3b82f6;
              }
              .warning {
                background-color: #fef9c3;
                border-left: 4px solid #eab308;
              }
              code {
                background-color: #f3f4f6;
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-family: monospace;
              }
              ul {
                margin-left: 1.5rem;
              }
              li {
                margin-bottom: 0.5rem;
              }
              a {
                color: #4f46e5;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <h1>Anime Wallpaper Finder</h1>
            
            <div class="card info">
              <h2>Deployment Status</h2>
              <p>Your worker is successfully deployed at <code>${request.url}</code>, but there's an issue with how Next.js is being served.</p>
            </div>
            
            <div class="card warning">
              <h2>Next.js and Cloudflare Workers</h2>
              <p>There are compatibility issues between your Next.js application and Cloudflare Workers. Here are some recommended solutions:</p>
              <ul>
                <li>Deploy your Next.js application to <a href="https://vercel.com" target="_blank">Vercel</a>, which has native Next.js support</li>
                <li>Use <a href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/" target="_blank">Cloudflare Pages</a> instead of Workers for Next.js applications</li>
                <li>Install the appropriate Next.js adapter for Cloudflare Workers</li>
              </ul>
            </div>
            
            <div class="card">
              <h2>Current Configuration Issues</h2>
              <p>The worker is trying to serve your Next.js application but is encountering errors. Common issues include:</p>
              <ul>
                <li>Dynamic imports not working correctly in the Workers environment</li>
                <li>Incorrect paths in the worker file</li>
                <li>Missing build configuration for Workers compatibility</li>
              </ul>
            </div>
            
            <div class="card">
              <h2>Need Help?</h2>
              <p>Check out these resources:</p>
              <ul>
                <li><a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers Documentation</a></li>
                <li><a href="https://nextjs.org/docs" target="_blank">Next.js Documentation</a></li>
                <li><a href="https://github.com/cloudflare/next-on-pages" target="_blank">Cloudflare Next on Pages</a></li>
              </ul>
            </div>
          </body>
        </html>`,
        {
          status: 200,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
        }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error: ' + (error.message || 'Unknown error'), { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}; 