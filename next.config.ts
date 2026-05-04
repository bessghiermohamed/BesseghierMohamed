import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For GitHub Pages deployment, use:
  // output: "export",
  // basePath: "/OmniSchool",
  // images: { unoptimized: true },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["21.0.3.249"],
};

export default nextConfig;
