'use strict';

const gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith');

gulp.task('sprite', () => {
  let spriteData = gulp.src('app/assets/sprites/**/*')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '/assets/images/sprite.png',
      cssName: 'sprite.css',
      cssFormat: 'css',
      algorithm: 'binary-tree',
      padding: 10
    }));

  spriteData.img.pipe(gulp.dest('dist/assets/images'));
  spriteData.css.pipe(gulp.dest('app/assets/css'));
});