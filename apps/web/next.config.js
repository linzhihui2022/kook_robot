/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.kookapp.cn",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.kaiheila.cn",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
