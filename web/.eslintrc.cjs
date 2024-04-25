module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
     'plugin:react-hooks/recommended', 
     'plugin:storybook/recommended',
     'plugin:react/recommended',
     'plugin:import/recommended',
     'plugin:@typescript-eslint/recommended',
     'eslint-config-prettier',
    ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh','simple-import-sort','import'],
  rules: {
    "react/react-in-jsx-scope": 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    "import/no-unresolved": "off",
    "template-curly-spacing": "off",
    "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
    "react-hooks/exhaustive-deps": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "simple-import-sort/imports": [
      "error",
      {
          "groups": [
              [
                  "react"
              ],
              [
                  "^components"
              ],
              [
                  "^feature"
              ],
              [
                  "^hooks"
              ],
              [
                  "^\\."
              ]
          ]
      }
  ],
  },
}
