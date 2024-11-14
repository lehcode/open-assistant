const eslintJs = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const baseConfig = require("../eslint.config.cjs");
const { FlatCompat } = require("@eslint/eslintrc");
const { node, jest, vitest } = require("globals");
const vueParser = require("vue-eslint-parser");
const tsEslintParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: eslintJs.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: eslintJs.configs.all // optional unless using "eslint:all"
});

const config = [...baseConfig];

config.plugins = [...compat.plugins("eslint-plugin-vue")];

config.env = [
  ...compat.env({
    es2022: true,
    node: true
  })
];

config.extends = compat.extends(...["plugin:vue/vue3-essential", "plugin:vue/vue3-recommended"]);

module.exports = [
  ...config,
  ...pluginVue.configs["flat/base"],
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslintParser,
        globals: {
          ...node
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-undef": "error",
      "no-debugger": "error",
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.vue"],
    rules: {
      // Turn off the recommended rules that you don't need.
      "vue/multi-word-component-names": "off",
      "vue/block-lang": "off",
      "no-unused-vars": "off",
    }
  },
  {
    files: ["**/*.vue"],
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
    }
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
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "off",
    }
  },
  {
    files: ["**/*.vue", "**/*.html"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-newline": "off"
    }
  },
  {
    files: ["**/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  }
];
