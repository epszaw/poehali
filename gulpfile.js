'use strict';

const	gulp = 			require('gulp'),
		requireDir = 	require('require-dir'),
		runSequence = 	require('run-sequence'),
		cache =			require('gulp-cached'),
		browserSync = 	require('browser-sync').create(),
		reload = 		browserSync.reload;

requireDir('scripts/task');

gulp.task('build', ['sprite', 'js', 'css', 'pug', 'move-assets']);

gulp.task('watch', () => {
	gulp.watch(['app/**/*.pug', 'app/data/*'] , (e) => runSequence('pug', reload));
	gulp.watch('app/blocks/**/*.styl', () => runSequence('css', reload));
	gulp.watch('app/blocks/**/*.js', () => runSequence('js', reload));
	gulp.watch(['app/assets/images/**/*', 'app/assets/fonts/**/*'], (e) => {
		if (e.type === 'deleted') {
			delete cache.caches['assets'][e.path];
		}

		runSequence('move-assets', reload);
	});
	gulp.watch('app/assets/sprites/*', () => runSequence('sprite', reload));
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		},
		port: 3000,
		open: true,
		notify: false
	});
});

gulp.task('start', ['build', 'watch', 'browserSync']);
