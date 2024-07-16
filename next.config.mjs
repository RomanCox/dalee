// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone",
//   sassOptions: {
//     includePaths: ["./src"],
//     prependData: `@import "~@/styles/vars.scss";`,
//   },
// };
//
// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: ["./src"],
    prependData: `@import "~@/styles/vars.scss";`,
  },
  images: {
    remotePatterns: [{ hostname: "admin.dalee.team" }],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // Настройки svgr (если нужно)
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
