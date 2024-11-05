const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { NxReactWebpackPlugin } = require("@nx/react/webpack-plugin");
const { join } = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  output: {
    path: join(__dirname, "../dist/email"),
  },
  devServer: {
    host: "0.0.0.0",
    port: 4200,
    historyApiFallback: {
      index: "/index.html",
      disableDotRule: true,
      htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      tsConfig: "./tsconfig.app.json",
      compiler: "babel",
      main: "./src/main.tsx",
      index: "./src/index.html",
      baseHref: "/",
      assets: ["./src/favicon.ico", "./src/assets"],
      styles: ["./src/styles.css"],
      outputHashing: process.env["NODE_ENV"] === "production" ? "all" : "none",
      optimization: process.env["NODE_ENV"] === "production",
      target: "web",
      sourceMap: true,
      extractCss: true,
      crossOrigin: "anonymous",
      verbose: process.env["NODE_ENV"] === "development" ? true : false,
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      svgr: false,
    }),
    new ESLintPlugin({
      configType: "flat",
    }),
  ],
};
