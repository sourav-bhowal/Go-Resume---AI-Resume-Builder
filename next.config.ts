import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Enable server actions
      bodySizeLimit: "4mb", // Set the body size limit to 4mb (default is 1mb)
    },
  },
};

export default nextConfig;
