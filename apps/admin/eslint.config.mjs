import configs from "eslint-plugin-vue";
import baseConfig from "../eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";

export default [
  ...baseConfig,
  ...configs.configs["flat/base"],
  ...configs.configs["flat/recommended"],
  ...configs.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tsParser },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.vue"],
    rules: { "vue/multi-word-component-names": "off" },
  },
];
