import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/': ['./node_modules/.prisma/client/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/',
        permanent: false,
      },
      {
        source: '/api/auth/callback/google',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
