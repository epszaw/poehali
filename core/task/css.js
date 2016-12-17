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
  cssEasyImport = require('postcss-easy-import'),
  cssSprites = require('postcss-sprites'),
  cssnano = require('gulp-cssnano'),
  path = require('path');

const postcssPlugins = [
  cssEasyImport({
    glob: true
  }),
  cssNested(),
  cssBreakpoints(),
  cssColor(),
  cssVariables(),
  cssSprites({
    basePath: './app/assets/sprites/',
    stylesheetPath: 'dist/css',
    spritePath: 'dist/css/images'
  }),
  autoprefixer({
    browsers: ['last 3 version']
  })
];

gulp.task('css', () => {
  return gulp.src('app/css/main.css')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during CSS compile')
    }))
    .pipe(postCss(postcssPlugins))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'), {
      overwrite: true
    })
    .pipe(browserSync.stream());
});
