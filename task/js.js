const browserSync = require('browser-sync')
const path = require('path')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV || 'development'
const SOURCES_PATH = path.resolve(__dirname, '../src')
const DIST_PATH = path.resolve(__dirname, '../dist')

const webpackConfig = {
  mode: ENV,

  devtool: ENV === 'development' ? 'cheap-module-source-map' : false,

  entry: {
    app: path.join(SOURCES_PATH, './app.js'),
  },

  output: {
    filename: 'app.js',
    path: path.join(DIST_PATH, './assets/js'),
    publicPath: '/',
  },

  context: DIST_PATH,

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    modules: ['node_modules', SOURCES_PATH],
    extensions: ['.js', '.json'],
  },
}

function js(cb) {
  return new Promise(resolve =>
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error(err)
      } else {
        console.info(stats.toString())
      }

      return resolve()
    }),
  )
}

module.exports = {
  js,
}
