var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.dev.conf')

config.entry.app.unshift("webpack-dev-server/client?http://localhost:9090", "webpack/hot/dev-server")

var proxy = {
  "/vs/*": { target: "http://123.56.235.156", host: "123.56.235.156" },
};

var compiler = webpack(config)
var app = new WebpackDevServer(compiler, {
  // publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy,
  hot: true,
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
   	hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(hotMiddleware)

app.listen(9090, '0.0.0.0', function (err, result) {
  console.log('http://localhost:9090');
  if (err) {
    console.log(err);
  }
});
