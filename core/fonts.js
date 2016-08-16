'use strict';

const fs = require('fs');

let fontsDir = 'app/assets/fonts',
	stylFile = 'app/assets/styles/fonts.styl',
	stylImportPath = '../fonts/',
	fontsNames = fs.readFileSync('.fonts', 'utf-8').split(' ');

let fonts = fs.readdirSync(fontsDir);

createImportFile(fontsNames, fonts, stylFile, stylImportPath);

function createImportFile(fontsNames, fonts, stylFile, fontRelativePath) {
	let fontName = '';

	let weightList = {
		'hairline': 100,
		'ultralight': 200,
		'light': 300,
		'regular': 400,
		'medium': 500,
		'semibold': 600,
		'bold': 700,
		'ultrabold': 800,
		'black': 900
	};

	let importContent = '';

	fonts.map((e) => {
		for (let weight in weightList) {
			let weightRegExp = new RegExp(weight),
				styleRegExp = new RegExp(/italic/);

			if (weightRegExp.test(e.toLowerCase()) && styleRegExp.test(e.toLowerCase())) {
				parseTemplate(e);
			} else if (weightRegExp.test(e.toLowerCase())) {
				parseTemplate(e);
			}
		}
	});
}

function parseTemplate(fontName, fontFilename, fontWeight, fontStyle) {
	let fontTemplate =  '@font-face\r\n' +
						'\tfont-family @fontname\r\n' +
						'\tsrc: url(\'../fonts/@fontname\') format(\'woff\'),\r\n' +
						'\t\turl(\'../fonts/@fontname\') format(\'woff2\')\r\n\r\n' +
						'\tfont-style normal\r\n\r\n';

	console.log(fontTemplate.replace(/@fontname/g, fontFilename));
}

function getFontName(fontsNames, fontFile) {
	let fontName = {};

	fontsNames.map((e) => {
		let fontNameRegExp = new RegExp(e);

		if (fontNameRegExp.test(e)) {
			fontName.name = e;
			fontName.variable = e.toLowerCase();
		}
	})

	console.log(fontName)
}