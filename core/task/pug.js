'use strict';

const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      gulpPug = require('gulp-pug'),
      getData = require('jade-get-data'),
      plumber = require('gulp-plumber'),
      plumberErrorHandler = require('gulp-plumber-error-handler'),
      filter = require('gulp-filter'),
      rename = require('gulp-rename');

const data = {
  getData: getData('app/data')
};

gulp.task('pug', () => {
  return gulp.src('app/**/*.pug')
    .pipe(plumber({
      errorHandler: plumberErrorHandler('Error was occurred during PUG compile')
    }))
    .pipe(filter('app/pages/*'))
    .pipe(gulpPug({
      basedir: 'app',
      pretty: true,
      data
    }))
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
