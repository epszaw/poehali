const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const plumberErrorHandler = require('gulp-plumber-error-handler')
const postCss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const cond = require('gulp-if')

const env = process.env.NODE_ENV || 'dev'

gulp.task('css', () => {
  return gulp
    .src('src/css/main.css')
    .pipe(
      plumber({
        errorHandler: plumberErrorHandler(
          'Error was occurred during CSS compile'
        )
      })
    )
    .pipe(postCss())
    .pipe(
      cond(
        env === 'dev',
        sourcemaps.init({
          loadMaps: true
        })
      )
    )
    .pipe(cond(env === 'dev', sourcemaps.write()))
    .pipe(cond(env === 'dev', cssnano()))
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream())
})
