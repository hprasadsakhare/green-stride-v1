/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", 'google');
    return config;
  },
};

module.exports = {
  webpack: (config) => {
    config.externals = [...config.externals, { "google": "google" }];
    return config;
  },
};


export default nextConfig;
