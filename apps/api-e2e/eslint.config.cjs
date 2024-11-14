const { rules } = require("eslint-plugin-nestjs");
const baseConfig = require("../eslint.config.cjs");

const config = [...baseConfig];

config.rules = {
  ...rules,
  // ...rules["flat/recommended"],
  "@nx/enforce-module-boundaries": "off",
};

module.exports = config;
