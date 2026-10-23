const vue = require('eslint-plugin-vue');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

const typescriptRules = Object.assign(
  {},
  ...typescript.configs['flat/recommended'].map((config) => config.rules || {})
);

module.exports = [
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: typescriptRules,
  },
  {
    files: ['**/*.vue'],
    plugins: {
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      ...typescriptRules,
      'no-console': ['error', { allow: ['debug', 'info', 'warn', 'error'] }],
      'vue/valid-v-on': ['warn', { modifiers: ['slash', 'dash'] }],
      'vue/max-attributes-per-line': [
        'error',
        { singleline: 20, multiline: 1 },
      ],
      'vue/first-attribute-linebreak': [
        'error',
        { singleline: 'ignore', multiline: 'below' },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'never', component: 'never' },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-indent': [
        'warn',
        4,
        { attribute: 1, baseIndent: 1, closeBracket: 0, alignAttributesVertically: true },
      ],
      'vue/script-indent': [
        'warn',
        4,
        { baseIndent: 1, switchCase: 1, ignores: [] },
      ],
      'vue/valid-attribute-name': 'off',
      'vue/valid-model-definition': 'off',
    },
  },
];
