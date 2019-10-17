// 公共配置
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  // html 文件的 title
  title: 'fe-antd-demo',
  publicPath: '/',
  paths: {
    rootPath,
    clientPath: path.resolve(rootPath, 'src/client.js'),
    serverPath: path.resolve(rootPath, 'src/server.js'),
    srcPath: path.resolve(rootPath, 'src'),
    distPath: path.resolve(rootPath, 'dist'),
  },
  style: {
    // css module 类名生成规则
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
  },
  env: {
    isProduction,
  },
};
