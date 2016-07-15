const 	gulp = 			require('gulp'),
		path = 			require('path'),
		insert = 		require('gulp-insert'),
		gulpJade = 		require('gulp-jade'),
		gulpPrettify = 	require('gulp-prettify'),
		getData = 		require('jade-get-data');

const data = {
	getData: getData('app/data')
};

gulp.task('jade', () => {
	return gulp.src('app/pages/**/*.jade', {base: ''})
		.pipe(insert.prepend('include /helpers/jade/import\n\r'))
		.pipe(gulpJade({
			basedir: 'app',
			pretty: true,
			data
		}))
		.pipe(gulpPrettify({
			indent_size: 4
		}))
		.pipe(gulp.dest('dist'))
});
