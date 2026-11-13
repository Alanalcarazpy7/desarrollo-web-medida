import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: '/:lang(es|en)/servicios/desarrollo-web-lanzamiento',
      destination: '/:lang/servicios/desarrollo-web-basica',
      permanent: true,
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
