const {
    defineConfig,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.eslint.json"],
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        prettier,
    },

    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
    ),

    rules: {
        "no-unused-vars": "off",
        "prefer-const": "error",
        "no-empty": "error",
        "no-var": "error",
        "no-shadow": "off",
        "eqeqeq": "error",

        "no-console": ["warn", {
            allow: ["warn", "error"],
        }],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-explicit-any": "warn",

        "@typescript-eslint/explicit-function-return-type": ["warn", {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
        }],

        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "no-public",
        }],

        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-inferrable-types": "error",

        "@typescript-eslint/no-restricted-types": ["error", {
            types: {
                "Object": {
                    message: "Use {} em vez de Object.",
                    fixWith: "{}",
                },

                "String": {
                    message: "Use string em vez de String.",
                    fixWith: "string",
                },

                "Number": {
                    message: "Use number em vez de Number.",
                    fixWith: "number",
                },

                "Boolean": {
                    message: "Use boolean em vez de Boolean.",
                    fixWith: "boolean",
                },
            },
        }],

        "@typescript-eslint/no-unused-expressions": ["error", {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
        }],

        "@typescript-eslint/consistent-type-imports": "error",
        "prettier/prettier": "error",
    },
}]);
