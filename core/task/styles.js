const 	gulp = 			require('gulp'),
		stylus = 		require('gulp-stylus'),
		concat = 		require('gulp-concat'),
		cssComb = 		require('gulp-csscomb'),
		autoprefixer = 	require('gulp-autoprefixer'),
		rupture = 		require('rupture'),
		nib = 			require('nib'),
		cli = 			require('cli-color'),
		fs = 			require('fs');

var stylCommonPath = ['app/blocks/**/*.styl'];

var customBrowsers = fs.readFileSync('.browsers', 'utf-8').split(' ');

customBrowsers.map((e) => {
	stylCommonPath.push('!app/blocks/**/*@' + e + '.styl');
});

gulp.task('css', ['styl'], () => {
	return gulp.src('dist/assets/css/*')
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(cssComb())
		.pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('styl', ['concat-styl', 'custom-browsers-styles'], () => {
	return gulp.src('app/assets/styles/main.styl', {base: ''})
		.pipe(stylus({use:[nib(), rupture()]}))
		.pipe(gulp.dest('dist/assets/css'))
});

gulp.task('concat-blocks', () => {
	return gulp.src(stylCommonPath)
		.pipe(concat('blocks.styl'))
		.pipe(gulp.dest('app/assets/styles'), {overwrite: true})
});

gulp.task('move-import-file', () => {
	return gulp.src('app/helpers/styl/import.styl', {base: ''})
		.pipe(gulp.dest('app/assets/styles'));
});

gulp.task('concat-styl', ['move-import-file', 'concat-blocks'], () => {
	return gulp.src(['app/assets/styles/import.styl', 'app/assets/styles/blocks.styl'])
		.pipe(concat('main.styl'))
		.pipe(gulp.dest('app/assets/styles'), {overwrite: true})
});

// Custom browsers compile

gulp.task('custom-browsers-styles', () => {
	if (customBrowsers && customBrowsers.length > 0) {
		customBrowsers.map((browser) => {
			return gulp.src('app/blocks/**/*@' + browser + '.styl')
				.pipe(stylus({use:[nib(), rupture()]}))
				.pipe(concat('main@' + browser + '.css'))
				.pipe(cssComb())
				.pipe(gulp.dest('dist/assets/css'), {overwrite: true})
		});
	} else {
		console.log(cli.yellow('Custom browsers is not detected.'))
	}
});