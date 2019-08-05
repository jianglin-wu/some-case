const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? "hidden-source-map" : "cheap-module-eval-source-map",
  mode: isProduction ? "production" : "development",
  entry: "./src/app.js",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/"),
    publicPath: isProduction ? 'http://psyduck-de-MacBook-Pro.local:8080/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      title: "some-case",
      template: path.resolve(__dirname, "./src/app.ejs")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WorkboxPlugin.InjectManifest({
      swDest: path.resolve(__dirname, "dist/sw.js"),
      swSrc: path.resolve(__dirname, "src/sw.js"),
      globPatterns: [
        '**/*.html',
        '**/*.{js,css}',
      ],
      // exclude: [/\.html$/, /\.map$/],
      modifyURLPrefix: { // 静态资源 CDN 路径处理，与业务相关
        '**/*.html': `/_next/8sdf78ud8s8888/app.js`
      },
      manifestTransforms: [
        // Basic transformation to remove a certain URL:
        (originalManifest) => {
          console.log('originalManifest:', originalManifest);
          const manifest = originalManifest.filter(
            (entry) => entry.url !== 'ignored.html');
          // Optionally, set warning messages.
          const warnings = [];
          return {manifest, warnings};
        }
      ]
    })
  ],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
};
