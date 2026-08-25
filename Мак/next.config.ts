import type { NextConfig } from "next";

const isIisStaticExport = process.env.IIS_STATIC_EXPORT === "true";

const nextConfig: NextConfig = isIisStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
      typescript: { tsconfigPath: "tsconfig.iis.json" },
    }
  : {};

export default nextConfig;
