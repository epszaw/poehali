const path = require('path')
const browserSync = require('browser-sync')

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, '../dist/'),
    },
    port: 3000,
    open: false,
  })
  cb()
}

module.exports = {
  serve,
}
