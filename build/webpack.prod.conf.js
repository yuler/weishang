var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
	entry: {
		app: ['./src/app.js'],
		vendor: ['vue', 'vue-router']
	},
	output: {
		filename: '[name].[chunkhash].js',
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[chunkhash].js'),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: 'index.html',
			inject: true,
		})
	]
})