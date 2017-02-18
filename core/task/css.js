'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  plumberErrorHandler = require('gulp-plumber-error-handler'),
  autoprefixer = require('autoprefixer'),
  postCss = require('gulp-postcss'),
  cssnano = require('gulp-cssnano'),
  cssUse = require('postcss-use'),
  path = require('path');

let postcssPlugins = [
  cssUse({
    modules: [
      'postcss-partial-import',
      'postcss-custom-media',
      'postcss-font-magician',
      'postcss-custom-properties',
      'postcss-nested',
      'postcss-extend'
    ]
  })
];

gulp.task('css', () => {
  return gulp.src('app/css/main.css')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during CSS compile')
    }))
    .pipe(postCss(postcssPlugins))
    // .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream());
});
