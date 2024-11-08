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
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    rules: { 
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  }
];
