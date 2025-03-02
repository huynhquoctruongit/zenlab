// next.config.js
/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";
import NextBundleAnalyzer from "@next/bundle-analyzer";
export const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
};

module.exports = {
  output: "standalone",
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: "worker-loader",
      options: {
        name: "static/[hash].worker.js",
        publicPath: "/_next/",
      },
    });

    // Overcome Webpack referencing `window` in chunks
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

    return config;
  },
};
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: !!process.env.ANALYZE == true,
});
const bundledConfig = withBundleAnalyzer({
  ...nextConfig,
});
export default bundledConfig;
