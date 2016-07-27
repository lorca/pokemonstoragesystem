var webpack = require('webpack');

var config = require('./webpack.config');

config.devtool = undefined;

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings: true
    }
  }),
].concat(config.plugins);

module.exports = config

