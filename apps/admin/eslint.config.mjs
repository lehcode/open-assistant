import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import baseConfig from "../eslint.config.mjs";

export default [
  ...baseConfig,
  ...pluginVue.configs["flat/base"],
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tsParser },
    },
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
    files: ["**/*.vue", "**/*.html"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-newline": "off"
    }
  },
];
