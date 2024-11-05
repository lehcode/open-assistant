import playwright from 'eslint-plugin-playwright';
import baseConfig from '../eslint.config.js';

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
