module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-use-before-define': 1,
    'prettier/prettier': 2,
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 1,
    'react/prefer-stateless-function': 1,
    'react/button-has-type': 1,
    'react/state-in-constructor': [1, 'never'],
    'react/jsx-fragments': [2, 'element'],
    'react/jsx-one-expression-per-line': [0], // 与 prettier 规则冲突
  },
};
