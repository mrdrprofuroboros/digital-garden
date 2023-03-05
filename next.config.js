module.exports = {
  output: "standalone",
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      buffer: false,
    };
    return config;
  },
};