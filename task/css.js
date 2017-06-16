const gulp = require('gulp')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const plumberErrorHandler = require('gulp-plumber-error-handler')
const postCss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')

gulp.task('css', () => {
  return gulp.src('src/css/main.css')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during CSS compile')
    }))
    .pipe(postCss())
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream())
})

gulp.task('minify-css', () => {
  return gulp.src('src/css/main.css')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during CSS compile')
    }))
    .pipe(postCss())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
})
