// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Apply to all relevant files
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Legacy Next.js rules (core-web-vitals, TypeScript, etc)
  ...compat.extends("next/core-web-vitals", "next"),

  // Base JS rules
  pluginJs.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // requires tsconfig.json in project root

  // React rules
  pluginReact.configs.flat.recommended,

  // Extra plugins
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginA11y,
    },
    rules: {
      // Hooks best practices
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
];
