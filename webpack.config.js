'use strict';

const path = require('path'),
  webpack = require('webpack');

const env = process.env.NODE_ENV;

module.exports = {
  output: {
    filename: '[name].js'
  },
  watch: env && env === 'dev',
  plugins: [
    new webpack.NoErrorsPlugin()
  ].concat(env && env === 'dev' ? new webpack.HotModuleReplacementPlugin() : ''),
  devtool: env && env === 'dev' ? 'source-map' : null,
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        query: {
          presets: ['es2015', 'stage-0']
        },
        plugins: ['transform-runtime']
      }
    ]
  }
};

if (env === 'prod') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      }
    }),
    new webpack.optimize.DedupePlugin()
  );
}