const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const path = require("path");
const { composePlugins, withNx } = require("@nx/webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = composePlugins(withNx(), (config) => {
  config.output = {
    ...config.output,
    path: path.join(__dirname, "../dist/api"),
  };

  // Update the webpack config as needed here.
  config.resolve.alias = {
    ...config.resolve.alias,
    "@lib/shared": path.join(__dirname, "../libs/shared/src/index.ts"),
  };

  return {
    ...config,
    context: __dirname,
    entry: "./src/main.ts",
    devtool: 'inline-source-map',
    plugins: [
      new NxAppWebpackPlugin({
        target: "node",
        compiler: "tsc",
        main: "./src/main.ts",
        tsConfig: "./tsconfig.app.json",
        assets: [],
        outputHashing: process.env["NODE_ENV"] === "production" ? "all" : "none",
        optimization: process.env["NODE_ENV"] === "production",
        generatePackageJson: true,
        sourceMap: true,
        verbose: process.env["NODE_ENV"] === "development" ? true : false,
      }),
      new ESLintPlugin({
        configType: "flat",
      }),
    ],
  };
});
