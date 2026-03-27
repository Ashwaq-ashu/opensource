import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://127.0.0.1:3001'}/api/:path*`,
      },
      {
        source: '/chat',
        destination: `${process.env.BACKEND_URL || 'http://127.0.0.1:3001'}/chat`,
      },
    ];
  },
};

export default nextConfig;
