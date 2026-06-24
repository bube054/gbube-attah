import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity-hosted images (when the CMS is wired up).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
