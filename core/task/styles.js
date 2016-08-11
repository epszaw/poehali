'use strict';

const 	gulp = 					require('gulp'),
		concat =				require('gulp-concat'),
		stylus = 				require('gulp-stylus'),
		cssComb = 				require('gulp-csscomb'),
		autoprefixer = 			require('gulp-autoprefixer'),
		plumber = 				require('gulp-plumber'),
		plumberErrorHandler = 	require('gulp-plumber-error-handler'),
		rupture = 				require('rupture'),
		nib = 					require('nib'),
		cli = 					require('cli-color'),
		fs = 					require('fs'),
		path = 					require('path');



let stylCommonPath = ['app/blocks/**/*.styl'];

let customBrowsers = fs.readFileSync('.browsers', 'utf-8').split(' ');

let stylFilesTree = {
	common: []
};

customBrowsers.map((e) => {
	if (!stylFilesTree[e]) {
		stylFilesTree[e] = [];
	}
});

customBrowsers.map((e) => {
	stylCommonPath.push('!app/blocks/**/*.@' + e + 'styl');
});

function searchFiles(startPath, filter, callback){

	if (!fs.existsSync(startPath)){
		throw new Error(startPath + ' is not exist!');
	}

	let files = fs.readdirSync(startPath);
	
	for (let i = 0; i < files.length; i++) {
		let filename = path.join(startPath, files[i]),
			stat = fs.lstatSync(filename);
		
		if (stat.isDirectory()){
			searchFiles(filename, filter, callback);
		} else if (filter.test(filename)) {
		 	callback(filename);
		}
	}
}

searchFiles('app/blocks', /\.styl$/, function(filename) {
	customBrowsers.map((e) => {
		let regExp = new RegExp(e);

		if (regExp.test(filename) && /@/.test(filename)) {
			stylFilesTree[e].push(filename);
		} else {
			if (stylFilesTree.common.indexOf(filename) === -1 && !/@/.test(filename)) {
				stylFilesTree.common.push(filename);
			}
		}
	})
});

gulp.task('styl', () => {
	if (customBrowsers && customBrowsers.length > 0) {
		customBrowsers.map((browser) => {
			return gulp.src('app/blocks/**/*.@' + browser + 'styl')
				.pipe(stylus({use:[nib(), rupture()]}))
				.pipe(concat('main@' + browser + '.css'))
				.pipe(autoprefixer({
					browsers: ['last 3 versions']
				}))
				.pipe(cssComb())
				.pipe(gulp.dest('dist/assets/css'), {overwrite: true})
		});
	} else {
		console.log(cli.yellow('Custom browsers is not defined in .browsers - file. Continue STYLUS compilation.'))
	}

	return gulp.src('app/assets/styles/main.styl', {base: ''})
		.pipe(plumber({
			errorHandler: plumberErrorHandler('Error was occurred during STYLUS compile')
		}))
		.pipe(stylus({use: [nib(), rupture()]}))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(cssComb())
		.pipe(gulp.dest('dist/assets/css/'))
});
