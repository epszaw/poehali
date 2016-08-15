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
		path = 					require('path'),
		isExist =               require('file-exists');

const dependencies = [
	'normalize', 'nib', 'rupture', 'mixins', 'fonts', 'variables', 'sprite'
];

let customBrowsers = fs.readFileSync('.browsers', 'utf-8').split(' ');

let stylFilesTree = {
	common: []
};

customBrowsers.map((e) => {
	if (!stylFilesTree[e]) {
		stylFilesTree[e] = [];
	}
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

function createMainFiles(stylesDir, stylesTree, dependencies) {
	let dependenciesList = [];

	dependencies.forEach((e) => {
		let dependecy = '@import \'' + e +  '\'';

		dependenciesList.push(dependecy);
	});

	for (let stylGroup in stylesTree) {
		let styleFileName = stylesDir + 'main.styl',
			content = '';

		if (stylesTree[stylGroup].length > 0) {
			if (stylGroup !== 'common') {
				styleFileName = stylesDir + 'main@' + stylGroup + '.styl';

				content = buildStylesDependancies(stylesTree[stylGroup]);
			} else {
				content = buildStylesDependancies(stylesTree[stylGroup]);
			}
		}

		if (isExist(styleFileName)) {
			fs.unlink(styleFileName, (err) => {
				if (!err) {
					fs.writeFile(styleFileName, dependenciesList.join('\n') + '\n' + content);
				}
			});
		}
	}
}

function buildStylesDependancies(filesList) {
	let tree = '';

	filesList.forEach((e) => {
		tree += '@import \'../../' + e.slice(e.indexOf('blocks')) + '\'\n';
	});

	return tree;
}


/*
/
/ Gulp task part
/
*/

gulp.task('build-styl', () => {
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

	createMainFiles('app/assets/styles/', stylFilesTree, dependencies);
});

gulp.task('styl', () => {
	for (let stylGroup in stylFilesTree) {
		let stylesId = 'main';

		if (stylGroup !== 'common') {
			stylesId += '@' + stylGroup;
		}

		gulp.src('app/assets/styles/' + stylesId + '.styl', {base: ''})
			.pipe(plumber({
				errorHandler: plumberErrorHandler('Error was occurred during STYLUS compile')
			}))
			.pipe(stylus({
				use: [nib(), rupture()]
			}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(cssComb())
			.pipe(gulp.dest('dist/assets/css'), {overwrite: true})
	}
});