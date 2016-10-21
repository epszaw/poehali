'use strict';

const path = require('path'),
      webpack = require('webpack');

module.exports = {
  output: {
    filename: '[name].js'
  },

  watch: true,

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

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