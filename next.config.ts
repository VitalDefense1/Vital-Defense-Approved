import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  // Hide the Next.js dev-tools badge and its side panel on the preview.
  devIndicators: false,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
