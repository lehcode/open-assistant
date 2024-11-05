import js from '@eslint/js';
import * as nxPlugin from '@nx/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import * as jsoncParser from 'jsonc-eslint-parser';

// console.log(nxPlugin)

export default [
  js.configs.recommended,
  // { plugins: { '@nx': nxPlugin } },
  ...nxPlugin.default.configs['flat/base'],
  ...nxPlugin.default.configs['flat/typescript'],
  ...nxPlugin.default.configs['flat/javascript'],
  ...nxPlugin.default.configs['flat/react-base'],
  ...nxPlugin.default.configs['flat/react-jsx'],
  ...nxPlugin.default.configs['flat/react-typescript'],
  {
    ignores: ['**/dist', '**/node_modules'],
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
    },
  },
  {
    files: ['*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$',
          ],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx' ],
    // Override or add rules here
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
];
