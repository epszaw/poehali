'use strict';

const	gulp = 			        require('gulp'),
		concat = 		        require('gulp-concat'),
		babel =			        require('gulp-babel'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		source =		        require('vinyl-source-stream'),
		browserify =	        require('browserify');

gulp.task('concat-blocks', () => {
	return gulp.src('app/blocks/**/*.js')
		.pipe(plumber({
			errorHandler: plumberErrorHandler('Error was occurred during JAVASCRIPT concatenation')
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/assets/js'));
});

gulp.task('concat-js', ['concat-blocks'], () => {
	return gulp.src(['app/main.js', 'app/assets/coffee/main.js', 'app/assets/js/main.js'])
		.pipe(concat('main.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task('js', ['concat-js'], () => {
	return browserify('dist/assets/js/main.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist/assets/js'));
});
