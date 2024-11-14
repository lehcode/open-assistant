const jsConfigs = require("@eslint/js");
const eslintPlugin = require("@nx/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const { node, jest, vitest } = require("globals");
const jsoncParser = require("jsonc-eslint-parser");


module.exports = [
  jsConfigs.configs.recommended,
  ...eslintPlugin.configs["flat/base"],
  ...eslintPlugin.configs["flat/typescript"],
  ...eslintPlugin.configs["flat/javascript"],
  {
    ignores: ["**/dist", "**/node_modules", "**/vite*"]
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...node,
        ...jest,
        ...vitest
      }
    },
    rules: {
      "semi": ["error", "always"], // Require semicolons
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
      "@typescript-eslint/explicit-module-boundary-types": "off",
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
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },
];
