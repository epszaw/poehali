const gulp = require('gulp')
const browserSync = require('browser-sync')
const imageMin = require('gulp-imagemin')

function fonts(cb) {
  gulp.src('src/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'))
  cb()
}

function images(cb) {
  gulp
    .src('src/assets/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.stream())
  cb()
}

module.exports = {
  fonts,
  images,
}
