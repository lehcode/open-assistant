const eslintJs = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const baseConfig = require("../eslint.config.cjs");
const { FlatCompat } = require("@eslint/eslintrc");
const { node, jest, vitest } = require("globals");

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
    files: ["**/*.vue", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        globals: {
          ...node,
        }
      }
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  },
  {
    files: ["**/*.spec.ts",],
    languageOptions: {
      parserOptions: {
        globals: {
          ...node,
          ...jest,
          ...vitest,
        }
      }
    }
  },
  {
    files: ["**/*.vue", "**/*.html"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-newline": "off"
    }
  }
];
