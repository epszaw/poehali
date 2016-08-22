'use strict';

const 	gulp = 					require('gulp'),
		gulpPug = 				require('gulp-pug'),
		getData = 				require('jade-get-data'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		filter = 				require('gulp-filter'),
		rename =				require('gulp-rename'),
		fs =                    require('fs');

const settings = JSON.parse(fs.readFileSync('catstruct.json', 'utf-8')).buildSettings.pug;

const data = {
	getData: getData(settings.dataPath)
};

gulp.task('pug', () => {
	return gulp.src(settings.sourcePath)
		.pipe(plumber({
			errorHandler: plumberErrorHandler('Error was occurred during PUG compile')
		}))
		.pipe(filter(settings.filterPath || 'app/pages/*'))
		.pipe(gulpPug({
			basedir: 'app',
			pretty: true,
			data
		}))
		.pipe(rename({
			dirname: '.'
		}))
		.pipe(gulp.dest(settings.outputPath))
});