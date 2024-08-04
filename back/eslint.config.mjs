import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const config = [
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['build', '.prettierrc.cjs'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'comma-dangle': ["error", "never"]
    },
  },
];

export default config;
