import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3009/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://127.0.0.1:3009/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
