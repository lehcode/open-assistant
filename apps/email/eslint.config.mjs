import { fixupConfigRules } from "@eslint/compat";
import baseConfig from "../eslint.config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

baseConfig.plugins = { ...baseConfig.plugins, react };

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const newConfig = [
  ...baseConfig,
  {
    languageOptions: {
      ...baseConfig.languageOptions,
      globals: {
        ...globals.browser
      }
    }
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      // "plugin:react/recommended",
      // "plugin:react/jsx-runtime",
      "plugin:prettier/recommended"
    )
  ),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {}
  },
  {
    settings: {
      react: {
        version: "18.3"
      }
    }
  }
];

export default newConfig;
