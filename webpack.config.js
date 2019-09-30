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
// const publicPath = isProduction ? 'http://psyduck-de-MacBook-Pro.local:8080/' : '/';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  entry: ['react-hot-loader/patch', './src/client.js'],
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    hot: true,
  },
  output: {
    filename: 'index.[hash:8].js',
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
              hmr: process.env.NODE_ENV === 'development',
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
        test: /\.(png|svg|jpg|gif)$/,
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
      filename: 'index.[hash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    new WorkboxPlugin.InjectManifest({
      swDest: path.resolve(__dirname, 'dist/sw.js'),
      swSrc: path.resolve(__dirname, 'src/sw.js'),
      exclude: [/\.html$/, /\.map$/],
      importWorkboxFrom: 'local',
    }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: path.resolve(__dirname, 'dist/sw.js'),
    //   exclude: [/\.html$/, /\.map$/],
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   importWorkboxFrom: 'local',
    //   navigateFallback: 'index.html',
    //   runtimeCaching: [
    //     {
    //       urlPattern: new RegExp('https://image-cdn.hahhub.com'),
    //       handler: 'CacheFirst',
    //     },
    //     {
    //       urlPattern: new RegExp('https://blog-cdn.hahhub.com'),
    //       handler: 'StaleWhileRevalidate',
    //     },
    //     {
    //       urlPattern: /appconfig\.js$/,
    //       handler: 'NetworkFirst',
    //     },
    //   ],
    // }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
