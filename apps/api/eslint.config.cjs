const { nestjsPlugin } = require("eslint-plugin-nestjs");
const baseConfig = require("../eslint.config.cjs");

const config = [...baseConfig];

config.plugins = { ...config.plugins, nestjsPlugin };

config.rules = {
  ...config.rules,
  ...nestjsPlugin.configs["recommended"],
  "@nx/enforce-module-boundaries": "off",
};

module.exports = config;
