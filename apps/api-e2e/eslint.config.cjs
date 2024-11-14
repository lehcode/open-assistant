const baseConfig = require("../api/eslint.config.cjs");

const config = [...baseConfig];

config.rules = {
  "@nx/enforce-module-boundaries": "off",
};

module.exports = config;
