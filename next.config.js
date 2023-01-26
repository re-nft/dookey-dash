/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NEXT_STANDALONE && {
    output: "standalone",
    experimental: { outputFileTracingRoot: process.cwd() },
  }),

  reactStrictMode: true,
  transpilePackages: ["delegatecash"],
};

module.exports = nextConfig;
