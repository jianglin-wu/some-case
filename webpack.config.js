const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = '/';
// const publicPath = isProduction ? 'http://psyduck-de-MacBook-Pro.local:8080/' : '/';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
  mode: isProduction ? 'production' : 'development',
  entry: './src/client.js',
  devServer: {
    historyApiFallback: true,
    contentBase: './client',
    hot: true,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: 'some-case',
      template: path.resolve(__dirname, './src/document.ejs'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.InjectManifest({
      swDest: path.resolve(__dirname, 'dist/sw.js'),
      swSrc: path.resolve(__dirname, 'src/sw.js'),
      // importWorkboxFrom: 'local',
    }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: 'sw.js',
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   importWorkboxFrom: 'local',
    //   navigateFallback: `${publicPath}index.html`,
    //   runtimeCaching: [
    //     {
    //       urlPattern: new RegExp('https://image-cdn.hahhub.com'),
    //       handler: 'CacheFirst'
    //     },
    //     {
    //       urlPattern: new RegExp('https://blog-cdn.hahhub.com'),
    //       handler: 'StaleWhileRevalidate'
    //     },
    //     {
    //       urlPattern: /appconfig\.js$/,
    //       handler: 'NetworkFirst'
    //     },
    //   ]
    // }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
