// 仅用于 SSR 模式本地开发执行
const paths = require('./paths');
const babelNodeOptions = require('./ssr-babelrc');

process.env.NODE_ENV = 'development';

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')(babelNodeOptions);
// eslint-disable-next-line import/no-dynamic-require
require(paths.appSsrServer);
