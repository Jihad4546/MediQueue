/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // This matches ANY secure domain
      },
      {
        protocol: 'http',
        hostname: '*', // This matches ANY insecure domain
      }
    ],
  },
};

export default nextConfig;