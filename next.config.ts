import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,

  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard pattern
      },
      {
        protocol: 'http',
        hostname: '**', // Wildcard pattern
      },
    ],
  },

  // eslint key removed
};

export default nextConfig;
