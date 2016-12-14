'use strict';

const gulp = require('gulp'),
  zip = require('gulp-zip');

gulp.task('zip', () => {
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest(''));
});