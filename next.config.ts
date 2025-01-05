import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Enable server actions
      bodySizeLimit: "4mb", // Set the body size limit to 4mb (default is 1mb)
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nimbxzvodnqem0c9.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
