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

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // TODO: This is dangerous. We should be using a CDN.
        // ^ can we explain why in these comments or provide a Linear ID?
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
