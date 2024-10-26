const vue = require('eslint-plugin-vue');
const baseConfig = require('../eslint.config.js');

const config = [
  ...baseConfig,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: require('@typescript-eslint/parser') },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
];

export default config;
