import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: [
            'build/**',
            'coverage/**',
            'playwright-report/**',
            'test-results/**',
            'public/**',
            // Generated from the backend's OpenAPI schema by `yarn api:types`
            'src/types/generated/**',
        ],
    },
    js.configs.recommended,
    // Type-checked rules are scoped to TS files: plain .js configs are outside the tsconfig
    // and would crash these rules with "don't have parserOptions set to generate type information"
    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ['**/*.{ts,tsx}'],
    })),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.js'],
                },
                tsconfigRootDir: import.meta.dirname,
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: {
                    project: ['./tsconfig.app.json', './tsconfig.node.json'],
                    noWarnOnMultipleProjects: true,
                },
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.flatConfigs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } },
            ],

            'import/order': [
                'error',
                {
                    // No separate 'type' group: type-only imports are sorted by their path
                    // alongside the value imports from the same module
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    pathGroups: [
                        { pattern: '#/**', group: 'internal' },
                        { pattern: '#slices/**', group: 'internal' },
                        { pattern: '#selectors', group: 'internal' },
                        { pattern: '#services/**', group: 'internal' },
                        { pattern: '*.css', group: 'object', position: 'after' },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'external'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-default-export': 'error',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    {
        files: ['**/*.{js,mjs}'],
        languageOptions: {
            globals: { ...globals.node },
        },
        rules: {
            'import/no-default-export': 'off',
            // Build scripts report progress to the terminal
            'no-console': 'off',
        },
    },
    {
        files: [
            '*.config.{ts,js}',
            'e2e/**/*.ts',
            'src/mocks/**/*.ts',
            'src/test/**/*.{ts,tsx}',
            '**/*.{test,spec}.{ts,tsx}',
        ],
        rules: {
            'import/no-default-export': 'off',
            'react-refresh/only-export-components': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
        },
    },
    prettierConfig,
);
