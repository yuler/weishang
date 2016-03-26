var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
	entry: {
		app: ['./src/app.js'],
		vendor: ['vue', 'vue-router']
	},
	output: {
		 output: {
			filename: '[name].[chunkhash].js',
		},
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', '[name][chunkhash].js')
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: 'index.html',
			inject: true,
		})
	]
}