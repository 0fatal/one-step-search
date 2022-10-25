module.exports = {
    extends: ['plugin:prettier/recommended'],
    ignorePatterns: ['node_modules/', 'build/'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 120,
          tabWidth: 2,
          semi: false,
          arrowParens: 'avoid',
        },
      ],
    },
    env: {
      node: true,
      es6: true,
      webextensions: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
    },
    parser: '@typescript-eslint/parser',
  }
  