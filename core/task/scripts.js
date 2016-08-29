'use strict';

const	gulp = 			        require('gulp'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		source =		        require('vinyl-source-stream'),
		browserify =	        require('browserify'),
		coffeeify =             require('coffeeify'),
		babelify =              require('babelify'),
		fs =                    require('fs');

const settings = JSON.parse(fs.readFileSync('catstruct.json', 'utf-8')).buildSettings.javascript;

gulp.task('js', () => {
	return browserify(settings.sourcePath, {
			paths: settings.basedir,
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
		.pipe(gulp.dest(settings.outputPath));
});
