import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/balesin.id",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
