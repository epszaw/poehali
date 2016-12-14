'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
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
    .pipe(postCss([
      autoprefixer({
        browsers: ['last 2 version']
      }),
      cssEasyImport({
        glob: true
      }),
      cssBreakpoints(),
      cssVariables(),
      cssNested(),
      cssColor()
    ]))
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream());
});
