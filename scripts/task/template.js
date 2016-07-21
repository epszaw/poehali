'use strict';

const 	gulp = 			require('gulp'),
		insert = 		require('gulp-insert'),
		gulpPug = 		require('gulp-pug'),
		getData = 		require('jade-get-data'),
		filter = 		require('gulp-filter'),
		rename =		require('gulp-rename');

const data = {
	getData: getData('app/data')
};

gulp.task('pug', () => {
	return gulp.src('app/**/*.pug')
		.pipe(filter('app/pages/*'))
		.pipe(gulpPug({
			basedir: 'app',
			pretty: true,
			data
		}))
		.pipe(rename({
			dirname: '.'
		}))
		.pipe(gulp.dest('dist'))
});