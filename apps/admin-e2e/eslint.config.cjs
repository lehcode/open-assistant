const baseConfig = require("../eslint.config.cjs");
const { FlatCompat } = require("@eslint/eslintrc");
const eslintJs = require("@eslint/js");
const { node, jest, vitest } = require("globals");

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: eslintJs.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: eslintJs.configs.all // optional unless using "eslint:all"
});

const config = [...baseConfig];

config.plugins = [...compat.plugins("eslint-plugin-playwright")];

config.env = [
  ...compat.env({
    es2022: true,
    node: true
  })
];

config.extends = compat.extends(
  ...["plugin:playwright/recommended", "plugin:playwright/jest-playwright", "plugin:playwright/playwright-test"]
);

module.exports = [
  ...config,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        globals: {
          ...node
        }
      }
    },
    // Override or add rules here
    rules: {}
  },
  {
    files: ["**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        globals: {
          ...node,
          ...jest,
          ...vitest
        }
      }
    },
    // Override or add rules here
    rules: {}
  }
];
