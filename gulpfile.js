const	gulp = 			require('gulp'),
		requireDir = 	require('require-dir'),
		runSequence = 	require('run-sequence'),
		browserSync = 	require('browser-sync').create(),
		reload = 		browserSync.reload;

requireDir('scripts/task');

gulp.task('build', ['sprite', 'js', 'css', 'jade', 'move-assets']);

gulp.task('watch', () => {
	gulp.watch('app/blocks/**/*.jade', () => runSequence('jade', reload));
	gulp.watch('app/data/*', () => runSequence('jade', reload));
	gulp.watch('app/pages/*.jade', () => runSequence('jade', reload));
	gulp.watch('app/blocks/**/*.styl', () => runSequence('css', reload));
	gulp.watch('app/blocks/**/*.js', () => runSequence('js', reload));
	gulp.watch(['app/assets/images/**/*', 'app/assets/fonts/**/*'], () => runSequence('move-assets', reload));
	gulp.watch('app/assets/sprites/*', () => runSequence('sprite', reload));
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		},
		port: 9000,
		open: true,
		notify: false
	});
});

gulp.task('start', ['build', 'watch', 'browserSync']);
