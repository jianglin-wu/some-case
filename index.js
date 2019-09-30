const babelNodeOptions = require('./babelrc-node');
// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')(babelNodeOptions);
require('./src/server');
