var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var WebpackDevServer = require('webpack-dev-server')

config.entry.app.unshift("webpack-dev-server/client?http://localhost:9090", "webpack/hot/dev-server");

config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devtool = 'eval';

var proxy = {
  "/vs/*": {target: "http://123.56.235.156", host: "123.56.235.156"},
};

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy,
  hot: true,
});

app.listen(9090, '0.0.0.0', function (err, result) {
  console.log('http://localhost:9090');
  if (err) {
    console.log(err);
  }
});
