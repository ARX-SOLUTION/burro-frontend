import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
            "simple-import-sort": simpleImportSort,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        // 1. Packages (react first, then other packages)
                        ["^react", "^@?\\w"],
                        // 2. Modules (@/modules)
                        ["^@/modules"],
                        // 3. Other src folder stuff (@/ aliases)
                        ["^@/"],
                        // 4. Local imports (relative paths)
                        ["^\\."],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",
        },
    },
    {
        ignores: ["dist", "node_modules", "*.config.js", "*.config.ts"],
    },
    eslintConfigPrettier,
];
