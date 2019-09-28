require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'css-modules-transform',
      {
        camelCase: true,
        generateScopedName: '[path][name]__[local]--[hash:base64:5]',
        extensions: ['.css', '.scss'],
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    'dynamic-import-node',
  ],
});
require('./src/server');
