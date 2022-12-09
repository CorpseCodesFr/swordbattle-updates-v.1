module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-unused-vars': 1,
    'max-len': [2, { ignoreComments: true, code: 120 }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'function-paren-newline': [2, 'consistent'],
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'max-classes-per-file': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/state-in-constructor': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'no-octal-escape': 0,
    'import/no-extraneous-dependencies': 0,
    'no-restricted-syntax': 0,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: [
        '@typescript-eslint',
      ],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
      },
      rules: {
        'lines-between-class-members': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'consistent-return': 0,
        'object-curly-newline': 0,
        'no-shadow': 'off', // See https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
  ],
};
