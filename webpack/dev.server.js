const Express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/defaults');
const wpConfig = require('./index.js');
const compiler = webpack(wpConfig);

const debug = require('debug')('boldr:webpack-ds');

const serverOptions = {
  contentBase: `http://${config.HOST}:${config.HMR_PORT}`,
  quiet: true,
  noInfo: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  inline: true,
  lazy: false,
  stats: { colors: true },
  publicPath: wpConfig.output.publicPath
};

const app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(config.HMR_PORT, function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
    debug('==> 🚧  Webpack development server listening on port %s', config.HMR_PORT);
  }
});
