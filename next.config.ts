import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "tr.rbxcdn.com",
      },
    ],
  },
  async redirects() {
    if (!isProd) {
      return [];
    }

    return [
      {
        source: "/design-system",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
