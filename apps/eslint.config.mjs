import js from "@eslint/js";
import * as nxPlugin from "@nx/eslint-plugin";
import * as tsParser from "@typescript-eslint/parser";
import globals from "globals";
import * as jsoncParser from "jsonc-eslint-parser";

export default [
  js.configs.recommended,
  ...nxPlugin.default.configs["flat/base"],
  ...nxPlugin.default.configs["flat/typescript"],
  ...nxPlugin.default.configs["flat/javascript"],
  // ...nxPlugin.default.configs['flat/react-base'],
  // ...nxPlugin.default.configs['flat/react-jsx'],
  // ...nxPlugin.default.configs['flat/react-typescript'],
  {
    ignores: ["**/dist", "**/node_modules"],
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.vitest,
      },
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": [
        "error",
        {
          allowArgumentsExplicitlyTypedAsAny: true, // Allow arguments explicitly typed as <any>
          allowDirectConstAssertionInArrowFunctions: true, // Allow direct const assertions in arrow functions
          allowHigherOrderFunctions: true, // Allow higher-order functions
        },
      ],
      'semi': ['error', 'always'], // Require semicolons
      'no-unused-vars': 'warn', // Warn on unused variables
      "no-undef": "warn", // Warn on undefined variables
      "no-debugger": "warn", // Warn on debugger statements
    },
  },
  {
    files: ["*.json"],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {},
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    // Override or add rules here
    rules: {
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
