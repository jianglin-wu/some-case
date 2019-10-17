// 仅用于 SSR 模式的 bable 配置
const config = require('./config');

const { srcPath } = config.paths;
const { localIdentName } = config.style;

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: [srcPath],
        alias: {
          '@': srcPath,
        },
      },
    ],
    [
      'css-modules-transform',
      {
        camelCase: true,
        generateScopedName: localIdentName,
        extensions: ['.css', '.scss'],
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    'dynamic-import-node',
  ],
};
