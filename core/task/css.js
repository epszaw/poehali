'use strict';

const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  plumber = require('gulp-plumber'),
  plumberErrorHandler = require('gulp-plumber-error-handler'),
  autoprefixer = require('autoprefixer'),
  postCss = require('gulp-postcss'),
  cssnano = require('gulp-cssnano'),
  cssCustomProperties = require('postcss-custom-properties'),
  cssNested = require('postcss-nested'),
  cssImportPartials = require('postcss-partial-import'),
  cssCustomBreakPoints = require('postcss-custom-media'),
  cssUse = require('postcss-use'),
  cssExtend = require('postcss-extend'),
  cssFontMagician = require('postcss-font-magician'),
  path = require('path');

const postcssPlugins = [
  cssUse({
    modules: [
      'postcss-partial-import',
      'postcss-custom-media',
      'postcss-font-magician',
      'postcss-custom-properties',
      'postcss-nested',
      'postcss-extend'
    ]
  }),
  cssImportPartials(),
  cssFontMagician(),
  cssCustomBreakPoints(),
  cssNested(),
  cssExtend(),
  cssCustomProperties()
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
