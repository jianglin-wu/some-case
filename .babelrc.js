const config = require('./config/config');
const paths = require('./config/paths');

const { localIdentName } = config.style;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: '> 5%',
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: [paths.appSrc],
        alias: {
          '@': paths.appSrc,
        },
      },
    ],
    [
      'babel-plugin-named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
          },
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
    ['react-hot-loader/babel'],
    [
      'react-css-modules',
      {
        exclude: 'node_modules',
        generateScopedName: localIdentName,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
          },
          '.less': {
            syntax: 'postcss-less',
          },
        },
      },
    ],
  ],
};
