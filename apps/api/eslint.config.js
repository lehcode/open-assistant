const nestjs = require("eslint-plugin-nestjs");
const baseConfig = require("../eslint.config.js");

const config = [...baseConfig];

config.plugins = { ...baseConfig.plugins, nestjs };

config.rules = {
  ...baseConfig.rules,
  ...nestjs.rules["flat/recommended"],
  "@nx/enforce-module-boundaries": "off",
};

module.exports = config;
