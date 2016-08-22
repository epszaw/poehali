const 	gulp =			require('gulp'),
		spritesmith =	require('gulp.spritesmith'),
		fs =            require('fs');

const settings = JSON.parse(fs.readFileSync('catstruct.json', 'utf-8')).buildSettings.sprites;

gulp.task('sprite', () => {
	let spriteData = gulp.src(settings.spriteData)
		.pipe(spritesmith({
		imgName: settings.image.imgFilename,
		imgPath: settings.image.imgPath,
		cssName: settings.styl.stylName,
		cssFormat: 'stylus',
		algorithm: 'binary-tree',
		padding: settings.padding
	}));
	
	spriteData.img.pipe(gulp.dest(settings.image.imageOutputPath));
	spriteData.css.pipe(gulp.dest(settings.styl.stylOutputPath));
});
