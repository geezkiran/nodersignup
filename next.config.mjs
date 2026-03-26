/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.localhost:3000', // For local testing
          },
        ],
        destination: '/blog/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            // Replace with your actual domain when deploying
            value: 'blog.noder.grid', 
          },
        ],
        destination: '/blog/:path*',
      },
    ];
  },
};

export default nextConfig;
