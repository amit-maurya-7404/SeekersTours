/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '192.168.1.109',
    'localhost',
    '127.0.0.1',
    '192.168.1.109:3000',
    '192.168.1.109:3001',
    'localhost:3000',
    'localhost:3001'
  ],
  experimental: {
    serverActions: {
      allowedOrigins: [
        '192.168.1.109:3000',
        '192.168.1.109:3001',
        'localhost:3000',
        'localhost:3001'
      ],
    },
  },
}

export default nextConfig