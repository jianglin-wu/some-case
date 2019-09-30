// 用于 node.js 执行的 bable 配置
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
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
};
