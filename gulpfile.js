'use strict';

const	gulp = 			require('gulp'),
		requireDir = 	require('require-dir'),
		runSequence = 	require('run-sequence'),
		cache =			require('gulp-cached'),
		browserSync = 	require('browser-sync').create(),
		reload = 		browserSync.reload,
		fs =            require('fs');

requireDir('core/task');

const settings = JSON.parse(fs.readFileSync('catstruct.json', 'utf-8')).buildSettings;

gulp.task('prepare', ['build-styl', 'move-assets']);
gulp.task('build', ['prepare', 'sprite', 'js', 'pug'], () => runSequence('styl', reload));

gulp.task('watch', () => {
	gulp.watch([settings.pug.watchPath, settings.pug.dataPath + '/*'] , (e) => runSequence('pug', reload));
	gulp.watch(settings.stylus.watchPath, (e) => {
		if (e.type === 'added' || e.type === 'deleted') {
			runSequence('build-styl', reload);
			runSequence('styl', reload);
		} else {
			runSequence('styl', reload)
		}
	});
	gulp.watch(['app/**/*.js', 'app/**/*.coffee'], () => runSequence('js', reload));
	gulp.watch([settings.images.watchPath, 'app/assets/fonts/**/*'], (e) => {
		if (e.type === 'deleted') {
			delete cache.caches['assets'][e.path];
		}

		runSequence('move-assets', reload);
	});

	gulp.watch(settings.sprites.watchPath, () => runSequence('sprite', reload));
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: "./dist/"
		},
		port: 3000,
		open: true
	});
});

gulp.task('start', ['build', 'watch', 'browserSync']);
