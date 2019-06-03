const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devServer: {
      contentBase: './dist',
      hot: true
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/')
	},
	module: {
		rules: [
		  {
		  	test: /\.css$/,
		  	use: [
		  	  'style-loader',
		  	  'css-loader'
		  	]
		  },
		  {
		  	test: /\.(png|svg|jpg|gif)$/,
		  	use: [
		  	  'file-loader'
		  	]
		  }
		]
	},
	plugins: [
	  new CleanWebpackPlugin(),
	  new htmlWebpackPlugin({
	  	title: '管理输出'
	  }),
	  new webpack.HotModuleReplacementPlugin()
	]
}