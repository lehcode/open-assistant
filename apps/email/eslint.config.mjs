import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";

const nx = require('@nx/eslint-plugin');
const baseConfig = require('../eslint.config.js');

const config = [
  ...baseConfig,
  ...nx.configs['flat/react'],
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "react-app",
      "plugin:prettier/recommended",
    ),
  ),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];

export default config;
