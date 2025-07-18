import globals from "globals";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  // Global ignores - tells ESLint to never even look in these folders
  { ignores: ["dist/", "backend/node_modules/"] },

  // Configuration for src folder
  {
    files: ["src/**/*.{js,mjs,jsx,ts,tsx}"], // Only applies to files in the src directory
    ...fixupConfigRules(pluginReactConfig), // Applies recommended React rules
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.es2020 }, // Use browser and modern JS globals
    }
  },

  // Configuration for backend folder
  {
    name: "backend-config",
    files: ["backend/**/*.js"], // Only applies to JS files in the backend directory
    languageOptions: {
      globals: {
        ...globals.node, // This enables all Node.js globals
      },
    },
    rules: {
      // Common practice: allow console logs in Node.js scripts
      "no-console": "off",
    },
  },
];