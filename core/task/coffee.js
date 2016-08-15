'use strict';

const	gulp = 			        require('gulp'),
		concat = 		        require('gulp-concat'),
		babel =			        require('gulp-babel'),
		source =		        require('vinyl-source-stream'),
		browserify =	        require('browserify'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		coffee =                require('gulp-coffee');

gulp.task('concat-coffee', () => {
	return gulp.src('app/blocks/**/*.coffee')
		.pipe(concat('main.coffee'))
		.pipe(gulp.dest('app/assets/coffee'));
});

gulp.task('coffee', ['concat-coffee'], () => {
	return gulp.src('app/assets/coffee/main.coffee')
		.pipe(plumber({
			errorHandler: plumberErrorHandler('Error was occurred during COFFEE compile')
		}))
		.pipe(coffee({bare: true}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('app/assets/coffee'));
});
