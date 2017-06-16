const gulp = require('gulp')
const browserSync = require('browser-sync')
const gulpPug = require('gulp-pug')
const getData = require('jade-get-data')
const plumber = require('gulp-plumber')
const plumberErrorHandler = require('gulp-plumber-error-handler')
const filter = require('gulp-filter')
const rename = require('gulp-rename')

const data = {
  getData: getData('src/data')
}

gulp.task('pug', () => {
  return gulp.src('src/**/*.pug')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during PUG compile')
    }))
    .pipe(filter('src/pages/*'))
    .pipe(gulpPug({
      basedir: 'src',
      pretty: true,
      data
    }))
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})
