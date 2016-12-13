'use strict';

const   gulp =     require('gulp'),
  minifyCss = require('gulp-clean-css'),
  uglifyJs =  require('gulp-uglifyjs');

gulp.task('minify-css', () => {
  return gulp.src('dist/assets/css/*')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('min-js', () => {
  return gulp.src('dist/assets/js/*.js')
    .pipe(uglifyJs())
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('minify', ['minify-css', 'min-js']);