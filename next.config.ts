import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [],
  },
  
  // Compression and optimization
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

// Create the next-intl plugin (configuration is managed in middleware.ts)
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
