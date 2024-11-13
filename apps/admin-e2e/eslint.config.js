const config = require("eslint-plugin-playwright");
const baseConfig = require("../eslint.config.js");

module.exports = [
  config.configs["flat/recommended"],

  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.js"],
    // Override or add rules here
    rules: {},
  },
];
