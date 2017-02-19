'use strict';

const gulp = require('gulp'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  path = require('path'),
  watch = require('gulp-watch'),
  bs = browserSync.create();

requireDir('core/task');

gulp.task('build', ['minify-css', 'move-assets', 'js', 'pug']);

gulp.task('watch', () => {
  watch('app/**/*.pug', (e) => runSequence('pug', bs.reload));
  watch('app/**/*.css', (e) => runSequence('css', bs.reload));
  watch(['app/assets/images/**/*', 'app/assets/fonts/**/*'], (e) => runSequence('move-assets', bs.reload));
});

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, 'dist/')
    },
    port: 8080,
    open: false
  });
});

gulp.task('default', ['browserSync', 'build', 'watch']);
