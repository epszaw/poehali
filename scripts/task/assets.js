const gulp = 		require('gulp'),
	  imageMin =    require('gulp-imagemin');

gulp.task('move-fonts', () => {
	gulp.src('app/assets/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts'))
});

gulp.task('optimize-images', () => {
	gulp.src('app/assets/images/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('dist/assets/images'))
});

gulp.task('move-assets', ['move-fonts', 'optimize-images']);
