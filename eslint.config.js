import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import typeScriptESLintParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const react = [
  // for React
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ).map(({ files, ...rest }) => ({ files: (files ?? []).concat(['src/**/*.ts', 'src/**/*.tsx']), ...rest })),
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-one-expression-per-line': 'off',
    },
  },
];

/** @type {import('eslint').Linter.FlatConfig[]} */
const configJs = [
  ...compat.extends(
    'airbnb-base',
  ).map(({ files, ...rest }) => ({ files: (files ?? []).concat(['eslint.config.js']), ...rest })),
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.node.json' },
      },
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
        },
      ],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
    },
  },
];

/** @type {import('eslint').Linter.FlatConfig[]} */
const configTs = [
  ...compat.extends(
    'airbnb-base',
    'airbnb-typescript/base',
  ).map(({ files, ...rest }) => ({ files: (files ?? []).concat(['vite.config.ts']), ...rest })),
  {
    files: ['vite.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
        },
      ],
    },
  },
];

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...react,
  ...configJs,
  ...configTs,
];
