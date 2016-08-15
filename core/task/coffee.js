'use strict';

const	gulp = 			require('gulp'),
		concat = 		require('gulp-concat'),
		babel =			require('gulp-babel'),
		source =		require('vinyl-source-stream'),
		browserify =	require('browserify'),
		coffee =        require('gulp-coffee'),
		coffeeify =     require('coffeeify');

gulp.task('concat-coffee', () => {
	return gulp.src('app/blocks/**/*.coffee')
		.pipe(concat('main.coffee'))
		.pipe(gulp.dest('app/assets/coffee'));
});

gulp.task('coffee', ['concat-coffee'], () => {
	return gulp.src('app/assets/coffee/main.coffee')
		.pipe(coffee({bare: true}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/assets/js'));
});
