/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")
const nextConfig = {
  async headers() {
    return [
      {
        source: "/static/:charting_library*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300",
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  i18n,
  distDir: "build",
}

module.exports = nextConfig
