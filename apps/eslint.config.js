const js = require("@eslint/js");
const nxPlugin = require("@nx/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");
const jsoncParser = require("jsonc-eslint-parser");

module.exports = [
  js.configs.recommended,
  ...nxPlugin.configs["flat/base"],
  ...nxPlugin.configs["flat/typescript"],
  ...nxPlugin.configs["flat/javascript"],
  // ...nxPlugin.default.configs['flat/react-base'],
  // ...nxPlugin.default.configs['flat/react-jsx'],
  // ...nxPlugin.default.configs['flat/react-typescript'],
  {
    ignores: ["**/dist", "**/node_modules", "**/vite*"]
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.vitest
      }
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      semi: ["error", "always"], // Require semicolons
      "no-unused-vars": "warn", // Warn on unused variables
      "no-undef": "warn", // Warn on undefined variables
      "no-debugger": "warn" // Warn on debugger statements
    }
  },
  {
    files: ["*.json"],
    languageOptions: {
      parser: jsoncParser
    },
    rules: {}
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: ["^.*/eslint(\\.base)?\\.config\\.[cm]?js$"],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"]
            }
          ]
        }
      ]
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    // Override or add rules here
    rules: {
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];
