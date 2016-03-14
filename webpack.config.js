var webpack = require('webpack');
var staticPath = '/static/';

module.exports = {
  entry: {
    app: ['./src/app.js'],
    vendor: ['vue', 'vue-router']
  },
  output: {
    path: __dirname + staticPath,
    publicPath: staticPath,
    filename: 'app.js'
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  devtool: 'source-map'
};