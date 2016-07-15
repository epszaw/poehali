const	gulp = 			require('gulp'),
		concat = 		require('gulp-concat'),
		babel =			require('gulp-babel'),
		source =		require('vinyl-source-stream'),
		browserify =	require('browserify');

gulp.task('concat-js', () => {
	return gulp.src('app/blocks/**/*.js')
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