var webpack = require('webpack')
var path = require('path')
// var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')

var pkg = require(projectRoot + '/package.json')
var vendor = Object.keys(pkg.dependencies)

var publicPath = '/static/'
var distPath = 'dist/static/'

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: vendor
  },
  output: {
    path: path.resolve(projectRoot, distPath),
    publicPath: publicPath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel',  exclude: /node_modules/}
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
  ],
  devtool: 'source-map'
}
