const playwright = require('eslint-plugin-playwright');
const baseConfig = require('../eslint.config.js');

const config = [
  playwright.configs['flat/recommended'],

  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];

export default config;
