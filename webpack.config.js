const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
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
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
