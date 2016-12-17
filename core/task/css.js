'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  plumberErrorHandler = require('gulp-plumber-error-handler'),
  autoprefixer = require('autoprefixer'),
  postCss = require('gulp-postcss'),
  cssVariables = require('postcss-simple-vars'),
  cssBreakpoints = require('postcss-custom-media'),
  cssNested = require('postcss-nested'),
  cssColor = require('postcss-color-function'),
  cssImport = require('postcss-import'),
  cssEasyImport = require('postcss-easy-import'),
  path = require('path');

gulp.task('css', () => {
  return gulp.src('app/css/main.css')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during CSS compile')
    }))
    .pipe(postCss([
      cssEasyImport({
        glob: true
      }),
      cssNested(),
      cssBreakpoints(),
      cssColor(),
      cssVariables(),
      autoprefixer({
        browsers: ['last 2 version']
      })
    ]))
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream());
});
