const gulp =     require('gulp'),
    cache =    require('gulp-cached'),
    imageMin =    require('gulp-imagemin'),
    fs =          require('fs');

const settings = JSON.parse(fs.readFileSync('catstruct.json', 'utf-8')).buildSettings.images;

gulp.task('move-fonts', () => {
  gulp.src('app/assets/fonts/**/*')
    .pipe(cache('assets'))
    .pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('optimize-images', () => {
  gulp.src(settings.sourcePath)
    .pipe(cache('assets'))
    .pipe(imageMin())
    .pipe(gulp.dest(settings.outputPath))
});

gulp.task('move-assets', ['move-fonts', 'optimize-images']);
