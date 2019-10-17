const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = '/';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: ['react-hot-loader/patch', './src/client.js'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    hot: true,
  },
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[contenthash:8].async.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath,
              hmr: !isProduction,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      RUNTIME_TARGET: JSON.stringify(process.env.RUNTIME_TARGET),
    }),
    new HtmlWebpackPlugin({
      title: 'some-case',
      template: path.resolve(__dirname, './src/pages/document.ejs'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './public/'),
        to: path.resolve(__dirname, './dist/'),
      },
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: !isProduction ? '[name].css' : '[name].[hash:8].css',
      chunkFilename: !isProduction ? '[id].css' : '[id].[contenthash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    new WorkboxPlugin.InjectManifest({
      swDest: path.resolve(__dirname, 'dist/service-worker.js'),
      swSrc: path.resolve(__dirname, 'src/service-worker.js'),
      importWorkboxFrom: 'local',
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  externals: {
    // dva 中引入了此模块，由于没有使用则使用此方式减少打包体积
    // 请求网络数据请用 umi-request 模块代替
    // 此方式减少：生产环境 7~9KB JS 大小
    // 如需要使用 dva/fetch 或者 isomorphic-fetch 模块请注释此项配置
    'whatwg-fetch': 'window.__whatwg-fetch',
  },
};
