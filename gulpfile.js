'use strict';

const	gulp = 			require('gulp'),
		requireDir = 	require('require-dir'),
		runSequence = 	require('run-sequence'),
		cache =			require('gulp-cached'),
		browserSync = 	require('browser-sync').create(),
		reload = 		browserSync.reload;

requireDir('core/task');

gulp.task('prepare', ['build-styl', 'move-assets']);
gulp.task('build', ['prepare', 'sprite', 'coffee', 'js', 'pug'], () => runSequence('styl', reload));

gulp.task('watch', () => {
	gulp.watch(['app/**/*.pug', 'app/data/*'] , (e) => runSequence('pug', reload));
	gulp.watch('app/blocks/**/*.styl', (e) => {
		if (e.type === 'added' || e.type === 'deleted') {
			runSequence('styl', ['build-styl'], reload);
		} else {
			runSequence('styl', reload)
		}
	});
	gulp.watch('app/blocks/**/*.js', () => runSequence('js', reload));
	gulp.watch('app/blocks/**/*.coffee', () => runSequence('coffee', reload));
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
