const 	gulp = 			require('gulp'),
		path = 			require('path'),
		insert = 		require('gulp-insert'),
		gulpPug = 		require('gulp-pug'),
		gulpPrettify = 	require('gulp-prettify'),
		getData = 		require('jade-get-data');

const data = {
	getData: getData('app/data')
};

gulp.task('pug', () => {
	return gulp.src('app/pages/**/*.pug', {base: ''})
		.pipe(insert.prepend('include /helpers/pug/import\n\r'))
		.pipe(gulpPug({
			basedir: 'app',
			pretty: true,
			data
		}))
		.pipe(gulpPrettify({
			indent_size: 4
		}))
		.pipe(gulp.dest('dist'))
});
