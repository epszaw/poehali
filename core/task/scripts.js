'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  source = require('vinyl-source-stream'),
  fs = require('fs'),
  webpack = require('webpack-stream'),
  webpackConfig = require('../../webpack.config');

gulp.task('js', () => {
  return gulp.src('app/app.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream());
});