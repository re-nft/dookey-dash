/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NEXT_STANDALONE && {
    output: "standalone",
    experimental: { outputFileTracingRoot: process.cwd() },
  }),

  reactStrictMode: true,
  transpilePackages: ["use-delegatecash", "delegatecash"],

  webpack: (config) => {
    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = nextConfig;
