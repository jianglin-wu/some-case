module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['haixue-antd', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['prettier', 'import', 'react'],
  rules: {
    strict: [0],
    'no-use-before-define': 1,
    'prettier/prettier': 2,
    // import/no-extraneous-dependencies 待定
  },
  settings: {
    polyfills: ['Promise'],
  },
};
