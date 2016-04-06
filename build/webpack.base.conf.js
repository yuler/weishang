var path = require('path')
var webpack = require('webpack')
var cssLoaders = require('./css-loaders')
var pkg = require('../package.json')
var projectRoot = path.resolve(__dirname, '../')
var vendor = Object.keys(pkg.dependencies)

// console.log(cssLoaders({ sourceMap: false, extract: false }).styl);
module.exports = {
  entry: {
    app: ['./src/index.js', './src/assets/index.styl'],
    vendor: vendor
  },
  output: {
    path: projectRoot + '/dist/static',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: '[name].[ext]?[hash:7]' }}
    ]
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: false,
      extract: false
    })
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
  ]
};