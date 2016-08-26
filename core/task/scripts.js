'use strict';

const	gulp = 			        require('gulp'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		source =		        require('vinyl-source-stream'),
		browserify =	        require('browserify'),
		coffeeify =             require('coffeeify'),
		babelify =              require('babelify');

gulp.task('js', () => {
	return browserify('app/app.coffee', {
			paths: ['./app'],
			debug: true
		})
		.transform('coffeeify', {
			bare: true
		})
		.transform('babelify', {
			presets: ["es2015"]
		})
		.bundle()
		.pipe(plumber({
			errorHandler: plumberErrorHandler
		}))
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist/assets/js'));
});
