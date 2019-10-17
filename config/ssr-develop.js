// 仅用于 SSR 模式本地开发执行
const babelNodeOptions = require('./ssr-babelrc');
const config = require('./config');

const { serverPath } = config.paths;

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')(babelNodeOptions);
// eslint-disable-next-line import/no-dynamic-require
require(serverPath);
