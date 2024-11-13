const tsParser = require("@typescript-eslint/parser");
const pluginVue = require("eslint-plugin-vue");
const baseConfig = require("../eslint.config.js");
const vueParser = require("vue-eslint-parser");

module.exports = [
  ...baseConfig,
  ...pluginVue.configs["flat/base"],
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  {
    files: ["**/*.vue", "**/*.html"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-newline": "off",
    },
  },
];
